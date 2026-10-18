import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ProductCatalog from './components/ProductCatalog';
import TrustStrip from './components/TrustStrip';
import SlideoverCart from './components/SlideoverCart';
import WhatsAppPreviewModal from './components/WhatsAppPreviewModal';
import DirectCheckoutModal from './components/DirectCheckoutModal';
import QuickViewModal from './components/QuickViewModal';
import ClientDemoBar from './components/ClientDemoBar';
import Footer from './components/Footer';

function StorefrontContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFE] text-[#1D1D1F]">
      {/* 1. Promo & Sticky Header with Search, Category Filter, and Dynamic Cart */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main className="flex-1">
        {/* 2. Hero Promotion Banner (Anchor Flagship) */}
        <HeroBanner />

        {/* 3. Trust & Reassurance Pillars Strip */}
        <TrustStrip />

        {/* 4. Filterable Hardware Catalog Grid (Asymmetrical Bento Grid) */}
        <ProductCatalog
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </main>

      {/* 5. Minimalist Apple/Stripe-Grade Footer */}
      <Footer />

      {/* 6. Slide-Out Slideover Cart Drawer */}
      <SlideoverCart />

      {/* 7. Functional WhatsApp Direct Order Generator Preview Modal */}
      <WhatsAppPreviewModal />

      {/* 8. Mobile Money / Card Direct Checkout Modal with 2s Authentic Simulation */}
      <DirectCheckoutModal />

      {/* 9. Product Quick View Specifications Modal */}
      <QuickViewModal />

      {/* 10. Portfolio Demonstration & Conversion Architecture Bar for Clients */}
      <ClientDemoBar />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StorefrontContent />
    </CartProvider>
  );
}
