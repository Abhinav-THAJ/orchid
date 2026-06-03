"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/components/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "";
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [activeAccordion, setActiveAccordion] = useState("description");
  const [showToast, setShowToast] = useState(false);

  const handleAddToBag = () => {
    if (!selectedSize) return;
    addItem({
      slug,
      name: productName,
      price: 35000,
      size: selectedSize,
      image: images[0],
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Format the slug back into a readable name
  const productName = slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : "Product";

  // Mock images for the gallery
  const images = [
    `/images/lookbook_1_1780477942278.png`,
    "/images/category_womens_sarees_1780477985126.png",
    "/images/category_womens_kurtis_1780478001731.png",
    "/images/category_womens_kurta_sets_1780478021874.png"
  ];
  const [mainImg, setMainImg] = useState(images[0]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="h-24"></div> {/* Spacer */}

      <div className="container mx-auto px-6 md:px-12 py-12 max-w-[1600px] flex flex-col lg:flex-row gap-16 lg:gap-24 pb-32">
        
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-[55%] flex flex-col-reverse sm:flex-row gap-3 lg:gap-6 h-[50vh] sm:h-[60vh] md:h-[80vh] min-h-[350px]">
          {/* Thumbnails — hidden on mobile, shown sm+ */}
          <div className="hidden sm:flex w-16 md:w-28 shrink-0 flex-col gap-3 overflow-y-auto overscroll-contain pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImg(img)}
                className={`relative aspect-[3/4] w-full bg-secondary overflow-hidden transition-all ${
                  mainImg === img ? 'ring-1 ring-foreground ring-offset-2' : 'hover:opacity-80'
                }`}
              >
                <Image src={img} alt={`${productName} view ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 relative bg-secondary overflow-hidden">
            <Image src={mainImg} alt={productName} fill className="object-cover" />
          </div>
        </div>

        {/* Right: Product Info Sticky */}
        <div className="w-full lg:w-[45%]">
          <div className="sticky top-32 max-w-md">
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">{productName}</h1>
            <p className="font-sans font-medium text-lg text-foreground/80 mb-8">₹35,000</p>
            
            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="font-sans text-xs tracking-widest uppercase text-foreground/60 font-semibold">Select Size</span>
                <button className="font-sans text-xs underline text-foreground/50 hover:text-foreground transition-colors">Size Guide</button>
              </div>
              <div className="flex gap-3">
                {["XS", "S", "M", "L", "XL"].map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center border text-xs font-semibold transition-colors ${selectedSize === size ? 'border-foreground bg-foreground text-background' : 'border-black/10 text-foreground/70 hover:border-black/30'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-16">
              <button 
                disabled={!selectedSize}
                onClick={handleAddToBag}
                className={`w-full py-5 text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 transition-colors ${
                  selectedSize 
                    ? 'bg-foreground text-background hover:bg-primary' 
                    : 'bg-foreground/20 text-foreground/50 cursor-not-allowed'
                }`}
              >
                {selectedSize ? "Add to Bag" : "Select a Size"}
              </button>
              <button 
                disabled={!selectedSize}
                onClick={() => router.push('/checkout')}
                className={`w-full py-5 text-xs tracking-widest uppercase font-bold border transition-colors ${
                  selectedSize 
                    ? 'bg-transparent border-foreground text-foreground hover:bg-secondary'
                    : 'bg-transparent border-foreground/20 text-foreground/40 cursor-not-allowed'
                }`}
              >
                Buy It Now
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-black/10">
              <div className="border-b border-black/10 py-5">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'description' ? '' : 'description')}
                  className="flex justify-between items-center w-full text-left font-sans text-xs tracking-widest uppercase text-foreground font-semibold"
                >
                  Description
                  {activeAccordion === 'description' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'description' && (
                  <div className="pt-6 pb-2 text-sm text-foreground/70 leading-relaxed">
                    Elegance redefined. This exquisite piece embodies the essence of luxury fashion, featuring meticulous craftsmanship and premium materials. Designed to make a statement while ensuring effortless comfort for any occasion.
                  </div>
                )}
              </div>
              
              <div className="border-b border-black/10 py-5">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'details' ? '' : 'details')}
                  className="flex justify-between items-center w-full text-left font-sans text-xs tracking-widest uppercase text-foreground font-semibold"
                >
                  Details & Care
                  {activeAccordion === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'details' && (
                  <div className="pt-6 pb-2 text-sm text-foreground/70 leading-relaxed">
                    <ul className="list-disc pl-4 space-y-3">
                      <li>100% Premium Fabric</li>
                      <li>Hand-embroidered detailing</li>
                      <li>Dry clean only</li>
                      <li>Made with love in India</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="border-b border-black/10 py-5">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}
                  className="flex justify-between items-center w-full text-left font-sans text-xs tracking-widest uppercase text-foreground font-semibold"
                >
                  Shipping & Returns
                  {activeAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="pt-6 pb-2 text-sm text-foreground/70 leading-relaxed">
                    Enjoy complimentary express shipping on all orders. Returns are accepted within 14 days of delivery, provided the item is unworn, unwashed, and all original tags remain attached.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-foreground text-background px-8 py-4 flex items-center gap-3 shadow-2xl transition-all duration-500 z-50 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <div className="w-2 h-2 bg-[#FAF7F4] rounded-full animate-pulse" />
        <span className="font-sans text-xs font-bold tracking-widest uppercase">Added to Bag</span>
      </div>
    </main>
  );
}
