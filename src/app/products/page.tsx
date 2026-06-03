"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

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

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="h-32"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-[1800px] flex flex-col md:flex-row gap-12 pb-32">
        
        {/* Sidebar Filter */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-32 max-h-[calc(100vh-160px)] overflow-y-auto overscroll-contain pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <AccordionGroup title="WOMEN'S WEAR" items={CATEGORY_GROUPS[1].items} isOpenDefault={true} />
            <AccordionGroup title="KIDS WEAR" items={CATEGORY_GROUPS[2].items} isOpenDefault={true} />
            <AccordionGroup title="COLLECTIONS" items={CATEGORY_GROUPS[0].items} isOpenDefault={false} />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/5">
            <h1 className="font-heading text-3xl font-medium">All Products</h1>
            <span className="text-xs tracking-widest uppercase text-foreground/50">{ALL_PRODUCTS.length} Results</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {ALL_PRODUCTS.map((prod, i) => (
              <Link href={`/product/${prod.name.toLowerCase().replace(/\s+/g, '-')}`} key={i} className="group cursor-pointer block">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
                  <Image
                    src={prod.img}
                    alt={prod.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Quick Add Hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                    <button className="w-full bg-white/90 backdrop-blur-sm text-black py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary hover:text-white transition-colors shadow-lg">
                      Add to Bag
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-sans text-xs md:text-sm tracking-wide text-foreground uppercase mb-1">{prod.name}</h4>
                    <p className="font-sans text-foreground/50 text-xs">{prod.tag}</p>
                  </div>
                  <p className="font-sans text-foreground/80 text-sm font-medium">₹{prod.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
      </div>
      
    </main>
  );
}
