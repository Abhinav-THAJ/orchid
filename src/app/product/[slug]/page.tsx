"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Heart, Star, Truck, ShieldCheck, RefreshCw, ZoomIn } from "lucide-react";
import { useCart } from "@/components/CartContext";

const PRODUCT_DB: Record<string, {
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  isSaree: boolean;
  fabric: string;
  sareeLength?: string;
  blousePiece?: string;
  occasion: string;
  careInstructions: string;
  description: string;
  images: string[];
  tag: string;
  sizes?: string[];
}> = {
  "regal-silk-saree": {
    name: "Regal Silk Saree",
    price: 4999, originalPrice: 9999,
    rating: 4.8, reviews: 124,
    isSaree: true,
    fabric: "Pure Banarasi Silk",
    sareeLength: "6.3 meters",
    blousePiece: "Unstitched Blouse Piece Included",
    occasion: "Wedding · Festive · Reception",
    careInstructions: "Dry Clean Only. Store in cotton muslin bag away from direct sunlight. Do not wring or twist.",
    description: "A masterpiece of Indian craftsmanship, this Regal Silk Saree is woven with 100% pure Banarasi silk and features intricate zari embroidery. Each saree takes skilled weavers weeks to complete, resulting in a piece that is truly one-of-a-kind.",
    images: [
      "/images/category_womens_sarees_1780477985126.png",
      "/images/lookbook_1_1780477942278.png",
      "/images/collection_traditional_1780477879187.png",
      "/images/brand_story_1780477925012.png",
    ],
    tag: "Pure Silk · Bestseller",
  },
  "embroidered-kurti": {
    name: "Embroidered Kurti",
    price: 1499, originalPrice: 2999,
    rating: 4.6, reviews: 89,
    isSaree: false,
    fabric: "Premium Cotton",
    occasion: "Casual · Daily Wear · Office",
    careInstructions: "Machine washable in cold water. Iron on medium heat. Do not bleach.",
    description: "Beautifully crafted with fine thread embroidery, this kurti combines comfort with elegance. Perfect for everyday wear and casual occasions.",
    images: [
      "/images/category_womens_kurtis_1780478001731.png",
      "/images/category_womens_tops_1780478037830.png",
    ],
    tag: "Cotton · New Arrival",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  "royal-kurta-set": {
    name: "Royal Kurta Set",
    price: 2499, originalPrice: 4999,
    rating: 4.9, reviews: 203,
    isSaree: false,
    fabric: "Chanderi Silk",
    occasion: "Festive · Wedding · Party",
    careInstructions: "Dry clean preferred. Hand wash in cold water if needed. Do not tumble dry.",
    description: "An exquisite three-piece kurta set crafted from premium Chanderi fabric. Features delicate hand-block printing and comes with matching dupatta and palazzo pants.",
    images: [
      "/images/category_womens_kurta_sets_1780478021874.png",
      "/images/collection_premium_1780477860938.png",
    ],
    tag: "Chanderi · Premium",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
};

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(s => (
          <Star key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? "text-[#B8973E] fill-[#B8973E]" : "text-gray-200 fill-gray-200"}`} />
        ))}
      </div>
      <span className="text-sm font-semibold text-[#0A0A0A]">{rating}</span>
      <span className="text-sm text-foreground/40">({reviews} reviews)</span>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const router = useRouter();
  const { addItem } = useCart();

  const isKids = slug.includes("baby") || slug.includes("girls") || slug.includes("boys") || slug.includes("kids");

  const product = PRODUCT_DB[slug] || {
    name: slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    price: 4999, originalPrice: 9999,
    rating: 4.8, reviews: 124,
    isSaree: slug.includes("saree"),
    fabric: "Premium Fabric",
    sareeLength: "6.3 meters",
    blousePiece: "Unstitched Blouse Piece Included",
    occasion: "Festive · Wedding",
    careInstructions: "Dry Clean Only. Handle with care.",
    description: "Elegance redefined. This exquisite piece embodies the essence of luxury fashion, featuring meticulous craftsmanship and premium materials.",
    images: [
      "/images/lookbook_1_1780477942278.png",
      "/images/category_womens_sarees_1780477985126.png",
      "/images/category_womens_kurtis_1780478001731.png",
      "/images/category_womens_kurta_sets_1780478021874.png",
    ],
    tag: "Luxury · Handcrafted",
    sizes: isKids ? ["2-4 Yrs", "4-6 Yrs", "6-8 Yrs", "8-10 Yrs"] : ["XS", "S", "M", "L", "XL"],
  };

  const stockCount = 2; // For demonstration, showing low stock across all products

  const [mainImgIndex, setMainImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeAccordion, setActiveAccordion] = useState("description");
  const [showToast, setShowToast] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const mainImgRef = useRef<HTMLDivElement>(null);

  // Reviews state
  const [reviewsList, setReviewsList] = useState([
    { name: "Ananya S.", rating: 5, date: "October 12, 2025", comment: "Absolutely stunning piece! The quality and craftsmanship are beyond my expectations. Definitely buying again." },
    { name: "Priya M.", rating: 4, date: "September 28, 2025", comment: "Beautiful design and comfortable fabric. Got many compliments at the wedding." },
    { name: "Meera K.", rating: 5, date: "August 15, 2025", comment: "Loved the detailing. Very premium feel." }
  ]);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    setReviewsList([{ name: reviewName, rating: reviewRating, date: "Just now", comment: reviewComment }, ...reviewsList]);
    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToBag = () => {
    if (!product.isSaree && !selectedSize) return;
    addItem({
      slug,
      name: product.name,
      price: product.price,
      size: product.isSaree ? "Free Size" : selectedSize,
      image: product.images[0],
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBuyNow = () => {
    if (!product.isSaree && !selectedSize) return;
    addItem({
      slug,
      name: product.name,
      price: product.price,
      size: product.isSaree ? "Free Size" : selectedSize,
      image: product.images[0],
    });
    router.push('/checkout');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImgRef.current) return;
    const rect = mainImgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const prevImg = () => setMainImgIndex(i => (i - 1 + product.images.length) % product.images.length);
  const nextImg = () => setMainImgIndex(i => (i + 1) % product.images.length);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextImg() : prevImg();
    touchStartX.current = null;
  };

  const accordion = (key: string) => (
    <button
      onClick={() => setActiveAccordion(activeAccordion === key ? '' : key)}
      className="flex justify-between items-center w-full text-left font-sans text-[11px] tracking-[0.2em] uppercase text-[#0A0A0A] font-semibold py-5"
    >
      <span>{key === 'description' ? 'Description' : key === 'details' ? 'Product Details' : 'Shipping & Returns'}</span>
      {activeAccordion === key ? <ChevronUp className="w-4 h-4 text-foreground/40" /> : <ChevronDown className="w-4 h-4 text-foreground/40" />}
    </button>
  );

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <div className="h-20 md:h-24" />

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 py-4 border-b border-black/5 bg-white">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2 text-[11px] text-foreground/40 tracking-wide">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-foreground transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-foreground/70">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-10 max-w-[1600px] flex flex-col lg:flex-row gap-12 lg:gap-20 pb-32">

        {/* ── Left: Image Gallery ── */}
        <div className="w-full lg:w-[55%] flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="hidden sm:flex sm:flex-col gap-3 w-20 shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImgIndex(idx)}
                className={`relative aspect-[3/4] w-full bg-[#F5F5F5] overflow-hidden transition-all ${
                  mainImgIndex === idx ? 'ring-1 ring-[#0A0A0A] ring-offset-2' : 'hover:opacity-70 opacity-50'
                }`}
              >
                <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 relative">
            <div
              ref={mainImgRef}
              className={`relative bg-[#F5F5F5] overflow-hidden cursor-zoom-in ${isZoomed ? 'cursor-zoom-out' : ''}`}
              style={{ aspectRatio: '3/4' }}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={product.images[mainImgIndex]}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                style={isZoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                priority
              />
              {/* Discount badge */}
              <div className="absolute top-4 left-4 bg-[#0A0A0A] text-white text-[11px] font-bold tracking-widest px-3 py-1.5 z-10">
                {discount}% OFF
              </div>
              {/* Zoom hint */}
              {!isZoomed && (
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 z-10">
                  <ZoomIn className="w-4 h-4 text-[#0A0A0A]/60" />
                </div>
              )}
              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/85 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all z-10 shadow-sm"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#0A0A0A]" />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/85 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all z-10 shadow-sm"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-4 h-4 text-[#0A0A0A]" />
                  </button>
                </>
              )}
            </div>

            {/* Mobile dot indicators */}
            <div className="flex sm:hidden justify-center gap-1.5 mt-3">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImgIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${idx === mainImgIndex ? 'w-5 h-1.5 bg-[#B8973E]' : 'w-1.5 h-1.5 bg-black/20'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Product Info ── */}
        <div className="w-full lg:w-[45%]">
          <div className="lg:sticky lg:top-28 max-w-lg">
            {/* Tag */}
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#B8973E] font-semibold mb-3">{product.tag}</p>

            {/* Name */}
            <h1 className="font-heading text-3xl md:text-4xl text-[#0A0A0A] mb-4 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="mb-6">
              <StarRating rating={product.rating} reviews={product.reviews} />
            </div>

            {/* Price */}
            <div className="flex flex-col mb-8 pb-8 border-b border-black/6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-heading text-3xl text-[#0A0A0A] font-medium">₹{product.price.toLocaleString()}</span>
                <span className="text-lg text-foreground/30 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-sm font-bold text-[#B8973E] bg-[#F0E4C0] px-2.5 py-1">{discount}% OFF</span>
              </div>
              <p className="text-[11px] text-[#D84545] font-medium tracking-wide mt-1">
                Only {stockCount} left in stock
              </p>
            </div>

            {/* Saree Details OR Size Selector */}
            {product.isSaree ? (
              <div className="mb-8 space-y-4">
                <p className="text-[11px] tracking-[0.2em] uppercase text-foreground/50 font-semibold mb-4">Product Details</p>
                {[
                  { label: "Fabric", value: product.fabric },
                  { label: "Saree Length", value: product.sareeLength || "6.3 meters" },
                  { label: "Blouse Piece", value: product.blousePiece || "Unstitched Blouse Piece Included" },
                  { label: "Occasion", value: product.occasion },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-[11px] tracking-wide uppercase text-foreground/35 font-semibold w-28 shrink-0 pt-0.5">{label}</span>
                    <span className="text-sm text-foreground/75">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-foreground/50 font-semibold">Select Size</span>
                  <button className="text-[11px] text-foreground/40 underline hover:text-foreground transition-colors">Size Guide</button>
                </div>
                <div className="flex gap-2.5 flex-wrap">
                  {(product.sizes || (isKids ? ["2-4 Yrs", "4-6 Yrs", "6-8 Yrs", "8-10 Yrs"] : ["XS","S","M","L","XL"])).map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-xs font-semibold transition-all duration-200 border ${
                        selectedSize === size
                          ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                          : 'border-black/12 text-foreground/60 hover:border-[#0A0A0A]/40'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Bag + Buy Now + Wishlist */}
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex gap-3">
                <button
                  disabled={!product.isSaree && !selectedSize}
                  onClick={handleAddToBag}
                  className={`flex-1 py-4 text-[11px] tracking-[0.2em] uppercase font-bold border transition-all duration-300 ${
                    (product.isSaree || selectedSize)
                      ? 'border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white'
                      : 'border-black/10 text-foreground/30 cursor-not-allowed bg-transparent'
                  }`}
                >
                  {product.isSaree ? "Add to Bag" : selectedSize ? "Add to Bag" : "Select a Size"}
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-14 shrink-0 border flex items-center justify-center transition-all duration-200 ${
                    isWishlisted ? 'border-[#B8973E] bg-[#F0E4C0]' : 'border-black/15 hover:border-black/30'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'text-[#B8973E] fill-[#B8973E]' : 'text-foreground/50'}`} />
                </button>
              </div>
              <button
                disabled={!product.isSaree && !selectedSize}
                onClick={handleBuyNow}
                className={`w-full py-4 text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-300 ${
                  (product.isSaree || selectedSize)
                    ? 'bg-[#B8973E] text-white hover:bg-[#0A0A0A]'
                    : 'bg-foreground/10 text-foreground/30 cursor-not-allowed'
                }`}
              >
                Buy It Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mb-8 pb-8 border-b border-black/6">
              {[
                { icon: <Truck className="w-4 h-4" />, text: "Free Shipping" },
                { icon: <ShieldCheck className="w-4 h-4" />, text: "Secure Payment" },
                { icon: <RefreshCw className="w-4 h-4" />, text: "Easy Exchange" },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1.5 text-foreground/40">
                  {b.icon}
                  <span className="text-[10px] tracking-wide">{b.text}</span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="border-t border-black/6">
              <div className="border-b border-black/6">
                {accordion('description')}
                {activeAccordion === 'description' && (
                  <div className="pb-5 text-sm text-foreground/60 leading-relaxed">{product.description}</div>
                )}
              </div>
              <div className="border-b border-black/6">
                {accordion('details')}
                {activeAccordion === 'details' && (
                  <div className="pb-5 text-sm text-foreground/60 leading-relaxed space-y-3">
                    <div className="flex gap-3">
                      <span className="text-[11px] uppercase tracking-wide text-foreground/35 font-semibold w-28 shrink-0">Fabric</span>
                      <span>{product.fabric}</span>
                    </div>
                    {product.isSaree && (
                      <>
                        <div className="flex gap-3">
                          <span className="text-[11px] uppercase tracking-wide text-foreground/35 font-semibold w-28 shrink-0">Length</span>
                          <span>{product.sareeLength}</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-[11px] uppercase tracking-wide text-foreground/35 font-semibold w-28 shrink-0">Blouse</span>
                          <span>{product.blousePiece}</span>
                        </div>
                      </>
                    )}
                    <div className="flex gap-3">
                      <span className="text-[11px] uppercase tracking-wide text-foreground/35 font-semibold w-28 shrink-0">Care</span>
                      <span>{product.careInstructions}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-[11px] uppercase tracking-wide text-foreground/35 font-semibold w-28 shrink-0">Origin</span>
                      <span>Handcrafted in India</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="border-b border-black/6">
                {accordion('shipping')}
                {activeAccordion === 'shipping' && (
                  <div className="pb-5 text-sm text-foreground/60 leading-relaxed">
                    <p className="mb-3">Free express delivery on all orders across India. Delivered in 5–7 business days.</p>
                    <p>Exchanges accepted within 24 hours for damaged or incorrect items only. View our full <Link href="/returns" className="text-[#B8973E] underline hover:text-[#0A0A0A]">Returns Policy</Link>.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Reviews Section ── */}
      <div className="container mx-auto px-6 md:px-12 max-w-[1000px] pb-32">
        <h2 className="font-heading text-3xl text-[#0A0A0A] mb-12 text-center">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* List of Reviews */}
          <div>
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-black/6">
              <div className="text-5xl font-heading text-[#0A0A0A]">{product.rating}</div>
              <div>
                <div className="flex mb-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "text-[#B8973E] fill-[#B8973E]" : "text-gray-200 fill-gray-200"}`} />
                  ))}
                </div>
                <div className="text-xs text-foreground/50 tracking-wide">Based on {product.reviews + reviewsList.length - 3} reviews</div>
              </div>
            </div>

            <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-black/10 [&::-webkit-scrollbar-track]:bg-transparent">
              {reviewsList.map((r, i) => (
                <div key={i} className="border-b border-black/5 pb-6 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-[#0A0A0A]">{r.name}</span>
                    <span className="text-[10px] text-foreground/40">{r.date}</span>
                  </div>
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${s <= r.rating ? "text-[#B8973E] fill-[#B8973E]" : "text-gray-200 fill-gray-200"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Write a Review Form */}
          <div className="bg-[#F5F5F5] p-8">
            <h3 className="font-heading text-xl text-[#0A0A0A] mb-6">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      className="focus:outline-none"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setReviewRating(star)}
                    >
                      <Star className={`w-6 h-6 transition-colors ${star <= (hoverRating || reviewRating) ? "text-[#B8973E] fill-[#B8973E]" : "text-gray-300 fill-gray-300"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full border border-black/10 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#B8973E] transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-2">Review</label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full border border-black/10 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#B8973E] transition-colors resize-none"
                  placeholder="Share your thoughts about this product..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0A0A0A] text-white py-4 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-[#B8973E] transition-colors duration-300"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#0A0A0A] text-white px-8 py-4 flex items-center gap-3 shadow-2xl transition-all duration-500 z-50 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <div className="w-2 h-2 bg-[#D4AF6A] rounded-full animate-pulse" />
        <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase">Added to Bag</span>
      </div>
    </main>
  );
}
