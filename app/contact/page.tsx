import DealerForm from "@/components/DealerForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Dealer",
  description:
    "Apply to join the CineLuxe authorized dealer network. Limited territories available — apply today.",
};

const steps = [
  { num: "01", title: "Apply", desc: "Submit your dealer application below." },
  { num: "02", title: "Review", desc: "Our team reviews your business within 3–5 business days." },
  { num: "03", title: "Onboard", desc: "Qualified applicants receive a dealer kit and training schedule." },
  { num: "04", title: "Sell", desc: "Begin presenting CineLuxe to your clients and earning premium margins." },
];

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative py-24 px-6 lg:px-12 border-b border-cinema-700 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(212,160,23,1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="gold-divider w-10 my-0" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
              Dealer Application
            </span>
          </div>
          <h1 className="section-title mb-4 max-w-2xl">
            Join the CineLuxe{" "}
            <span className="gold-text">Dealer Network</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Territories are limited. Complete the application below and our
            dealer development team will be in touch within 3–5 business days.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 lg:px-12 bg-cinema-900 border-b border-cinema-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="gold-divider w-10 my-0" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
              How It Works
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="group">
                <div className="text-3xl font-mono font-bold gold-text mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                  {step.num}
                </div>
                <h3 className="font-serif font-bold text-white text-lg mb-1">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-16">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="card-cinema">
              <h3 className="font-serif font-bold text-lg mb-2 text-white">
                Who We&apos;re Looking For
              </h3>
              <div className="gold-divider" />
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  "Established AV integrators or luxury home builders",
                  "Interior designers with UHNW client base",
                  "Yacht/aviation fit-out specialists",
                  "High-end custom home builders",
                  "Dedicated showroom or demonstration capability",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-gold-500 mt-0.5 flex-shrink-0">◈</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-cinema">
              <h3 className="font-serif font-bold text-lg mb-2 text-white">
                Questions?
              </h3>
              <div className="gold-divider" />
              <p className="text-sm text-gray-400 mb-3">
                Our dealer team is happy to answer any questions before you
                apply.
              </p>
              <a
                href="mailto:dealers@cineluxe.us"
                className="text-gold-400 hover:text-gold-300 text-sm transition-colors"
              >
                dealers@cineluxe.us
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <DealerForm />
          </div>
        </div>
      </section>
    </>
  );
}
