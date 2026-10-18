import React, { useState } from 'react';
import { X, MessageCircle, Copy, Check, ExternalLink, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function WhatsAppPreviewModal() {
  const {
    items,
    isWhatsAppPreviewOpen,
    setIsWhatsAppPreviewOpen,
    generateWhatsAppMessage,
    openWhatsAppDirect,
    formatPrice,
    grandTotal
  } = useCart();

  const [phoneNumber, setPhoneNumber] = useState('233501234567');
  const [customerNote, setCustomerNote] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isWhatsAppPreviewOpen) return null;

  const formattedMessage = generateWhatsAppMessage(customerNote);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    openWhatsAppDirect(phoneNumber.replace(/[^0-9]/g, ''), customerNote);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A2540]/50 backdrop-blur-[2px] transition-opacity"
        onClick={() => setIsWhatsAppPreviewOpen(false)}
      />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-white rounded-2xl hairline-border border-[#E6EBF1] chromatic-shadow overflow-hidden">
          
          {/* Header */}
          <div className="bg-[#059669] text-white p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold leading-tight">
                  WhatsApp Direct Order Generator
                </h3>
                <p className="text-xs text-white/80">
                  Converts active cart to structured, pre-filled WhatsApp invoice
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsWhatsAppPreviewOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 space-y-4">
            
            {/* Phone Number & Customer Note Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#425466] uppercase tracking-wider mb-1">
                  Store / Recipient Phone
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-[#8F9CA8] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="233501234567"
                    className="w-full pl-8 pr-3 py-2 text-xs font-mono bg-[#F8FAFC] hairline-border border-[#E6EBF1] rounded-lg focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <span className="text-[10px] text-[#8F9CA8] mt-0.5 block">
                  You can edit this to test sending to your own WhatsApp.
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#425466] uppercase tracking-wider mb-1">
                  Optional Delivery Note
                </label>
                <input
                  type="text"
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="e.g. Ring doorbell, deliver after 3 PM"
                  className="w-full px-3 py-2 text-xs bg-[#F8FAFC] hairline-border border-[#E6EBF1] rounded-lg focus:outline-none focus:border-[#059669]"
                />
              </div>
            </div>

            {/* Live Chat Bubble Preview */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#0A2540]">
                  Pre-Formatted Payload Preview
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs font-medium text-[#059669] hover:underline"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Raw Payload</span>
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp Simulated Message Container */}
              <div className="p-4 rounded-xl bg-[#EFEAE2] hairline-border border-[#E6EBF1] max-h-56 overflow-y-auto">
                <div className="max-w-[92%] ml-auto bg-[#D9FDD3] text-[#111B21] p-3 rounded-lg rounded-tr-none shadow-sm text-xs font-mono whitespace-pre-wrap leading-relaxed select-all">
                  {formattedMessage}
                  <div className="text-[10px] text-right text-[#667781] mt-1 font-sans">
                    Now • Sent from AURA D2C Store
                  </div>
                </div>
              </div>
            </div>

            {/* Value Proposition Note */}
            <div className="p-3 bg-[#F8FAFC] rounded-lg hairline-border border-[#E6EBF1] text-xs text-[#425466] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Why WhatsApp Direct?</strong> Reduces checkout drop-offs by up to 64% in emerging & high-touch markets by bypassing complicated 12-field card forms.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={handleSend}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs sm:text-sm transition-colors shadow-sm active:scale-[0.99]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch in WhatsApp App / Web</span>
              </button>

              <button
                onClick={handleCopy}
                className="px-4 py-3 rounded-lg hairline-border border-[#E6EBF1] bg-white hover:bg-[#F8FAFC] text-xs font-bold text-[#0A2540] transition-colors"
              >
                {copied ? 'Copied ✓' : 'Copy Message'}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
