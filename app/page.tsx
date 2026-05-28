import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CineLuxe — Private Cinema Systems for Discerning Integrators",
  description:
    "Become an authorized CineLuxe dealer. Our bespoke acoustic panel cinema systems transform any room into a world-class private screening environment — by design.",
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
    body: "Every CineLuxe system is anchored by a calibrated 4K laser projection setup specified for the exact room — throw distance, screen gain, ambient conditions. The image isn't configured. It's engineered.",
    spec1: "4K Laser Projection",
    spec2: "Calibrated to DCI-P3",
    spec3: "12,000+ Lumens",
    image: "/images/denver-render-front.jpg",
    imageAlt: "CineLuxe flagship installation — front projection view",
    imageW: 1552,
    imageH: 866,
  },
  {
    id: "audio",
    label: "Audio",
    title: "Sound Built for the Space",
    body: "Speaker placement, amplification, and DSP tuning are modeled around the room's geometry before a single component is ordered. The result is object-based audio that feels native to the space — not installed into it.",
    spec1: "Dolby Atmos / DTS:X",
    spec2: "Custom Speaker Arrays",
    spec3: "Room-Tuned DSP",
    image: "/images/denver-render-side.jpg",
    imageAlt: "CineLuxe installation — side wall acoustic panel detail",
    imageW: 1726,
    imageH: 865,
  },
  {
    id: "acoustics",
    label: "Acoustic Panels",
    title: "The Room Is the System",
    body: "CineLuxe's defining element is the architectural acoustic panel array. Each panel is positioned and specified to control reflection, diffusion, and absorption — while simultaneously defining the room's visual identity. The treatment isn't hidden. It is the design.",
    spec1: "Custom Panel Configuration",
    spec2: "Diffusion & Absorption",
    spec3: "RT60 Optimized Per Room",
    image: "/images/render-small-room-a.jpg",
    imageAlt: "CineLuxe acoustic design — full room render",
    imageW: 2880,
    imageH: 1620,
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

const galleryImages = [
  { src: "/images/2390031948913825473.jpg", alt: "CineLuxe private cinema installation" },
  { src: "/images/3467950884395237053.jpg", alt: "CineLuxe screening room — acoustic detail" },
  { src: "/images/5858629690666302780.jpg", alt: "CineLuxe render — luxury cinema environment" },
  { src: "/images/7865285807327135041.jpg", alt: "CineLuxe flagship installation render" },
  { src: "/images/8715399246450177116.jpg", alt: "CineLuxe private cinema — full room view" },
  { src: "/images/denver-render-rear.jpg", alt: "CineLuxe Denver showroom — seating view" },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-cinema-950">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-cinema.jpg"
            alt="CineLuxe private cinema flagship installation"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Dark gradient overlay — heavier on left for text legibility, lighter on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-950 via-cinema-950/85 to-cinema-950/40" />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cinema-950 to-transparent" />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,160,23,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                Authorized Dealer Program
              </span>
            </div>

            <h1 className="section-title mb-6 leading-tight">
              Private Cinema Where{" "}
              <span className="gold-text">Every Surface</span>{" "}
              Is Intentional.
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-4 max-w-xl">
              CineLuxe builds private cinema rooms from the walls out. Our bespoke acoustic
              panel systems define how a room looks, sounds, and feels — engineered together
              as a single architectural statement.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-xl">
              Our authorized dealer program gives AV integrators, luxury designers, and premium
              builders access to our systems, our design team, and a product category
              their high-end clients are actively looking for.
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
              Projection, audio, and architectural acoustic panels — designed together from the
              first sketch. The room isn&apos;t treated after the fact. The treatment is the room.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {systemPillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                className="group relative overflow-hidden border border-cinema-700 bg-cinema-900 hover:border-gold-500/30 transition-all duration-500"
              >
                {/* Real image */}
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-cinema-950/30 group-hover:bg-cinema-950/10 transition-colors duration-500" />
                  {/* Pillar number */}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs tracking-[0.3em] text-gold-400/80 font-mono drop-shadow-lg">
                      0{idx + 1}
                    </span>
                  </div>
                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold-500/50" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold-500/50" />
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

      {/* ── FULL-WIDTH CINEMATIC VISUAL ── */}
      <section className="relative overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
          <Image
            src="/images/render-small-room-b.jpg"
            alt="CineLuxe private cinema — full room environment"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Cinematic gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-950/80 via-transparent to-cinema-950/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-950/60 via-transparent to-cinema-950/60" />
          {/* Centered copy */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6">
            <div className="text-center">
              <div className="gold-divider w-12 mx-auto mb-4" />
              <p className="font-serif text-white text-xl md:text-2xl font-light tracking-wide mb-1">
                The Panel Is the Room. The Room Is the Experience.
              </p>
              <p className="text-gray-400 text-xs tracking-[0.4em] uppercase">
                CineLuxe — Architectural Acoustic Cinema Systems
              </p>
            </div>
          </div>
          {/* Corner accents */}
          <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-gold-500/40" />
          <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-gold-500/40" />
          <div className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-gold-500/40" />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-gold-500/40" />
        </div>
      </section>

      {/* ── INSTALLATION GALLERY ── */}
      <section className="py-20 px-6 lg:px-12 bg-cinema-950 border-b border-cinema-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                See It Installed
              </span>
            </div>
            <Link
              href="/about"
              className="text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-gold-400 transition-colors"
            >
              View More →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-video overflow-hidden group border border-cinema-800 hover:border-gold-500/30 transition-colors duration-300"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-cinema-950/20 group-hover:bg-cinema-950/0 transition-colors duration-500" />
              </div>
            ))}
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
                At the top of the residential and hospitality market, a projector and some
                speakers isn&apos;t enough. These clients want a room — a purpose-built
                acoustic environment where every surface serves the experience. That&apos;s
                a different product category, and it commands a different conversation.
              </p>
              <p className="text-gray-500 leading-relaxed">
                CineLuxe gives you something to show them that closes itself. Walk a
                qualified client through a finished installation and the room does the work.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {venues.map((venue) => (
                <div
                  key={venue.title}
                  className="p-6 border border-cinema-700 bg-cinema-900 hover:border-gold-500/20 transition-colors"
                >
                  <div className="text-gold-500/70 text-2xl mb-4">{venue.icon}</div>
                  <h3 className="font-serif font-bold text-white mb-2">{venue.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{venue.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SPLIT IMAGE + COPY ── */}
      <section className="bg-cinema-900 border-y border-cinema-700 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-stretch">
          {/* Left: image */}
          <div className="relative min-h-[400px] lg:min-h-[500px]">
            <Image
              src="/images/render-small-room-c.jpg"
              alt="CineLuxe acoustic panel design detail"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cinema-900/60 hidden lg:block" />
          </div>
          {/* Right: copy */}
          <div className="px-8 py-16 lg:px-16 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                The Detail
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              No Two Rooms <br />
              <span className="gold-text">Are Ever the Same.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Every CineLuxe installation begins with the room — its dimensions, its
              materials, its purpose. Our acoustic engineers model the space and design
              a custom panel configuration that controls the sound while defining the
              room&apos;s visual character.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              The panel layout, geometry, and finish are specified for that room alone.
              What your client gets is something that couldn&apos;t exist anywhere else —
              and couldn&apos;t be replicated without starting over.
            </p>
            <Link href="/contact" className="btn-gold self-start">
              Apply to Become a Dealer
            </Link>
          </div>
        </div>
      </section>

      {/* ── DEALER BENEFITS ── */}
      <section className="py-28 px-6 lg:px-12 bg-cinema-950">
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
              Our dealer program is built around one goal: equipping you to win in a market
              segment your competitors aren&apos;t playing in yet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-cinema-700">
            {dealerBenefits.map((b) => (
              <div
                key={b.title}
                className="bg-cinema-950 p-8 hover:bg-cinema-900 transition-colors group"
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
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
        {/* Background image with heavy overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/6894492956658708246.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-cinema-950/90" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(212,160,23,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="text-gold-500/30 text-7xl font-serif leading-none mb-6">&ldquo;</div>
          <blockquote className="font-serif text-2xl md:text-3xl text-white leading-relaxed font-light mb-8">
            Most rooms are built and then treated. A CineLuxe room is
            designed so that the treatment is inseparable from the architecture.
            That&apos;s what makes the difference between a theater and an experience.
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
                Dealer territories are limited and awarded selectively. Apply today and
                our team will be in touch within 3–5 business days to discuss your market
                and what a CineLuxe partnership looks like in practice.
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
