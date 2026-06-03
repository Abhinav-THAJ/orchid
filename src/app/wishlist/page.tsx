"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-40 pb-32 px-6 flex flex-col items-center justify-center min-h-[80vh] text-center">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-8 shadow-sm">
          <Heart className="w-10 h-10 text-foreground/40" strokeWidth={1} />
        </div>
        <h1 className="font-heading text-4xl text-foreground font-medium mb-4">Your Wishlist</h1>
        <p className="text-foreground/60 font-sans text-sm mb-10 max-w-md">
          Save your favorite luxury pieces here.
        </p>
        <Link href="/products" className="bg-foreground text-background px-10 py-4 uppercase tracking-widest text-sm hover:bg-primary transition-colors">
          Explore Collections
        </Link>
      </section>
    </main>
  );
}
