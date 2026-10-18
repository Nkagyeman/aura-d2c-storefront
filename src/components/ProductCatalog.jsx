import React, { useState, useMemo } from 'react';
import { ShoppingBag, Eye, MessageCircle, Star, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, CATEGORIES } from '../data/products';

export default function ProductCatalog({ searchQuery, selectedCategory, setSelectedCategory }) {
  const { addToCart, recentlyAddedId, formatPrice, setQuickViewProduct, openWhatsAppDirect } = useCart();
  const [sortBy, setSortBy] = useState('featured');
  const [selectedVariants, setSelectedVariants] = useState({});

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleVariantSelect = (productId, variantName) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantName,
    }));
  };

  const getActiveVariant = (product) => {
    return selectedVariants[product.id] || (product.colors && product.colors[0] ? product.colors[0].name : 'Standard');
  };

  // Identify anchor card for asymmetrical bento grid
  const anchorProduct = filteredProducts[0];
  const remainingProducts = filteredProducts.slice(1);

  return (
    <section id="catalog-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Catalog Controls Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 hairline-border border-b border-[#E6EBF1] mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] tracking-[-0.025em]">
            Curated Hardware & Architecture
          </h2>
          <p className="text-sm text-[#627D98] mt-1 max-w-[65ch]">
            Direct fulfillment, zero distributor markups. Each unit is inspected and dispatched within 2 hours.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F1F5F9] rounded-lg hairline-border border-[#E6EBF1]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors duration-micro ${
                  selectedCategory === cat
                    ? 'bg-[#0A2540] text-white shadow-sm'
                    : 'text-[#425466] hover:text-[#0A2540] hover:bg-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium text-[#1D1D1F] bg-white hairline-border border-[#E6EBF1] rounded-lg focus:outline-none focus:border-[#0A2540]"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated (★)</option>
          </select>
        </div>
      </div>

      {/* Search Result Feedback */}
      {searchQuery && (
        <div className="mb-6 flex items-center justify-between text-xs text-[#627D98] bg-[#F8FAFC] p-3 rounded-lg hairline-border border-[#E6EBF1]">
          <span>
            Showing <strong className="text-[#0A2540]">{filteredProducts.length}</strong> results for "{searchQuery}"
          </span>
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-[#0A2540] font-semibold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center hairline-border border-[#E6EBF1] rounded-xl bg-white p-8">
          <p className="text-base font-semibold text-[#0A2540]">No hardware matched your criteria.</p>
          <p className="text-xs text-[#627D98] mt-1">Try clearing your search query or switching categories.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 bg-[#0A2540] text-white rounded-lg text-xs font-bold"
          >
            Show All Products
          </button>
        </div>
      ) : (
        /* Asymmetrical Bento Grid (dominant anchor cell >= 50% surface area on large screens) */
        <div className="space-y-6">
          
          {/* Dominant Bento Anchor Tier */}
          {anchorProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Dominant Anchor Card (Spans 7 of 12 cols, >= 58% width) */}
              <div className="lg:col-span-7 bg-white rounded-xl hairline-border border-[#E6EBF1] chromatic-shadow p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#0A2540] hairline-border border-[#E6EBF1]">
                      {anchorProduct.badge || 'Anchor Flagship'}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      In Stock ({anchorProduct.stock} units left)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    <div className="sm:col-span-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0A2540] tracking-[-0.025em] leading-tight mb-2">
                        {anchorProduct.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#425466] leading-relaxed mb-4">
                        {anchorProduct.tagline}
                      </p>

                      {/* Micro Specs */}
                      <div className="space-y-1.5 py-3 border-y border-[#E6EBF1] mb-4 text-xs">
                        {anchorProduct.specs?.slice(0, 3).map((s, i) => (
                          <div key={i} className="flex justify-between text-[#425466]">
                            <span className="text-[#627D98]">{s.label}:</span>
                            <span className="font-semibold text-[#0A2540] text-right font-mono">{s.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Variant Swatches */}
                      {anchorProduct.colors && (
                        <div className="mb-4">
                          <span className="text-[11px] text-[#627D98] block mb-1">
                            Finish: <strong className="text-[#0A2540]">{getActiveVariant(anchorProduct)}</strong>
                          </span>
                          <div className="flex items-center gap-2">
                            {anchorProduct.colors.map((c) => (
                              <button
                                key={c.name}
                                onClick={() => handleVariantSelect(anchorProduct.id, c.name)}
                                className={`w-5 h-5 rounded-full border transition-all ${
                                  getActiveVariant(anchorProduct) === c.name
                                    ? 'ring-2 ring-[#0A2540] scale-110'
                                    : 'opacity-70 hover:opacity-100'
                                }`}
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image Area */}
                    <div className="sm:col-span-6">
                      <div className="aspect-square rounded-lg overflow-hidden bg-[#F8FAFC] hairline-border border-[#E6EBF1] relative group">
                        <img
                          src={anchorProduct.image}
                          alt={anchorProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          onClick={() => setQuickViewProduct(anchorProduct)}
                          className="absolute inset-0 bg-[#0A2540]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-[2px]"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Quick View Specs</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Anchor Card Actions & Price */}
                <div className="mt-6 pt-4 border-t border-[#E6EBF1] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-[#0A2540] price">
                      {formatPrice(anchorProduct.price)}
                    </span>
                    <span className="text-xs text-[#8F9CA8] line-through font-mono">
                      {formatPrice(anchorProduct.comparePrice)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuickViewProduct(anchorProduct)}
                      className="px-3 py-2 text-xs font-medium text-[#425466] hover:text-[#0A2540] hover:bg-[#F1F5F9] rounded-lg transition-colors hairline-border border-[#E6EBF1]"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => addToCart(anchorProduct, 1, getActiveVariant(anchorProduct))}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all duration-micro ${
                        recentlyAddedId === anchorProduct.id
                          ? 'bg-emerald-600 hover:bg-emerald-700'
                          : 'bg-[#0A2540] hover:bg-[#0A2540]/90 active:scale-[0.98]'
                      }`}
                    >
                      {recentlyAddedId === anchorProduct.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added ✓</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Complementary Bento Card in Top Tier (Spans 5 of 12 cols) */}
              {remainingProducts[0] && (
                <div className="lg:col-span-5 bg-white rounded-xl hairline-border border-[#E6EBF1] chromatic-shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#F8FAFC] text-[#0A2540] hairline-border border-[#E6EBF1]">
                        {remainingProducts[0].badge}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-[#627D98]">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-[#0A2540]">{remainingProducts[0].rating}</span>
                        <span>({remainingProducts[0].reviewCount})</span>
                      </div>
                    </div>

                    <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#F8FAFC] hairline-border border-[#E6EBF1] mb-4 relative group">
                      <img
                        src={remainingProducts[0].image}
                        alt={remainingProducts[0].name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={() => setQuickViewProduct(remainingProducts[0])}
                        className="absolute inset-0 bg-[#0A2540]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Inspect Specs</span>
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-[#0A2540] leading-snug mb-1">
                      {remainingProducts[0].name}
                    </h3>
                    <p className="text-xs text-[#627D98] line-clamp-2 mb-3">
                      {remainingProducts[0].tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6EBF1] flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold font-mono text-[#0A2540] price">
                        {formatPrice(remainingProducts[0].price)}
                      </span>
                      <span className="ml-2 text-xs text-[#8F9CA8] line-through font-mono">
                        {formatPrice(remainingProducts[0].comparePrice)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(remainingProducts[0], 1, getActiveVariant(remainingProducts[0]))}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all duration-micro ${
                        recentlyAddedId === remainingProducts[0].id
                          ? 'bg-emerald-600'
                          : 'bg-[#0A2540] hover:bg-[#0A2540]/90'
                      }`}
                    >
                      {recentlyAddedId === remainingProducts[0].id ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added ✓</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Secondary Bento Grid Row (Asymmetric 4-column mix) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingProducts.slice(1).map((product) => {
              const activeVariant = getActiveVariant(product);
              const isAdded = recentlyAddedId === product.id;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl hairline-border border-[#E6EBF1] chromatic-shadow-sm chromatic-shadow-hover p-5 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Tag & Rating */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#F8FAFC] text-[#425466] hairline-border border-[#E6EBF1]">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-[#627D98]">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-[#0A2540] font-mono">{product.rating}</span>
                      </div>
                    </div>

                    {/* Image with Quick View on Hover */}
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#F8FAFC] hairline-border border-[#E6EBF1] mb-3 relative group">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute inset-0 bg-[#0A2540]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-[1px]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>

                      {product.stock <= 5 && (
                        <div className="absolute top-2 left-2 bg-amber-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          Only {product.stock} left
                        </div>
                      )}
                    </div>

                    {/* Product Title & Tagline */}
                    <h3 className="text-sm font-bold text-[#0A2540] leading-snug line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#627D98] line-clamp-2 leading-relaxed mb-3">
                      {product.tagline}
                    </p>

                    {/* Color Swatches if present */}
                    {product.colors && (
                      <div className="flex items-center gap-1.5 mb-3">
                        {product.colors.map((c) => (
                          <button
                            key={c.name}
                            onClick={() => handleVariantSelect(product.id, c.name)}
                            className={`w-3.5 h-3.5 rounded-full border transition-all ${
                              activeVariant === c.name
                                ? 'ring-1 ring-[#0A2540] scale-110'
                                : 'opacity-60 hover:opacity-100'
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                        <span className="text-[10px] text-[#8F9CA8] ml-1">{activeVariant}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Price and Instant Add */}
                  <div className="pt-3 border-t border-[#E6EBF1] flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold font-mono text-[#0A2540] price">
                        {formatPrice(product.price)}
                      </span>
                      {product.comparePrice > product.price && (
                        <span className="ml-1.5 text-xs text-[#8F9CA8] line-through font-mono">
                          {formatPrice(product.comparePrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openWhatsAppDirect('233501234567', `Direct Inquiry: 1x ${product.name} (${activeVariant})`)}
                        className="p-1.5 rounded-md text-[#059669] hover:bg-emerald-50 transition-colors"
                        title="Inquire on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => addToCart(product, 1, activeVariant)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all duration-micro ${
                          isAdded
                            ? 'bg-emerald-600'
                            : 'bg-[#0A2540] hover:bg-[#0A2540]/90 active:scale-[0.98]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Added ✓</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}
    </section>
  );
}
