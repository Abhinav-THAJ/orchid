import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ShieldX, RefreshCw, Video, Clock, Package, AlertTriangle, Phone, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellations, Returns & Refunds | Orchid Designs",
  description: "Understand our cancellation, exchange, and return policies at Orchid Designs. All purchases are final. Limited exchanges for damaged or incorrect items.",
};

const PolicySection = ({
  icon, title, children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="border-b border-black/6 py-12">
    <div className="flex items-start gap-6">
      <div className="w-12 h-12 border border-[#B8973E]/30 flex items-center justify-center shrink-0 text-[#B8973E] mt-1">
        {icon}
      </div>
      <div className="flex-1">
        <h2 className="font-heading text-2xl text-[#0A0A0A] mb-5">{title}</h2>
        <div className="text-[#0A0A0A]/60 text-sm leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <div className="h-20 md:h-24" />

      {/* Hero */}
      <div className="bg-[#0A0A0A] py-20 px-6 md:px-12 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF6A] font-semibold mb-4">Policies</p>
        <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">Cancellations, Returns & Refunds</h1>
        <p className="text-white/40 text-sm max-w-xl mx-auto leading-relaxed">
          Please read our policy carefully before placing an order. By purchasing from Orchid Designs, you agree to the terms below.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-32">

        {/* Alert Banner */}
        <div className="mt-12 mb-4 bg-[#FFF8EC] border border-[#B8973E]/30 px-6 py-5 flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-[#B8973E] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[#0A0A0A] mb-1">Important Notice</p>
            <p className="text-sm text-[#0A0A0A]/60">
              All sales at Orchid Designs are final. We do not offer refunds under any circumstances. Exchanges are only accepted for damaged or incorrect items, subject to strict conditions. Please review our policy thoroughly.
            </p>
          </div>
        </div>

        {/* Section 1: No Refund */}
        <PolicySection icon={<ShieldX className="w-5 h-5" />} title="No Refund Policy">
          <p>
            <strong className="text-[#0A0A0A]/80">All purchases are strictly final.</strong> We do not offer refunds under any circumstances, including but not limited to:
          </p>
          <ul className="list-none space-y-2 mt-3">
            {[
              "Change of mind or personal preference",
              "Product did not meet expectations",
              "Color variation due to screen/monitor settings",
              "Dislike of the product after purchase",
              "Delayed delivery due to courier or external factors",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-[#B8973E] rounded-full mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </PolicySection>

        {/* Section 2: Exchange Eligibility */}
        <PolicySection icon={<RefreshCw className="w-5 h-5" />} title="Exchange Eligibility">
          <p>Exchanges are <strong className="text-[#0A0A0A]/80">only permitted</strong> in the following situations:</p>
          <ul className="list-none space-y-2 mt-3 mb-6">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 bg-[#B8973E] rounded-full mt-2 shrink-0" />
              Product received in a <strong className="text-[#0A0A0A]/80">visibly damaged condition</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 bg-[#B8973E] rounded-full mt-2 shrink-0" />
              <strong className="text-[#0A0A0A]/80">Wrong product</strong> delivered (different from what was ordered)
            </li>
          </ul>
          <p>Exchanges will <strong className="text-[#0A0A0A]/80">NOT</strong> be considered for:</p>
          <ul className="list-none space-y-2 mt-3">
            {[
              "Change of mind or preference",
              "Size issues (please review size charts carefully before ordering)",
              "Minor color variations from product photos (due to screen settings)",
              "Wear and tear from use",
              "Handcrafted irregularities, which are natural characteristics of artisan work",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </PolicySection>

        {/* Section 3: Unboxing Video Requirement */}
        <PolicySection icon={<Video className="w-5 h-5" />} title="Mandatory Unboxing Video">
          <p className="bg-[#F5F5F5] px-5 py-4 border-l-2 border-[#B8973E] text-sm text-[#0A0A0A]/70 mb-4">
            ⚠️ An unboxing video is <strong className="text-[#0A0A0A]">mandatory</strong> for all exchange requests. Without it, your request will be automatically rejected, with no exceptions.
          </p>
          <p className="mb-3">Your unboxing video must:</p>
          <ul className="list-none space-y-2">
            {[
              "Be a single, continuous, unedited recording — no cuts, pauses, or edits",
              "Clearly show the sealed package before opening",
              "Capture the complete unboxing process from start to finish",
              "Clearly show the product and its condition immediately upon opening",
              "Be recorded in good lighting for clear visibility",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-[#B8973E] rounded-full mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </PolicySection>

        {/* Section 4: Reporting Window */}
        <PolicySection icon={<Clock className="w-5 h-5" />} title="24-Hour Reporting Window">
          <p>
            All exchange requests must be reported to us <strong className="text-[#0A0A0A]/80">within 24 hours of delivery</strong>. Issues reported after this window will not be considered, regardless of the circumstances.
          </p>
          <p className="mt-3">
            To initiate an exchange, contact us immediately via:
          </p>
          <ul className="list-none space-y-2 mt-3">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#B8973E] shrink-0" />
              <a href="tel:+917559066838" className="hover:text-[#B8973E] transition-colors">+91 7559066838</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#B8973E] shrink-0" />
              <a href="mailto:info@orchiddesigns.com" className="hover:text-[#B8973E] transition-colors">info@orchiddesigns.com</a>
            </li>
          </ul>
        </PolicySection>

        {/* Section 5: Exchange Process */}
        <PolicySection icon={<Package className="w-5 h-5" />} title="Exchange Process">
          <p className="mb-4">If your exchange request is approved, the following conditions must be met:</p>
          <div className="space-y-5">
            {[
              { step: "01", title: "Self-Ship the Product", desc: "You are responsible for shipping the item back to us. Return shipping costs are borne by the customer." },
              { step: "02", title: "Item Condition Requirements", desc: "The product must be completely unused, unwashed, and with all original tags still attached. Items showing signs of use will not be accepted." },
              { step: "03", title: "Verification", desc: "Upon receiving the returned item, our team will inspect it. This may take 3–5 business days." },
              { step: "04", title: "Replacement Dispatch", desc: "Once verified and approved, a replacement item will be dispatched within 5–7 business days." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex items-start gap-5">
                <span className="font-heading text-3xl text-[#B8973E]/20 leading-none shrink-0">{step}</span>
                <div>
                  <p className="font-semibold text-[#0A0A0A]/80 mb-1">{title}</p>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </PolicySection>

        {/* Section 6: Cancellation Policy */}
        <PolicySection icon={<ShieldX className="w-5 h-5" />} title="Cancellation Policy">
          <p>
            Orders may only be cancelled <strong className="text-[#0A0A0A]/80">before dispatch</strong>. Once your order has been shipped, cancellations will not be accepted under any circumstances.
          </p>
          <p className="mt-3">
            To request a cancellation, contact us immediately with your order details. We process orders quickly, so please act fast.
          </p>
        </PolicySection>

        {/* Section 7: Product Disclaimer */}
        <PolicySection icon={<AlertTriangle className="w-5 h-5" />} title="Product Disclaimer">
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-[#0A0A0A]/80 mb-1">Color Variations</p>
              <p>Product colors may vary slightly from what you see on your screen due to differences in monitor calibration, screen settings, and lighting during photography. This is not a valid reason for exchange or return.</p>
            </div>
            <div>
              <p className="font-semibold text-[#0A0A0A]/80 mb-1">Handcrafted Irregularities</p>
              <p>Many of our products are handcrafted by skilled artisans. Minor variations in embroidery, weave patterns, and finishing are natural characteristics of handcrafted goods and reflect their authentic, one-of-a-kind nature. These are not considered defects.</p>
            </div>
            <div>
              <p className="font-semibold text-[#0A0A0A]/80 mb-1">Wear & Tear Exclusion</p>
              <p>Orchid Designs is not responsible for any damage resulting from normal wear and tear, improper care, or mishandling of the product after delivery.</p>
            </div>
          </div>
        </PolicySection>

        {/* Contact Section */}
        <div className="mt-12 bg-[#0A0A0A] p-10 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF6A] font-semibold mb-3">Need Help?</p>
          <h2 className="font-heading text-2xl text-white mb-6">Contact Our Support Team</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/50 text-sm">
            <a href="tel:+917559066838" className="flex items-center gap-2 hover:text-[#D4AF6A] transition-colors">
              <Phone className="w-4 h-4" />
              +91 7559066838
            </a>
            <div className="flex items-center gap-4">
              <a href="mailto:info@orchiddesigns.com" className="flex items-center gap-2 hover:text-[#D4AF6A] transition-colors">
                <Mail className="w-4 h-4" />
                info@orchiddesigns.com
              </a>
              <span className="text-white/20">|</span>
              <a href="mailto:orchiddesignsbykunjus@gmail.com" className="hover:text-[#D4AF6A] transition-colors">
                orchiddesignsbykunjus@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Kochi, Kerala, India
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-white/25 text-xs">
            Support hours: Monday – Saturday, 9:00 AM – 6:00 PM IST
          </div>
        </div>

        <p className="text-center text-[11px] text-foreground/25 mt-8">
          Policy last updated: June 2026 · By making a purchase, you agree to these terms.
        </p>
      </div>
    </main>
  );
}
