import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, CreditCard, ShieldCheck, Tag, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function SlideoverCart() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    loadSampleCart,
    subtotal,
    freeShippingThreshold,
    isFreeShipping,
    shippingFee,
    discountAmount,
    appliedPromo,
    promoError,
    applyPromo,
    removePromo,
    estimatedTax,
    grandTotal,
    formatPrice,
    setIsCheckoutOpen,
    setIsWhatsAppPreviewOpen
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyPromo(couponInput)) {
      setCouponInput('');
    }
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A2540]/40 backdrop-blur-[2px] transition-opacity duration-150"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white hairline-border border-l border-[#E6EBF1] shadow-2xl flex flex-col justify-between">
          
          {/* 1. Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#E6EBF1] flex items-center justify-between bg-[#FAFCFE]">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-[#0A2540] text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-[#0A2540] tracking-tight">
                Your Direct Order
              </h2>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#E6EBF1] text-[#0A2540]">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-md text-[#627D98] hover:text-[#0A2540] hover:bg-[#F1F5F9] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Free Express Shipping Bar */}
          <div className="bg-[#F8FAFC] px-4 py-3 border-b border-[#E6EBF1]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              {isFreeShipping ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Free Express Delivery Unlocked!</span>
                </span>
              ) : (
                <span className="text-[#425466]">
                  Add <strong className="text-[#0A2540] font-mono">{formatPrice(remainingForFreeShipping)}</strong> more for Free Express Delivery
                </span>
              )}
              <span className="text-[11px] font-mono text-[#627D98]">
                {Math.round(freeShippingPercentage)}%
              </span>
            </div>
            
            <div className="w-full bg-[#E6EBF1] rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isFreeShipping ? 'bg-emerald-500' : 'bg-[#0A2540]'
                }`}
                style={{ width: `${freeShippingPercentage}%` }}
              />
            </div>
          </div>

          {/* 3. Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#8F9CA8] mb-3">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#0A2540]">Your cart is currently empty</h3>
                <p className="text-xs text-[#627D98] max-w-[32ch] mt-1 mb-6">
                  Add items from the hardware catalog to test checkout & WhatsApp order formatting.
                </p>
                <button
                  onClick={loadSampleCart}
                  className="px-4 py-2.5 rounded-lg bg-[#0A2540] text-white text-xs font-bold hover:bg-[#0A2540]/90 transition-colors shadow-sm"
                >
                  Load Sample Order (3 items)
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}-${item.variant}`}
                  className="flex gap-3.5 p-3 rounded-lg bg-[#FAFCFE] hairline-border border-[#E6EBF1]"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover hairline-border border-[#E6EBF1] bg-white flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-[#0A2540] truncate leading-tight">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-[#627D98]">
                          Finish: <strong className="text-[#425466]">{item.variant}</strong>
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.variant)}
                        className="text-[#8F9CA8] hover:text-red-600 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#E6EBF1]/70">
                      {/* Quantity Controls */}
                      <div className="flex items-center hairline-border border-[#E6EBF1] rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, -1)}
                          className="p-1 hover:bg-[#F1F5F9] text-[#425466] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold font-mono text-[#0A2540]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, 1)}
                          className="p-1 hover:bg-[#F1F5F9] text-[#425466] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-bold font-mono text-[#0A2540]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 4. Drawer Footer: Voucher, Financial Summary & Dual Actions */}
          {items.length > 0 && (
            <div className="border-t border-[#E6EBF1] p-4 sm:p-5 bg-white space-y-3">
              
              {/* Promo Code Input */}
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2 rounded bg-emerald-50 text-emerald-800 text-xs hairline-border border-emerald-200">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{appliedPromo.code}</strong> applied ({appliedPromo.label})</span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-xs font-semibold text-emerald-900 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. AURA10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-[#F8FAFC] hairline-border border-[#E6EBF1] rounded-md focus:outline-none focus:border-[#0A2540] uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E6EBF1] text-[#0A2540] font-bold text-xs rounded-md transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
              )}

              {/* Order Summary Calculations */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-[#E6EBF1]">
                <div className="flex justify-between text-[#627D98]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#0A2540] font-semibold">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#627D98]">
                  <span>Express Delivery (2-Day)</span>
                  <span className="font-mono text-[#0A2540] font-semibold">
                    {shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-[#627D98]">
                  <span>Estimated Tax (5%)</span>
                  <span className="font-mono text-[#0A2540] font-semibold">{formatPrice(estimatedTax)}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-[#0A2540] pt-2 border-t border-[#E6EBF1]">
                  <span>Total Payable</span>
                  <span className="font-mono text-base font-extrabold price">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* DUAL CHECKOUT ACTION BUTTONS */}
              <div className="space-y-2 pt-2">
                {/* 1. Order via WhatsApp (Emerald button) */}
                <button
                  id="checkout-whatsapp-btn"
                  onClick={() => setIsWhatsAppPreviewOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs sm:text-sm transition-all duration-micro shadow-sm active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order via WhatsApp (1-Click Invoice)</span>
                </button>

                {/* 2. Instant Mobile Money / Card Checkout */}
                <button
                  id="checkout-direct-btn"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#0A2540] hover:bg-[#0A2540]/90 text-white font-bold text-xs sm:text-sm transition-all duration-micro shadow-sm active:scale-[0.99]"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Instant Mobile / Card Checkout</span>
                </button>
              </div>

              {/* Trust Footer */}
              <div className="flex items-center justify-center gap-2 pt-2 text-[10px] text-[#8F9CA8]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted • Dispatch in 2h</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
