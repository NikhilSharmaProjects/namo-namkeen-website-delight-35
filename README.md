# Namo Namkeen - Authentic Indore Flavors

A modern e-commerce website for Namo Namkeen, showcasing authentic Indore snacks and namkeen with a complete online ordering system.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with beautiful UI
- **Product Showcase**: Rich product catalog with detailed information
- **SEO Optimized**: Comprehensive SEO implementation
- **Push Notifications**: Firebase-powered real-time notifications
- **Admin Dashboard**: Complete admin panel for managing products, orders, and content
- **Blog System**: Built-in blog for content marketing
- **Cart & Checkout**: Full e-commerce functionality with PhonePe integration
- **User Authentication**: Secure user accounts with Auth0
- **Real-time Updates**: Live order tracking and notifications

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Supabase (Database, Auth, Edge Functions, Storage)
- **Notifications**: Firebase Cloud Messaging (FCM)
- **Payments**: PhonePe Payment Gateway
- **Authentication**: Auth0
- **Deployment**: Vercel

## 📋 Configuration

### Showcase Mode

The website can run in two modes:

#### 1. Showcase Mode (Current: `SHOWCASE_MODE = true`)
- **Purpose**: Display products without purchase functionality
- **Features**: 
  - Product browsing and information
  - Blog and content viewing
  - Contact forms and inquiries
  - Push notifications for updates
- **Hidden Elements**: 
  - Cart button and sidebar
  - Product prices and "Add to Cart" buttons
  - Checkout and payment flows
- **Use Case**: Perfect for showcasing products while setting up payment systems

#### 2. Full E-commerce Mode (`SHOWCASE_MODE = false`)
- **Purpose**: Complete online store functionality
- **Features**: 
  - All showcase features PLUS
  - Shopping cart and checkout
  - Payment processing with PhonePe
  - Order management and tracking
  - User order history
- **Use Case**: Ready for accepting online orders

### Switching Between Modes

To enable full e-commerce functionality:

1. Open `src/config/app.ts`
2. Change `SHOWCASE_MODE: true` to `SHOWCASE_MODE: false`
3. Ensure all payment integrations are configured
4. Test cart and checkout functionality

```typescript
// src/config/app.ts
export const appConfig = {
  SHOWCASE_MODE: false, // Set to false for full e-commerce
  // ... other config
};
```

## 🔔 Push Notifications Setup

The website uses Firebase Cloud Messaging for reliable push notifications.

### Firebase Configuration

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one
   - Enable Cloud Messaging

2. **Get Configuration Values**:
   - Project Settings → General → Your apps
   - Copy the config object values

3. **Set Environment Variables**:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   VITE_FIREBASE_VAPID_KEY=your_vapid_key
   ```

4. **Update Service Worker**:
   - Edit `public/firebase-messaging-sw.js`
   - Replace placeholder config with your actual values

5. **Generate VAPID Key**:
   - Go to Project Settings → Cloud Messaging
   - Generate Web Push certificates
   - Copy the VAPID key

### Testing Notifications

1. Enable notifications when prompted
2. Use the admin panel to send test notifications
3. Check browser dev tools for any errors

## 🏪 E-commerce Features

### Payment Integration (PhonePe)

The website integrates with PhonePe for payments:

- **Test Credentials**: Already configured for testing
- **Production**: Replace with live credentials when ready
- **Supported**: UPI, Cards, Net Banking, Wallets

### Order Management

- Real-time order tracking
- Admin notifications for new orders
- Customer notifications for order updates
- OTP verification for deliveries

### Inventory Management

- Stock tracking for multiple product sizes
- Automatic stock updates on orders
- Out-of-stock handling

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Set up environment variables**
4. **Configure Firebase** (for notifications)
5. **Run development server**: `npm run dev`

## 📱 Mobile Responsive

The entire website is optimized for mobile devices:
- Touch-friendly interface
- Mobile-optimized admin panel
- Progressive Web App (PWA) capabilities
- Fast loading on mobile networks

## 🔧 Development

- **Dev Mode**: Available in Lovable for code editing
- **Version Control**: Connect to GitHub for proper versioning
- **Deployment**: Automatic deployment via Vercel
- **Monitoring**: Built-in analytics and error tracking

## 🤝 Contributing

1. Enable Dev Mode in Lovable
2. Make changes via the editor
3. Test thoroughly in both showcase and e-commerce modes
4. Deploy via the Publish button

## 📞 Support

For technical support or customization requests, contact the development team through the admin panel or repository issues.

---

**Made with ❤️ for authentic Indore flavors**
