# Dinesh Electrical - E-Commerce Platform

A production-ready e-commerce platform for electrical products built with Next.js, Tailwind CSS, and modern best practices.

## 🚀 Features

### Frontend
- **Mobile-First Design** - Optimized for all devices
- **Product Catalog** - Advanced filtering, sorting, search
- **Shopping Cart** - Persistent cart with quantity management
- **Wishlist** - Save favorite products
- **Checkout** - Multi-step checkout with payment options
- **User Dashboard** - Order history, addresses, profile

### Admin Panel
- **Dashboard** - Sales analytics, stats, charts
- **Order Management** - View, update order status
- **Product Management** - Add, edit, delete products
- **Store Settings** - Business info, pricing, shipping

### Technical
- **PWA Support** - Installable, offline-capable
- **SEO Optimized** - Meta tags, structured data
- **Performance** - Lazy loading, code splitting
- **Responsive** - Works on all screen sizes

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Dinesh Electrical

# Database (optional - for future use)
DATABASE_URL=your_mongodb_url

# Payment (optional - for future use)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Auth (optional - for future use)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## 📁 Project Structure

```
dinesh-electricals/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── products/          # Products page
│   ├── product/[slug]/    # Product detail
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   ├── wishlist/          # Wishlist page
│   ├── admin/             # Admin panel
│   └── contact/           # Contact page
├── components/             # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CartSidebar.tsx
│   └── ProductCard.tsx
├── lib/                    # Utilities & data
│   ├── store.ts           # Zustand stores
│   ├── data.ts            # Mock data
│   └── utils.ts           # Helper functions
├── public/                 # Static assets
│   └── manifest.json      # PWA manifest
└── package.json
```

## 🔐 Payment Methods (Demo)

- UPI (GPay, PhonePe, Paytm)
- Debit/Credit Cards
- Cash on Delivery

## 📞 Support

For support, email contact@dineshelectricals.com or call +91 98765 43210

## 📄 License

MIT License - Feel free to use this project for learning and development.