"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";

import { useCart } from "@/components/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="h-24"></div> {/* Spacer */}

      <div className="container mx-auto px-6 md:px-12 py-12 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Checkout Form */}
          <div className="flex-1">
            <h1 className="font-heading text-4xl font-medium mb-10">Checkout</h1>
            
            <form className="space-y-10">
              {/* Contact */}
              <section>
                <h2 className="font-sans text-xs tracking-widest uppercase text-foreground/50 mb-5 font-bold">Contact Information</h2>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full border border-black/20 bg-transparent px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </section>

              {/* Shipping */}
              <section>
                <h2 className="font-sans text-xs tracking-widest uppercase text-foreground/50 mb-5 font-bold">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input type="text" placeholder="First Name" className="w-full border border-black/20 bg-transparent px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors" />
                  <input type="text" placeholder="Last Name" className="w-full border border-black/20 bg-transparent px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors" />
                </div>
                <input type="text" placeholder="Address" className="w-full border border-black/20 bg-transparent px-4 py-4 text-sm mb-4 focus:outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full border border-black/20 bg-transparent px-4 py-4 text-sm mb-4 focus:outline-none focus:border-black transition-colors" />
                <div className="grid grid-cols-3 gap-4">
                  <input type="text" placeholder="City" className="w-full border border-black/20 bg-transparent px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors" />
                  <input type="text" placeholder="State" className="w-full border border-black/20 bg-transparent px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors" />
                  <input type="text" placeholder="ZIP Code" className="w-full border border-black/20 bg-transparent px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors" />
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="font-sans text-xs tracking-widest uppercase text-foreground/50 mb-5 font-bold">Payment</h2>
                <div className="border border-black/20 p-6 bg-secondary/30">
                  <div className="flex gap-4 mb-4">
                    <input type="text" placeholder="Card Number" className="w-full border border-black/20 bg-white px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Expiration Date (MM/YY)" className="w-full border border-black/20 bg-white px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors" />
                    <input type="text" placeholder="Security Code" className="w-full border border-black/20 bg-white px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors" />
                  </div>
                </div>
              </section>

              <button type="button" className="w-full bg-foreground text-background py-5 text-xs tracking-widest uppercase font-bold hover:bg-primary transition-colors">
                Complete Order
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-[420px]">
            <div className="bg-secondary p-8 sticky top-32">
              <h2 className="font-sans text-xs tracking-widest uppercase text-foreground/50 mb-6 font-bold">Order Summary</h2>
              
              {items.map((item: { name: string; size: string; price: number; quantity: number; image?: string }, idx: number) => (
                <div key={idx} className="flex gap-4 mb-6 pb-6 border-b border-black/10">
                  <div className="relative w-20 aspect-[3/4] bg-white border border-black/5 shrink-0">
                    <Image src={item.image || "/logo-circle.png"} alt={item.name} fill className="object-cover" />
                    <span className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">{item.quantity}</span>
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-semibold mb-1">{item.name}</h3>
                    <p className="text-xs text-foreground/50 mb-3">Size: {item.size}</p>
                    <p className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}

              <div className="space-y-4 text-sm text-foreground/70 mb-6 pb-6 border-b border-black/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-foreground">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
