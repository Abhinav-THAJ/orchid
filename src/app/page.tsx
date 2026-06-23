"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import {
  Truck, ShieldCheck, Gem, Star, ArrowRight, ArrowLeft, ChevronRight
} from "lucide-react";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

const INSTAGRAM_POSTS = [
  "/images/category_womens_sarees_1780477985126.png",
  "/images/collection_wedding_1780477845042.png",
  "/images/category_womens_kurtis_1780478001731.png",
  "/images/lookbook_1_1780477942278.png",
  "/images/category_womens_kurta_sets_1780478021874.png",
  "/images/collection_premium_1780477860938.png",
];

const TESTIMONIALS = [
  {
    quote: "Orchid Designs created the most magical ensemble for my wedding. The craftsmanship and attention to detail are truly world-class, making me feel like royalty.",
    author: "Ananya S., Kerala",
    rating: 5,
  },
  {
    quote: "The quality of the silk and the intricacy of the embroidery exceeded all my expectations. Every piece tells a story of heritage and luxury.",
    author: "Priya R., Mumbai",
    rating: 5,
  },
  {
    quote: "Wearing their traditional collection made me feel connected to my roots while looking effortlessly modern. Absolutely stunning work.",
    author: "Meera K., Bangalore",
    rating: 5,
  },
  {
    quote: "From the personalized service to the final fitting, the entire experience was impeccable. Orchid Designs is my go-to for luxury ethnic wear.",
    author: "Divya M., Delhi",
    rating: 5,
  }
];

function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 bg-[#FAFAFA] relative overflow-hidden">
      {/* Decorative quotes background */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[300px] leading-none font-heading text-[#0A0A0A]/[0.03] pointer-events-none select-none italic font-serif">
        "
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#B8973E] font-semibold mb-12 block">Client Stories</span>
        
        <div className="relative min-h-[350px] md:min-h-[220px]">
          {TESTIMONIALS.map((testimonial, i) => {
            const isActive = i === currentIndex;
            return (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                }`}
              >
                <div className="flex justify-center mb-6 md:mb-8 gap-1">
                  {[...Array(testimonial.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 md:w-5 md:h-5 text-[#B8973E] fill-[#B8973E]" />
                  ))}
                </div>
                <h2 className="font-heading text-2xl md:text-4xl lg:text-4xl text-[#0A0A0A] font-normal leading-relaxed md:leading-relaxed mb-8 md:mb-10 italic max-w-4xl mx-auto px-4">
                  "{testimonial.quote}"
                </h2>
                <p className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#0A0A0A]/50 font-medium">
                  — {testimonial.author}
                </p>
              </div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-3 mt-8 md:mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-500 rounded-full ${
                i === currentIndex ? "w-8 h-1 bg-[#D4AF6A]" : "w-1.5 h-1.5 bg-black/15 hover:bg-[#D4AF6A]/50"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(s => (
          <Star
            key={s}
            className={`w-3 h-3 ${s <= Math.round(rating) ? "text-[#B8973E] fill-[#B8973E]" : "text-gray-200 fill-gray-200"}`}
          />
        ))}
      </div>
      <span className="text-[11px] text-foreground/40">({reviews})</span>
    </div>
  );
}

function ProductCard({ prod }: { prod: any }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group relative">
      <Link href={prod.href} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5] mb-4">
          <Image
            src={prod.img}
            alt={prod.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-108"
            loading="lazy"
          />
          {/* Discount badge */}
          {prod.originalPrice > prod.price && (
            <div className="absolute top-3 left-3 bg-[#0A0A0A] text-white text-[10px] font-bold tracking-wider px-2.5 py-1">
              {Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}% OFF
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
          {/* Quick view button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out z-20">
            <button className="w-full bg-white/95 backdrop-blur-sm text-[#0A0A0A] py-3 text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-[#0A0A0A] hover:text-white transition-all duration-300 shadow-lg">
              Add to Bag
            </button>
          </div>
        </div>

        <div>
          <p className="text-[10px] tracking-widest text-[#B8973E] uppercase mb-1">{prod.tag}</p>
          <h4 className="font-sans text-sm text-[#0A0A0A] mb-1.5 font-medium">{prod.name}</h4>
          <StarRating rating={prod.rating} reviews={prod.reviews} />
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-sm font-semibold text-[#0A0A0A]">₹{prod.price?.toLocaleString()}</span>
            {prod.originalPrice > prod.price && (
              <span className="text-xs text-foreground/35 line-through">₹{prod.originalPrice?.toLocaleString()}</span>
            )}
          </div>
          {prod.stockCount && prod.stockCount < 5 && (
            <p className="text-[11px] text-[#D84545] mt-1.5 font-medium tracking-wide">
              Only {prod.stockCount} left in stock
            </p>
          )}
        </div>
      </Link>

      {/* Wishlist button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all z-10"
        aria-label="Add to Wishlist"
      >
        <Star
          className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? "text-[#B8973E] fill-[#B8973E]" : "text-[#0A0A0A]/50"}`}
        />
      </button>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [wcProducts, setWcProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setWcProducts(data);
        }
      })
      .catch(console.error);
  }, []);

  const bestSellers = wcProducts.slice(0, 4);
  const newArrivals = wcProducts.slice(4, 8);

  const banners = [
    {
      image: "/images/hero_luxury_saree_1780477829399.png",
      tag: "New Season",
      title: "ORCHID\nDESIGNS",
      subtitle: "Elegance Woven Into Every Thread",
      cta: "Explore Collection",
      href: "/products",
    },
    {
      image: "/images/collection_wedding_1780477845042.png",
      tag: "The Bridal Edit",
      title: "WEDDING\nCOUTURE",
      subtitle: "Timeless Elegance for Your Special Day",
      cta: "View Wedding Collection",
      href: "/products/wedding",
    },
  ];

  useEffect(() => {
    // Parallax on hero image
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector(".hero-img"), {
        yPercent: 20,
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
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  // Auto-advance banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex(i => (i + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const banner = banners[currentBannerIndex];

  return (
    <main className="min-h-[100dvh] bg-[#FAFAFA]">
      <Navbar />

      {/* ── Hero Banner ── */}
      <section ref={heroRef} className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        <div className="hero-img absolute inset-0 scale-110">
          <Image
            src={banner.image}
            alt="Orchid Designs"
            fill
            className="object-cover object-center opacity-70 transition-opacity duration-1000"
            priority
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6 pt-32">
          <p className="text-[#D4AF6A] text-[10px] tracking-[0.4em] uppercase mb-6 font-medium fade-in-up">
            {banner.tag}
          </p>
          <div ref={heroTextRef}>
            <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] text-white font-medium tracking-tight leading-none whitespace-pre-line mb-6 fade-in-up">
              {banner.title}
            </h1>
          </div>
          <p className="text-white/75 text-xs md:text-sm font-sans font-light tracking-[0.3em] uppercase max-w-lg mb-12 fade-in-up">
            {banner.subtitle}
          </p>
          <Link
            href={banner.href}
            className="inline-flex items-center gap-3 border border-white/60 text-white px-10 py-4 text-[11px] tracking-[0.25em] uppercase hover:bg-white hover:text-[#0A0A0A] transition-all duration-400 font-medium fade-in-up"
          >
            {banner.cta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Banner navigation dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBannerIndex(i)}
              className={`transition-all duration-300 ${i === currentBannerIndex ? "w-8 h-1 bg-[#D4AF6A]" : "w-2 h-1 bg-white/30"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

      </section>

      {/* ── Trust Strip ── */}
      <section className="py-5 px-6 border-y border-black/6 bg-white">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-[#0A0A0A]/50 text-[10px] tracking-[0.2em] uppercase font-medium">
          {[
            { icon: <Truck className="w-4 h-4" />, text: "Free Shipping" },
            { icon: <ShieldCheck className="w-4 h-4" />, text: "Secure Checkout" },
            { icon: <Gem className="w-4 h-4" />, text: "Premium Quality" },
            { icon: <Star className="w-3.5 h-3.5" />, text: "4.8★ Rated" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-end mb-14">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#B8973E] font-semibold mb-3">Most Loved</p>
            <h2 className="font-heading text-4xl md:text-5xl text-[#0A0A0A]">Best Sellers</h2>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border-b border-[#0A0A0A]/30 pb-0.5 text-[#0A0A0A]/60 hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-all">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {bestSellers.length > 0 ? bestSellers.map((prod, i) => (
            <ProductCard key={i} prod={prod} />
          )) : <p className="col-span-full text-center py-10 text-foreground/50">No products available.</p>}
        </div>
        <div className="mt-8 flex md:hidden justify-center">
          <Link href="/products" className="text-[11px] tracking-[0.2em] uppercase border border-[#0A0A0A]/20 px-8 py-3 text-[#0A0A0A]/60 hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-all">
            View All
          </Link>
        </div>
      </section>

      {/* ── Full-width Campaign Banner ── */}
      <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden group mb-0">
        <Image
          src="/images/collection_wedding_1780477845042.png"
          alt="Wedding Campaign"
          fill
          className="object-cover transition-transform duration-[2s] group-hover:scale-103"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-start justify-center pl-8 md:pl-20 lg:pl-32">
          <span className="text-[#D4AF6A] text-[10px] tracking-[0.4em] uppercase mb-4">The Bridal Edit</span>
          <h3 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white mb-6 max-w-lg leading-tight">
            Timeless<br />Elegance
          </h3>
          <Link
            href="/products/wedding"
            className="inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-[#D4AF6A] hover:text-white transition-all duration-300"
          >
            Discover More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-end mb-14">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#B8973E] font-semibold mb-3">Just Landed</p>
            <h2 className="font-heading text-4xl md:text-5xl text-[#0A0A0A]">New Arrivals</h2>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border-b border-[#0A0A0A]/30 pb-0.5 text-[#0A0A0A]/60 hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-all">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {newArrivals.length > 0 ? newArrivals.map((prod, i) => (
            <ProductCard key={i} prod={prod} />
          )) : <p className="col-span-full text-center py-10 text-foreground/50">No products available.</p>}
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section ref={storyRef} className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="w-full md:w-1/2 aspect-[4/5] relative story-reveal overflow-hidden bg-[#F0F0F0]">
            <Image
              src="/images/brand_story_1780477925012.png"
              alt="Brand Craftsmanship"
              fill
              className="object-cover"
              loading="lazy"
            />
            {/* Gold frame accent */}
            <div className="absolute inset-4 border border-[#D4AF6A]/20 pointer-events-none" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-8 story-reveal">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#B8973E] font-semibold">Our Story</p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#0A0A0A] leading-tight">
              The Essence of<br />Luxury Heritage
            </h2>
            <div className="w-12 h-px bg-[#B8973E]" />
            <p className="text-[#0A0A0A]/55 text-base font-light leading-relaxed max-w-md">
              At Orchid Designs, we believe in the timeless beauty of Indian craftsmanship.
              Our collections are a tribute to the rich heritage of Kerala, reimagined with
              modern elegance for the contemporary aesthetic.
            </p>
            <p className="text-[#0A0A0A]/55 text-base font-light leading-relaxed max-w-md">
              Every piece is a work of art, meticulously handcrafted to bring out the royal
              essence in you. Experience fashion that speaks the language of luxury.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-[#0A0A0A] border-b border-[#0A0A0A]/30 pb-0.5 w-fit hover:text-[#B8973E] hover:border-[#B8973E] transition-all"
            >
              Discover Our Story <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Category Tiles ── */}
      <section className="py-20 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#B8973E] font-semibold mb-3">Shop By Category</p>
          <h2 className="font-heading text-4xl md:text-5xl text-[#0A0A0A]">Explore Collections</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            { name: "Sarees", img: "/images/category_womens_sarees_1780477985126.png", href: "/products/sarees" },
            { name: "Kurtis", img: "/images/category_womens_kurtis_1780478001731.png", href: "/products/kurtis" },
            { name: "Kurta Sets", img: "/images/category_womens_kurta_sets_1780478021874.png", href: "/products/kurta-sets" },
            { name: "Office Wear", img: "/images/category_womens_tops_1780478037830.png", href: "/products/office-wear" },
            { name: "Baby Wear", img: "/images/category_kids_baby_wear_1780478061079.png", href: "/products/baby-wear" },
            { name: "Girls Wear", img: "/images/category_kids_girls_wear_1780478079175.png", href: "/products/girls-wear" },
            { name: "Party Wear", img: "/images/category_kids_party_wear_1780478097124.png", href: "/products/party-wear" },
            { name: "Ethnic Wear", img: "/images/category_kids_ethnic_wear_1780478114692.png", href: "/products/ethnic-wear" },
          ].map((cat, i) => (
            <Link key={i} href={cat.href} className="group relative aspect-square overflow-hidden bg-[#F5F5F5]">
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading text-xl md:text-2xl text-white tracking-wide">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Instagram Section ── */}
      <section className="min-h-[100dvh] flex flex-col bg-[#0A0A0A]">
        <div className="max-w-[1600px] mx-auto py-24 px-6 md:px-12 w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <InstagramIcon className="w-5 h-5 text-[#D4AF6A]" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF6A] font-semibold">Instagram</p>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">@_orchid_designs_by_kunjus</h2>
            <p className="text-white/40 text-sm">Follow us for daily style inspiration</p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-10">
            {INSTAGRAM_POSTS.map((post, i) => (
              <a
                key={i}
                href="https://www.instagram.com/_orchid_designs_by_kunjus?utm_source=qr&igsh=MWxjZDZpZXJpNzNvbg=="
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-[#1A1A1A]"
              >
                <Image
                  src={post}
                  alt={`Instagram post ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                  <InstagramIcon className="w-6 h-6 text-white" />
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://www.instagram.com/_orchid_designs_by_kunjus?utm_source=qr&igsh=MWxjZDZpZXJpNzNvbg=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-[#D4AF6A]/40 text-[#D4AF6A] px-10 py-4 text-[11px] tracking-[0.25em] uppercase hover:bg-[#D4AF6A] hover:text-[#0A0A0A] transition-all duration-300 font-medium"
            >
              <InstagramIcon className="w-4 h-4" />
              Follow Us on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <TestimonialSlider />

      {/* ── Newsletter ── */}
      <section className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF6A] font-semibold mb-4 block">The Orchid Club</span>
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">Join The Inner Circle</h2>
          <p className="font-sans text-sm text-white/40 mb-10 leading-relaxed">
            Subscribe to receive exclusive access to new collections, early sale previews, and 10% off your first purchase.
          </p>
          <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/5 border border-white/15 px-5 py-4 text-base md:text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#D4AF6A]/50 transition-colors rounded-none"
              required
            />
            <button
              type="submit"
              className="bg-[#B8973E] text-white px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-[#D4AF6A] transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
