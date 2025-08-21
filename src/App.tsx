import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Products from "@/pages/Products";
import AboutUs from "@/pages/AboutUs";
import ContactPage from "@/pages/ContactPage";
import Auth from "@/pages/Auth";
import Checkout from "@/pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import MyOrders from "@/pages/MyOrders";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import TermsAndConditions from "@/pages/TermsAndConditions";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ShippingPolicy from "@/pages/ShippingPolicy";
import QualityPolicy from "@/pages/QualityPolicy";
import ScrollToTop from "@/components/ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Auth0Provider
                domain="dev-2gta6mlh7mluqmzi.us.auth0.com"
                clientId="RlXEpLw6aYaEL9QcGBGpx4PNTFk4omDH"
                authorizationParams={{
                    redirect_uri: `${window.location.origin}/auth`,
                }}
            >
                <AuthProvider>
                    <CartProvider>
                        <BrowserRouter>
                            <div className="min-h-screen bg-background font-sans antialiased">
                                <Routes>
                                    <Route path="/" element={<Index />} />
                                    <Route
                                        path="/products"
                                        element={<Products />}
                                    />
                                    <Route
                                        path="/about"
                                        element={<AboutUs />}
                                    />
                                    <Route
                                        path="/contact"
                                        element={<ContactPage />}
                                    />
                                    <Route path="/auth" element={<Auth />} />
                                    <Route
                                        path="/checkout"
                                        element={<Checkout />}
                                    />
                                    <Route
                                        path="/order-success"
                                        element={<OrderSuccess />}
                                    />
                                    <Route
                                        path="/my-orders"
                                        element={<MyOrders />}
                                    />
                                    <Route path="/admin" element={<Admin />} />
                                    <Route
                                        path="/quality-policy"
                                        element={<QualityPolicy />}
                                    />
                                    <Route
                                        path="/terms-and-conditions"
                                        element={<TermsAndConditions />}
                                    />
                                    <Route
                                        path="/policies"
                                        element={<PrivacyPolicy />}
                                    />
                                    <Route
                                        path="/shipping-policies"
                                        element={<ShippingPolicy />}
                                    />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                                <ScrollToTop />
                            </div>
                        </BrowserRouter>
                    </CartProvider>
                </AuthProvider>
            </Auth0Provider>
        </QueryClientProvider>
    );
}

export default App;
