import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Check, ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function HeroBanner() {
  const heroProduct = PRODUCTS[0]; // Aura Studio Pro ANC
  const { addToCart, recentlyAddedId, formatPrice, openWhatsAppDirect, setQuickViewProduct } = useCart();
  const [selectedColor, setSelectedColor] = useState(heroProduct.colors[0].name);

  const isAdded = recentlyAddedId === heroProduct.id;

  const handleWhatsAppBuy = () => {
    addToCart(heroProduct, 1, selectedColor);
    openWhatsAppDirect('233501234567', `Direct Quick Buy: 1x ${heroProduct.name} (${selectedColor})`);
  };

  return (
    <section className="relative bg-white hairline-border border-b border-[#E6EBF1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Direct Value Hook & Concrete Spec */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Direct Solid Headline - NO floating pills above headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] tracking-[-0.03em] leading-[1.08] mb-4">
              Aura Studio Pro ANC — Planar Magnetic Acoustic Architecture
            </h1>

            {/* Concrete Copy - Passes Competitor Swap Test */}
            <p className="text-base sm:text-lg text-[#425466] leading-relaxed max-w-[62ch] mb-6">
              Engineered with 40mm micro-planar magnetic transducers and dual hybrid noise neutralization. Anodized 6063 aluminum chassis delivers 54 hours of continuous lossless fidelity over ultra-low 0.02ms LE Audio.
            </p>

            {/* Price & Variant Bar */}
            <div className="flex flex-wrap items-center gap-6 py-4 hairline-border border-y border-[#E6EBF1] mb-6 bg-[#FAFCFE] px-4 rounded-lg">
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#627D98]">
                  Direct Pricing
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] font-mono price">
                    {formatPrice(heroProduct.price)}
                  </span>
                  <span className="text-sm text-[#8F9CA8] line-through font-mono">
                    {formatPrice(heroProduct.comparePrice)}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 hairline-border border-emerald-200">
                    Save {Math.round(((heroProduct.comparePrice - heroProduct.price) / heroProduct.comparePrice) * 100)}%
                  </span>
                </div>
              </div>

              <div className="h-8 w-px bg-[#E6EBF1] hidden sm:block" />

              {/* Color Finish Picker */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#627D98] mb-1.5">
                  Chassis Finish: <span className="text-[#0A2540] font-medium">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {heroProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-micro ${
                        selectedColor === color.name
                          ? 'border-[#0A2540] ring-2 ring-[#0A2540]/20 scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Select ${color.name} finish`}
                    />
                  ))}
                </div>
              </div>

              <div className="h-8 w-px bg-[#E6EBF1] hidden sm:block" />

              {/* Stock Status */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#627D98]">
                  Fulfillment Status
                </span>
                <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Ships in 2 Hours (7 remaining)</span>
                </div>
              </div>
            </div>

            {/* Direct Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
              <button
                onClick={() => addToCart(heroProduct, 1, selectedColor)}
                className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-white transition-all duration-micro shadow-sm ${
                  isAdded
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-[#0A2540] hover:bg-[#0A2540]/90 active:scale-[0.99]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                    <span>Added to Cart ✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart — {formatPrice(heroProduct.price)}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppBuy}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold bg-[#059669] hover:bg-[#047857] text-white transition-all duration-micro shadow-sm active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quick Buy via WhatsApp</span>
              </button>

              <button
                onClick={() => setQuickViewProduct(heroProduct)}
                className="px-4 py-3.5 rounded-lg text-xs font-semibold text-[#425466] hover:text-[#0A2540] hover:bg-[#F1F5F9] transition-colors hairline-border border-[#E6EBF1] text-center"
              >
                Inspect Specs
              </button>
            </div>

            {/* Concrete Specs Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E6EBF1]">
              <div className="text-left">
                <span className="block text-xs font-bold text-[#0A2540] font-mono">54h Battery</span>
                <span className="text-[11px] text-[#627D98]">With Hybrid ANC active</span>
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-[#0A2540] font-mono">0.02ms LE Audio</span>
                <span className="text-[11px] text-[#627D98]">Zero gaming/audio latency</span>
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-[#0A2540] font-mono">40mm Planar</span>
                <span className="text-[11px] text-[#627D98]">Micro-etched transducers</span>
              </div>
            </div>

          </div>

          {/* Right Column: Crisp Product Image Display with Clean Shadow */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl hairline-border border-[#E6EBF1] bg-[#F8FAFC] p-4 sm:p-6 chromatic-shadow">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white hairline-border border-[#E6EBF1] flex items-center justify-center">
                <img
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                  loading="eager"
                />
                
                {/* Minimalist Floating Specs Overlay in Card Corner */}
                <div className="absolute top-3 left-3 bg-[#0A2540]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[11px] font-mono font-bold tracking-tight">
                  SKU: {heroProduct.sku}
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 hairline-border border-[#E6EBF1] px-2.5 py-1 rounded text-[11px] font-bold text-[#0A2540] shadow-sm">
                  ★ 4.9 (148 verified reviews)
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {heroProduct.gallery.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuickViewProduct(heroProduct)}
                    className="aspect-video rounded hairline-border border-[#E6EBF1] overflow-hidden bg-white hover:opacity-90 transition-opacity"
                  >
                    <img src={thumb} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
