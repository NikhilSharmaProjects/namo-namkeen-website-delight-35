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

// PhonePe API configuration with environment detection
const PHONEPE_ENVIRONMENT = Deno.env.get("PHONEPE_ENVIRONMENT") || "preprod";
const PHONEPE_BASE_URL =
    PHONEPE_ENVIRONMENT === "prod"
        ? Deno.env.get("PHONEPE_BASE_URL_PROD") ||
          "https://api.phonepe.com/apis/hermes"
        : Deno.env.get("PHONEPE_BASE_URL_PREPROD") ||
          "https://api-preprod.phonepe.com/apis/pg-sandbox";

const PHONEPE_MERCHANT_ID = Deno.env.get("PHONEPE_MERCHANT_ID");
const PHONEPE_SALT_KEY = Deno.env.get("PHONEPE_SALT_KEY");
const PHONEPE_SALT_INDEX = parseInt(Deno.env.get("PHONEPE_SALT_INDEX") || "1");

// Security configuration
const RATE_LIMIT_WINDOW_MS = parseInt(
    Deno.env.get("RATE_LIMIT_WINDOW_MS") || "900000"
); // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = parseInt(
    Deno.env.get("RATE_LIMIT_MAX_REQUESTS") || "50"
); // Lower limit for verification

if (!PHONEPE_MERCHANT_ID || !PHONEPE_SALT_KEY) {
    throw new Error("PhonePe credentials not configured");
}

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Input validation schemas
interface VerificationRequest {
    orderId?: string;
    merchantTransactionId?: string;
}

// Enhanced input validation
function validateVerificationRequest(data: any): VerificationRequest {
    if (!data || typeof data !== "object") {
        throw new Error("Invalid request data");
    }

    const { orderId, merchantTransactionId } = data;

    // At least one identifier must be provided
    if (!orderId && !merchantTransactionId) {
        throw new Error("Either orderId or merchantTransactionId is required");
    }

    // Validate orderId if provided
    if (orderId && (typeof orderId !== "string" || orderId.length < 10)) {
        throw new Error("Invalid order ID format");
    }

    // Validate merchantTransactionId if provided
    if (
        merchantTransactionId &&
        (typeof merchantTransactionId !== "string" ||
            !merchantTransactionId.startsWith("TXN_"))
    ) {
        throw new Error("Invalid merchant transaction ID format");
    }

    return { orderId, merchantTransactionId };
}

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

// Enhanced checksum generation with additional security
async function generateChecksum(
    endpoint: string,
    saltKey: string,
    saltIndex: number
): Promise<string> {
    try {
        const stringToHash = endpoint + saltKey;
        const encoder = new TextEncoder();
        const data = encoder.encode(stringToHash);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        return `${hashHex}###${saltIndex}`;
    } catch (error) {
        console.error("Error generating checksum:", error);
        throw new Error("Failed to generate verification checksum");
    }
}

// Sanitize and validate transaction ID
function sanitizeTransactionId(txnId: string): string {
    // Remove any potentially dangerous characters
    const sanitized = txnId.replace(/[^a-zA-Z0-9_-]/g, "");

    if (sanitized.length < 10 || sanitized.length > 100) {
        throw new Error("Invalid transaction ID length");
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
            return new Response(
                JSON.stringify({
                    error: "Rate limit exceeded. Please try again later.",
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

        // Validate request origin
        const origin = req.headers.get("origin");
        const allowedOrigins = Deno.env.get("ALLOWED_ORIGINS")?.split(",") || [
            "https://namoindianamkeen.com",
        ];

        if (origin && !allowedOrigins.includes(origin)) {
            console.warn("Unauthorized origin attempt:", origin);
            return new Response(
                JSON.stringify({
                    error: "Unauthorized origin",
                    code: "UNAUTHORIZED_ORIGIN",
                }),
                {
                    status: 403,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
        );

        // Parse and validate request body
        let requestData;
        try {
            requestData = await req.json();
        } catch (error) {
            return new Response(
                JSON.stringify({
                    error: "Invalid JSON payload",
                    code: "INVALID_JSON",
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

        // Validate input data
        const validatedData = validateVerificationRequest(requestData);

        // If only orderId is provided, get merchantTransactionId from database
        let txnId = validatedData.merchantTransactionId;
        let orderId = validatedData.orderId;

        if (!txnId && orderId) {
            const { data: orderData, error: orderCheckError } = await supabase
                .from("orders")
                .select("id, phonepe_merchant_txn_id, payment_status, user_id")
                .eq("id", orderId)
                .single();

            if (orderCheckError || !orderData) {
                return new Response(
                    JSON.stringify({
                        error: "Order not found",
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

            if (!orderData.phonepe_merchant_txn_id) {
                return new Response(
                    JSON.stringify({
                        error: "No PhonePe transaction found for this order",
                        code: "NO_TRANSACTION_FOUND",
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

            txnId = orderData.phonepe_merchant_txn_id;
            orderId = orderData.id;
        }

        // Sanitize transaction ID
        const sanitizedTxnId = sanitizeTransactionId(txnId!);

        // Create checksum for status check
        const endpoint = `/pg/v1/status/${PHONEPE_MERCHANT_ID}/${sanitizedTxnId}`;
        const checksum = await generateChecksum(
            endpoint,
            PHONEPE_SALT_KEY,
            PHONEPE_SALT_INDEX
        );

        // Log verification attempt
        const { error: logError } = await supabase
            .from("payment_attempts")
            .insert({
                order_id: orderId,
                response_code: 200,
                response_data: {
                    verification_request: { txnId: sanitizedTxnId, orderId },
                },
                status: "verification_attempted",
                payment_method: "phonepe",
                client_ip: clientId,
                user_agent: req.headers.get("user-agent") || "unknown",
            });

        if (logError) {
            console.error("Error logging verification attempt:", logError);
        }

        // Call PhonePe status API with enhanced error handling
        const phonePeResponse = await fetch(`${PHONEPE_BASE_URL}${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
                "X-MERCHANT-ID": PHONEPE_MERCHANT_ID,
            },
        });

        if (!phonePeResponse.ok) {
            const errorText = await phonePeResponse.text();
            console.error(
                "PhonePe Status API error:",
                phonePeResponse.status,
                errorText
            );

            // Log failed verification
            await supabase.from("payment_attempts").insert({
                order_id: orderId,
                response_code: phonePeResponse.status,
                response_data: { error: errorText, endpoint },
                status: "verification_failed",
                payment_method: "phonepe",
                client_ip: clientId,
            });

            return new Response(
                JSON.stringify({
                    error: "Payment verification temporarily unavailable",
                    code: "VERIFICATION_FAILED",
                }),
                {
                    status: 502,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const responseData = await phonePeResponse.json();
        console.log("PhonePe Status Response:", responseData);

        // Log verification response
        await supabase.from("payment_attempts").insert({
            order_id: orderId,
            response_code: phonePeResponse.status,
            response_data: responseData,
            status: "verification_completed",
            payment_method: "phonepe",
            client_ip: clientId,
        });

        if (responseData.success && responseData.data) {
            const paymentData = responseData.data;
            const paymentState = paymentData.state;

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

            // Update order with payment verification results
            const { error: updateError } = await supabase
                .from("orders")
                .update({
                    phonepe_txn_id: paymentData.transactionId,
                    phonepe_response: responseData,
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
                console.error("Error updating order:", updateError);
                return new Response(
                    JSON.stringify({
                        error: "Failed to update order status",
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

            // If payment is successful, trigger order confirmation
            if (paymentState === "COMPLETED" && orderId) {
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
                    // Don't fail the payment verification if notification fails
                }
            }

            return new Response(
                JSON.stringify({
                    success: true,
                    paymentStatus: paymentStatus,
                    orderStatus: orderStatus,
                    transactionId: paymentData.transactionId,
                    amount: paymentData.amount,
                    responseCode: paymentData.responseCode,
                    state: paymentState,
                    orderId: orderId,
                }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        } else {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Invalid response from PhonePe",
                    code: "INVALID_RESPONSE",
                    details: responseData,
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
    } catch (error) {
        console.error("Error in phonepe-verify:", error);

        // Don't expose internal errors to client
        const errorMessage =
            error instanceof Error ? error.message : "Internal server error";
        const errorCode =
            error instanceof Error && error.message.includes("Invalid")
                ? "VALIDATION_ERROR"
                : "INTERNAL_ERROR";

        return new Response(
            JSON.stringify({
                error:
                    errorCode === "VALIDATION_ERROR"
                        ? errorMessage
                        : "Payment verification failed",
                code: errorCode,
            }),
            {
                status: errorCode === "VALIDATION_ERROR" ? 400 : 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});
