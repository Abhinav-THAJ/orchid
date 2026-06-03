"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6 md:p-24 flex flex-col justify-center">
          <h1 className="font-heading text-5xl md:text-7xl text-foreground font-medium mb-6">Get in Touch</h1>
          <p className="text-foreground/60 font-sans tracking-widest uppercase text-sm mb-16">
            We are here to assist you.
          </p>

          <form className="flex flex-col gap-8 max-w-md">
            <div>
              <input type="text" placeholder="YOUR NAME" className="w-full bg-transparent border-b border-black/20 pb-4 text-sm tracking-wide focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/40" />
            </div>
            <div>
              <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-transparent border-b border-black/20 pb-4 text-sm tracking-wide focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/40" />
            </div>
            <div>
              <textarea placeholder="MESSAGE" rows={4} className="w-full bg-transparent border-b border-black/20 pb-4 text-sm tracking-wide focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/40 resize-none"></textarea>
            </div>
            <button type="button" className="bg-foreground text-background py-4 uppercase tracking-widest text-sm hover:bg-primary transition-colors">
              Send Message
            </button>
          </form>

          <div className="mt-24 space-y-4">
            <h4 className="font-heading text-xl text-foreground">Orchid Designs Boutique</h4>
            <p className="text-foreground/70 font-light text-sm">MG Road, Kochi, Kerala, India</p>
            <p className="text-foreground/70 font-light text-sm">+91 98765 43210 | info@orchiddesigns.com</p>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative">
          <Image 
            src="/images/lookbook_1_1780477942278.png" 
            alt="Contact Us Campaign" 
            fill 
            className="object-cover" 
          />
        </div>
      </section>
    </main>
  );
}
