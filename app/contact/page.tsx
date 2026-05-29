import Image from "next/image";
import DealerForm from "@/components/DealerForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become an Authorized CineLuxe Dealer",
  description:
    "Apply to join the CineLuxe authorized dealer network. We work with established AV integrators, luxury home builders, and interior designers. Limited territories — apply today.",
  alternates: { canonical: "https://www.cineluxe.us/contact" },
  openGraph: {
    title: "Become an Authorized CineLuxe Dealer",
    description:
      "Apply to join the CineLuxe authorized dealer network. We work with AV integrators, luxury home builders, and interior designers. Limited territories.",
    url: "https://www.cineluxe.us/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "CineLuxe Dealer Program" }],
  },
};

const steps = [
  { num: "01", title: "Apply", desc: "Submit your dealer application below." },
  { num: "02", title: "Review", desc: "Our team reviews your business within 3–5 business days." },
  { num: "03", title: "Onboard", desc: "Qualified applicants are set up and introduced to the CineLuxe system." },
  { num: "04", title: "Sell", desc: "Begin presenting CineLuxe to your clients." },
];

const showcaseImages = [
  { src: "/images/denver-render-front.jpg", alt: "CineLuxe finished cinema room — front view" },
  { src: "/images/denver-render-side.jpg", alt: "CineLuxe cinema room with integrated LED lighting" },
  { src: "/images/render-small-room-b.jpg", alt: "CineLuxe small room configuration with star ceiling" },
];

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative py-32 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/build-img_3517.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-cinema-950/80" />
        </div>
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
          <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
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

      {/* ── SHOWCASE STRIP ── */}
      <section className="bg-cinema-950 border-b border-cinema-800">
        <div className="grid grid-cols-3">
          {showcaseImages.map((img, i) => (
            <div
              key={i}
              className="relative overflow-hidden group"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-cinema-950/20 group-hover:bg-cinema-950/0 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-16">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Sidebar image */}
            <div
              className="relative overflow-hidden border border-cinema-700"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src="/images/build-img_3221.jpg"
                alt="CineLuxe finished cinema room — star ceiling, acoustic panels, LED lighting"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-cinema-950/10" />
            </div>

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
