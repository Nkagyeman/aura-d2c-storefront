import React, { useState } from 'react';
import { ShoppingBag, Search, X, MessageCircle, ShieldCheck, ChevronDown, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CURRENCIES, CATEGORIES } from '../data/products';

export default function Header({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  const {
    totalItemCount,
    subtotal,
    formatPrice,
    setIsCartOpen,
    currencyCode,
    setCurrencyCode,
    setIsWhatsAppPreviewOpen
  } = useCart();

  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm hairline-border border-b border-[#E6EBF1] shadow-[0_1px_3px_0_rgba(50,50,93,0.03)]">
      {/* 1. Promo Utility Top Bar */}
      <div className="bg-[#0A2540] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium tracking-tight">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>⚡ Free Express Delivery on orders over $100</span>
            <span className="hidden md:inline text-white/50">|</span>
            <span className="hidden md:inline text-white/90">Direct Dispatch within 2 Hours</span>
          </div>

          <div className="flex items-center gap-4 text-white/90">
            <button
              onClick={() => setIsWhatsAppPreviewOpen(true)}
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors duration-micro font-medium"
              title="Instant WhatsApp Support & Ordering"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Support</span>
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 px-2 py-0.5 rounded hairline-border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-colors duration-micro font-mono text-[11px]"
              >
                <span>{CURRENCIES[currencyCode].label}</span>
                <ChevronDown className="w-3 h-3 text-white/70" />
              </button>

              {isCurrencyDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsCurrencyDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-md hairline-border border-[#E6EBF1] chromatic-shadow py-1 z-20 text-[#1D1D1F]">
                    {Object.keys(CURRENCIES).map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrencyCode(code);
                          setIsCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#F8FAFC] transition-colors ${
                          currencyCode === code ? 'font-semibold text-[#0A2540] bg-[#F1F5F9]' : 'text-[#425466]'
                        }`}
                      >
                        <span className="font-mono">{CURRENCIES[code].label}</span>
                        {currencyCode === code && <Check className="w-3.5 h-3.5 text-[#0A2540]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded bg-[#0A2540] flex items-center justify-center text-white font-bold text-base tracking-widest shadow-sm">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-[-0.03em] text-[#0A2540] leading-none">
                  AURA
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#627D98] font-semibold mt-0.5">
                  Tech & Lifestyle
                </span>
              </div>
            </a>

            {/* Desktop Category Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-micro ${
                      isActive
                        ? 'bg-[#0A2540] text-white shadow-sm'
                        : 'text-[#425466] hover:text-[#0A2540] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Search Bar Input (Live Keyword Filter) */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#8F9CA8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search studio audio, desk docks, chargers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8FAFC] hairline-border border-[#E6EBF1] rounded-lg pl-9 pr-9 py-2 text-xs text-[#1D1D1F] placeholder:text-[#8F9CA8] focus:outline-none focus:border-[#0A2540] focus:bg-white transition-colors duration-micro"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F9CA8] hover:text-[#1D1D1F]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 rounded-lg text-[#425466] hover:bg-[#F1F5F9] transition-colors"
              aria-label="Search items"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* WhatsApp Direct Quick Trigger */}
            <button
              onClick={() => setIsWhatsAppPreviewOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg hairline-border border-[#E6EBF1] bg-white hover:bg-[#F8FAFC] text-xs font-medium text-[#1D1D1F] transition-colors duration-micro"
            >
              <MessageCircle className="w-4 h-4 text-[#059669]" />
              <span className="hidden xl:inline">Order Generator</span>
            </button>

            {/* Cart Button with Dynamic Badge & Subtotal */}
            <button
              id="header-cart-trigger"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#0A2540] text-white hover:bg-[#0A2540]/90 transition-all duration-micro shadow-sm group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 group-hover:scale-105 transition-transform duration-micro" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white font-mono text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none border border-white">
                    {totalItemCount}
                  </span>
                )}
              </div>
              
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-white/70 leading-tight">
                  Cart
                </span>
                <span className="text-xs font-bold font-mono leading-none">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {isMobileSearchOpen && (
          <div className="md:hidden py-3 border-t border-[#E6EBF1]">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#8F9CA8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-[#F8FAFC] hairline-border border-[#E6EBF1] rounded-lg pl-9 pr-9 py-2 text-xs text-[#1D1D1F] placeholder:text-[#8F9CA8] focus:outline-none focus:border-[#0A2540] focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F9CA8] hover:text-[#1D1D1F]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            
            {/* Mobile Category Pills */}
            <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar mt-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs whitespace-nowrap rounded-md font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#0A2540] text-white'
                      : 'bg-[#F1F5F9] text-[#425466]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
