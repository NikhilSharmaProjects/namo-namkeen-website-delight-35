import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { usePhonePePayment } from "@/hooks/usePhonePePayment";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
    Truck,
    CreditCard,
    Banknote,
    Lock,
    Shield,
    AlertTriangle,
} from "lucide-react";

const Checkout = () => {
    const { items, totalAmount, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        loading: paymentLoading,
        initiatePayment,
        validatePhoneNumber,
        validateEmail,
    } = usePhonePePayment();

    const [formData, setFormData] = useState({
        fullName: user?.user_metadata?.full_name || "",
        email: user?.email || "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        paymentMethod: "cod",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const formatPrice = (price: number) => `₹${(price / 100).toFixed(2)}`;
    const deliveryFee = totalAmount >= 50000 ? 0 : 5000;
    const finalTotal = totalAmount + deliveryFee;

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    // Enhanced form validation
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Validate full name
        if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
            newErrors.fullName = "Full name must be at least 2 characters long";
        }

        // Validate email
        if (!formData.email || !validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Validate phone
        if (!formData.phone || !validatePhoneNumber(formData.phone)) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        // Validate address
        if (!formData.address.trim() || formData.address.trim().length < 10) {
            newErrors.address =
                "Please enter a complete address (at least 10 characters)";
        }

        // Validate city
        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }

        // Validate state
        if (!formData.state.trim()) {
            newErrors.state = "State is required";
        }

        // Validate pincode
        if (!formData.pincode || !/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = "Please enter a valid 6-digit pincode";
        }

        // Additional validation for PhonePe payments
        if (formData.paymentMethod === "phonepe") {
            // For large amounts, require authentication
            if (finalTotal > 1000000 && !user?.id) {
                // > ₹10,000
                newErrors.paymentMethod =
                    "Authentication required for orders above ₹10,000. Please login or use COD.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) {
            toast({
                title: "Error",
                description: "Your cart is empty",
                variant: "destructive",
            });
            return;
        }

        // Validate form before submission
        if (!validateForm()) {
            toast({
                title: "Validation Error",
                description: "Please fix the errors in the form",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            const orderData = {
                user_id: user?.id || null,
                total_amount: finalTotal,
                status: "pending",
                shipping_address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
                phone: formData.phone,
                payment_method: formData.paymentMethod,
                payment_status: "pending",
                delivery_otp_required: false,
                delivery_otp_verified: false,
            };

            console.log("Submitting enhanced order:", orderData);

            const { data: order, error: orderError } = await supabase
                .from("orders")
                .insert(orderData)
                .select()
                .single();

            if (orderError) {
                console.error("Order DB error", orderError);
                toast({
                    title: "Order Error",
                    description: orderError.message,
                    variant: "destructive",
                });
                return;
            }

            // Create order items
            const orderItems = items.map((item) => ({
                order_id: order.id,
                product_id: item.product_id,
                product_name: item.product.name,
                size: item.size,
                quantity: item.quantity,
                price:
                    item.size === "250g"
                        ? item.product.price_250g
                        : item.size === "500g"
                        ? item.product.price_500g
                        : item.product.price_1kg,
            }));

            const { error: itemsError } = await supabase
                .from("order_items")
                .insert(orderItems);

            if (itemsError) {
                toast({
                    title: "Problem creating order items",
                    description: itemsError.message,
                    variant: "destructive",
                });
                console.error("Order items error", itemsError);
                return;
            }

            // Handle PhonePe payment with enhanced security
            if (formData.paymentMethod === "phonepe") {
                try {
                    const paymentResponse = await initiatePayment({
                        orderId: order.id,
                        amount: finalTotal,
                        customerInfo: {
                            userId: user?.id,
                            name: formData.fullName,
                            email: formData.email,
                            phone: formData.phone,
                        },
                    });

                    if (
                        paymentResponse.success &&
                        paymentResponse.redirectUrl
                    ) {
                        await clearCart();
                        toast({
                            title: "Redirecting to PhonePe",
                            description:
                                "Please complete your payment securely",
                            duration: 3000,
                        });

                        // Redirect to PhonePe
                        window.location.href = paymentResponse.redirectUrl;
                        return;
                    } else {
                        throw new Error(
                            paymentResponse.error ||
                                "Failed to initiate PhonePe payment"
                        );
                    }
                } catch (phonePeError: any) {
                    console.error("PhonePe payment error:", phonePeError);
                    toast({
                        title: "Payment Error",
                        description:
                            phonePeError.message ||
                            "Failed to initiate PhonePe payment. Please try again.",
                        variant: "destructive",
                    });
                    return;
                }
            }

            // For COD and other payment methods
            if (formData.paymentMethod === "cod") {
                // Send enhanced notifications for COD
                try {
                    await supabase.functions.invoke(
                        "enhanced-order-notification",
                        {
                            body: {
                                type: "new_order",
                                orderId: order.id,
                                customerName: formData.fullName,
                                customerPhone: formData.phone,
                                total: finalTotal,
                                items: orderItems,
                            },
                        }
                    );
                } catch (notificationError) {
                    console.error(
                        "Failed to send enhanced admin notification:",
                        notificationError
                    );
                }

                await clearCart();
                toast({
                    title: "✅ Order Placed Successfully!",
                    description: `Order #${order.id.slice(
                        -8
                    )} confirmed. You'll receive notifications for updates!`,
                    duration: 5000,
                });

                navigate("/order-success", {
                    state: {
                        orderId: order.id,
                        orderNumber: order.id.slice(-8),
                        total: finalTotal,
                    },
                });
            }
        } catch (error: any) {
            console.error("Order creation error:", error);
            toast({
                title: "Order Failed",
                description:
                    error.message || "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-white flex items-center justify-center">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="pt-6">
                        <h2 className="text-xl font-bold text-warmBrown mb-4">
                            Your cart is empty
                        </h2>
                        <Button
                            onClick={() => navigate("/products")}
                            className="bg-saffron hover:bg-saffron/90"
                        >
                            Continue Shopping
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-white py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-8 text-center">
                    Secure Checkout
                </h1>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Order Form */}
                    <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-yellow-900">
                                <Truck className="h-5 w-5 text-yellow-700" />
                                Delivery Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="fullName">
                                            Full Name *
                                        </Label>
                                        <Input
                                            id="fullName"
                                            value={formData.fullName}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "fullName",
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                errors.fullName
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                            required
                                        />
                                        {errors.fullName && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                <AlertTriangle className="h-3 w-3" />
                                                {errors.fullName}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">
                                            Phone Number *
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "phone",
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                errors.phone
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                            placeholder="10-digit number"
                                            required
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                <AlertTriangle className="h-3 w-3" />
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="email">
                                        Email Address *
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        className={
                                            errors.email ? "border-red-500" : ""
                                        }
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <AlertTriangle className="h-3 w-3" />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="address">
                                        Complete Address *
                                    </Label>
                                    <Input
                                        id="address"
                                        value={formData.address}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "address",
                                                e.target.value
                                            )
                                        }
                                        placeholder="House no, Street, Area"
                                        className={
                                            errors.address
                                                ? "border-red-500"
                                                : ""
                                        }
                                        required
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <AlertTriangle className="h-3 w-3" />
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                <div className="grid sm:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="city">City *</Label>
                                        <Input
                                            id="city"
                                            value={formData.city}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "city",
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                errors.city
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                            required
                                        />
                                        {errors.city && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                <AlertTriangle className="h-3 w-3" />
                                                {errors.city}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="state">State *</Label>
                                        <Input
                                            id="state"
                                            value={formData.state}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "state",
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                errors.state
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                            required
                                        />
                                        {errors.state && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                <AlertTriangle className="h-3 w-3" />
                                                {errors.state}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="pincode">
                                            PIN Code *
                                        </Label>
                                        <Input
                                            id="pincode"
                                            value={formData.pincode}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "pincode",
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                errors.pincode
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                            placeholder="6 digits"
                                            required
                                        />
                                        {errors.pincode && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                <AlertTriangle className="h-3 w-3" />
                                                {errors.pincode}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <Label className="text-base font-semibold flex items-center gap-2 mb-3">
                                        <CreditCard className="h-4 w-4" />
                                        Payment Method
                                    </Label>
                                    <Select
                                        value={formData.paymentMethod}
                                        onValueChange={(value) =>
                                            handleInputChange(
                                                "paymentMethod",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            className={
                                                errors.paymentMethod
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cod">
                                                <div className="flex items-center gap-2">
                                                    <Banknote className="h-4 w-4" />
                                                    Cash on Delivery
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="phonepe">
                                                <div className="flex items-center gap-2">
                                                    <CreditCard className="h-4 w-4" />
                                                    PhonePe Payment
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.paymentMethod && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <AlertTriangle className="h-3 w-3" />
                                            {errors.paymentMethod}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading || paymentLoading}
                                    className="w-full bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90 text-white font-semibold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
                                >
                                    {loading || paymentLoading
                                        ? "Processing Order..."
                                        : "Place Order Securely"}
                                    <Shield className="h-4 w-4 ml-2" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Order Summary */}
                    <Card className="h-fit bg-gradient-to-tr from-yellow-100 via-yellow-50 to-white shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-yellow-900">
                                Order Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Order Items */}
                            <div className="space-y-3">
                                {items.map((item, index) => {
                                    const price =
                                        item.size === "250g"
                                            ? item.product.price_250g
                                            : item.size === "500g"
                                            ? item.product.price_500g
                                            : item.product.price_1kg;

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                        >
                                            <img
                                                src={item.product.image_url}
                                                alt={item.product.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm">
                                                    {item.product.name}
                                                </h4>
                                                <p className="text-xs text-gray-600">
                                                    Size: {item.size}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="font-semibold">
                                                {formatPrice(
                                                    price * item.quantity
                                                )}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <Separator />

                            {/* Price Breakdown */}
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>{formatPrice(totalAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery:</span>
                                    <span
                                        className={
                                            deliveryFee === 0
                                                ? "text-green-600"
                                                : ""
                                        }
                                    >
                                        {deliveryFee === 0
                                            ? "FREE"
                                            : formatPrice(deliveryFee)}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span className="text-chili">
                                        {formatPrice(finalTotal)}
                                    </span>
                                </div>
                            </div>

                            {/* Enhanced Security & Features */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-yellow-900 bg-yellow-50 p-3 rounded-lg">
                                    <Lock className="h-4 w-4 text-yellow-700" />
                                    <span>
                                        256-bit SSL encryption & secure
                                        processing
                                    </span>
                                </div>

                                <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                                    <p className="font-medium flex items-center gap-2">
                                        <Shield className="h-4 w-4" />
                                        🚚 Smart Delivery System
                                    </p>
                                    <p>• Real-time order tracking</p>
                                    <p>• OTP verification for delivery</p>
                                    <p>
                                        • Expected delivery: 2-4 business days
                                    </p>
                                    <p>• Free delivery on orders above ₹500</p>
                                </div>

                                <div className="bg-green-50 p-3 rounded-lg text-sm text-green-700">
                                    <p className="font-medium">
                                        📱 You'll receive notifications for:
                                    </p>
                                    <p>• Order confirmation</p>
                                    <p>• Order shipped with OTP</p>
                                    <p>• Delivery completion</p>
                                </div>

                                {/* Payment Method Specific Info */}
                                {formData.paymentMethod === "phonepe" && (
                                    <div className="bg-purple-50 p-3 rounded-lg text-sm text-purple-700">
                                        <p className="font-medium">
                                            💳 PhonePe Payment Security:
                                        </p>
                                        <p>• Bank-grade encryption</p>
                                        <p>• PCI DSS compliant</p>
                                        <p>• Instant payment confirmation</p>
                                        <p>• Secure redirect to PhonePe</p>
                                    </div>
                                )}

                                {formData.paymentMethod === "cod" && (
                                    <div className="bg-orange-50 p-3 rounded-lg text-sm text-orange-700">
                                        <p className="font-medium">
                                            💵 Cash on Delivery:
                                        </p>
                                        <p>• Pay when you receive</p>
                                        <p>• No online payment required</p>
                                        <p>• Secure cash handling</p>
                                        <p>• Receipt provided on delivery</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
