"use client";

import Navbar from "@/components/Navbar";

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-40 pb-32 px-6 max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl text-foreground font-medium mb-12">Legal Information</h1>
        <div className="space-y-8 text-foreground/80 font-light">
          <p>
            Please read these terms and conditions carefully before using our service.
          </p>
          <h2 className="font-heading text-2xl mt-8 mb-4">Privacy Policy</h2>
          <p>
            Your privacy is important to us. It is Orchid Designs' policy to respect your privacy regarding any information we may collect from you across our website.
          </p>
          <h2 className="font-heading text-2xl mt-8 mb-4">Terms of Service</h2>
          <p>
            By accessing our website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>
        </div>
      </section>
    </main>
  );
}
