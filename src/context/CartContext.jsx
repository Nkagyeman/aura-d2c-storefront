import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CURRENCIES, PROMO_CODES } from '../data/products';

const CartContext = createContext(null);

const STORAGE_KEY = 'aura_store_cart_v1';
const CURRENCY_KEY = 'aura_store_currency_v1';

export function CartProvider({ children }) {
  // 1. Currency state with persistence
  const [currencyCode, setCurrencyCode] = useState(() => {
    try {
      const saved = localStorage.getItem(CURRENCY_KEY);
      return saved && CURRENCIES[saved] ? saved : 'USD';
    } catch {
      return 'USD';
    }
  });

  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  // 2. Cart items state with persistence
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
    }
    // Default starter cart for immediate impressive demo
    return [
      {
        id: PRODUCTS[0].id,
        name: PRODUCTS[0].name,
        price: PRODUCTS[0].price,
        comparePrice: PRODUCTS[0].comparePrice,
        image: PRODUCTS[0].image,
        category: PRODUCTS[0].category,
        variant: PRODUCTS[0].colors[0].name,
        quantity: 1,
      },
      {
        id: PRODUCTS[1].id,
        name: PRODUCTS[1].name,
        price: PRODUCTS[1].price,
        comparePrice: PRODUCTS[1].comparePrice,
        image: PRODUCTS[1].image,
        category: PRODUCTS[1].category,
        variant: PRODUCTS[1].colors[0].name,
        quantity: 1,
      }
    ];
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not write cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(CURRENCY_KEY, currencyCode);
    } catch (e) {
      console.warn('Could not write currency to localStorage', e);
    }
  }, [currencyCode]);

  // UI Drawer and Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWhatsAppPreviewOpen, setIsWhatsAppPreviewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);

  // Promo Code State
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  // Currency Formatter
  const formatPrice = (amountInUSD) => {
    const converted = amountInUSD * currency.rate;
    // For GHS or higher values format with clean standard separators
    return `${currency.symbol}${converted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  // Cart operations
  const addToCart = (product, quantity = 1, variant = null) => {
    const chosenVariant = variant || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');
    
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) => i.id === product.id && i.variant === chosenVariant
      );

      if (existingIndex > -1) {
        const copy = [...prevItems];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            comparePrice: product.comparePrice,
            image: product.image,
            category: product.category,
            variant: chosenVariant,
            quantity: Math.max(1, quantity),
          }
        ];
      }
    });

    // Provide momentary visual feedback
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1500);
  };

  const updateQuantity = (id, variant, delta) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id && item.variant === variant) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (id, variant) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.variant === variant)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const loadSampleCart = () => {
    setItems([
      {
        id: PRODUCTS[0].id,
        name: PRODUCTS[0].name,
        price: PRODUCTS[0].price,
        comparePrice: PRODUCTS[0].comparePrice,
        image: PRODUCTS[0].image,
        category: PRODUCTS[0].category,
        variant: PRODUCTS[0].colors[0].name,
        quantity: 2,
      },
      {
        id: PRODUCTS[1].id,
        name: PRODUCTS[1].name,
        price: PRODUCTS[1].price,
        comparePrice: PRODUCTS[1].comparePrice,
        image: PRODUCTS[1].image,
        category: PRODUCTS[1].category,
        variant: PRODUCTS[1].colors[0].name,
        quantity: 1,
      },
      {
        id: PRODUCTS[2].id,
        name: PRODUCTS[2].name,
        price: PRODUCTS[2].price,
        comparePrice: PRODUCTS[2].comparePrice,
        image: PRODUCTS[2].image,
        category: PRODUCTS[2].category,
        variant: PRODUCTS[2].colors[0].name,
        quantity: 1,
      }
    ]);
  };

  // Promo code validation
  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setPromoError('Please enter a coupon code.');
      return false;
    }
    if (PROMO_CODES[clean]) {
      setAppliedPromo({ code: clean, ...PROMO_CODES[clean] });
      setPromoError('');
      return true;
    } else {
      setPromoError('Invalid coupon code. Try AURA10 for 10% off.');
      return false;
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
  };

  // Financial calculations (in USD base)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Free shipping threshold: $100
  const freeShippingThreshold = 100;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedPromo?.type === 'shipping';
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 12;

  // Discount calculation
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percentage') {
      discountAmount = (subtotal * appliedPromo.value) / 100;
    } else if (appliedPromo.type === 'fixed') {
      discountAmount = Math.min(subtotal, appliedPromo.value);
    }
  }

  // Estimated Tax: 5%
  const estimatedTax = subtotal > 0 ? (subtotal - discountAmount) * 0.05 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + estimatedTax);

  // WhatsApp Order String Generator
  const generateWhatsAppMessage = (customNote = '') => {
    const lines = [];
    lines.push(`Hello Aura Tech & Lifestyle! 👋`);
    lines.push(`I would like to place an order from your direct storefront.`);
    lines.push(``);
    lines.push(`🛒 *ORDER SUMMARY (${totalItemCount} items)*:`);
    
    items.forEach((item) => {
      const itemSubtotal = formatPrice(item.price * item.quantity);
      lines.push(`• ${item.quantity}x ${item.name} (${item.variant}) — ${itemSubtotal}`);
    });

    lines.push(``);
    lines.push(`📊 *FINANCIAL BREAKDOWN*:`);
    lines.push(`• Subtotal: ${formatPrice(subtotal)}`);
    if (discountAmount > 0) {
      lines.push(`• Discount (${appliedPromo.code}): -${formatPrice(discountAmount)}`);
    }
    lines.push(`• Express Shipping: ${shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}`);
    lines.push(`• Estimated Tax: ${formatPrice(estimatedTax)}`);
    lines.push(`*TOTAL PAYABLE: ${formatPrice(grandTotal)}*`);

    if (customNote) {
      lines.push(``);
      lines.push(`📝 *Customer Note*: ${customNote}`);
    }

    lines.push(``);
    lines.push(`Please confirm stock availability and send payment / delivery instructions.`);
    return lines.join('\n');
  };

  const openWhatsAppDirect = (phoneNumber = '233501234567', customNote = '') => {
    const rawMessage = generateWhatsAppMessage(customNote);
    const encoded = encodeURIComponent(rawMessage);
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        loadSampleCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isWhatsAppPreviewOpen,
        setIsWhatsAppPreviewOpen,
        quickViewProduct,
        setQuickViewProduct,
        recentlyAddedId,
        currency,
        currencyCode,
        setCurrencyCode,
        formatPrice,
        subtotal,
        totalItemCount,
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
        generateWhatsAppMessage,
        openWhatsAppDirect,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
