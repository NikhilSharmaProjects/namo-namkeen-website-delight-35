import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Enhanced CORS with security headers
const corsHeaders = {
    "Access-Control-Allow-Origin":
        Deno.env.get("ALLOWED_ORIGINS") || "https://namoindianamkeen.com",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type, x-request-id",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

// PhonePe configuration
const PHONEPE_SALT_KEY = Deno.env.get("PHONEPE_SALT_KEY");

if (!PHONEPE_SALT_KEY) {
    throw new Error("PhonePe salt key not configured");
}

// Security configuration
const RATE_LIMIT_WINDOW_MS = parseInt(
    Deno.env.get("RATE_LIMIT_WINDOW_MS") || "900000"
); // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = parseInt(
    Deno.env.get("RATE_LIMIT_MAX_REQUESTS") || "30"
); // Lower limit for webhooks

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting function
function checkRateLimit(clientId: string): boolean {
    const now = Date.now();
    const clientData = rateLimitStore.get(clientId);

    if (!clientData || now > clientData.resetTime) {
        rateLimitStore.set(clientId, {
            count: 1,
            resetTime: now + RATE_LIMIT_WINDOW_MS,
        });
        return true;
    }

    if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
        return false;
    }

    clientData.count++;
    return true;
}

// Enhanced webhook signature verification with additional security
async function verifyWebhookSignature(
    payload: string,
    receivedSignature: string,
    saltKey: string
): Promise<boolean> {
    try {
        // Validate signature format
        if (!receivedSignature || !receivedSignature.includes("###")) {
            console.error("Invalid signature format");
            return false;
        }

        const [hash, saltIndex] = receivedSignature.split("###");

        // Validate hash format (should be 64 character hex string)
        if (!hash || !/^[a-fA-F0-9]{64}$/.test(hash)) {
            console.error("Invalid hash format in signature");
            return false;
        }

        // Validate salt index (should be a number)
        if (!saltIndex || isNaN(parseInt(saltIndex))) {
            console.error("Invalid salt index in signature");
            return false;
        }

        const stringToHash = payload + saltKey;

        const encoder = new TextEncoder();
        const data = encoder.encode(stringToHash);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const calculatedHash = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

        // Constant-time comparison to prevent timing attacks
        if (calculatedHash.length !== hash.length) {
            return false;
        }

        let result = 0;
        for (let i = 0; i < calculatedHash.length; i++) {
            result |= calculatedHash.charCodeAt(i) ^ hash.charCodeAt(i);
        }

        return result === 0;
    } catch (error) {
        console.error("Error verifying webhook signature:", error);
        return false;
    }
}

// Validate webhook payload structure
function validateWebhookPayload(payload: any): boolean {
    try {
        if (!payload || typeof payload !== "object") {
            return false;
        }

        // Check for required fields
        if (!payload.response || typeof payload.response !== "string") {
            return false;
        }

        // Try to decode the base64 response
        try {
            const decodedResponse = atob(payload.response);
            const paymentData = JSON.parse(decodedResponse);

            // Validate decoded payment data structure
            if (!paymentData.data || !paymentData.data.merchantTransactionId) {
                return false;
            }

            return true;
        } catch (decodeError) {
            console.error("Error decoding webhook response:", decodeError);
            return false;
        }
    } catch (error) {
        console.error("Error validating webhook payload:", error);
        return false;
    }
}

// Sanitize and validate transaction data
function sanitizeTransactionData(data: any): any {
    const sanitized = { ...data };

    // Sanitize string fields
    if (sanitized.merchantTransactionId) {
        sanitized.merchantTransactionId =
            sanitized.merchantTransactionId.replace(/[^a-zA-Z0-9_-]/g, "");
    }

    if (sanitized.transactionId) {
        sanitized.transactionId = sanitized.transactionId.replace(
            /[^a-zA-Z0-9_-]/g,
            ""
        );
    }

    // Validate amounts
    if (
        sanitized.amount &&
        (typeof sanitized.amount !== "number" || sanitized.amount < 0)
    ) {
        throw new Error("Invalid amount in transaction data");
    }

    return sanitized;
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({
                error: "Method not allowed",
                code: "METHOD_NOT_ALLOWED",
            }),
            {
                status: 405,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }

    try {
        // Rate limiting check
        const clientId =
            req.headers.get("x-forwarded-for") ||
            req.headers.get("x-real-ip") ||
            "unknown";
        if (!checkRateLimit(clientId)) {
            console.warn("Rate limit exceeded for webhook from:", clientId);
            return new Response(
                JSON.stringify({
                    error: "Rate limit exceeded",
                    code: "RATE_LIMIT_EXCEEDED",
                }),
                {
                    status: 429,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // Validate request origin (webhooks should come from PhonePe servers)
        const origin = req.headers.get("origin");
        const userAgent = req.headers.get("user-agent") || "";

        // Log suspicious webhook attempts
        if (origin && !userAgent.includes("PhonePe")) {
            console.warn("Suspicious webhook origin:", {
                origin,
                userAgent,
                clientId,
            });
        }

        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
        );

        // Get webhook body and signature
        const body = await req.text();
        const webhookSignature = req.headers.get("X-VERIFY");

        if (!webhookSignature) {
            console.error("Missing webhook signature from:", clientId);
            return new Response(
                JSON.stringify({
                    error: "Missing webhook signature",
                    code: "MISSING_SIGNATURE",
                }),
                {
                    status: 401,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // Verify webhook signature
        const isValidSignature = await verifyWebhookSignature(
            body,
            webhookSignature,
            PHONEPE_SALT_KEY
        );
        if (!isValidSignature) {
            console.error("Invalid webhook signature from:", clientId);

            // Log potential security threat
            await supabase.from("payment_attempts").insert({
                order_id: null,
                response_data: {
                    security_threat: "invalid_webhook_signature",
                    client_ip: clientId,
                    user_agent: userAgent,
                    payload: body.substring(0, 200), // Log first 200 chars for investigation
                },
                status: "security_threat",
                payment_method: "phonepe",
                client_ip: clientId,
                user_agent: userAgent,
            });

            return new Response(
                JSON.stringify({
                    error: "Invalid webhook signature",
                    code: "INVALID_SIGNATURE",
                }),
                {
                    status: 401,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // Parse and validate webhook payload
        let webhookData;
        try {
            webhookData = JSON.parse(body);
        } catch (error) {
            console.error("Error parsing webhook JSON:", error);
            return new Response(
                JSON.stringify({
                    error: "Invalid webhook payload format",
                    code: "INVALID_PAYLOAD_FORMAT",
                }),
                {
                    status: 400,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // Validate webhook payload structure
        if (!validateWebhookPayload(webhookData)) {
            console.error("Invalid webhook payload structure from:", clientId);
            return new Response(
                JSON.stringify({
                    error: "Invalid webhook payload structure",
                    code: "INVALID_PAYLOAD_STRUCTURE",
                }),
                {
                    status: 400,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        console.log("PhonePe Webhook Data:", webhookData);

        // Decode the response from base64
        let paymentData;
        try {
            const decodedResponse = atob(webhookData.response);
            paymentData = JSON.parse(decodedResponse);
        } catch (error) {
            console.error("Error decoding webhook response:", error);
            return new Response(
                JSON.stringify({
                    error: "Invalid webhook payload encoding",
                    code: "INVALID_PAYLOAD_ENCODING",
                }),
                {
                    status: 400,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // Sanitize and validate transaction data
        const sanitizedPaymentData = sanitizeTransactionData(paymentData.data);

        const merchantTransactionId =
            sanitizedPaymentData.merchantTransactionId;
        if (!merchantTransactionId) {
            console.error("Missing merchant transaction ID in webhook");
            return new Response(
                JSON.stringify({
                    error: "Missing merchant transaction ID",
                    code: "MISSING_TRANSACTION_ID",
                }),
                {
                    status: 400,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // Find order by merchant transaction ID
        const { data: orderData, error: orderError } = await supabase
            .from("orders")
            .select("id, payment_status, status, total_amount")
            .eq("phonepe_merchant_txn_id", merchantTransactionId)
            .single();

        if (orderError || !orderData) {
            console.error(
                "Order not found for transaction:",
                merchantTransactionId
            );

            // Log orphaned webhook
            await supabase.from("payment_attempts").insert({
                order_id: null,
                response_data: {
                    orphaned_webhook: true,
                    merchant_transaction_id: merchantTransactionId,
                    payment_data: sanitizedPaymentData,
                },
                status: "orphaned_webhook",
                payment_method: "phonepe",
                client_ip: clientId,
                user_agent: userAgent,
            });

            return new Response(
                JSON.stringify({
                    error: "Order not found for this transaction",
                    code: "ORDER_NOT_FOUND",
                }),
                {
                    status: 404,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // Prevent duplicate webhook processing
        if (
            orderData.payment_status === "paid" &&
            sanitizedPaymentData.state === "COMPLETED"
        ) {
            console.log("Webhook already processed for order:", orderData.id);
            return new Response(
                JSON.stringify({
                    success: true,
                    message: "Webhook already processed",
                    orderId: orderData.id,
                }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const orderId = orderData.id;
        const paymentState = sanitizedPaymentData.state;

        let orderStatus = "pending";
        let paymentStatus = "pending";

        // Enhanced status mapping
        switch (paymentState) {
            case "COMPLETED":
                orderStatus = "confirmed";
                paymentStatus = "paid";
                break;
            case "FAILED":
                orderStatus = "cancelled";
                paymentStatus = "failed";
                break;
            case "PENDING":
                orderStatus = "pending";
                paymentStatus = "pending";
                break;
            case "CANCELLED":
                orderStatus = "cancelled";
                paymentStatus = "cancelled";
                break;
            default:
                orderStatus = "pending";
                paymentStatus = "pending";
        }

        // Update order with webhook data
        const { error: updateError } = await supabase
            .from("orders")
            .update({
                phonepe_txn_id: sanitizedPaymentData.transactionId,
                phonepe_response: paymentData,
                payment_status: paymentStatus,
                status: orderStatus,
                paid_at:
                    paymentState === "COMPLETED"
                        ? new Date().toISOString()
                        : null,
                updated_at: new Date().toISOString(),
            })
            .eq("id", orderId);

        if (updateError) {
            console.error("Error updating order from webhook:", updateError);
            return new Response(
                JSON.stringify({
                    error: "Failed to update order",
                    code: "ORDER_UPDATE_FAILED",
                }),
                {
                    status: 500,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // Log webhook processing
        await supabase.from("payment_attempts").insert({
            order_id: orderId,
            response_data: paymentData,
            status: `webhook_${paymentState?.toLowerCase() || "unknown"}`,
            payment_method: "phonepe",
            client_ip: clientId,
            user_agent: userAgent,
        });

        // If payment is successful, trigger order confirmation
        if (paymentState === "COMPLETED") {
            try {
                // Send order notification
                await supabase.functions.invoke("send-order-notification", {
                    body: { orderId: orderId },
                });
            } catch (notificationError) {
                console.error(
                    "Error sending order notification:",
                    notificationError
                );
                // Don't fail the webhook if notification fails
            }
        }

        return new Response(
            JSON.stringify({
                success: true,
                orderId: orderId,
                paymentStatus: paymentStatus,
                orderStatus: orderStatus,
                merchantTransactionId: merchantTransactionId,
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error in phonepe-webhook:", error);

        // Don't expose internal errors to client
        return new Response(
            JSON.stringify({
                error: "Webhook processing failed",
                code: "WEBHOOK_PROCESSING_FAILED",
            }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});
