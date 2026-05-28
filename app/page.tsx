import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CineLuxe — Private Cinema for Discerning Clients",
  description:
    "Become an authorized CineLuxe dealer. Offer your clients the world's finest private cinema systems for luxury residences, yachts, and premium venues.",
};

const stats = [
  { value: "500+", label: "Installations worldwide" },
  { value: "12+", label: "Years in luxury cinema" },
  { value: "40+", label: "Authorized dealer partners" },
  { value: "98%", label: "Client satisfaction rate" },
];

const systemPillars = [
  {
    id: "projection",
    label: "Projection",
    title: "Reference-Grade Optics",
    body: "We specify and calibrate only the finest 4K laser projectors — delivering color accuracy, contrast, and brightness that transforms any room into a true reference screening environment. No compromises on the image.",
    spec1: "4K Laser Projection",
    spec2: "Calibrated to DCI-P3",
    spec3: "12,000+ Lumens",
  },
  {
    id: "audio",
    label: "Audio",
    title: "Immersive Sound Architecture",
    body: "From discrete Dolby Atmos object-based audio to fully bespoke speaker arrays, CineLuxe audio systems are engineered and tuned for the specific dimensions and materials of each space — not adapted from a showroom template.",
    spec1: "Dolby Atmos / DTS:X",
    spec2: "Custom Speaker Arrays",
    spec3: "Room-Tuned DSP",
  },
  {
    id: "acoustics",
    label: "Acoustics",
    title: "Precision Acoustic Design",
    body: "The finest projection and audio systems in the world are wasted in an untreated room. Our acoustic engineers design bespoke panel layouts, materials, and seating configurations to achieve a room that sounds as extraordinary as it looks.",
    spec1: "RT60 Optimized",
    spec2: "Bespoke Panel Design",
    spec3: "Diffusion & Absorption",
  },
];

const venues = [
  {
    icon: "⌂",
    title: "Private Residences",
    description:
      "From dedicated screening rooms in estate homes to intimate media lounges in penthouses — designed around the client's lifestyle and space.",
  },
  {
    icon: "⚓",
    title: "Superyachts & Aviation",
    description:
      "Marine-grade engineering meets cinematic luxury. CineLuxe systems for superyachts and private aircraft are built for vibration, moisture, and space constraints without sacrificing a frame of quality.",
  },
  {
    icon: "◧",
    title: "Hotels & Private Clubs",
    description:
      "Ultra-luxury hospitality venues increasingly define themselves by exceptional amenities. CineLuxe private screening rooms set a standard guests don't forget.",
  },
  {
    icon: "◫",
    title: "Developer Projects",
    description:
      "We partner with luxury residential developers to specify and deliver private cinema as a flagship amenity — from pre-construction through white-glove installation.",
  },
];

const dealerBenefits = [
  {
    title: "High-Margin Product Line",
    description:
      "CineLuxe systems command premium pricing in the luxury AV market, delivering exceptional margins for our authorized dealer network.",
  },
  {
    title: "Exclusive Territories",
    description:
      "Qualified dealers receive protected territories, ensuring you're the go-to CineLuxe partner in your market.",
  },
  {
    title: "Full Sales Support",
    description:
      "From proposal to installation, our team provides co-selling resources, product training, and dedicated dealer support at every stage.",
  },
  {
    title: "Premium Marketing Assets",
    description:
      "Access our full library of branded materials — photography, brochures, digital assets — to present CineLuxe to your clients with confidence.",
  },
  {
    title: "In-House Design Team",
    description:
      "Every project is backed by our acoustic engineers, AV designers, and project managers. You sell and specify — we help you deliver.",
  },
  {
    title: "Ongoing Training & Certification",
    description:
      "Stay at the forefront of private cinema technology with regular dealer trainings, product showcases, and technical certifications.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-cinema-950">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,160,23,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Right-side cinema panel visual */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-stretch pointer-events-none">
          {/* Simulated acoustic side-wall panel array */}
          <div className="flex gap-2 items-stretch w-full px-8 py-20 opacity-60">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm border border-gold-500/10 bg-gradient-to-b from-cinema-900 to-cinema-950"
                style={{ opacity: 0.4 + (i % 3) * 0.2 }}
              />
            ))}
          </div>
          {/* Main screen silhouette */}
          <div className="absolute inset-0 flex items-center justify-center px-16 py-24">
            <div className="w-full aspect-video relative rounded-sm overflow-hidden border border-cinema-700/60">
              <div className="absolute inset-0 bg-gradient-to-br from-cinema-900 via-cinema-950 to-black" />
              {/* Screen glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-gold-500/[0.03] via-transparent to-transparent" />
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-gold-500/50" />
              <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-gold-500/50" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-gold-500/50" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-gold-500/50" />
              {/* Placeholder label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-0.5 bg-gold-500/30" />
                <p className="text-gray-700 text-[10px] tracking-[0.4em] uppercase">Cinema Photography</p>
                <div className="w-12 h-0.5 bg-gold-500/30" />
              </div>
              {/* Projection beam suggestion */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-24 opacity-10"
                style={{
                  background: "linear-gradient(to top, rgba(212,160,23,0.6), transparent)",
                  filter: "blur(4px)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Fade right edge on lg+ */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-r from-transparent to-cinema-950/80 hidden lg:block pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                Authorized Dealer Program
              </span>
            </div>

            <h1 className="section-title mb-6 leading-tight">
              The World&apos;s Finest{" "}
              <span className="gold-text">Private Cinema.</span>{" "}
              Now in Your Portfolio.
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-4 max-w-xl">
              CineLuxe designs and installs bespoke private cinema environments for ultra-luxury
              residences, superyachts, hotels, and developer projects worldwide.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-xl">
              Our authorized dealer program gives AV integrators, luxury designers, and premium
              builders access to our systems, our design team, and the fastest-growing category
              in luxury amenities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-gold">
                Apply to Become a Dealer
              </Link>
              <Link href="/about" className="btn-outline">
                About CineLuxe
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom border accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-cinema-900 border-y border-cinema-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-serif font-bold gold-text mb-1">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE CINELUXE SYSTEM ── */}
      <section className="py-28 px-6 lg:px-12 bg-cinema-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                How We Build
              </span>
              <div className="gold-divider w-10 my-0" />
            </div>
            <h2 className="section-title mb-4">The CineLuxe System</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
              Every installation combines three disciplines — projection, audio, and acoustics —
              engineered together as a single bespoke system. We don&apos;t retrofit. We design from scratch.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {systemPillars.map((pillar, idx) => (
              <div key={pillar.id} className="group relative overflow-hidden border border-cinema-700 bg-cinema-900 hover:border-gold-500/30 transition-all duration-500">
                {/* Image placeholder slot */}
                <div className="aspect-[4/3] relative bg-cinema-950 border-b border-cinema-700 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cinema-900 to-cinema-950" />
                  {/* Simulated panel array inside each card */}
                  <div className="absolute inset-0 flex items-end gap-1.5 px-4 pb-0 opacity-20">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-gold-500/40 to-transparent rounded-t-sm"
                        style={{ height: `${40 + Math.sin(i) * 30}%` }}
                      />
                    ))}
                  </div>
                  {/* Pillar number */}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs tracking-[0.3em] text-gold-500/60 font-mono">
                      0{idx + 1}
                    </span>
                  </div>
                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold-500/30" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold-500/30" />
                  {/* Label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <p className="text-gray-700 text-[9px] tracking-[0.5em] uppercase">
                      {pillar.label} Photography
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="gold-divider w-6 my-0" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold">
                      {pillar.label}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    {pillar.body}
                  </p>
                  {/* Specs */}
                  <div className="border-t border-cinema-700 pt-4 flex flex-col gap-2">
                    {[pillar.spec1, pillar.spec2, pillar.spec3].map((spec) => (
                      <div key={spec} className="flex items-center gap-2.5">
                        <div className="w-1 h-1 rounded-full bg-gold-500/60 flex-shrink-0" />
                        <span className="text-xs text-gray-500">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH CINEMA VISUAL ── */}
      <section className="relative overflow-hidden bg-cinema-950 border-y border-cinema-800">
        {/* Wide cinematic placeholder */}
        <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-950 via-cinema-900 to-cinema-950" />
          {/* Acoustic panel side arrays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 flex gap-1.5 px-3 py-8 opacity-30">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-1 bg-gradient-to-b from-cinema-700 to-cinema-900 rounded-sm" />
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-24 flex gap-1.5 px-3 py-8 opacity-30">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-1 bg-gradient-to-b from-cinema-700 to-cinema-900 rounded-sm" />
            ))}
          </div>
          {/* Screen area */}
          <div className="absolute inset-x-24 inset-y-8 border border-cinema-700/50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs tracking-[0.4em] text-gray-700 uppercase mb-2">
                Flagship Installation Photography
              </div>
              <div className="gold-divider w-16 mx-auto" />
            </div>
            <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-gold-500/30" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-gold-500/30" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-gold-500/30" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-gold-500/30" />
          </div>
          {/* Overlay copy */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="text-gray-600 text-[10px] tracking-[0.5em] uppercase">
              CineLuxe — Where Sound Meets Vision
            </p>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="py-28 px-6 lg:px-12 bg-cinema-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="gold-divider w-10 my-0" />
                <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                  The Market
                </span>
              </div>
              <h2 className="section-title mb-6">
                Clients Who Demand{" "}
                <span className="gold-text">Nothing Less</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Private cinema is one of the fastest-growing categories in ultra-luxury amenities.
                Buyers at the top of the residential and hospitality market don&apos;t want
                a home theater — they want an experience that rivals or exceeds the finest
                commercial venues, in complete privacy.
              </p>
              <p className="text-gray-500 leading-relaxed">
                As a CineLuxe dealer, you unlock access to these clients with a product that
                speaks for itself. Our installations don&apos;t need a hard sell — they
                simply need to be experienced.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {venues.map((venue) => (
                <div key={venue.title} className="p-6 border border-cinema-700 bg-cinema-900 hover:border-gold-500/20 transition-colors">
                  <div className="text-gold-500/70 text-2xl mb-4">{venue.icon}</div>
                  <h3 className="font-serif font-bold text-white mb-2">{venue.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{venue.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DEALER BENEFITS ── */}
      <section className="py-28 px-6 lg:px-12 bg-cinema-900 border-y border-cinema-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                Why Partner With Us
              </span>
              <div className="gold-divider w-10 my-0" />
            </div>
            <h2 className="section-title mb-4">The CineLuxe Dealer Advantage</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our dealer program is built around one goal: making you successful with the clients
              you already serve — and the ones you&apos;ve been looking for a reason to reach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-cinema-700">
            {dealerBenefits.map((b) => (
              <div
                key={b.title}
                className="bg-cinema-900 p-8 hover:bg-cinema-800 transition-colors group"
              >
                <div className="gold-divider w-8 mb-5 group-hover:w-12 transition-all duration-300" />
                <h3 className="font-serif text-lg font-bold text-white mb-3">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE / PHILOSOPHY ── */}
      <section className="py-24 px-6 lg:px-12 bg-cinema-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(212,160,23,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="text-gold-500/30 text-7xl font-serif leading-none mb-6">&ldquo;</div>
          <blockquote className="font-serif text-2xl md:text-3xl text-white leading-relaxed font-light mb-8">
            A private cinema should feel like the rest of the world has
            ceased to exist. That&apos;s not a feature — it&apos;s the entire point.
          </blockquote>
          <div className="gold-divider w-12 mx-auto mb-4" />
          <cite className="text-xs tracking-[0.3em] uppercase text-gray-500 not-italic">
            CineLuxe Design Philosophy
          </cite>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6 lg:px-12 bg-cinema-900 border-t border-cinema-700">
        <div className="max-w-4xl mx-auto">
          <div className="border border-cinema-600 p-12 md:p-16 relative">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold-500/40 -translate-x-px -translate-y-px" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold-500/40 translate-x-px -translate-y-px" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gold-500/40 -translate-x-px translate-y-px" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold-500/40 translate-x-px translate-y-px" />

            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="gold-divider w-10 my-0" />
                <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                  Limited Territories Available
                </span>
                <div className="gold-divider w-10 my-0" />
              </div>
              <h2 className="section-title mb-4">
                Ready to Elevate Your{" "}
                <span className="gold-text">Portfolio?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Authorized dealer spots are limited by territory. Apply today and
                our team will reach out within 3–5 business days to discuss your market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-gold">
                  Apply to Become a Dealer
                </Link>
                <Link href="/about" className="btn-outline">
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
