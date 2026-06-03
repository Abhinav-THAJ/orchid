"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import { Truck, ShieldCheck, Gem, RefreshCw, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Animations
    if (heroTextRef.current) {
      const chars = heroTextRef.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "power4.out", delay: 0.2 }
      );
    }
    
    // Parallax on hero image
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector("img"), {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Story Section Animations
    if (storyRef.current) {
      gsap.fromTo(
        storyRef.current.querySelectorAll(".story-reveal"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  const heroImage = "/images/hero_luxury_saree_1780477829399.png";
  const brandStoryImage = "/images/brand_story_1780477925012.png";
  
  const featuredCollections = [
    { title: "Wedding Collections", image: "/images/collection_wedding_1780477845042.png", link: "/products/wedding" },
    { title: "Premium Collections", image: "/images/collection_premium_1780477860938.png", link: "/products/premium" },
    { title: "Traditional Collections", image: "/images/collection_traditional_1780477879187.png", link: "/products/traditional" },
    { title: "Trending Collections", image: "/images/collection_trending_1780477905998.png", link: "/products/trending" },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-[#111]">
        <Image
          src={heroImage}
          alt="Luxury Bridal Saree"
          fill
          className="object-cover object-center opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        <div ref={heroTextRef} className="overflow-hidden mb-4 px-4">
            <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-medium tracking-tight">
              {"ORCHID DESIGNS".split("").map((char, i) => (
                <span key={i} className="char inline-block">{char === " " ? "\u00A0" : char}</span>
              ))}
            </h1>
          </div>
          <p className="text-white/90 text-sm md:text-xl font-sans font-light tracking-widest uppercase max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700 fill-mode-both px-4">
            Elegance Woven Into Every Thread
          </p>
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000 fill-mode-both">
            <Link 
              href="/products" 
              className="inline-block bg-white text-black px-10 py-4 uppercase tracking-widest text-sm hover:bg-white/90 transition-colors font-medium"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Products Preview Section (Moved just under Hero) */}
      <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground font-medium">New Arrivals</h2>
          <Link href="/products" className="text-foreground border-b border-foreground pb-1 text-sm uppercase tracking-widest hover:text-primary hover:border-primary transition-colors hidden md:block">
            Shop All
          </Link>
        </div>

        {/* First Row: 4 Products */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-24">
          {[
            { img: "/images/category_womens_sarees_1780477985126.png", name: "Regal Silk Saree", price: "₹35,000", tag: "Silk" },
            { img: "/images/category_womens_kurtis_1780478001731.png", name: "Embroidered Kurti", price: "₹12,500", tag: "Cotton" },
            { img: "/images/category_womens_kurta_sets_1780478021874.png", name: "Royal Kurta Set", price: "₹28,000", tag: "Designer" },
            { img: "/images/category_womens_tops_1780478037830.png", name: "Chic Fusion Top", price: "₹8,900", tag: "Modern" },
          ].map((prod, i) => (
            <Link href={`/product/${prod.name.toLowerCase().replace(/\s+/g, '-')}`} key={i} className="group cursor-pointer block">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
                <Image
                  src={prod.img}
                  alt={prod.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
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
                <p className="font-sans text-foreground/80 text-sm font-medium">{prod.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Large Campaign Banner 1 */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-24 group">
          <Image
            src="/images/collection_wedding_1780477845042.png"
            alt="Wedding Campaign"
            fill
            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24">
            <span className="text-white/80 tracking-widest text-xs uppercase mb-4 font-sans">The Bridal Edit</span>
            <h3 className="font-heading text-4xl md:text-6xl text-white font-medium tracking-wide mb-8">Timeless Elegance</h3>
            <Link href="/products/wedding" className="bg-white text-black px-8 py-3 uppercase tracking-widest text-xs font-medium hover:bg-black hover:text-white transition-colors">
              Discover More
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-end mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground font-medium">Kids Collection</h2>
        </div>

        {/* Second Row: 4 Products */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-24">
          {[
            { img: "/images/category_kids_baby_wear_1780478061079.png", name: "Luxury Baby Ensemble", price: "₹6,500", tag: "Soft Fabric" },
            { img: "/images/category_kids_girls_wear_1780478079175.png", name: "Girls Festive Dress", price: "₹9,000", tag: "Festive" },
            { img: "/images/category_kids_party_wear_1780478097124.png", name: "Party Wear Gown", price: "₹14,500", tag: "Party" },
            { img: "/images/category_kids_ethnic_wear_1780478114692.png", name: "Boys Ethnic Suit", price: "₹11,000", tag: "Heritage" },
          ].map((prod, i) => (
            <Link href={`/product/${prod.name.toLowerCase().replace(/\s+/g, '-')}`} key={i} className="group cursor-pointer block">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
                <Image
                  src={prod.img}
                  alt={prod.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
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
                <p className="font-sans text-foreground/80 text-sm font-medium">{prod.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Large Campaign Banner 2 */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden group">
          <Image
            src="/images/collection_premium_1780477860938.png"
            alt="Modern Elegance Campaign"
            fill
            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="font-heading text-4xl md:text-6xl text-white font-medium tracking-wide mb-8">Modern Indian Elegance</h3>
            <Link href="/products/premium" className="bg-transparent border border-white text-white px-8 py-3 uppercase tracking-widest text-xs font-medium hover:bg-white hover:text-black transition-colors">
              Shop The Campaign
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section ref={storyRef} className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="w-full md:w-1/2 h-[350px] md:h-[600px] relative story-reveal overflow-hidden">
            <Image
              src={brandStoryImage}
              alt="Brand Craftsmanship"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-8 story-reveal">
            <h2 className="font-heading text-4xl md:text-6xl text-foreground font-medium leading-tight">
              The Essence of <br /> Luxury Heritage
            </h2>
            <p className="text-foreground/70 text-lg font-light leading-relaxed max-w-lg">
              At Orchid Designs, we believe in the timeless beauty of Indian craftsmanship. 
              Our collections are a tribute to the rich heritage of Kerala, reimagined with modern elegance for the contemporary aesthetic.
            </p>
            <p className="text-foreground/70 text-lg font-light leading-relaxed max-w-lg">
              Every piece is a work of art, meticulously handcrafted to bring out the royal essence in you. 
              Experience fashion that speaks the language of luxury.
            </p>
            <div>
              <Link 
                href="/about" 
                className="inline-block border-b border-foreground pb-1 text-foreground uppercase tracking-widest text-sm hover:text-primary hover:border-primary transition-colors"
              >
                Discover Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20">
        {featuredCollections.map((collection, index) => (
          <div key={index} className="group relative h-[50vh] md:h-[80vh] w-full overflow-hidden mb-4 last:mb-0">
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h3 className="font-heading text-5xl md:text-7xl text-white font-medium tracking-tight translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                {collection.title}
              </h3>
            </div>
            <Link href={collection.link} className="absolute inset-0 z-20">
              <span className="sr-only">View {collection.title}</span>
            </Link>
          </div>
        ))}
      </section>
      
      {/* E-commerce Value Propositions */}
      <section className="py-16 px-6 border-y border-black/10 bg-secondary/30">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-black/10">
          <div className="flex flex-col items-center text-center px-4 py-4 md:py-0">
            <Truck className="w-8 h-8 mb-4 text-foreground/80" strokeWidth={1.5} />
            <h4 className="font-heading text-xl mb-2 text-foreground">Complimentary Shipping</h4>
            <p className="font-sans text-xs text-foreground/60 leading-relaxed">Enjoy free express delivery on all orders across India.</p>
          </div>
          <div className="flex flex-col items-center text-center px-4 py-4 md:py-0">
            <Gem className="w-8 h-8 mb-4 text-foreground/80" strokeWidth={1.5} />
            <h4 className="font-heading text-xl mb-2 text-foreground">Artisanal Quality</h4>
            <p className="font-sans text-xs text-foreground/60 leading-relaxed">Meticulously handcrafted using premium, authentic materials.</p>
          </div>
          <div className="flex flex-col items-center text-center px-4 py-4 md:py-0">
            <ShieldCheck className="w-8 h-8 mb-4 text-foreground/80" strokeWidth={1.5} />
            <h4 className="font-heading text-xl mb-2 text-foreground">Secure Payments</h4>
            <p className="font-sans text-xs text-foreground/60 leading-relaxed">Encrypted transactions for a seamless checkout experience.</p>
          </div>
          <div className="flex flex-col items-center text-center px-4 py-4 md:py-0">
            <RefreshCw className="w-8 h-8 mb-4 text-foreground/80" strokeWidth={1.5} />
            <h4 className="font-heading text-xl mb-2 text-foreground">Easy Returns</h4>
            <p className="font-sans text-xs text-foreground/60 leading-relaxed">14-day hassle-free returns on all unworn items.</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 px-6 bg-[#FAF7F4]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-sans text-xs tracking-widest uppercase text-foreground/60 mb-4 block">The Orchid Club</span>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground font-medium mb-6">Join The Inner Circle</h2>
          <p className="font-sans text-sm text-foreground/70 mb-12 max-w-lg mx-auto leading-relaxed">
            Subscribe to receive exclusive access to new collections, early sale previews, and 10% off your first purchase.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-transparent border-b border-foreground/30 px-4 py-3 text-sm focus:outline-none focus:border-foreground placeholder:text-foreground/40 transition-colors rounded-none"
              required
            />
            <button type="submit" className="bg-foreground text-background px-8 py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary transition-colors flex items-center justify-center gap-2">
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary tracking-widest text-sm uppercase font-semibold mb-8 block">Client Stories</span>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground font-medium leading-tight mb-12">
            "Orchid Designs created the most magical ensemble for my wedding. The craftsmanship and attention to detail are truly world-class, making me feel like royalty."
          </h2>
          <p className="font-sans text-sm tracking-widest uppercase text-foreground/60">— Ananya S., Kerala</p>
        </div>
      </section>
      
    </main>
  );
}
