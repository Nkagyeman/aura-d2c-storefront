import React, { useState } from 'react';
import { Sparkles, ShoppingBag, MessageCircle, CreditCard, Info, X, Check, Code, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ClientDemoBar() {
  const {
    loadSampleCart,
    clearCart,
    setIsWhatsAppPreviewOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
    totalItemCount
  } = useCart();

  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [copiedNote, setCopiedNote] = useState(false);

  return (
    <>
      {/* Fixed Bottom Showcase Toolbar for Prospective Clients */}
      <aside aria-label="Portfolio Demonstration Toolbar" className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 max-w-2xl w-[94%] bg-[#0A2540]/95 backdrop-blur-md text-white px-3 sm:px-4 py-2.5 rounded-xl hairline-border border-white/20 chromatic-shadow flex items-center justify-between gap-2 shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse hidden sm:block" />
          <span className="text-[11px] font-bold tracking-tight text-white/90">
            Client Demo Toolbar
          </span>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={loadSampleCart}
            className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white"
            title="Populate cart with 3 sample hardware items"
          >
            Load Sample
          </button>

          <button
            onClick={() => setIsWhatsAppPreviewOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md bg-emerald-600 hover:bg-emerald-500 transition-colors text-white"
            title="Inspect generated WhatsApp invoice payload"
          >
            <MessageCircle className="w-3 h-3" />
            <span className="hidden sm:inline">WhatsApp Invoice</span>
            <span className="sm:hidden">WhatsApp</span>
          </button>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md bg-white hover:bg-white/90 transition-colors text-[#0A2540]"
            title="Open Mobile Money / Card Checkout Simulation"
          >
            <CreditCard className="w-3 h-3" />
            <span className="hidden sm:inline">Checkout Modal</span>
            <span className="sm:hidden">Pay</span>
          </button>

          <button
            onClick={() => setIsNotesOpen(true)}
            className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="View Conversion & Architecture Notes"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Conversion Architecture Insights Modal */}
      {isNotesOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-[#0A2540]/60 backdrop-blur-[2px] transition-opacity"
            onClick={() => setIsNotesOpen(false)}
          />

          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white rounded-2xl hairline-border border-[#E6EBF1] chromatic-shadow overflow-hidden text-[#1D1D1F]">
              
              <div className="bg-[#0A2540] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold">Conversion Architecture Insights</h3>
                </div>
                <button
                  onClick={() => setIsNotesOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-3.5 text-xs">
                <div className="p-3 rounded-lg bg-[#FAFCFE] hairline-border border-[#E6EBF1]">
                  <h4 className="font-bold text-[#0A2540] mb-0.5">1. WhatsApp Direct Order Generator</h4>
                  <p className="text-[#627D98] leading-relaxed">
                    Designed for cross-border African, Latin American, and Southeast Asian commerce where 60%+ of D2C orders happen through WhatsApp. Generates structured plain-text receipts with dynamic links.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#FAFCFE] hairline-border border-[#E6EBF1]">
                  <h4 className="font-bold text-[#0A2540] mb-0.5">2. Asymmetrical Bento Grid (No AI Monoculture)</h4>
                  <p className="text-[#627D98] leading-relaxed">
                    Rejects generic equal-width 3-column layouts. The 58% dominant anchor cell highlights key planar driver specifications and provides an in-situ color customizer.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#FAFCFE] hairline-border border-[#E6EBF1]">
                  <h4 className="font-bold text-[#0A2540] mb-0.5">3. Zero-Hop Slideout Drawer with Free Shipping Meter</h4>
                  <p className="text-[#627D98] leading-relaxed">
                    Reduces friction by avoiding full cart page redirects. Progressively nudges customers toward the $100 free delivery threshold with real-time numeric calculations.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#FAFCFE] hairline-border border-[#E6EBF1]">
                  <h4 className="font-bold text-[#0A2540] mb-0.5">4. Dual Payment Rails (MoMo & Card)</h4>
                  <p className="text-[#627D98] leading-relaxed">
                    Combines modern instant mobile money push prompts (MTN, Telecel, M-Pesa) with standard PCI-DSS card inputs and realistic multi-stage state transitions.
                  </p>
                </div>

                <button
                  onClick={() => setIsNotesOpen(false)}
                  className="w-full py-2.5 bg-[#0A2540] text-white font-bold rounded-lg hover:bg-[#0A2540]/90 transition-colors"
                >
                  Close & Explore Store
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
