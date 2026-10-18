// Curated high-fidelity product catalog for AURA Tech & Lifestyle
export const PRODUCTS = [
  {
    id: "aura-studio-pro",
    name: "Aura Studio Pro ANC Headphones",
    tagline: "Planar magnetic precision with custom 40mm transducers and 54-hour continuous acoustic playback.",
    category: "Audio & Wearables",
    badge: "Flagship",
    price: 289,
    comparePrice: 349,
    rating: 4.9,
    reviewCount: 148,
    stock: 7,
    sku: "AUR-HP-01-PRO",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Titanium Matte", hex: "#374151" },
      { name: "Silver Lunar", hex: "#E5E7EB" },
      { name: "Deep Charcoal", hex: "#111827" }
    ],
    specs: [
      { label: "Transducers", value: "40mm Custom Planar Magnetic" },
      { label: "Frequency Range", value: "8Hz - 42,000Hz" },
      { label: "Latency", value: "0.02ms Ultra-Low via LE Audio" },
      { label: "Battery Life", value: "54 Hours (ANC On)" },
      { label: "Chassis", value: "CNC Milled Aerospace Aluminum" }
    ],
    inStock: true,
    featured: true,
    isAnchor: true, // Used for Bento grid dominant anchor
  },
  {
    id: "aura-magsafe-dock",
    name: "MagBase 3-in-1 CNC Charging Stand",
    tagline: "Solid billet aluminum wireless charging dock with 15W Qi2 official certification for iPhone, Watch & AirPods.",
    category: "Desk Setup",
    badge: "Best Seller",
    price: 89,
    comparePrice: 119,
    rating: 4.8,
    reviewCount: 92,
    stock: 14,
    sku: "AUR-DS-03-MAG",
    image: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Space Gray", hex: "#4B5563" },
      { name: "Matte Silver", hex: "#D1D5DB" }
    ],
    specs: [
      { label: "Power Output", value: "15W Fast Qi2 + 5W Watch + 5W Pad" },
      { label: "Material", value: "Single-Block Billet Aluminum" },
      { label: "Cable Included", value: "2.0m Braided Silicone USB-C" },
      { label: "Weight", value: "410g Heavyweight Non-Tip Base" }
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "aura-linear-keyboard",
    name: "Forge-65 Low-Profile Mechanical Keyboard",
    tagline: "Gasket-mounted acoustic dampening with factory-lubed linear switches and hot-swappable PBT dye-sub keycaps.",
    category: "Desk Setup",
    badge: "Staff Pick",
    price: 159,
    comparePrice: 189,
    rating: 4.9,
    reviewCount: 84,
    stock: 5,
    sku: "AUR-KB-65-FORGE",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Dark Slate", hex: "#1F2937" },
      { name: "Chalk White", hex: "#F3F4F6" }
    ],
    specs: [
      { label: "Switches", value: "Gateron Low-Profile Linear Red" },
      { label: "Connectivity", value: "Tri-Mode (2.4GHz / BT 5.3 / USB-C)" },
      { label: "Battery", value: "3000mAh (Up to 180h)" },
      { label: "Chassis", value: "Anodized 6063 Aluminum" }
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "aura-precision-mouse",
    name: "Orbit Ergonomic Precision Wireless Mouse",
    tagline: "Ergonomic thumb-rest contoured shell with 26,000 DPI optical sensor and magnetic infinity scroll wheel.",
    category: "Accessories",
    badge: "In Stock",
    price: 95,
    comparePrice: 110,
    rating: 4.8,
    reviewCount: 67,
    stock: 19,
    sku: "AUR-MS-02-ORB",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Matte Black", hex: "#111827" },
      { name: "Arctic White", hex: "#F9FAFB" }
    ],
    specs: [
      { label: "Sensor", value: "PAW3395 26K DPI Optical" },
      { label: "Weight", value: "62g Ultra-Lightweight" },
      { label: "Polling Rate", value: "4,000Hz Wireless Polling" },
      { label: "Battery", value: "90h Continuous Fast-Charge" }
    ],
    inStock: true,
    featured: false,
  },
  {
    id: "aura-leather-mat",
    name: "Sienna Full-Grain Leather Desk Pad",
    tagline: "Vegetable-tanned full grain Tuscan leather with hand-burnished edges and natural wool felt backing.",
    category: "Desk Setup",
    badge: "Artisan",
    price: 68,
    comparePrice: 85,
    rating: 4.9,
    reviewCount: 115,
    stock: 12,
    sku: "AUR-DP-90-LTHR",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Cognac Brown", hex: "#9A3412" },
      { name: "Midnight Black", hex: "#18181B" }
    ],
    specs: [
      { label: "Dimensions", value: "900mm x 400mm x 3.5mm" },
      { label: "Leather Grade", value: "Full-Grain Vegetable Tanned" },
      { label: "Underlay", value: "100% Merino Wool Anti-Slip Felt" }
    ],
    inStock: true,
    featured: false,
  },
  {
    id: "aura-gan-charger",
    name: "Volt-140W Quad GaN Fast Hub",
    tagline: "Gallium Nitride fast charging hub delivering 140W PD 3.1 across 3x USB-C and 1x USB-A ports concurrently.",
    category: "Accessories",
    badge: "Best Value",
    price: 74,
    comparePrice: 95,
    rating: 4.9,
    reviewCount: 203,
    stock: 22,
    sku: "AUR-CH-140-GAN",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Graphite", hex: "#374151" },
      { name: "Chalk", hex: "#E5E7EB" }
    ],
    specs: [
      { label: "Max Output", value: "140W USB-PD 3.1 Extended Power" },
      { label: "Ports", value: "3x USB-C (140W/100W/30W) + 1x USB-A (22.5W)" },
      { label: "Thermal Control", value: "Active GaNFast Overheat Guard" }
    ],
    inStock: true,
    featured: false,
  },
  {
    id: "aura-monitor-riser",
    name: "Monolith Solid Walnut Monitor Riser",
    tagline: "Hand-finished American black walnut shelf supported by heavy gauge powder-coated cold-rolled steel risers.",
    category: "Desk Setup",
    badge: "Crafted",
    price: 135,
    comparePrice: 165,
    rating: 5.0,
    reviewCount: 51,
    stock: 4,
    sku: "AUR-DK-ST-WAL",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Black Walnut", hex: "#451A03" },
      { name: "Natural Oak", hex: "#B45309" }
    ],
    specs: [
      { label: "Dimensions", value: "1150mm x 230mm x 110mm" },
      { label: "Load Capacity", value: "50kg (Dual 32-inch Displays)" },
      { label: "Finish", value: "Organic Hardwax-Oil Satin" }
    ],
    inStock: true,
    featured: false,
  },
  {
    id: "aura-anc-earbuds",
    name: "Aura Air Pro Active Earbuds",
    tagline: "Compact true wireless earphones with hybrid 48dB active noise cancellation and spatial head tracking.",
    category: "Audio & Wearables",
    badge: "Popular",
    price: 129,
    comparePrice: 159,
    rating: 4.8,
    reviewCount: 178,
    stock: 16,
    sku: "AUR-EB-01-AIR",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Matte Black", hex: "#18181B" },
      { name: "Pure White", hex: "#F4F4F5" }
    ],
    specs: [
      { label: "Driver", value: "11mm Liquid Crystal Polymer" },
      { label: "ANC Depth", value: "Up to 48dB Adaptive Noise Cancellation" },
      { label: "Total Playtime", value: "36h with Qi Wireless Case" },
      { label: "Water Resistance", value: "IPX5 Sweat & Splash Guard" }
    ],
    inStock: true,
    featured: false,
  }
];

export const CATEGORIES = [
  "All",
  "Audio & Wearables",
  "Desk Setup",
  "Accessories"
];

export const CURRENCIES = {
  USD: { symbol: "$", code: "USD", rate: 1.0, label: "USD ($)" },
  EUR: { symbol: "€", code: "EUR", rate: 0.92, label: "EUR (€)" },
  GBP: { symbol: "£", code: "GBP", rate: 0.79, label: "GBP (£)" },
  GHS: { symbol: "GH₵", code: "GHS", rate: 15.5, label: "GHS (GH₵)" },
};

export const PROMO_CODES = {
  "AURA10": { type: "percentage", value: 10, label: "10% VIP Discount" },
  "AURA20": { type: "fixed", value: 20, label: "$20 Welcome Bonus" },
  "FREESHIP": { type: "shipping", value: 100, label: "Free Worldwide Express" }
};
