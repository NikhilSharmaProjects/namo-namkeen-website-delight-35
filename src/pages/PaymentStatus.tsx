import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { usePhonePePayment } from "@/hooks/usePhonePePayment";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
    Loader2,
    CheckCircle,
    XCircle,
    Clock,
    RefreshCw,
    Home,
    Package,
    AlertTriangle,
    Shield,
} from "lucide-react";

interface PaymentStatusData {
    success: boolean;
    paymentStatus: string;
    orderStatus: string;
    transactionId?: string;
    amount?: number;
    responseCode?: string;
    state?: string;
    error?: string;
    code?: string;
}

const PaymentStatus = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.get("orderId");

    const [loading, setLoading] = useState(true);
    const [paymentData, setPaymentData] = useState<PaymentStatusData | null>(
        null
    );
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const [retryCount, setRetryCount] = useState(0);
    const [maxRetries] = useState(5);

    const {
        verifying,
        verifyPayment,
        retryVerification,
        handlePaymentSuccess,
    } = usePhonePePayment();

    const formatPrice = (price: number) => `₹${(price / 100).toFixed(2)}`;

    const fetchOrderDetails = async (orderIdParam: string) => {
        try {
            const { data, error } = await supabase
                .from("orders")
                .select(
                    `
          *,
          order_items(
            *,
            product:products(name, image_url)
          )
        `
                )
                .eq("id", orderIdParam)
                .single();

            if (error) throw error;
            setOrderDetails(data);
        } catch (error) {
            console.error("Error fetching order details:", error);
            toast({
                title: "Error",
                description: "Failed to fetch order details. Please try again.",
                variant: "destructive",
            });
        }
    };

    const verifyPaymentStatus = async (
        orderIdParam: string,
        attempt: number = 1
    ) => {
        try {
            setLoading(true);

            const result = await verifyPayment(orderIdParam);

            if (result.success) {
                setPaymentData({
                    success: true,
                    paymentStatus: result.paymentStatus,
                    orderStatus: result.orderStatus,
                    transactionId: result.transactionId,
                    amount: result.amount,
                    responseCode: result.responseCode,
                    state: result.state,
                    orderId: result.orderId,
                });

                // Show appropriate toast based on payment status
                handlePaymentSuccess(result);

                // If payment is still pending and we haven't exceeded max retries, retry after delay
                if (
                    result.paymentStatus === "pending" &&
                    attempt < maxRetries
                ) {
                    const delay = Math.min(
                        1000 * Math.pow(2, attempt - 1),
                        10000
                    ); // Exponential backoff, max 10s
                    setTimeout(() => {
                        setRetryCount(attempt);
                        verifyPaymentStatus(orderIdParam, attempt + 1);
                    }, delay);
                    return;
                }
            } else {
                setPaymentData({
                    success: false,
                    paymentStatus: "unknown",
                    orderStatus: "unknown",
                    error: result.error,
                    code: result.code,
                });

                toast({
                    title: "Verification Error",
                    description:
                        result.error ||
                        "Unable to verify payment status. Please contact support.",
                    variant: "destructive",
                });
            }

            setLoading(false);
        } catch (error: any) {
            console.error("Error verifying payment:", error);
            setLoading(false);

            setPaymentData({
                success: false,
                paymentStatus: "unknown",
                orderStatus: "unknown",
                error: error.message || "Verification failed",
                code: "VERIFICATION_ERROR",
            });

            toast({
                title: "Verification Error",
                description:
                    error.message ||
                    "Unable to verify payment status. Please contact support.",
                variant: "destructive",
            });
        }
    };

    const handleRetryVerification = async () => {
        if (orderId) {
            setRetryCount(0);
            await verifyPaymentStatus(orderId);
        }
    };

    const handleAdvancedVerification = async () => {
        if (orderId) {
            try {
                setLoading(true);
                const result = await retryVerification(
                    orderId,
                    maxRetries,
                    2000
                );

                if (result.success) {
                    setPaymentData({
                        success: true,
                        paymentStatus: result.paymentStatus,
                        orderStatus: result.orderStatus,
                        transactionId: result.transactionId,
                        amount: result.amount,
                        responseCode: result.responseCode,
                        state: result.state,
                        orderId: result.orderId,
                    });

                    handlePaymentSuccess(result);
                } else {
                    setPaymentData({
                        success: false,
                        paymentStatus: "unknown",
                        orderStatus: "unknown",
                        error: result.error,
                        code: result.code,
                    });
                }
            } catch (error: any) {
                console.error("Advanced verification failed:", error);
                toast({
                    title: "Verification Failed",
                    description:
                        "Unable to verify payment after multiple attempts. Please contact support.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (!orderId) {
            toast({
                title: "Invalid Request",
                description: "No order ID found. Redirecting to home.",
                variant: "destructive",
            });
            navigate("/");
            return;
        }

        // Validate order ID format
        if (orderId.length < 10) {
            toast({
                title: "Invalid Order ID",
                description: "Order ID format is invalid. Redirecting to home.",
                variant: "destructive",
            });
            navigate("/");
            return;
        }

        // Fetch order details
        fetchOrderDetails(orderId);

        // Start payment verification
        verifyPaymentStatus(orderId);
    }, [orderId, navigate]);

    if (!orderId) {
        return null;
    }

    const getStatusIcon = () => {
        if (loading || verifying) {
            return <Loader2 className="h-8 w-8 animate-spin text-blue-500" />;
        }

        switch (paymentData?.paymentStatus) {
            case "paid":
                return <CheckCircle className="h-8 w-8 text-green-500" />;
            case "failed":
                return <XCircle className="h-8 w-8 text-red-500" />;
            case "cancelled":
                return <XCircle className="h-8 w-8 text-orange-500" />;
            default:
                return <Clock className="h-8 w-8 text-yellow-500" />;
        }
    };

    const getStatusTitle = () => {
        if (loading) return "Verifying Payment...";
        if (verifying)
            return `Checking Payment Status... (${retryCount}/${maxRetries})`;

        switch (paymentData?.paymentStatus) {
            case "paid":
                return "Payment Successful! 🎉";
            case "failed":
                return "Payment Failed";
            case "cancelled":
                return "Payment Cancelled";
            case "pending":
                return "Payment Pending";
            default:
                return "Payment Status Unknown";
        }
    };

    const getStatusDescription = () => {
        if (loading || verifying) {
            return "Please wait while we verify your payment with PhonePe...";
        }

        switch (paymentData?.paymentStatus) {
            case "paid":
                return "Your payment has been successfully processed and your order is confirmed!";
            case "failed":
                return "We could not process your payment. Please try placing the order again.";
            case "cancelled":
                return "Your payment was cancelled. You can try placing the order again.";
            case "pending":
                return "Your payment is being processed. We will notify you once it's confirmed.";
            default:
                return "Unable to determine payment status. Please contact our support team.";
        }
    };

    const getStatusColor = () => {
        switch (paymentData?.paymentStatus) {
            case "paid":
                return "text-green-600";
            case "failed":
                return "text-red-600";
            case "cancelled":
                return "text-orange-600";
            case "pending":
                return "text-yellow-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-white py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <Card className="shadow-xl">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            {getStatusIcon()}
                        </div>
                        <CardTitle
                            className={`text-2xl font-bold ${getStatusColor()}`}
                        >
                            {getStatusTitle()}
                        </CardTitle>
                        <p className="text-muted-foreground mt-2">
                            {getStatusDescription()}
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Order Details */}
                        {orderDetails && (
                            <>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2">
                                        Order Details
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Order ID:</span>
                                            <span className="font-mono">
                                                #{orderId.slice(-8)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Total Amount:</span>
                                            <span className="font-semibold">
                                                {formatPrice(
                                                    orderDetails.total_amount
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Payment Method:</span>
                                            <Badge variant="outline">
                                                PhonePe
                                            </Badge>
                                        </div>
                                        {paymentData?.transactionId && (
                                            <div className="flex justify-between">
                                                <span>Transaction ID:</span>
                                                <span className="font-mono text-xs">
                                                    {paymentData.transactionId}
                                                </span>
                                            </div>
                                        )}
                                        {paymentData?.code && (
                                            <div className="flex justify-between">
                                                <span>Status Code:</span>
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs"
                                                >
                                                    {paymentData.code}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Order Items */}
                                {orderDetails.order_items &&
                                    orderDetails.order_items.length > 0 && (
                                        <>
                                            <Separator />
                                            <div>
                                                <h3 className="font-semibold mb-3">
                                                    Items Ordered
                                                </h3>
                                                <div className="space-y-2">
                                                    {orderDetails.order_items.map(
                                                        (
                                                            item: any,
                                                            index: number
                                                        ) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                                            >
                                                                <img
                                                                    src={
                                                                        item
                                                                            .product
                                                                            ?.image_url
                                                                    }
                                                                    alt={
                                                                        item.product_name
                                                                    }
                                                                    className="w-12 h-12 object-cover rounded"
                                                                />
                                                                <div className="flex-1">
                                                                    <h4 className="font-medium text-sm">
                                                                        {
                                                                            item.product_name
                                                                        }
                                                                    </h4>
                                                                    <p className="text-xs text-gray-600">
                                                                        Size:{" "}
                                                                        {
                                                                            item.size
                                                                        }
                                                                    </p>
                                                                    <p className="text-xs text-gray-600">
                                                                        Qty:{" "}
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <p className="font-semibold text-sm">
                                                                    {formatPrice(
                                                                        item.price *
                                                                            item.quantity
                                                                    )}
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                            </>
                        )}

                        <Separator />

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            {paymentData?.paymentStatus === "paid" && (
                                <div className="space-y-3">
                                    <Button
                                        onClick={() => navigate("/my-orders")}
                                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                                    >
                                        <Package className="h-4 w-4 mr-2" />
                                        View My Orders
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => navigate("/products")}
                                        className="w-full"
                                    >
                                        Continue Shopping
                                    </Button>
                                </div>
                            )}

                            {paymentData?.paymentStatus === "failed" && (
                                <div className="space-y-3">
                                    <Button
                                        onClick={() => navigate("/checkout")}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                                    >
                                        Try Payment Again
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => navigate("/")}
                                        className="w-full"
                                    >
                                        <Home className="h-4 w-4 mr-2" />
                                        Go Home
                                    </Button>
                                </div>
                            )}

                            {paymentData?.paymentStatus === "pending" && (
                                <div className="space-y-3">
                                    <Button
                                        onClick={handleRetryVerification}
                                        disabled={verifying}
                                        variant="outline"
                                        className="w-full"
                                    >
                                        <RefreshCw
                                            className={`h-4 w-4 mr-2 ${
                                                verifying ? "animate-spin" : ""
                                            }`}
                                        />
                                        Check Status Again
                                    </Button>
                                    <Button
                                        onClick={handleAdvancedVerification}
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                                    >
                                        <Shield className="h-4 w-4 mr-2" />
                                        Advanced Verification
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => navigate("/")}
                                        className="w-full"
                                    >
                                        <Home className="h-4 w-4 mr-2" />
                                        Go Home
                                    </Button>
                                </div>
                            )}

                            {!paymentData && !loading && (
                                <div className="space-y-3">
                                    <Button
                                        onClick={handleRetryVerification}
                                        disabled={verifying}
                                        className="w-full"
                                    >
                                        <RefreshCw
                                            className={`h-4 w-4 mr-2 ${
                                                verifying ? "animate-spin" : ""
                                            }`}
                                        />
                                        Retry Verification
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => navigate("/")}
                                        className="w-full"
                                    >
                                        <Home className="h-4 w-4 mr-2" />
                                        Go Home
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Security Information */}
                        <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700">
                            <div className="flex items-center gap-2 mb-2">
                                <Shield className="h-4 w-4" />
                                <span className="font-medium">
                                    Payment Security
                                </span>
                            </div>
                            <p>
                                • All payments are processed securely through
                                PhonePe
                            </p>
                            <p>• Bank-grade encryption protects your data</p>
                            <p>
                                • No payment information is stored on our
                                servers
                            </p>
                            <p>
                                • Real-time verification ensures payment
                                accuracy
                            </p>
                        </div>

                        {/* Support Message */}
                        <div className="bg-green-50 p-4 rounded-lg text-sm text-green-700 text-center">
                            <p>
                                Need help? Contact us at{" "}
                                <strong>
                                    namoindifoodindustries@gmail.com
                                </strong>
                            </p>
                            <p>
                                or call <strong>+91-XXXXXXXXXX</strong>
                            </p>
                            <p className="text-xs mt-2">
                                Reference Order: #{orderId.slice(-8)}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PaymentStatus;
