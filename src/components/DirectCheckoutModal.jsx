import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CreditCard, Smartphone, Check, ArrowRight, Loader2, Package, Sparkles, Download, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';

export default function DirectCheckoutModal() {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    grandTotal,
    formatPrice,
    subtotal,
    shippingFee,
    discountAmount,
    appliedPromo,
    estimatedTax
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('momo'); // 'momo' | 'card'
  
  // Mobile Money Form Fields
  const [carrier, setCarrier] = useState('MTN');
  const [momoNumber, setMomoNumber] = useState('024 123 4567');
  const [customerName, setCustomerName] = useState('Alex Vance');
  const [deliveryAddress, setDeliveryAddress] = useState('44 Independence Avenue, Suite 400');
  const [city, setCity] = useState('Accra');

  // Card Form Fields
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Checkout Stages: 'form' | 'processing' | 'success'
  const [stage, setStage] = useState('form');
  const [processingStep, setProcessingStep] = useState(1);
  const [orderRef, setOrderRef] = useState('');

  if (!isCheckoutOpen) return null;

  const handleStartCheckout = (e) => {
    e.preventDefault();
    setStage('processing');
    setProcessingStep(1);

    // Step 1: Handshake
    setTimeout(() => {
      setProcessingStep(2);
    }, 800);

    // Step 2: Gateway Auth
    setTimeout(() => {
      setProcessingStep(3);
    }, 1600);

    // Step 3: Success Confirmation & Confetti
    setTimeout(() => {
      const generatedRef = `AUR-${Math.floor(10000 + Math.random() * 90000)}-EXP`;
      setOrderRef(generatedRef);
      setStage('success');
      clearCart();

      // Trigger multi-point celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.warn('Confetti error', err);
      }
    }, 2400);
  };

  const handleResetAndClose = () => {
    setStage('form');
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A2540]/60 backdrop-blur-[2px] transition-opacity"
        onClick={() => {
          if (stage !== 'processing') handleResetAndClose();
        }}
      />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl hairline-border border-[#E6EBF1] chromatic-shadow overflow-hidden">
          
          {/* Top Security Banner */}
          <div className="bg-[#0A2540] text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-white/10">
                <Lock className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">
                  {stage === 'success' ? 'Order Confirmed' : 'Instant 256-Bit SSL Checkout'}
                </h3>
                <p className="text-[11px] text-white/70">
                  PCI-DSS Level 1 Verified • Direct Encrypted Channel
                </p>
              </div>
            </div>

            {stage !== 'processing' && (
              <button
                onClick={handleResetAndClose}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* STAGE 1: CHECKOUT FORM */}
          {stage === 'form' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left 7 cols: Payment & Contact Info */}
                <div className="md:col-span-7 space-y-4">
                  {/* Payment Method Switcher Tabs */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#627D98] uppercase tracking-wider mb-2">
                      Select Payment Rails
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('momo')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl hairline-border text-xs font-bold transition-all ${
                          paymentMethod === 'momo'
                            ? 'border-[#0A2540] bg-[#0A2540] text-white shadow-sm'
                            : 'border-[#E6EBF1] bg-[#F8FAFC] text-[#425466] hover:bg-white'
                        }`}
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Mobile Money / USSD</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl hairline-border text-xs font-bold transition-all ${
                          paymentMethod === 'card'
                            ? 'border-[#0A2540] bg-[#0A2540] text-white shadow-sm'
                            : 'border-[#E6EBF1] bg-[#F8FAFC] text-[#425466] hover:bg-white'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Credit / Debit Card</span>
                      </button>
                    </div>
                  </div>

                  {/* Form depending on method */}
                  {paymentMethod === 'momo' ? (
                    <div className="space-y-3 p-4 rounded-xl bg-[#FAFCFE] hairline-border border-[#E6EBF1]">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#0A2540]">
                        <span>Instant Push Prompt Simulation</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                          Zero Processing Fees
                        </span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-[#425466] mb-1">
                          Network Carrier
                        </label>
                        <select
                          value={carrier}
                          onChange={(e) => setCarrier(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white hairline-border border-[#E6EBF1] rounded-lg font-medium text-[#0A2540]"
                        >
                          <option value="MTN">MTN MoMo (Instant Push Prompt)</option>
                          <option value="Telecel">Telecel Cash / Vodafone</option>
                          <option value="AirtelTigo">AirtelTigo Money</option>
                          <option value="MPesa">M-Pesa Express</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-[#425466] mb-1">
                          Subscriber Phone Number
                        </label>
                        <input
                          type="tel"
                          value={momoNumber}
                          onChange={(e) => setMomoNumber(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-mono bg-white hairline-border border-[#E6EBF1] rounded-lg focus:outline-none focus:border-[#0A2540]"
                        />
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Account verified: Alex Vance (Status: Active)</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 p-4 rounded-xl bg-[#FAFCFE] hairline-border border-[#E6EBF1]">
                      <div>
                        <label className="block text-[11px] font-medium text-[#425466] mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-mono bg-white hairline-border border-[#E6EBF1] rounded-lg focus:outline-none focus:border-[#0A2540]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-medium text-[#425466] mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3 py-2 text-xs font-mono bg-white hairline-border border-[#E6EBF1] rounded-lg text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-[#425466] mb-1">
                            Security CVC
                          </label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full px-3 py-2 text-xs font-mono bg-white hairline-border border-[#E6EBF1] rounded-lg text-center"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Delivery Info */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-[11px] font-bold text-[#627D98] uppercase tracking-wider">
                      Express Delivery Destination
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Recipient Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="px-3 py-2 text-xs bg-[#F8FAFC] hairline-border border-[#E6EBF1] rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="px-3 py-2 text-xs bg-[#F8FAFC] hairline-border border-[#E6EBF1] rounded-lg"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Delivery Street Address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F8FAFC] hairline-border border-[#E6EBF1] rounded-lg"
                    />
                  </div>
                </div>

                {/* Right 5 cols: Order Recap & Confirm */}
                <div className="md:col-span-5 flex flex-col justify-between bg-[#F8FAFC] p-4 rounded-xl hairline-border border-[#E6EBF1]">
                  <div>
                    <h4 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider mb-3">
                      Order Summary
                    </h4>

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1 text-xs">
                      {items.map((i) => (
                        <div key={`${i.id}-${i.variant}`} className="flex justify-between items-start text-[#425466]">
                          <span className="truncate max-w-[130px]">
                            {i.quantity}x {i.name}
                          </span>
                          <span className="font-mono font-semibold text-[#0A2540]">
                            {formatPrice(i.price * i.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5 pt-3 mt-3 border-t border-[#E6EBF1] text-xs">
                      <div className="flex justify-between text-[#627D98]">
                        <span>Subtotal</span>
                        <span className="font-mono text-[#0A2540]">{formatPrice(subtotal)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-600 font-medium">
                          <span>Discount ({appliedPromo.code})</span>
                          <span className="font-mono">-{formatPrice(discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-[#627D98]">
                        <span>Delivery</span>
                        <span className="font-mono text-[#0A2540]">
                          {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#627D98]">
                        <span>Taxes (5%)</span>
                        <span className="font-mono text-[#0A2540]">{formatPrice(estimatedTax)}</span>
                      </div>

                      <div className="flex justify-between items-baseline pt-2 border-t border-[#E6EBF1] font-bold text-[#0A2540]">
                        <span className="text-xs">Total Authorized</span>
                        <span className="font-mono text-lg price">{formatPrice(grandTotal)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E6EBF1]">
                    <button
                      type="button"
                      onClick={handleStartCheckout}
                      className="w-full py-3 px-4 rounded-lg bg-[#0A2540] hover:bg-[#0A2540]/90 text-white font-bold text-xs sm:text-sm transition-all duration-micro shadow-sm active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span>Authorize Payment — {formatPrice(grandTotal)}</span>
                    </button>
                    <span className="block text-[10px] text-center text-[#8F9CA8] mt-2">
                      Simulates instant USSD authorization prompt
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STAGE 2: PROCESSING SIMULATION */}
          {stage === 'processing' && (
            <div className="p-10 text-center flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-[#E6EBF1] border-t-[#0A2540] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#0A2540]" />
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-[#0A2540] tracking-tight">
                  Verifying Direct Transaction
                </h4>
                <p className="text-xs text-[#627D98] mt-1 max-w-[40ch]">
                  Please wait while we establish a secure cryptographic handshake with the payment network.
                </p>
              </div>

              {/* Progress Steps */}
              <div className="w-full max-w-sm space-y-2 text-left text-xs">
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#F8FAFC] hairline-border border-[#E6EBF1]">
                  {processingStep >= 1 ? (
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  ) : (
                    <Loader2 className="w-4 h-4 animate-spin text-[#8F9CA8]" />
                  )}
                  <span className={processingStep >= 1 ? 'font-semibold text-[#0A2540]' : 'text-[#8F9CA8]'}>
                    Securing 256-bit TLS connection...
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#F8FAFC] hairline-border border-[#E6EBF1]">
                  {processingStep >= 2 ? (
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  ) : (
                    <Loader2 className="w-4 h-4 animate-spin text-[#8F9CA8]" />
                  )}
                  <span className={processingStep >= 2 ? 'font-semibold text-[#0A2540]' : 'text-[#8F9CA8]'}>
                    Authorizing with {paymentMethod === 'momo' ? `${carrier} MoMo Gateway` : 'Visa/Mastercard 3D Secure'}...
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#F8FAFC] hairline-border border-[#E6EBF1]">
                  {processingStep >= 3 ? (
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  ) : (
                    <Loader2 className="w-4 h-4 animate-spin text-[#8F9CA8]" />
                  )}
                  <span className={processingStep >= 3 ? 'font-semibold text-[#0A2540]' : 'text-[#8F9CA8]'}>
                    Allocating inventory in central fulfillment center...
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 3: ORDER SUCCESS CONFIRMATION & TRACKER */}
          {stage === 'success' && (
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Header confirmation */}
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A2540]">
                  Payment Verified & Confirmed
                </h3>
                <p className="text-xs text-[#627D98] mt-1">
                  Thank you! Your hardware allocation is locked.
                </p>
                <div className="inline-block mt-3 px-3 py-1 bg-[#F8FAFC] hairline-border border-[#E6EBF1] rounded-lg">
                  <span className="text-[11px] text-[#627D98]">Order Reference: </span>
                  <span className="font-mono font-bold text-xs text-[#0A2540]">{orderRef}</span>
                </div>
              </div>

              {/* Live Delivery Tracker Simulation */}
              <div className="bg-[#FAFCFE] rounded-xl hairline-border border-[#E6EBF1] p-5">
                <h4 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider mb-4">
                  Fulfillment Status Tracker
                </h4>

                <div className="grid grid-cols-3 gap-2 relative">
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-1.5 shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span className="block text-xs font-bold text-[#0A2540]">Payment Verified</span>
                    <span className="text-[10px] text-[#627D98]">Instant USSD</span>
                  </div>

                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-[#0A2540] text-white flex items-center justify-center mx-auto mb-1.5 animate-pulse">
                      <Package className="w-4 h-4" />
                    </div>
                    <span className="block text-xs font-bold text-[#0A2540]">Warehouse Staging</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">Active Packing</span>
                  </div>

                  <div className="text-center opacity-60">
                    <div className="w-8 h-8 rounded-full bg-[#E6EBF1] text-[#627D98] flex items-center justify-center mx-auto mb-1.5">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <span className="block text-xs font-bold text-[#425466]">Courier Transit</span>
                    <span className="text-[10px] text-[#8F9CA8]">Est. 2 Business Days</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E6EBF1] flex items-center justify-between text-xs text-[#627D98]">
                  <span>Delivery Address:</span>
                  <span className="font-semibold text-[#0A2540]">{deliveryAddress}, {city}</span>
                </div>
              </div>

              {/* Actions: Download Invoice & Continue Shopping */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg hairline-border border-[#E6EBF1] bg-white hover:bg-[#F8FAFC] text-xs font-bold text-[#0A2540] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download VAT Invoice (PDF)</span>
                </button>

                <button
                  onClick={handleResetAndClose}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#0A2540] hover:bg-[#0A2540]/90 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <span>Continue Browsing Catalog</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
