# AURA Tech & Lifestyle — Direct D2C Hardware Storefront & Mobile Checkout MVP

A modern, high-converting direct-to-consumer (D2C) hardware storefront built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**. Designed to reflect the craft and aesthetic standards of **Apple, Stripe, and Linear**, featuring an asymmetrical Bento grid, zero-hop slideover cart, 1-click WhatsApp order generator engine, and localized Mobile Money / Card checkout simulation.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nkagyeman/aura-d2c-storefront)
[![GitHub Repo](https://img.shields.io/badge/GitHub-aura--d2c--storefront-181717?logo=github)](https://github.com/Nkagyeman/aura-d2c-storefront)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4-38B2AC?logo=tailwindcss)](https://tailwindcss.com)

---

## ⚡ Core Conversion Features

### 1. Promo Utility Bar & Sticky Navigation
* **Free Express Shipping Alert**: `⚡ Free Express Delivery on orders over $100 | Instant WhatsApp Support`.
* **Multi-Currency Switcher**: Real-time conversion between **USD ($)**, **EUR (€)**, **GBP (£)**, and **GHS (GH₵)** with tabular numbers (`font-feature-settings: "tnum" 1`).
* **Live Keyword Search**: Instant client-side catalog filtering as the user types with zero page reload latency.
* **Dynamic Cart Badge**: Live unit counter and subtotal trigger.

### 2. High-Ticket Hero Anchor Banner
* **Flagship Highlight**: *Aura Studio Pro ANC Headphones* with micro-etched planar magnetic transducer specifications.
* **In-Situ Variant Customizer**: Switch finishes (*Titanium Matte*, *Silver Lunar*, *Deep Charcoal*) directly on the hero banner.
* **Direct Dual Action**: "Add to Cart" with positive visual confirmation (`Added ✓`) and "Quick Buy via WhatsApp".

### 3. Asymmetrical Bento Grid Catalog
* **Dominant Anchor Cell (>= 58% Width)**: Rejects uniform 3-column AI slop. Flagship anchor features deep micro-specs, finish customizer, live stock counters, and direct quick-buy.
* **Instant Category Filter Pills**: "All", "Audio & Wearables", "Desk Setup", "Accessories".
* **Hover Quick-Actions**: Quick View specification modal trigger and instant cart add.

### 4. Zero-Hop Slide-Out Cart Drawer
* **Free Shipping Meter**: Real-time progress bar recalculating remaining spend needed for free express delivery.
* **Cart Operations**: Fast quantity adjustment (`+` / `-`), item removal, and persistent state in `localStorage`.
* **Coupon Voucher Engine**: Validates promo codes such as `AURA10` (10% VIP Discount) with instant discount reflection.
* **Dual Action Buttons**:
  - `Order via WhatsApp` (Emerald green 1-click invoice button).
  - `Instant Mobile Checkout` (Primary high-contrast button).

### 5. WhatsApp Direct Order Generator Engine
* Converts active cart into a formatted plain-text invoice:
  ```text
  Hello Aura Tech & Lifestyle! 👋
  I would like to place an order from your direct storefront.

  🛒 ORDER SUMMARY (2 items):
  • 1x Aura Studio Pro ANC Headphones (Titanium Matte) — $289.00
  • 1x MagBase 3-in-1 CNC Charging Stand (Space Gray) — $89.00

  📊 FINANCIAL BREAKDOWN:
  • Subtotal: $378.00
  • Discount (AURA10): -$37.80
  • Express Shipping: FREE
  • Estimated Tax: $17.01
  TOTAL PAYABLE: $357.21

  Please confirm stock availability and send payment / delivery instructions.
  ```
* Displays a live WhatsApp chat-bubble preview, 1-click clipboard copy, and dynamic deep link to `https://wa.me/[phone]?text=[encoded]`.

### 6. Mobile Money & Card Direct Checkout Modal
* **Tab A (Mobile Money / USSD)**: Instant push prompt simulation for MTN MoMo, Telecel Cash, AirtelTigo, and M-Pesa.
* **Tab B (Credit / Debit Card)**: Formatted card number, MM/YY expiry, and CVC inputs.
* **2-Second Multi-Step Processing**: Realistic verification simulation (`Securing TLS` -> `Authorizing gateway` -> `Allocating stock`).
* **Celebration & Delivery Tracker**: Confetti burst (`canvas-confetti`), unique order reference (e.g. `AUR-92841-EXP`), and live 3-stage delivery status tracking.

---

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/Nkagyeman/aura-d2c-storefront.git

# Navigate into directory
cd aura-d2c-storefront

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🌐 1-Click Deploy to Vercel

Click the button below or import repository `Nkagyeman/aura-d2c-storefront` on [vercel.com/new](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nkagyeman/aura-d2c-storefront)
