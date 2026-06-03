"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
        <h1 className="font-heading text-5xl md:text-7xl text-foreground font-medium mb-6">Our Story</h1>
        <p className="text-foreground/60 font-sans tracking-widest uppercase text-sm mb-12">
          Heritage meets Modern Elegance
        </p>
        <div className="relative w-full aspect-[16/9] mb-12">
          <Image src="/images/brand_story_1780477925012.png" alt="Brand Story" fill className="object-cover" />
        </div>
        <p className="text-foreground/80 font-light text-lg leading-relaxed max-w-2xl mx-auto text-left">
          Founded on the rich cultural heritage of Kerala, Orchid Designs represents the pinnacle of modern Indian luxury fashion. We believe in crafting garments that tell a story—where every thread is meticulously woven to celebrate elegance and royalty.
        </p>
      </section>
    </main>
  );
}
