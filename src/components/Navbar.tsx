"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "./Logo";
import { useCart } from "./CartContext";

gsap.registerPlugin(ScrollTrigger);

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
  ],
  kids: [
    { name: "Baby Wear", href: "/products/baby-wear" },
    { name: "Girls Wear", href: "/products/girls-wear" },
    { name: "Party Wear", href: "/products/party-wear" },
    { name: "Ethnic Wear", href: "/products/ethnic-wear" },
    { name: "Casual Wear", href: "/products/casual-wear" },
  ]
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount to check initial scroll position
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  const navBackground = (isScrolled || isMegaMenuOpen)
    ? "bg-[#921a40] shadow-lg"
    : isHome
    ? "bg-transparent"
    : "bg-[#921a40]";

  const textColor = "text-white";

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}
        onMouseLeave={() => setIsMegaMenuOpen(false)}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          {/* Logo — transparent on hero, maroon bg when scrolled */}
          <Link href="/" className="flex items-center z-50 h-20 group">
            {(!isScrolled && !isMegaMenuOpen && isHome) ? (
              <Image src="/logo2.png" alt="Orchid Designs" width={140} height={80} className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105" priority />
            ) : (
              <Image src="/logo.png" alt="Orchid Designs" width={140} height={80} className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105" priority />
            )}
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-10 h-full">
            <Link
              href="/"
              className={`text-xs font-semibold tracking-widest uppercase transition-colors hover:text-primary relative group ${textColor}`}
            >
              Home
            </Link>
            
            {/* Products Dropdown Trigger */}
            <div 
              className={`h-full flex items-center cursor-pointer text-xs font-semibold tracking-widest uppercase transition-colors hover:text-primary relative group ${textColor}`}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <span className="flex items-center gap-1">
                Products <ChevronDown className="w-3 h-3" />
              </span>
            </div>

            <Link
              href="/services"
              className={`text-xs font-semibold tracking-widest uppercase transition-colors hover:text-primary relative group ${textColor}`}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className={`text-xs font-semibold tracking-widest uppercase transition-colors hover:text-primary relative group ${textColor}`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Actions */}
          <div className={`flex items-center gap-6 z-50 ${textColor}`}>
            <button className="hover:text-primary transition-colors" aria-label="Search">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <Link href="/wishlist" className="hidden sm:block hover:text-primary transition-colors">
              <Heart className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link href="/cart" className="hover:text-primary transition-colors flex items-center gap-1 relative">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="text-[10px] font-bold bg-white text-[#921a40] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden hover:text-primary transition-colors ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <div 
          className={`absolute top-full left-0 w-full bg-white border-b border-black/5 overflow-hidden transition-all duration-500 ease-in-out ${
            isMegaMenuOpen ? "max-h-[500px] opacity-100 shadow-xl" : "max-h-0 opacity-0"
          }`}
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <div className="container mx-auto px-6 md:px-12 py-12 flex gap-16">
            
            {/* Columns */}
            <div className="flex-1">
              <h3 className="font-heading text-xl mb-6 border-b border-black/10 pb-2">Collections</h3>
              <ul className="space-y-4">
                {PRODUCT_CATEGORIES.collections.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-foreground/70 hover:text-primary hover:translate-x-1 inline-block transition-all">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1">
              <h3 className="font-heading text-xl mb-6 border-b border-black/10 pb-2">Women's Wear</h3>
              <ul className="space-y-4">
                {PRODUCT_CATEGORIES.womens.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-foreground/70 hover:text-primary hover:translate-x-1 inline-block transition-all">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1">
              <h3 className="font-heading text-xl mb-6 border-b border-black/10 pb-2">Kids Wear</h3>
              <ul className="space-y-4">
                {PRODUCT_CATEGORIES.kids.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-foreground/70 hover:text-primary hover:translate-x-1 inline-block transition-all">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Image in Mega Menu */}
            <div className="flex-[1.5] relative h-[250px] group overflow-hidden cursor-pointer bg-secondary">
              <Image 
                src="/images/category_womens_sarees_1780477985126.png" 
                alt="New Arrivals" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="font-sans text-xs tracking-widest uppercase mb-2">New Arrival</span>
                <h4 className="font-heading text-3xl">Bridal Couture</h4>
              </div>
              <Link href="/products" className="absolute inset-0 z-10"><span className="sr-only">View All</span></Link>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col pt-20 px-6 overflow-y-auto animate-in fade-in duration-300">
          <button
            className="absolute top-6 right-6 text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X className="w-8 h-8" strokeWidth={1} />
          </button>
          
          <div className="flex flex-col gap-6 mt-6 pb-20">
            <Link href="/" className="font-heading text-3xl text-foreground border-b border-black/10 pb-4">Home</Link>
            
            <div className="flex flex-col gap-4 border-b border-black/10 pb-4">
              <span className="font-heading text-3xl text-foreground">Products</span>
              <div className="pl-4 flex flex-col gap-4 mt-2">
                <div className="text-xs tracking-widest uppercase text-foreground/50">Collections</div>
                {PRODUCT_CATEGORIES.collections.map(l => <Link key={l.name} href={l.href} className="text-lg text-foreground/80">{l.name}</Link>)}
                
                <div className="text-xs tracking-widest uppercase text-foreground/50 mt-2">Women's Wear</div>
                {PRODUCT_CATEGORIES.womens.map(l => <Link key={l.name} href={l.href} className="text-lg text-foreground/80">{l.name}</Link>)}
                
                <div className="text-xs tracking-widest uppercase text-foreground/50 mt-2">Kids Wear</div>
                {PRODUCT_CATEGORIES.kids.map(l => <Link key={l.name} href={l.href} className="text-lg text-foreground/80">{l.name}</Link>)}
              </div>
            </div>

            <Link href="/services" className="font-heading text-3xl text-foreground border-b border-black/10 pb-4">Services</Link>
            <Link href="/contact" className="font-heading text-3xl text-foreground border-b border-black/10 pb-4">Contact Us</Link>
          </div>
        </div>
      )}
    </>
  );
}
