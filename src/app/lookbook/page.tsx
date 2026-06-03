"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function LookbookPage() {
  const images = [
    "/images/lookbook_1_1780477942278.png",
    "/images/category_womens_kurtis_1780478001731.png",
    "/images/category_kids_ethnic_wear_1780478114692.png",
    "/images/category_womens_kurta_sets_1780478021874.png",
    "/images/category_womens_tops_1780478037830.png",
    "/images/brand_story_1780477925012.png"
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-40 pb-20 px-6 text-center">
        <h1 className="font-heading text-5xl md:text-7xl text-foreground font-medium mb-6">Lookbook</h1>
        <p className="text-foreground/60 font-sans tracking-widest uppercase text-sm max-w-2xl mx-auto">
          The Editorial Edit
        </p>
      </section>

      <section className="px-4 md:px-8 max-w-[1800px] mx-auto pb-32">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((src, i) => (
            <div key={i} className="relative w-full break-inside-avoid">
              <Image 
                src={src} 
                alt={`Lookbook ${i}`} 
                width={800} 
                height={1200} 
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
