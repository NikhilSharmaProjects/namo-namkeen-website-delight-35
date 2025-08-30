import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "./use-toast";

interface PaymentRequest {
    orderId: string;
    amount: number;
    customerInfo: {
        userId?: string;
        name: string;
        email: string;
        phone: string;
    };
}

interface PaymentResponse {
    success: boolean;
    redirectUrl?: string;
    merchantTransactionId?: string;
    orderId?: string;
    error?: string;
    code?: string;
}

interface PaymentVerification {
    success: boolean;
    paymentStatus: string;
    orderStatus: string;
    transactionId?: string;
    amount?: number;
    responseCode?: string;
    state?: string;
    orderId?: string;
    error?: string;
    code?: string;
}

export const usePhonePePayment = () => {
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const { user } = useAuth();

    // Validate phone number format
    const validatePhoneNumber = useCallback((phone: string): boolean => {
        const cleaned = phone.replace(/\D/g, "");
        return cleaned.length === 10 && /^[6-9]/.test(cleaned);
    }, []);

    // Validate email format
    const validateEmail = useCallback((email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }, []);

    // Validate amount
    const validateAmount = useCallback((amount: number): boolean => {
        return amount > 0 && amount <= 10000000; // Max 1 lakh in paise
    }, []);

    // Sanitize input data
    const sanitizeInput = useCallback(
        (data: any): PaymentRequest => {
            if (!data || typeof data !== "object") {
                throw new Error("Invalid payment data");
            }

            const { orderId, amount, customerInfo } = data;

            // Validate orderId
            if (
                !orderId ||
                typeof orderId !== "string" ||
                orderId.length < 10
            ) {
                throw new Error("Invalid order ID");
            }

            // Validate amount
            if (
                !amount ||
                typeof amount !== "number" ||
                !validateAmount(amount)
            ) {
                throw new Error("Invalid amount");
            }

            // Validate customer info
            if (!customerInfo || typeof customerInfo !== "object") {
                throw new Error("Customer information is required");
            }

            const { name, email, phone } = customerInfo;

            if (!name || typeof name !== "string" || name.trim().length < 2) {
                throw new Error("Valid customer name is required");
            }

            if (!email || typeof email !== "string" || !validateEmail(email)) {
                throw new Error("Valid email address is required");
            }

            if (
                !phone ||
                typeof phone !== "string" ||
                !validatePhoneNumber(phone)
            ) {
                throw new Error("Valid 10-digit phone number is required");
            }

            return {
                orderId,
                amount,
                customerInfo: {
                    userId: user?.id,
                    name: name.trim(),
                    email: email.trim().toLowerCase(),
                    phone: phone.replace(/\D/g, ""),
                },
            };
        },
        [user?.id, validateAmount, validateEmail, validatePhoneNumber]
    );

    // Initiate PhonePe payment
    const initiatePayment = useCallback(
        async (paymentData: any): Promise<PaymentResponse> => {
            try {
                setLoading(true);

                // Validate and sanitize input
                const validatedData = sanitizeInput(paymentData);

                // Additional security: Check if user is authenticated for large amounts
                if (validatedData.amount > 1000000 && !user?.id) {
                    // > ₹10,000
                    throw new Error(
                        "Authentication required for orders above ₹10,000"
                    );
                }

                // Call PhonePe initiate function
                const { data, error } = await supabase.functions.invoke(
                    "phonepe-initiate",
                    {
                        body: validatedData,
                    }
                );

                if (error) {
                    console.error("PhonePe initiation error:", error);
                    throw new Error(
                        error.message || "Failed to initiate payment"
                    );
                }

                if (!data || !data.success) {
                    throw new Error(data?.error || "Payment initiation failed");
                }

                return {
                    success: true,
                    redirectUrl: data.redirectUrl,
                    merchantTransactionId: data.merchantTransactionId,
                    orderId: data.orderId,
                };
            } catch (error: any) {
                console.error("Payment initiation error:", error);

                // Handle specific error codes
                let errorMessage = error.message || "Payment initiation failed";
                let errorCode = "UNKNOWN_ERROR";

                if (error.message?.includes("Rate limit")) {
                    errorMessage =
                        "Too many payment attempts. Please wait a moment and try again.";
                    errorCode = "RATE_LIMIT_EXCEEDED";
                } else if (error.message?.includes("Unauthorized")) {
                    errorMessage = "Unauthorized payment attempt.";
                    errorCode = "UNAUTHORIZED";
                } else if (error.message?.includes("Order not found")) {
                    errorMessage =
                        "Order not found. Please try placing the order again.";
                    errorCode = "ORDER_NOT_FOUND";
                } else if (error.message?.includes("already paid")) {
                    errorMessage = "This order has already been paid.";
                    errorCode = "ORDER_ALREADY_PAID";
                }

                return {
                    success: false,
                    error: errorMessage,
                    code: errorCode,
                };
            } finally {
                setLoading(false);
            }
        },
        [sanitizeInput, user?.id]
    );

    // Verify payment status
    const verifyPayment = useCallback(
        async (orderId: string): Promise<PaymentVerification> => {
            try {
                setVerifying(true);

                if (
                    !orderId ||
                    typeof orderId !== "string" ||
                    orderId.length < 10
                ) {
                    throw new Error("Invalid order ID");
                }

                const { data, error } = await supabase.functions.invoke(
                    "phonepe-verify",
                    {
                        body: { orderId },
                    }
                );

                if (error) {
                    console.error("Payment verification error:", error);
                    throw new Error(
                        error.message || "Failed to verify payment"
                    );
                }

                if (!data || !data.success) {
                    throw new Error(
                        data?.error || "Payment verification failed"
                    );
                }

                return {
                    success: true,
                    paymentStatus: data.paymentStatus,
                    orderStatus: data.orderStatus,
                    transactionId: data.transactionId,
                    amount: data.amount,
                    responseCode: data.responseCode,
                    state: data.state,
                    orderId: data.orderId,
                };
            } catch (error: any) {
                console.error("Payment verification error:", error);

                let errorMessage =
                    error.message || "Payment verification failed";
                let errorCode = "UNKNOWN_ERROR";

                if (error.message?.includes("Rate limit")) {
                    errorMessage =
                        "Too many verification attempts. Please wait a moment.";
                    errorCode = "RATE_LIMIT_EXCEEDED";
                } else if (error.message?.includes("Order not found")) {
                    errorMessage = "Order not found.";
                    errorCode = "ORDER_NOT_FOUND";
                }

                return {
                    success: false,
                    error: errorMessage,
                    code: errorCode,
                };
            } finally {
                setVerifying(false);
            }
        },
        []
    );

    // Retry payment verification with exponential backoff
    const retryVerification = useCallback(
        async (
            orderId: string,
            maxRetries: number = 5,
            baseDelay: number = 1000
        ): Promise<PaymentVerification> => {
            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    const result = await verifyPayment(orderId);

                    if (result.success && result.paymentStatus !== "pending") {
                        return result;
                    }

                    // If still pending and not the last attempt, wait before retrying
                    if (
                        attempt < maxRetries &&
                        result.paymentStatus === "pending"
                    ) {
                        const delay = Math.min(
                            baseDelay * Math.pow(2, attempt - 1),
                            10000
                        ); // Max 10s delay
                        await new Promise((resolve) =>
                            setTimeout(resolve, delay)
                        );
                    }
                } catch (error) {
                    console.error(
                        `Verification attempt ${attempt} failed:`,
                        error
                    );

                    if (attempt === maxRetries) {
                        throw error;
                    }
                }
            }

            // If all retries exhausted, return the last result
            return await verifyPayment(orderId);
        },
        [verifyPayment]
    );

    // Handle payment success
    const handlePaymentSuccess = useCallback(
        (verification: PaymentVerification) => {
            if (verification.paymentStatus === "paid") {
                toast({
                    title: "✅ Payment Successful!",
                    description: `Your payment has been confirmed. Order #${verification.orderId?.slice(
                        -8
                    )} is being processed.`,
                    duration: 5000,
                });
            } else if (verification.paymentStatus === "failed") {
                toast({
                    title: "❌ Payment Failed",
                    description:
                        "Your payment could not be processed. Please try again.",
                    variant: "destructive",
                });
            } else if (verification.paymentStatus === "pending") {
                toast({
                    title: "⏳ Payment Pending",
                    description:
                        "Your payment is still being processed. We will notify you once it's confirmed.",
                    duration: 7000,
                });
            }
        },
        []
    );

    return {
        loading,
        verifying,
        initiatePayment,
        verifyPayment,
        retryVerification,
        handlePaymentSuccess,
        validatePhoneNumber,
        validateEmail,
        validateAmount,
    };
};
