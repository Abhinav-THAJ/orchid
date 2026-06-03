"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";

const SERVICES = [
  {
    title: "Bridal Styling",
    desc: "Luxury bridal consultation. We curate the perfect ensemble for your special day, ensuring every detail reflects your personal royalty.",
  },
  {
    title: "Custom Fashion Consultation",
    desc: "Personalized fashion recommendations tailored to your silhouette, skin tone, and personal aesthetic by our expert stylists.",
  },
  {
    title: "Occasion Styling",
    desc: "Wedding and event styling to ensure you make a statement at every gathering.",
  },
  {
    title: "Premium Customer Support",
    desc: "Dedicated assistance from our luxury concierges for a seamless shopping experience.",
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="font-heading text-5xl md:text-7xl text-foreground font-medium mb-6">Our Services</h1>
        <p className="text-foreground/60 font-sans tracking-widest uppercase text-sm">
          A bespoke experience tailored for luxury.
        </p>
      </section>

      <section className="px-6 md:px-12 max-w-[1200px] mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="border-t border-black/10 pt-8">
              <span className="text-primary font-sans text-sm tracking-widest uppercase mb-4 block">0{idx + 1}</span>
              <h3 className="font-heading text-3xl text-foreground font-medium mb-4">{service.title}</h3>
              <p className="text-foreground/70 font-light leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Large visual break */}
      <section className="w-full h-[60vh] relative">
         <Image 
            src="/images/brand_story_1780477925012.png" 
            alt="Service Craftsmanship" 
            fill 
            className="object-cover" 
          />
      </section>
    </main>
  );
}
