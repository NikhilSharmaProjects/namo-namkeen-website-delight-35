import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "@/pages/Blog";
import FAQ from "@/pages/FAQ";
import Products from "@/pages/Products";
import AboutUs from "@/pages/AboutUs";
import ContactPage from "@/pages/ContactPage";
import Auth from "@/pages/Auth";
import Checkout from "@/pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import PaymentStatus from "@/pages/PaymentStatus";
import MyOrders from "@/pages/MyOrders";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import TermsAndConditions from "@/pages/TermsAndConditions";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ShippingPolicy from "@/pages/ShippingPolicy";
import QualityPolicy from "@/pages/QualityPolicy";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "@/pages/Index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
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
                    <AdminAuthProvider>
                        <CartProvider>
                        <BrowserRouter>
                            <div className="min-h-screen bg-gradient-to-br from-cream via-white to-saffron/5">
                                <ScrollToTop />
                                <Breadcrumbs />
                                <Routes>
                                    <Route path="/" element={<Index />} />
                                    <Route path="/products" element={<Products />} />
                                    <Route path="/about" element={<AboutUs />} />
                                    <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
                                    <Route path="/faq" element={<FAQ />} />
                                    <Route path="/auth" element={<Auth />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                    <Route path="/order-success" element={<OrderSuccess />} />
                                    <Route path="/payment-status" element={<PaymentStatus />} />
                                    <Route path="/my-orders" element={<MyOrders />} />
                                    <Route path="/admin" element={<Admin />} />
                                    <Route path="/quality-policy" element={<QualityPolicy />} />
                                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                    <Route path="/shipping-policy" element={<ShippingPolicy />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </div>
                        </BrowserRouter>
                        </CartProvider>
                    </AdminAuthProvider>
                </AuthProvider>
            </Auth0Provider>
        </QueryClientProvider>
    );
}

export default App;
