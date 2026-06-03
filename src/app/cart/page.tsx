"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/components/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-2">Your Bag</h1>
        <p className="text-foreground/50 text-sm mb-12 font-sans">{totalItems} {totalItems === 1 ? "item" : "items"}</p>

        {items.length === 0 ? (
          /* Empty State */
          <section className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-8">
              <ShoppingBag className="w-10 h-10 text-foreground/30" strokeWidth={1} />
            </div>
            <h2 className="font-heading text-3xl text-foreground font-medium mb-4">Your bag is empty</h2>
            <p className="text-foreground/50 font-sans text-sm mb-10 max-w-md">
              Discover our luxurious collections and find the perfect piece to add to your wardrobe.
            </p>
            <Link
              href="/products"
              className="bg-foreground text-background px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#921a40] transition-colors"
            >
              Continue Shopping
            </Link>
          </section>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Cart Items */}
            <div className="flex-1 flex flex-col divide-y divide-black/10">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 py-8">
                  {/* Image */}
                  <div className="relative w-28 h-36 md:w-36 md:h-44 bg-secondary shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-heading text-xl text-foreground mb-1">{item.name}</h3>
                        <p className="text-foreground/50 text-xs font-sans uppercase tracking-widest">Size: {item.size}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-foreground/30 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-black/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-sans font-semibold text-foreground text-base">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-[360px] shrink-0">
              <div className="bg-secondary p-8 sticky top-32">
                <h2 className="font-heading text-2xl text-foreground mb-8">Order Summary</h2>
                
                <div className="space-y-4 mb-6 text-sm font-sans">
                  <div className="flex justify-between text-foreground/70">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t border-black/10 pt-4 flex justify-between font-semibold text-foreground text-base">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-foreground text-background text-center py-5 uppercase tracking-widest text-xs font-bold hover:bg-[#921a40] transition-colors mb-4"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/products"
                  className="block w-full text-center border border-foreground/20 py-5 uppercase tracking-widest text-xs font-semibold text-foreground/60 hover:border-foreground hover:text-foreground transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
