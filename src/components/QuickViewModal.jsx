import React, { useState } from 'react';
import { X, Star, ShoppingBag, MessageCircle, Check, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    recentlyAddedId,
    formatPrice,
    openWhatsAppDirect
  } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentVariant = selectedVariant || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');
  const isAdded = recentlyAddedId === product.id;

  const handleAdd = () => {
    addToCart(product, quantity, currentVariant);
  };

  const handleWhatsApp = () => {
    addToCart(product, quantity, currentVariant);
    openWhatsAppDirect('233501234567', `Direct Quick Buy: ${quantity}x ${product.name} (${currentVariant})`);
  };

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A2540]/50 backdrop-blur-[2px] transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl hairline-border border-[#E6EBF1] chromatic-shadow overflow-hidden">
          
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#627D98] hover:text-[#0A2540] hairline-border border-[#E6EBF1] shadow-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Gallery Left (5 cols) */}
            <div className="md:col-span-5 bg-[#F8FAFC] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E6EBF1]">
              <div className="aspect-square rounded-xl overflow-hidden bg-white hairline-border border-[#E6EBF1] relative">
                <img
                  src={galleryImages[activeImageIndex] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 mt-4">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden hairline-border bg-white transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#0A2540] ring-2 ring-[#0A2540]/20'
                          : 'border-[#E6EBF1] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-[#E6EBF1] text-xs text-[#627D98] flex items-center justify-between">
                <span>SKU: {product.sku}</span>
                <span className="font-semibold text-emerald-700">In Stock ({product.stock} units)</span>
              </div>
            </div>

            {/* Details Right (7 cols) */}
            <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F1F5F9] text-[#0A2540]">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#627D98]">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-[#0A2540]">{product.rating}</span>
                    <span>({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#0A2540] tracking-tight leading-snug">
                  {product.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#425466] mt-2 leading-relaxed">
                  {product.tagline}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2.5 mt-4 pb-4 border-b border-[#E6EBF1]">
                  <span className="text-2xl font-bold font-mono text-[#0A2540] price">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice > product.price && (
                    <span className="text-sm text-[#8F9CA8] line-through font-mono">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Direct Factory Pricing
                  </span>
                </div>

                {/* Technical Specifications */}
                {product.specs && (
                  <div className="my-4 space-y-1.5 text-xs">
                    <span className="text-[11px] font-bold text-[#627D98] uppercase tracking-wider block mb-1">
                      Technical Specifications
                    </span>
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between py-1 border-b border-[#F1F5F9] text-[#425466]">
                        <span className="text-[#627D98]">{spec.label}</span>
                        <span className="font-semibold text-[#0A2540] font-mono">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Color Selector */}
                {product.colors && (
                  <div className="mt-3">
                    <span className="text-[11px] font-bold text-[#627D98] uppercase tracking-wider block mb-1.5">
                      Finish: <strong className="text-[#0A2540]">{currentVariant}</strong>
                    </span>
                    <div className="flex items-center gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedVariant(color.name)}
                          className={`w-6 h-6 rounded-full border transition-all ${
                            currentVariant === color.name
                              ? 'ring-2 ring-[#0A2540] scale-110'
                              : 'opacity-70 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity & Action Buttons */}
              <div className="pt-4 border-t border-[#E6EBF1] space-y-2">
                <div className="flex gap-2">
                  <div className="flex items-center hairline-border border-[#E6EBF1] rounded-lg bg-[#F8FAFC]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-2 text-xs font-bold text-[#425466] hover:bg-[#F1F5F9]"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs font-bold font-mono text-[#0A2540]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-2 text-xs font-bold text-[#425466] hover:bg-[#F1F5F9]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold text-white transition-all duration-micro ${
                      isAdded
                        ? 'bg-emerald-600'
                        : 'bg-[#0A2540] hover:bg-[#0A2540]/90 active:scale-[0.98]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added to Cart ✓</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add {quantity} to Cart</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant Order on WhatsApp</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
