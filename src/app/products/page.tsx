"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, SlidersHorizontal, X, Star, Heart } from "lucide-react";

const CATEGORY_GROUPS = [
  {
    title: "WOMEN'S WEAR",
    items: [
      { name: "Sarees", count: 367, href: "/products/sarees", value: "sarees" },
      { name: "Kurtis", count: 142, href: "/products/kurtis", value: "kurtis" },
      { name: "Kurta Sets", count: 89, href: "/products/kurta-sets", value: "kurta-sets" },
      { name: "Tops & T-Shirts", count: 214, href: "/products/tops", value: "tops" },
      { name: "Office Wear", count: 58, href: "/products/office-wear", value: "office-wear" },
    ]
  },
  {
    title: "KIDS WEAR",
    items: [
      { name: "Baby Wear", count: 76, href: "/products/baby-wear", value: "baby-wear" },
      { name: "Girls Wear", count: 112, href: "/products/girls-wear", value: "girls-wear" },
      { name: "Party Wear", count: 45, href: "/products/party-wear", value: "party-wear" },
      { name: "Ethnic Wear", count: 88, href: "/products/ethnic-wear", value: "ethnic-wear" },
      { name: "Casual Wear", count: 156, href: "/products/casual-wear", value: "casual-wear" },
    ]
  },
  {
    title: "COLLECTIONS",
    items: [
      { name: "Wedding", count: 124, href: "/products/wedding", value: "wedding" },
      { name: "Premium", count: 86, href: "/products/premium", value: "premium" },
      { name: "Traditional", count: 210, href: "/products/traditional", value: "traditional" },
      { name: "Trending", count: 45, href: "/products/trending", value: "trending" },
    ]
  }
];

const FABRICS = ["Silk", "Cotton", "Chiffon", "Georgette", "Linen", "Poly Blend"];
const OCCASIONS = ["Wedding", "Festival", "Casual", "Office", "Party", "Daily Wear"];
const COLORS = ["Red", "Black", "Gold", "White", "Blue", "Green", "Pink", "Yellow"];
const PRICE_RANGES = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 – ₹2,500", min: 1000, max: 2500 },
  { label: "₹2,500 – ₹5,000", min: 2500, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: 999999 },
];

const ALL_PRODUCTS = [
  { name: "Regal Silk Saree", price: 4999, originalPrice: 9999, img: "/images/category_womens_sarees_1780477985126.png", tag: "Silk", category: "sarees", occasion: "Wedding", color: "Red", rating: 4.8, reviews: 124, isNew: false, isBest: true },
  { name: "Embroidered Kurti", price: 1499, originalPrice: 2999, img: "/images/category_womens_kurtis_1780478001731.png", tag: "Cotton", category: "kurtis", occasion: "Casual", color: "Blue", rating: 4.6, reviews: 89, isNew: true, isBest: true },
  { name: "Royal Kurta Set", price: 2499, originalPrice: 4999, img: "/images/category_womens_kurta_sets_1780478021874.png", tag: "Designer", category: "kurta-sets", occasion: "Festival", color: "Green", rating: 4.9, reviews: 203, isNew: false, isBest: true },
  { name: "Chic Fusion Top", price: 999, originalPrice: 1999, img: "/images/category_womens_tops_1780478037830.png", tag: "Poly Blend", category: "tops", occasion: "Casual", color: "White", rating: 4.5, reviews: 67, isNew: true, isBest: false },
  { name: "Luxury Baby Ensemble", price: 1299, originalPrice: 2499, img: "/images/category_kids_baby_wear_1780478061079.png", tag: "Cotton", category: "baby-wear", occasion: "Daily Wear", color: "Pink", rating: 4.7, reviews: 45, isNew: true, isBest: false },
  { name: "Girls Festive Dress", price: 1799, originalPrice: 3499, img: "/images/category_kids_girls_wear_1780478079175.png", tag: "Chiffon", category: "girls-wear", occasion: "Festival", color: "Yellow", rating: 4.8, reviews: 32, isNew: true, isBest: false },
  { name: "Party Wear Gown", price: 2299, originalPrice: 4499, img: "/images/category_kids_party_wear_1780478097124.png", tag: "Georgette", category: "party-wear", occasion: "Party", color: "Black", rating: 4.6, reviews: 28, isNew: false, isBest: false },
  { name: "Boys Ethnic Suit", price: 1999, originalPrice: 3999, img: "/images/category_kids_ethnic_wear_1780478114692.png", tag: "Silk", category: "ethnic-wear", occasion: "Wedding", color: "Blue", rating: 4.7, reviews: 51, isNew: false, isBest: true },
  { name: "Classic Kasavu Saree", price: 3499, originalPrice: 6999, img: "/images/collection_traditional_1780477879187.png", tag: "Cotton", category: "sarees", occasion: "Festival", color: "White", rating: 4.9, reviews: 178, isNew: false, isBest: true },
  { name: "Bridal Lehenga", price: 8499, originalPrice: 16999, img: "/images/collection_wedding_1780477845042.png", tag: "Silk", category: "wedding", occasion: "Wedding", color: "Red", rating: 5.0, reviews: 64, isNew: false, isBest: true },
  { name: "Contemporary Drape", price: 3999, originalPrice: 7999, img: "/images/collection_premium_1780477860938.png", tag: "Georgette", category: "premium", occasion: "Party", color: "Black", rating: 4.7, reviews: 93, isNew: true, isBest: false },
  { name: "Office Formal Kurti", price: 1299, originalPrice: 2599, img: "/images/lookbook_1_1780477942278.png", tag: "Linen", category: "office-wear", occasion: "Office", color: "White", rating: 4.6, reviews: 41, isNew: true, isBest: false },
];

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(s => (
          <Star key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? "text-[#B8973E] fill-[#B8973E]" : "text-gray-200 fill-gray-200"}`} />
        ))}
      </div>
      <span className="text-[10px] text-foreground/40">({reviews})</span>
    </div>
  );
}

function AccordionGroup({ title, children, isOpenDefault = true }: { title: string; children: React.ReactNode; isOpenDefault?: boolean }) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-[11px] font-bold text-[#0A0A0A]/70 tracking-[0.2em] uppercase mb-4 pb-3 border-b border-black/6"
      >
        {title}
        {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-[#0A0A0A]/30" /> : <ChevronDown className="w-3.5 h-3.5 text-[#0A0A0A]/30" />}
      </button>
      {isOpen && <div className="space-y-3">{children}</div>}
    </div>
  );
}

interface Filters {
  categories: string[];
  fabrics: string[];
  occasions: string[];
  colors: string[];
  priceRange: { min: number; max: number } | null;
  newArrivals: boolean;
  bestSellers: boolean;
}

function FilterSidebar({ filters, setFilters }: { filters: Filters; setFilters: (f: Filters) => void }) {
  const toggle = (key: "categories" | "fabrics" | "occasions" | "colors", value: string) => {
    const current = filters[key];
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    setFilters({ ...filters, [key]: updated });
  };

  return (
    <div>
      {/* Quick Filters */}
      <AccordionGroup title="Quick Filter">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input type="checkbox" checked={filters.newArrivals} onChange={e => setFilters({ ...filters, newArrivals: e.target.checked })} className="accent-[#B8973E]" />
          <span className="text-sm text-foreground/65 group-hover:text-foreground transition-colors">New Arrivals</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input type="checkbox" checked={filters.bestSellers} onChange={e => setFilters({ ...filters, bestSellers: e.target.checked })} className="accent-[#B8973E]" />
          <span className="text-sm text-foreground/65 group-hover:text-foreground transition-colors">Best Sellers</span>
        </label>
      </AccordionGroup>

      {/* Categories */}
      {CATEGORY_GROUPS.map(group => (
        <AccordionGroup key={group.title} title={group.title}>
          {group.items.map(item => (
            <label key={item.value} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(item.value)}
                  onChange={() => toggle("categories", item.value)}
                  className="accent-[#B8973E]"
                />
                <span className="text-sm text-foreground/65 group-hover:text-foreground transition-colors">{item.name}</span>
              </div>
              <span className="text-[11px] text-foreground/30">{item.count}</span>
            </label>
          ))}
        </AccordionGroup>
      ))}

      {/* Price Range */}
      <AccordionGroup title="Price Range">
        {PRICE_RANGES.map((range, i) => (
          <label key={i} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="price"
              checked={filters.priceRange?.min === range.min && filters.priceRange?.max === range.max}
              onChange={() => setFilters({ ...filters, priceRange: { min: range.min, max: range.max } })}
              className="accent-[#B8973E]"
            />
            <span className="text-sm text-foreground/65 group-hover:text-foreground transition-colors">{range.label}</span>
          </label>
        ))}
        {filters.priceRange && (
          <button
            onClick={() => setFilters({ ...filters, priceRange: null })}
            className="text-[11px] text-[#B8973E] hover:underline mt-1"
          >
            Clear
          </button>
        )}
      </AccordionGroup>

      {/* Fabric */}
      <AccordionGroup title="Fabric" isOpenDefault={false}>
        {FABRICS.map(fab => (
          <label key={fab} className="flex items-center gap-2.5 cursor-pointer group">
            <input type="checkbox" checked={filters.fabrics.includes(fab)} onChange={() => toggle("fabrics", fab)} className="accent-[#B8973E]" />
            <span className="text-sm text-foreground/65 group-hover:text-foreground transition-colors">{fab}</span>
          </label>
        ))}
      </AccordionGroup>

      {/* Occasion */}
      <AccordionGroup title="Occasion" isOpenDefault={false}>
        {OCCASIONS.map(occ => (
          <label key={occ} className="flex items-center gap-2.5 cursor-pointer group">
            <input type="checkbox" checked={filters.occasions.includes(occ)} onChange={() => toggle("occasions", occ)} className="accent-[#B8973E]" />
            <span className="text-sm text-foreground/65 group-hover:text-foreground transition-colors">{occ}</span>
          </label>
        ))}
      </AccordionGroup>
      {/* Color */}
      <AccordionGroup title="Color" isOpenDefault={false}>
        <div className="flex flex-wrap gap-2">
          {COLORS.map(color => (
            <label key={color} className="cursor-pointer group flex items-center justify-center">
              <input type="checkbox" checked={filters.colors.includes(color)} onChange={() => toggle("colors", color)} className="sr-only" />
              <div className={`w-6 h-6 rounded-full border border-black/10 transition-transform ${filters.colors.includes(color) ? 'ring-2 ring-offset-1 ring-[#B8973E] scale-110' : 'hover:scale-110'}`} style={{ backgroundColor: color.toLowerCase() }} title={color} />
            </label>
          ))}
        </div>
      </AccordionGroup>
    </div>
  );
}

export default function ProductsPage() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    fabrics: [],
    occasions: [],
    colors: [],
    priceRange: null,
    newArrivals: false,
    bestSellers: false,
  });
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    let products = [...ALL_PRODUCTS];
    if (filters.categories.length > 0) products = products.filter(p => filters.categories.includes(p.category));
    if (filters.fabrics.length > 0) products = products.filter(p => filters.fabrics.includes(p.tag));
    if (filters.occasions.length > 0) products = products.filter(p => filters.occasions.includes(p.occasion));
    if (filters.colors.length > 0) products = products.filter(p => filters.colors.includes(p.color));
    if (filters.priceRange) products = products.filter(p => p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max);
    if (filters.newArrivals) products = products.filter(p => p.isNew);
    if (filters.bestSellers) products = products.filter(p => p.isBest);
    if (sortBy === "price-asc") products.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") products.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") products.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "newest") products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    return products;
  }, [filters, sortBy]);

  const activeFilterCount = filters.categories.length + filters.fabrics.length + filters.occasions.length + filters.colors.length +
    (filters.priceRange ? 1 : 0) + (filters.newArrivals ? 1 : 0) + (filters.bestSellers ? 1 : 0);

  const clearAllFilters = () => setFilters({ categories: [], fabrics: [], occasions: [], colors: [], priceRange: null, newArrivals: false, bestSellers: false });

  const toggleWishlist = (name: string) => {
    setWishlist(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <div className="h-24 md:h-28" />

      {/* Page Header */}
      <div className="border-b border-black/6 bg-white py-8 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#B8973E] font-semibold mb-2">Discover</p>
            <h1 className="font-heading text-3xl md:text-4xl text-[#0A0A0A]">All Collections</h1>
          </div>
          <span className="text-xs text-foreground/40 tracking-wide hidden md:block">{filteredProducts.length} Results</span>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-12 pb-32 pt-8">
        {/* Mobile Filter Bar */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold border border-[#0A0A0A]/15 px-4 py-2.5 hover:border-[#0A0A0A]/40 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters {activeFilterCount > 0 && <span className="bg-[#B8973E] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">{activeFilterCount}</span>}
          </button>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="text-[11px] tracking-wide border border-black/10 px-3 py-2.5 bg-white focus:outline-none focus:border-[#B8973E] transition-colors"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-[70] flex">
            <div className="flex-1 bg-black/40" onClick={() => setMobileFilterOpen(false)} />
            <div className="w-[300px] bg-white h-full overflow-y-auto p-6 shadow-2xl animate-in slide-in-from-right duration-300">
              <div className="flex items-center justify-between mb-8">
                <span className="font-heading text-xl">Filters</span>
                <button onClick={() => setMobileFilterOpen(false)}><X className="w-5 h-5 text-foreground/50" /></button>
              </div>
              <FilterSidebar filters={filters} setFilters={setFilters} />
              <button onClick={() => { clearAllFilters(); setMobileFilterOpen(false); }} className="mt-4 w-full text-[11px] tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors py-2">
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-10 md:gap-14">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-60 shrink-0">
            <div className="sticky top-32 max-h-[calc(100vh-140px)] overflow-y-auto pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="mb-6 text-[11px] tracking-widest uppercase text-[#B8973E] hover:text-[#0A0A0A] transition-colors flex items-center gap-1.5"
                >
                  <X className="w-3 h-3" /> Clear All ({activeFilterCount})
                </button>
              )}
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Sort + Count Bar (desktop) */}
            <div className="hidden md:flex items-center justify-between mb-8 pb-4 border-b border-black/6">
              <span className="text-xs text-foreground/40 tracking-wide">{filteredProducts.length} Results</span>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-foreground/40 uppercase tracking-wide">Sort by</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="text-[11px] border border-black/10 px-3 py-2 bg-white focus:outline-none focus:border-[#B8973E] transition-colors"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-heading text-2xl text-foreground/30 mb-4">No products found</p>
                <button onClick={clearAllFilters} className="text-[11px] uppercase tracking-widest text-[#B8973E] hover:underline">Clear All Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
                {filteredProducts.map((prod, i) => {
                  const slug = prod.name.toLowerCase().replace(/\s+/g, '-');
                  const discount = Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100);
                  return (
                    <div key={i} className="group relative">
                      <Link href={`/product/${slug}`} className="block">
                        <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5] mb-3">
                          <Image
                            src={prod.img}
                            alt={prod.name}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-108"
                            loading="lazy"
                          />
                          {/* Discount badge */}
                          <div className="absolute top-2 left-2 bg-[#0A0A0A] text-white text-[9px] font-bold tracking-wider px-2 py-0.5">
                            {discount}% OFF
                          </div>
                          {prod.isNew && (
                            <div className="absolute top-2 right-10 bg-[#B8973E] text-white text-[9px] font-bold tracking-wider px-2 py-0.5">
                              NEW
                            </div>
                          )}
                          {/* Quick add */}
                          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                            <button className="w-full bg-white/95 text-[#0A0A0A] py-2.5 text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-[#0A0A0A] hover:text-white transition-all duration-300 shadow-lg">
                              Add to Bag
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] tracking-widest text-[#B8973E] uppercase mb-1">{prod.tag}</p>
                          <h4 className="font-sans text-[12px] md:text-sm text-[#0A0A0A] mb-1.5 font-medium leading-snug">{prod.name}</h4>
                          <StarRating rating={prod.rating} reviews={prod.reviews} />
                          <div className="flex items-baseline gap-2 mt-1.5">
                            <span className="text-sm font-semibold text-[#0A0A0A]">₹{prod.price.toLocaleString()}</span>
                            <span className="text-xs text-foreground/30 line-through">₹{prod.originalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                      </Link>
                      {/* Wishlist */}
                      <button
                        onClick={() => toggleWishlist(prod.name)}
                        className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all z-10"
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 transition-colors ${wishlist.includes(prod.name) ? "text-[#B8973E] fill-[#B8973E]" : "text-[#0A0A0A]/50"}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
