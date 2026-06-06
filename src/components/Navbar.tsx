"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useCart } from "./CartContext";

const PRODUCT_CATEGORIES = {
  collections: [
    { name: "Wedding Collections", href: "/products/wedding" },
    { name: "Premium Collections", href: "/products/premium" },
    { name: "Traditional Collections", href: "/products/traditional" },
    { name: "Trending Collections", href: "/products/trending" },
  ],
  womens: [
    { name: "Sarees", href: "/products/sarees" },
    { name: "Kurtis", href: "/products/kurtis" },
    { name: "Kurta Sets", href: "/products/kurta-sets" },
    { name: "Tops & T-Shirts", href: "/products/tops" },
    { name: "Office Wear", href: "/products/office-wear" },
  ],
  kids: [
    { name: "Baby Wear", href: "/products/baby-wear" },
    { name: "Girls Wear", href: "/products/girls-wear" },
    { name: "Party Wear", href: "/products/party-wear" },
    { name: "Ethnic Wear", href: "/products/ethnic-wear" },
    { name: "Casual Wear", href: "/products/casual-wear" },
  ]
};

const ALL_SEARCH_PRODUCTS = [
  { name: "Regal Silk Saree", category: "Sarees", tag: "Silk", href: "/product/regal-silk-saree" },
  { name: "Embroidered Kurti", category: "Kurtis", tag: "Cotton", href: "/product/embroidered-kurti" },
  { name: "Royal Kurta Set", category: "Kurta Sets", tag: "Designer", href: "/product/royal-kurta-set" },
  { name: "Chic Fusion Top", category: "Tops & T-Shirts", tag: "Modern", href: "/product/chic-fusion-top" },
  { name: "Luxury Baby Ensemble", category: "Baby Wear", tag: "Soft Fabric", href: "/product/luxury-baby-ensemble" },
  { name: "Girls Festive Dress", category: "Girls Wear", tag: "Festive", href: "/product/girls-festive-dress" },
  { name: "Party Wear Gown", category: "Party Wear", tag: "Party", href: "/product/party-wear-gown" },
  { name: "Boys Ethnic Suit", category: "Ethnic Wear", tag: "Heritage", href: "/product/boys-ethnic-suit" },
  { name: "Classic Kasavu Saree", category: "Sarees", tag: "Traditional", href: "/product/classic-kasavu-saree" },
  { name: "Bridal Lehenga", category: "Wedding Collections", tag: "Bridal", href: "/product/bridal-lehenga" },
  { name: "Contemporary Drape", category: "Premium Collections", tag: "Premium", href: "/product/contemporary-drape" },
  { name: "Office Formal Kurti", category: "Office Wear", tag: "Office", href: "/product/office-formal-kurti" },
];

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function fuzzySearch(query: string) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return ALL_SEARCH_PRODUCTS.filter(p => {
    const name = p.name.toLowerCase();
    const cat = p.category.toLowerCase();
    const tag = p.tag.toLowerCase();
    if (name.includes(q) || cat.includes(q) || tag.includes(q)) return true;
    // typo tolerance: check each word
    const words = name.split(' ');
    return words.some(w => levenshtein(w, q) <= 2 && q.length > 2);
  }).slice(0, 6);
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof ALL_SEARCH_PRODUCTS>([]);
  const { totalItems } = useCart();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    setSearchResults(fuzzySearch(searchQuery));
  }, [searchQuery]);

  const isHome = pathname === "/";

  // Always black/white, never maroon
  const navBg = (isScrolled || isMegaMenuOpen || !isHome)
    ? "bg-[#0A0A0A]/98 backdrop-blur-sm shadow-lg shadow-black/20"
    : "bg-transparent";

  const textColor = "text-white";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
        onMouseLeave={() => setIsMegaMenuOpen(false)}
      >
        {/* Top announcement bar */}
        {!isScrolled && isHome && (
          <div className="hidden md:block bg-[#0A0A0A] text-white/60 text-[10px] tracking-widest uppercase text-center py-2 border-b border-white/5">
            Free shipping across India on all orders
          </div>
        )}

        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50 h-28 group shrink-0">
            <Image
              src="/logo-new.png"
              alt="Orchid Designs"
              width={260}
              height={130}
              className="h-24 w-auto object-contain transition-all duration-300 group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 h-full">
            <Link
              href="/"
              className={`text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-200 hover:text-[#D4AF6A] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#D4AF6A] after:transition-all after:duration-300 hover:after:w-full ${textColor}`}
            >
              Home
            </Link>
            
            <div
              className={`h-full flex items-center cursor-pointer text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-200 hover:text-[#D4AF6A] relative group ${textColor}`}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <span className="flex items-center gap-1.5">
                Products
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </span>
            </div>

            <Link
              href="/services"
              className={`text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-200 hover:text-[#D4AF6A] ${textColor}`}
            >
              Services
            </Link>
            <Link
              href="/about"
              className={`text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-200 hover:text-[#D4AF6A] ${textColor}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-200 hover:text-[#D4AF6A] ${textColor}`}
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className={`flex items-center gap-5 z-50 ${textColor}`}>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/_orchid_designs_by_kunjus?utm_source=qr&igsh=MWxjZDZpZXJpNzNvbg=="
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex hover:text-[#D4AF6A] transition-colors duration-200"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>

            {/* Search */}
            <button
              className="hover:text-[#D4AF6A] transition-colors duration-200"
              aria-label="Search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <Link href="/wishlist" className="hidden sm:block hover:text-[#D4AF6A] transition-colors duration-200">
              <Heart className="w-5 h-5" strokeWidth={1.5} />
            </Link>

            <Link href="/cart" className="hover:text-[#D4AF6A] transition-colors duration-200 flex items-center gap-1 relative">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 text-[9px] font-bold bg-[#B8973E] text-white w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden hover:text-[#D4AF6A] transition-colors ml-1"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isSearchOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
          <div className="bg-[#0A0A0A] border-t border-white/10 px-6 md:px-12 py-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 border-b border-white/20 pb-3">
                <Search className="w-5 h-5 text-white/40 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products, categories, collections..."
                  className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm focus:outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-white/40 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {searchResults.length > 0 ? (
                <div className="mt-4 space-y-1">
                  {searchResults.map((r, i) => (
                    <Link
                      key={i}
                      href={r.href}
                      onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                      className="flex items-center justify-between py-3 px-2 text-white/70 hover:text-[#D4AF6A] hover:bg-white/5 transition-all group"
                    >
                      <span className="text-sm">{r.name}</span>
                      <span className="text-xs text-white/30 group-hover:text-[#D4AF6A]/60">{r.category}</span>
                    </Link>
                  ))}
                </div>
              ) : searchQuery.length > 1 ? (
                <p className="mt-4 text-white/30 text-sm">No results found for "{searchQuery}"</p>
              ) : (
                <div className="mt-4 flex gap-4 flex-wrap">
                  {["Sarees", "Kurtis", "Wedding", "Kids", "Office Wear"].map(s => (
                    <button
                      key={s}
                      onClick={() => setSearchQuery(s)}
                      className="text-xs text-white/40 border border-white/10 px-3 py-1.5 hover:border-[#D4AF6A]/50 hover:text-[#D4AF6A] transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <div
          className={`absolute top-full left-0 w-full bg-white border-b border-black/5 overflow-hidden transition-all duration-500 ease-in-out ${
            isMegaMenuOpen ? "max-h-[500px] opacity-100 shadow-2xl" : "max-h-0 opacity-0"
          }`}
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <div className="container mx-auto px-6 md:px-12 py-12 flex gap-16">
            <div className="flex-1">
              <h3 className="font-heading text-xl mb-6 border-b border-black/8 pb-3 text-[#0A0A0A]">Collections</h3>
              <ul className="space-y-4">
                {PRODUCT_CATEGORIES.collections.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-foreground/60 hover:text-[#B8973E] hover:translate-x-1.5 inline-block transition-all duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1">
              <h3 className="font-heading text-xl mb-6 border-b border-black/8 pb-3 text-[#0A0A0A]">Women's Wear</h3>
              <ul className="space-y-4">
                {PRODUCT_CATEGORIES.womens.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-foreground/60 hover:text-[#B8973E] hover:translate-x-1.5 inline-block transition-all duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1">
              <h3 className="font-heading text-xl mb-6 border-b border-black/8 pb-3 text-[#0A0A0A]">Kids Wear</h3>
              <ul className="space-y-4">
                {PRODUCT_CATEGORIES.kids.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-foreground/60 hover:text-[#B8973E] hover:translate-x-1.5 inline-block transition-all duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Image */}
            <div className="flex-[1.5] relative h-[260px] group overflow-hidden cursor-pointer bg-[#F5F5F5]">
              <Image
                src="/images/category_womens_sarees_1780477985126.png"
                alt="New Arrivals"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase mb-3 text-white/80">New Arrival</span>
                <h4 className="font-heading text-3xl text-white">Bridal Couture</h4>
                <div className="mt-4 w-10 h-px bg-[#D4AF6A]" />
              </div>
              <Link href="/products" className="absolute inset-0 z-10">
                <span className="sr-only">View All</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col pt-0 overflow-y-auto">
          <div className="flex items-center justify-between px-6 h-28 border-b border-white/10">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Image src="/logo-new.png" alt="Orchid Designs" width={200} height={100} className="h-20 w-auto object-contain" />
            </Link>
            <button
              className="text-white/70 hover:text-white p-2"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X className="w-7 h-7" strokeWidth={1} />
            </button>
          </div>

          <div className="flex flex-col gap-0 px-6 pt-8 pb-20">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-heading text-2xl text-white border-b border-white/10 py-5">Home</Link>
            
            <div className="border-b border-white/10 py-5">
              <span className="font-heading text-2xl text-white block mb-5">Products</span>
              <div className="pl-4 flex flex-col gap-0">
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF6A] mb-3 font-semibold">Collections</div>
                {PRODUCT_CATEGORIES.collections.map(l => (
                  <Link key={l.name} href={l.href} onClick={() => setIsMobileMenuOpen(false)} className="text-base text-white/70 hover:text-white py-2 transition-colors">
                    {l.name}
                  </Link>
                ))}
                
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF6A] mt-6 mb-3 font-semibold">Women's Wear</div>
                {PRODUCT_CATEGORIES.womens.map(l => (
                  <Link key={l.name} href={l.href} onClick={() => setIsMobileMenuOpen(false)} className="text-base text-white/70 hover:text-white py-2 transition-colors">
                    {l.name}
                  </Link>
                ))}
                
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF6A] mt-6 mb-3 font-semibold">Kids Wear</div>
                {PRODUCT_CATEGORIES.kids.map(l => (
                  <Link key={l.name} href={l.href} onClick={() => setIsMobileMenuOpen(false)} className="text-base text-white/70 hover:text-white py-2 transition-colors">
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="font-heading text-2xl text-white border-b border-white/10 py-5">Services</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="font-heading text-2xl text-white border-b border-white/10 py-5">About</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="font-heading text-2xl text-white border-b border-white/10 py-5">Contact</Link>

            <div className="flex items-center gap-6 mt-8">
              <a href="https://www.instagram.com/_orchid_designs_by_kunjus?utm_source=qr&igsh=MWxjZDZpZXJpNzNvbg==" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#D4AF6A] transition-colors">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 hover:text-[#D4AF6A] transition-colors">
                <Heart className="w-6 h-6" strokeWidth={1.5} />
              </Link>
              <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 hover:text-[#D4AF6A] transition-colors">
                <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
