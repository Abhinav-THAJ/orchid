"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";

const CATEGORY_GROUPS = [
  {
    title: "COLLECTIONS",
    items: [
      { name: "Wedding Collections", count: 124, href: "/products/wedding" },
      { name: "Premium Collections", count: 86, href: "/products/premium" },
      { name: "Traditional Collections", count: 210, href: "/products/traditional" },
      { name: "Trending Collections", count: 45, href: "/products/trending" },
    ]
  },
  {
    title: "WOMEN'S WEAR",
    items: [
      { name: "Sarees", count: 367, href: "/products/sarees" },
      { name: "Kurtis", count: 142, href: "/products/kurtis" },
      { name: "Kurta Sets", count: 89, href: "/products/kurta-sets" },
      { name: "Tops & T-Shirts", count: 214, href: "/products/tops" },
    ]
  },
  {
    title: "KIDS WEAR",
    items: [
      { name: "Baby Wear", count: 76, href: "/products/baby-wear" },
      { name: "Girls Wear", count: 112, href: "/products/girls-wear" },
      { name: "Party Wear", count: 45, href: "/products/party-wear" },
      { name: "Ethnic Wear", count: 88, href: "/products/ethnic-wear" },
      { name: "Casual Wear", count: 156, href: "/products/casual-wear" },
    ]
  }
];

const ALL_PRODUCTS = [
  { name: "Regal Silk Saree", price: "35,000", img: "/images/category_womens_sarees_1780477985126.png", tag: "Silk" },
  { name: "Embroidered Kurti", price: "12,500", img: "/images/category_womens_kurtis_1780478001731.png", tag: "Cotton" },
  { name: "Royal Kurta Set", price: "28,000", img: "/images/category_womens_kurta_sets_1780478021874.png", tag: "Designer" },
  { name: "Chic Fusion Top", price: "8,900", img: "/images/category_womens_tops_1780478037830.png", tag: "Modern" },
  { name: "Luxury Baby Ensemble", price: "6,500", img: "/images/category_kids_baby_wear_1780478061079.png", tag: "Soft Fabric" },
  { name: "Girls Festive Dress", price: "9,000", img: "/images/category_kids_girls_wear_1780478079175.png", tag: "Festive" },
  { name: "Party Wear Gown", price: "14,500", img: "/images/category_kids_party_wear_1780478097124.png", tag: "Party" },
  { name: "Boys Ethnic Suit", price: "11,000", img: "/images/category_kids_ethnic_wear_1780478114692.png", tag: "Heritage" },
  { name: "Classic Kasavu Saree", price: "18,000", img: "/images/collection_traditional_1780477879187.png", tag: "Traditional" },
  { name: "Bridal Lehenga", price: "85,000", img: "/images/collection_wedding_1780477845042.png", tag: "Bridal" },
  { name: "Contemporary Drape", price: "24,000", img: "/images/collection_premium_1780477860938.png", tag: "Premium" },
  { name: "Lookbook Exclusives", price: "42,000", img: "/images/lookbook_1_1780477942278.png", tag: "Editorial" },
];

function AccordionGroup({ title, items, isOpenDefault = true }: { title: string, items: any[], isOpenDefault?: boolean }) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="mb-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-[13px] font-bold text-foreground/80 tracking-widest uppercase mb-4"
      >
        {title}
        {isOpen ? <ChevronUp className="w-4 h-4 text-foreground/40" /> : <ChevronDown className="w-4 h-4 text-foreground/40" />}
      </button>
      
      {isOpen && (
        <>
          <div className="w-full h-[1px] bg-black/5 mb-4" />
          <ul className="space-y-4">
            {items.map((item, idx) => (
              <li key={idx}>
                <Link href={item.href || "#"} className="flex items-center group cursor-pointer">
                  <span className="text-[13px] font-semibold text-foreground/70 group-hover:text-primary transition-colors shrink-0">
                    {item.name}
                  </span>
                  <span className="flex-1 border-b border-foreground/10 mx-4" />
                  <span className="text-[12px] font-bold text-foreground/80 shrink-0">
                    {item.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function CategoryPage() {
  const params = useParams();
  const categoryStr = params.category as string || "";
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  const title = categoryStr 
    ? categoryStr.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
    : "Collection";

  // Filter products based on the URL category
  const filtered = ALL_PRODUCTS.filter(p => {
    const searchStr = categoryStr.replace('-', ' ').toLowerCase();
    const searchImg = categoryStr.replace('-', '_').toLowerCase();
    return (
      p.name.toLowerCase().includes(searchStr) ||
      p.tag.toLowerCase().includes(searchStr) ||
      p.img.toLowerCase().includes(searchImg) ||
      // Fallback aliases for better matching
      (searchStr === 'sarees' && (p.name.includes('Saree') || p.name.includes('Drape'))) ||
      (searchStr === 'kurtis' && p.name.includes('Kurti')) ||
      (searchStr === 'kurta sets' && p.name.includes('Kurta Set')) ||
      (searchStr === 'tops' && p.name.includes('Top')) ||
      (searchStr === 'wedding' && (p.tag === 'Bridal' || p.name.includes('Saree'))) ||
      (searchStr.includes('kids') && p.img.includes('kids')) ||
      (searchStr.includes('baby') && p.img.includes('baby')) ||
      (searchStr.includes('girls') && p.img.includes('girls'))
    );
  });

  // If no products match, fallback to some items so the page isn't empty
  const baseProducts = filtered.length > 0 ? filtered : ALL_PRODUCTS.slice(0, 4);
  
  // Duplicate products to simulate a full store catalog grid (e.g. 8 items)
  const displayProducts = [...baseProducts, ...baseProducts, ...baseProducts, ...baseProducts].slice(0, 8);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="h-24 md:h-32"></div>

      <div className="container mx-auto px-4 md:px-12 max-w-[1800px] pb-32">

        {/* Mobile Filter Bar */}
        <div className="flex items-center justify-between mb-6 md:hidden border-b border-black/10 pb-4">
          <h1 className="font-heading text-2xl font-medium">{title}</h1>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold border border-black/20 px-4 py-2"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filter
          </button>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-[70] flex">
            <div className="flex-1 bg-black/40" onClick={() => setMobileFilterOpen(false)} />
            <div className="w-[300px] bg-white h-full overflow-y-auto p-6 shadow-2xl animate-in slide-in-from-right duration-300">
              <div className="flex items-center justify-between mb-8">
                <span className="font-heading text-xl">Filters</span>
                <button onClick={() => setMobileFilterOpen(false)}><X className="w-6 h-6 text-foreground/60" /></button>
              </div>
              <AccordionGroup title="WOMEN'S WEAR" items={CATEGORY_GROUPS[1].items} isOpenDefault={true} />
              <AccordionGroup title="KIDS WEAR" items={CATEGORY_GROUPS[2].items} isOpenDefault={true} />
              <AccordionGroup title="COLLECTIONS" items={CATEGORY_GROUPS[0].items} isOpenDefault={false} />
            </div>
          </div>
        )}

        <div className="flex gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-32 max-h-[calc(100vh-160px)] overflow-y-auto overscroll-contain pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <AccordionGroup title="WOMEN'S WEAR" items={CATEGORY_GROUPS[1].items} isOpenDefault={true} />
              <AccordionGroup title="KIDS WEAR" items={CATEGORY_GROUPS[2].items} isOpenDefault={true} />
              <AccordionGroup title="COLLECTIONS" items={CATEGORY_GROUPS[0].items} isOpenDefault={false} />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="hidden md:flex items-center justify-between mb-8 pb-4 border-b border-black/5">
              <h1 className="font-heading text-3xl font-medium">{title}</h1>
              <span className="text-xs tracking-widest uppercase text-foreground/50">{displayProducts.length} Results</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
              {displayProducts.map((prod, i) => (
                <Link href={`/product/${prod.name.toLowerCase().replace(/\s+/g, '-')}`} key={i} className="group cursor-pointer block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-3 md:mb-4">
                    <Image src={prod.img} alt={prod.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                      <button className="w-full bg-white/90 backdrop-blur-sm text-black py-2 md:py-3 text-[10px] md:text-xs tracking-widest uppercase font-medium hover:bg-primary hover:text-white transition-colors shadow-lg">Add to Bag</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-1">
                    <div className="min-w-0">
                      <h4 className="font-sans text-[11px] md:text-sm tracking-wide text-foreground uppercase mb-1 truncate">{prod.name}</h4>
                      <p className="font-sans text-foreground/50 text-[10px] md:text-xs">{prod.tag}</p>
                    </div>
                    <p className="font-sans text-foreground/80 text-xs md:text-sm font-medium shrink-0">₹{prod.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
