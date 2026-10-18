import React from 'react';
import { Truck, RotateCcw, ShieldCheck, MessageCircle } from 'lucide-react';

export default function TrustStrip() {
  const pillars = [
    {
      icon: Truck,
      title: "2-Day Express Delivery",
      description: "Direct airline cargo dispatch on all hardware orders over $100."
    },
    {
      icon: RotateCcw,
      title: "14-Day Hassle-Free Returns",
      description: "Pre-printed return manifests included in every parcel."
    },
    {
      icon: ShieldCheck,
      title: "256-Bit SSL Encryption",
      description: "Bank-grade encrypted tokenization with instant USSD payment rails."
    },
    {
      icon: MessageCircle,
      title: "Direct WhatsApp Concierge",
      description: "Live engineers ready to confirm technical specs and track orders."
    }
  ];

  return (
    <section className="bg-white hairline-border border-y border-[#E6EBF1] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div key={i} className="flex items-start gap-3.5 p-3 rounded-lg bg-[#FAFCFE] hairline-border border-[#E6EBF1]">
                <div className="p-2.5 rounded-lg bg-[#0A2540] text-white flex-shrink-0 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0A2540] leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#627D98] mt-1 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
