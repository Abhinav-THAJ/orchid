import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 md:pt-32 pb-10 px-6 md:px-12 border-t border-white/8">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-16 mb-16 md:mb-24">
          
          {/* Brand Column - spans 2 cols */}
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-8 group">
              <Image
                src="/logo-new.png"
                alt="Orchid Designs"
                width={320}
                height={160}
                className="h-36 w-auto object-contain object-left opacity-90 group-hover:opacity-100 transition-opacity"
                style={{ filter: "brightness(1.1)" }}
              />
            </Link>
            <p className="text-white/50 font-light max-w-xs leading-relaxed text-sm mb-8">
              Elegance woven into every thread. Discover the pinnacle of luxury ethnic fashion, blending rich Indian heritage with contemporary design.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/_orchid_designs_by_kunjus?utm_source=qr&igsh=MWxjZDZpZXJpNzNvbg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/50 hover:text-[#D4AF6A] hover:border-[#D4AF6A]/40 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase mb-8 text-[#D4AF6A] font-semibold">Explore</h4>
            <ul className="space-y-4 text-white/55 font-light text-sm">
              <li><Link href="/products" className="hover:text-[#D4AF6A] transition-colors duration-200">All Collections</Link></li>
              <li><Link href="/products/wedding" className="hover:text-[#D4AF6A] transition-colors duration-200">Wedding</Link></li>
              <li><Link href="/products/sarees" className="hover:text-[#D4AF6A] transition-colors duration-200">Sarees</Link></li>
              <li><Link href="/products/kurtis" className="hover:text-[#D4AF6A] transition-colors duration-200">Kurtis</Link></li>
              <li><Link href="/products/office-wear" className="hover:text-[#D4AF6A] transition-colors duration-200">Office Wear</Link></li>
              <li><Link href="/services" className="hover:text-[#D4AF6A] transition-colors duration-200">Services</Link></li>
              <li><Link href="/about" className="hover:text-[#D4AF6A] transition-colors duration-200">Brand Story</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase mb-8 text-[#D4AF6A] font-semibold">Policies</h4>
            <ul className="space-y-4 text-white/55 font-light text-sm">
              <li><Link href="/privacy" className="hover:text-[#D4AF6A] transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#D4AF6A] transition-colors duration-200">Terms of Service</Link></li>
              <li><Link href="/returns" className="hover:text-[#D4AF6A] transition-colors duration-200">Returns & Refunds</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase mb-8 text-[#D4AF6A] font-semibold">Contact</h4>
            <ul className="space-y-5 text-white/55 font-light text-sm">
              <li>
                <a href="tel:+917559066838" className="flex items-start gap-3 hover:text-[#D4AF6A] transition-colors duration-200">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <span>+91 7559066838</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 transition-colors duration-200 group">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-[#D4AF6A]" strokeWidth={1.5} />
                  <span className="flex flex-col gap-1">
                    <a href="mailto:info@orchiddesigns.com" className="hover:text-[#D4AF6A]">info@orchiddesigns.com</a>
                    <a href="mailto:orchiddesignsbykunjus@gmail.com" className="hover:text-[#D4AF6A]">orchiddesignsbykunjus@gmail.com</a>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/30" strokeWidth={1.5} />
                  <span>Kochi, Kerala, India</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Gold Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#B8973E]/30 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-white/25 text-xs font-light gap-4">
          <p>© {new Date().getFullYear()} Orchid Designs. All rights reserved.</p>
          <p className="text-white/20">Crafted with love in India · Premium Ethnic Fashion</p>
        </div>
      </div>
    </footer>
  );
}
