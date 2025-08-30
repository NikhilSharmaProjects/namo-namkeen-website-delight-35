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
    Deno.env.get("RATE_LIMIT_MAX_REQUESTS") || "100"
);

if (!PHONEPE_MERCHANT_ID || !PHONEPE_SALT_KEY) {
    throw new Error("PhonePe credentials not configured");
}

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Input validation schemas
interface CustomerInfo {
    userId?: string;
    name: string;
    email: string;
    phone: string;
}

interface PaymentRequest {
    orderId: string;
    amount: number;
    customerInfo: CustomerInfo;
}

// Enhanced input validation
function validatePaymentRequest(data: any): PaymentRequest {
    if (!data || typeof data !== "object") {
        throw new Error("Invalid request data");
    }

    const { orderId, amount, customerInfo } = data;

    // Validate orderId
    if (!orderId || typeof orderId !== "string" || orderId.length < 10) {
        throw new Error("Invalid order ID");
    }

    // Validate amount (must be positive and reasonable)
    if (
        !amount ||
        typeof amount !== "number" ||
        amount <= 0 ||
        amount > 10000000
    ) {
        throw new Error("Invalid amount (must be between 1 and 100,000)");
    }

    // Validate customer info
    if (!customerInfo || typeof customerInfo !== "object") {
        throw new Error("Customer information is required");
    }

    const { name, email, phone } = customerInfo;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
        throw new Error("Valid customer name is required");
    }

    if (
        !email ||
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        throw new Error("Valid email address is required");
    }

    if (!phone || typeof phone !== "string" || !/^[6-9]\d{9}$/.test(phone)) {
        throw new Error("Valid 10-digit phone number is required");
    }

    return { orderId, amount, customerInfo };
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
    payload: string,
    saltKey: string,
    saltIndex: number
): Promise<string> {
    try {
        const stringToHash = payload + "/pg/v1/pay" + saltKey;
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
        throw new Error("Failed to generate payment checksum");
    }
}

// Sanitize and validate phone number
function sanitizePhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, "");

    // Ensure it's exactly 10 digits starting with 6-9
    if (cleaned.length === 10 && /^[6-9]/.test(cleaned)) {
        return cleaned;
    }

    throw new Error("Invalid phone number format");
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
        const validatedData = validatePaymentRequest(requestData);

        // Additional security: Check if order already exists and belongs to user
        const { data: existingOrder, error: orderCheckError } = await supabase
            .from("orders")
            .select("id, user_id, payment_status, phonepe_merchant_txn_id")
            .eq("id", validatedData.orderId)
            .single();

        if (orderCheckError || !existingOrder) {
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

        // Prevent duplicate payment attempts
        if (existingOrder.payment_status === "paid") {
            return new Response(
                JSON.stringify({
                    error: "Order already paid",
                    code: "ORDER_ALREADY_PAID",
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

        if (existingOrder.phonepe_merchant_txn_id) {
            return new Response(
                JSON.stringify({
                    error: "Payment already initiated for this order",
                    code: "PAYMENT_ALREADY_INITIATED",
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

        // Sanitize phone number
        const sanitizedPhone = sanitizePhoneNumber(
            validatedData.customerInfo.phone
        );

        // Generate unique merchant transaction ID with additional entropy
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const merchantTransactionId = `TXN_${validatedData.orderId.slice(
            -8
        )}_${timestamp}_${randomSuffix}`;

        // Create PhonePe payment payload with enhanced security
        const paymentPayload = {
            merchantId: PHONEPE_MERCHANT_ID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId:
                validatedData.customerInfo.userId || `GUEST_${timestamp}`,
            amount: validatedData.amount,
            redirectUrl: `${
                origin || "https://namoindianamkeen.com"
            }/payment-status?orderId=${validatedData.orderId}`,
            redirectMode: "POST",
            callbackUrl: `${
                origin || "https://namoindianamkeen.com"
            }/api/phonepe/webhook`,
            mobileNumber: sanitizedPhone,
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };

        // Convert payload to base64
        const base64Payload = btoa(JSON.stringify(paymentPayload));

        // Generate checksum
        const checksum = await generateChecksum(
            base64Payload,
            PHONEPE_SALT_KEY,
            PHONEPE_SALT_INDEX
        );

        // Log payment attempt with enhanced security
        const { error: logError } = await supabase
            .from("payment_attempts")
            .insert({
                order_id: validatedData.orderId,
                payload: paymentPayload,
                status: "initiated",
                payment_method: "phonepe",
                client_ip: clientId,
                user_agent: req.headers.get("user-agent") || "unknown",
            });

        if (logError) {
            console.error("Error logging payment attempt:", logError);
        }

        // Call PhonePe API with enhanced error handling
        const phonePeResponse = await fetch(`${PHONEPE_BASE_URL}/pg/v1/pay`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
                "X-MERCHANT-ID": PHONEPE_MERCHANT_ID,
            },
            body: JSON.stringify({
                request: base64Payload,
            }),
        });

        if (!phonePeResponse.ok) {
            const errorText = await phonePeResponse.text();
            console.error(
                "PhonePe API error:",
                phonePeResponse.status,
                errorText
            );

            // Log failed attempt
            await supabase.from("payment_attempts").insert({
                order_id: validatedData.orderId,
                response_code: phonePeResponse.status,
                response_data: { error: errorText },
                status: "api_error",
                payment_method: "phonepe",
                client_ip: clientId,
            });

            return new Response(
                JSON.stringify({
                    error: "Payment gateway temporarily unavailable",
                    code: "GATEWAY_ERROR",
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
        console.log("PhonePe API Response:", responseData);

        // Update payment attempt with response
        await supabase.from("payment_attempts").insert({
            order_id: validatedData.orderId,
            response_code: phonePeResponse.status,
            response_data: responseData,
            status: responseData.success ? "redirect_ready" : "failed",
            payment_method: "phonepe",
            client_ip: clientId,
        });

        if (
            responseData.success &&
            responseData.data?.instrumentResponse?.redirectInfo?.url
        ) {
            // Update order with PhonePe transaction details
            const { error: updateError } = await supabase
                .from("orders")
                .update({
                    phonepe_merchant_txn_id: merchantTransactionId,
                    payment_method: "phonepe",
                    payment_status: "pending",
                    updated_at: new Date().toISOString(),
                })
                .eq("id", validatedData.orderId);

            if (updateError) {
                console.error("Error updating order:", updateError);
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

            return new Response(
                JSON.stringify({
                    success: true,
                    redirectUrl:
                        responseData.data.instrumentResponse.redirectInfo.url,
                    merchantTransactionId: merchantTransactionId,
                    orderId: validatedData.orderId,
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
                    error: "Failed to initiate PhonePe payment",
                    code: "PAYMENT_INITIATION_FAILED",
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
        console.error("Error in phonepe-initiate:", error);

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
                        : "Payment initiation failed",
                code: errorCode,
            }),
            {
                status: errorCode === "VALIDATION_ERROR" ? 400 : 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});
