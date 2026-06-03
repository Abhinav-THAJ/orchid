import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-[#FAF7F4] pt-16 md:pt-32 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-24">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="block relative w-40 h-40 mb-10 group">
            <Image src="/logo.png" alt="Orchid Designs" fill className="object-contain object-left" />
          </Link>
          <p className="text-white/60 font-light max-w-md leading-relaxed">
            Elegance Woven Into Every Thread. Discover the pinnacle of luxury fashion, blending rich Indian heritage with modern contemporary design.
          </p>
        </div>
        <div>
          <h4 className="font-sans text-xs tracking-widest uppercase mb-6 text-white/50">Explore</h4>
          <ul className="space-y-4 text-white/80 font-light">
            <li><Link href="/products" className="hover:text-primary transition-colors">Collections</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Brand Story</Link></li>
            <li><Link href="/lookbook" className="hover:text-primary transition-colors">Lookbook</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-sans text-xs tracking-widest uppercase mb-6 text-white/50">Contact</h4>
          <ul className="space-y-4 text-white/80 font-light">
            <li>info@orchiddesigns.com</li>
            <li>+91 98765 43210</li>
            <li>Kochi, Kerala, India</li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-white/40 text-xs font-light">
        <p>© {new Date().getFullYear()} Orchid Designs. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
