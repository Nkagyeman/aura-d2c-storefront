import React from 'react';
import { MessageCircle, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Footer() {
  const { setIsWhatsAppPreviewOpen } = useCart();

  return (
    <footer className="bg-white border-t border-[#E6EBF1] pt-12 pb-24 text-xs text-[#627D98]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#E6EBF1]">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#0A2540] flex items-center justify-center text-white font-bold text-sm tracking-widest">
                A
              </div>
              <span className="font-bold text-base tracking-tight text-[#0A2540]">
                AURA Tech & Lifestyle
              </span>
            </div>
            <p className="text-xs text-[#425466] max-w-[45ch] leading-relaxed">
              Precision acoustic hardware, CNC-milled aluminum desk architecture, and high-performance EDC engineered for zero distraction and maximum craft integrity.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setIsWhatsAppPreviewOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hairline-border border-emerald-200 font-semibold hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant WhatsApp Concierge</span>
              </button>
            </div>
          </div>

          {/* Catalog Columns */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="font-bold text-[#0A2540] uppercase tracking-wider text-[11px]">Hardware</h4>
            <ul className="space-y-1.5">
              <li><a href="#catalog-section" className="hover:text-[#0A2540]">Studio Pro ANC</a></li>
              <li><a href="#catalog-section" className="hover:text-[#0A2540]">MagBase 3-in-1 Dock</a></li>
              <li><a href="#catalog-section" className="hover:text-[#0A2540]">Forge-65 Keyboard</a></li>
              <li><a href="#catalog-section" className="hover:text-[#0A2540]">Volt-140W GaN Hub</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-2">
            <h4 className="font-bold text-[#0A2540] uppercase tracking-wider text-[11px]">Commerce Rails</h4>
            <ul className="space-y-1.5">
              <li><span className="text-[#425466]">WhatsApp Direct Invoicing</span></li>
              <li><span className="text-[#425466]">Mobile Money (MTN / MoMo)</span></li>
              <li><span className="text-[#425466]">PCI-DSS Visa / Mastercard</span></li>
              <li><span className="text-[#425466]">Express Air Cargo Transit</span></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="font-bold text-[#0A2540] uppercase tracking-wider text-[11px]">Upwork Portfolio Showcase</h4>
            <p className="text-[#627D98] text-[11px] leading-relaxed">
              This showcase demonstrates production-ready D2C e-commerce frontend architecture with zero external checkout redirects, sub-second reactivity, and localized checkout rails.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Conversion-Optimized Codebase</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p className="text-[#8F9CA8]">
            © {new Date().getFullYear()} AURA Tech & Lifestyle. All hardware specifications verified.
          </p>
          <div className="flex items-center gap-4 text-[#8F9CA8]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Direct Sale</span>
            <span>•</span>
            <span>256-Bit TLS Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
