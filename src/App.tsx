import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Products from '@/pages/Products';
import AboutUs from '@/pages/AboutUs';
import ContactPage from '@/pages/ContactPage';
import Auth from '@/pages/Auth';
import Checkout from '@/pages/Checkout';
import OrderSuccess from '@/pages/OrderSuccess';
import MyOrders from '@/pages/MyOrders';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import ScrollToTop from '@/components/ScrollToTop';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <QueryClient>
      <QueryClientProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollToTop />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </QueryClient>
  );
}

export default App;
