import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orchid Designs | Luxury Fashion",
  description: "Ultra Luxury Fashion Website inspired by top fashion houses.",
  icons: {
    icon: "/logo-circle.png",
    apple: "/logo-circle.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <CartProvider>
          <SmoothScroll>
            {children}
            <Footer />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
