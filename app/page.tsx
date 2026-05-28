import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import DealerForm from "@/components/DealerForm";

export const metadata: Metadata = {
  title: "CineLuxe — Acoustic Panel Systems for Private Cinema",
  description:
    "CineLuxe is a modular acoustic panel system for private cinema — stretch fabric panels, integrated LED lighting, star ceilings, and bass treatment that installs in days, not months.",
};

const components = [
  {
    id: "panels",
    label: "Acoustic Wall Panels",
    title: "The Panel Is the Design",
    body: "Aluminum-framed stretch fabric panels with acoustic cores inside. Each panel absorbs, diffuses, or does both — positioned for the room's specific acoustic needs. Choose stretch fabric for a seamless modern look, real wood veneer for warmth, or geometric diffuser cuts for visual and acoustic depth. Nothing is glued. Everything is removable and reconfigurable.",
    specs: ["Stretch fabric, wood veneer, or diffuser finishes", "H33 / H75 / H120 frame depths", "600×600mm modular grid, mirrored L/R sets"],
    image: "/images/denver-render-front.jpg",
    imageAlt: "CineLuxe stretch fabric acoustic wall panels — Denver installation",
  },
  {
    id: "lighting",
    label: "Integrated LED Lighting",
    title: "Lighting Built Into the System",
    body: "RGBW perimeter lighting routes behind panel edges for a clean, sourceless glow. Add track lighting for architectural accents, mini can lights for task zones, or a fiber optic star ceiling for a showpiece overhead. All LED elements plug in via daisy-chain — no electrician required, no visible wires.",
    specs: ["RGBW perimeter (16M colors + tunable white)", "Fiber optic star ceiling (Nova builds)", "Plug-and-play — no electrician required"],
    image: "/images/denver-render-side.jpg",
    imageAlt: "CineLuxe integrated LED lighting — panel perimeter glow",
  },
  {
    id: "bass",
    label: "Bass Treatment & Diffusers",
    title: "Low-End Control, Designed In",
    body: "Corner and boundary bass traps are specified as part of the panel layout — not added as an afterthought. Diffuser panels break up reflections and add visual texture. Both integrate with the same aluminum frame system, so the treatment matches the aesthetic of the rest of the room.",
    specs: ["Corner & boundary bass traps", "Geometric wood diffuser panels", "Matched to panel finish and layout"],
    image: "/images/render-small-room-a.jpg",
    imageAlt: "CineLuxe bass trap and diffuser panel configuration",
  },
];

const whyItWorks = [
  {
    title: "Modular. Not Glued.",
    body: "Traditional acoustic panels are adhesive-mounted or built in. CineLuxe panels hang on a cleat or aluminum frame system — removable, reconfigurable, and upgradeable without touching drywall.",
  },
  {
    title: "Acoustic + Aesthetic in One",
    body: "Other solutions treat the acoustics and then decorate around them. CineLuxe panels are the decoration — stretch fabric, wood veneer, and diffuser cuts that look extraordinary and perform to spec.",
  },
  {
    title: "1–3 Day Install",
    body: "Traditional acoustic builds take 4–12 weeks and 3–5 trades. CineLuxe installs in 1–3 days with one tech. Day 1: mount cleats or frame. Day 2: hang panels. Day 3: connect lighting and calibrate.",
  },
  {
    title: "A Fraction of the Cost",
    body: "Established acoustic treatment companies are expensive — significantly so, depending on room size and scope. CineLuxe delivers comparable acoustic performance and a better-looking room at a substantially lower investment, with nothing glued to the wall.",
  },
  {
    title: "Works With Any AV System",
    body: "CineLuxe integrates with any projection, audio, or control system — including URC, Control4, Lutron, and Josh.AI. Speaker-transparent panels let audio fire through without distortion.",
  },
  {
    title: "New Builds & Retrofits",
    body: "Works on finished walls, framed rooms, or as part of a full room-in-room isolation build. No demolition, no structural work required for standard installs.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Share the Room",
    body: "Dimensions, drawings, or photos. Our team assesses the space and identifies what the room needs acoustically.",
  },
  {
    step: "02",
    title: "Custom Layout Design",
    body: "Panel placement, frame depth, lighting type, and finish are specified for that room. You review and approve before anything is manufactured.",
  },
  {
    step: "03",
    title: "Manufactured & Shipped",
    body: "Custom fabrication takes 7–21 days. DIY panel kits ship in 3–5 business days. Everything arrives ready to hang.",
  },
  {
    step: "04",
    title: "Installed in Days",
    body: "Mount cleats or frame on Day 1. Hang panels on Day 2. Connect lighting and calibrate on Day 3. Complete cinema room — no weeks of trades.",
  },
  {
    step: "05",
    title: "The Result",
    body: "A professionally treated acoustic environment with a visual signature your client couldn't get anywhere else — and that only your dealership could deliver.",
  },
];

const venues = [
  {
    icon: "⌂",
    title: "Private Residences",
    description: "Dedicated cinema rooms in estate homes and penthouses. Acoustic performance and visual identity designed around the space from the start.",
  },
  {
    icon: "⚓",
    title: "Superyachts & Aviation",
    description: "Lightweight modular panels engineered for marine and aviation environments. Weight, moisture, and space constraints resolved without aesthetic compromise.",
  },
  {
    icon: "◧",
    title: "Hotels & Private Clubs",
    description: "Private cinema as a defining hospitality amenity. A room that commands attention and justifies the investment.",
  },
  {
    icon: "◫",
    title: "Developer Projects",
    description: "Luxury residential cinema as a flagship spec. CineLuxe works from pre-construction drawings through to finished installation.",
  },
];

const dealerBenefits = [
  {
    title: "A Product Your Competitors Can't Offer",
    description: "Most integrators spec panels from the same catalog. CineLuxe is exclusive to authorized dealers — your clients can't get it anywhere else.",
  },
  {
    title: "Protected Territories",
    description: "Qualified dealers receive territory protection. You're the only authorized CineLuxe partner in your market.",
  },
  {
    title: "We Design. You Specify.",
    description: "Share the room dimensions and our team produces the full panel layout. You present it, your client approves it, we manufacture and ship.",
  },
  {
    title: "Works With Your AV Spec",
    description: "No proprietary lock-in. CineLuxe works alongside any projection, audio, or control system you already sell.",
  },
  {
    title: "Full Project Support",
    description: "Every dealer gets acoustic design support, installation documentation, and direct access to our team on every project.",
  },
  {
    title: "Premium Sales Materials",
    description: "High-res photography, renders, product sheets, and sample kits — everything you need to present CineLuxe to clients before a panel ships.",
  },
];

// Real build photos — portrait orientation (3:4), highest quality selections
const galleryPortrait = [
  { src: "/images/build-img_3606.jpg", alt: "CineLuxe installation in progress" },
  { src: "/images/build-img_3609.jpg", alt: "CineLuxe panel mounting" },
  { src: "/images/build-img_3695.jpg", alt: "CineLuxe cinema room construction" },
];

// Finished room renders — landscape (16:9)
const galleryLandscape = [
  { src: "/images/denver-render-front.jpg", alt: "CineLuxe finished cinema room — front view" },
  { src: "/images/denver-render-rear.jpg", alt: "CineLuxe finished cinema room — seating perspective" },
  { src: "/images/render-small-room-c.jpg", alt: "CineLuxe finished cinema room — full configuration" },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-cinema-950">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-cinema.jpg"
            alt="CineLuxe acoustic panel system — private cinema"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-950 via-cinema-950/88 to-cinema-950/35" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cinema-950 to-transparent" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.018] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,160,23,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                Authorized Dealer Program
              </span>
            </div>

            <h1 className="section-title mb-6 leading-tight">
              Acoustic Performance.{" "}
              <span className="gold-text">Cinematic Design.</span>{" "}
              Installed in Days.
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              CineLuxe is a modular acoustic panel system for private cinema. Custom
              stretch fabric panels, integrated LED lighting, fiber optic star ceilings,
              and precision bass treatment — configured for your room, installed in 1–3 days.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-10">
              Where traditional acoustic builds take months and cost a fortune,
              CineLuxe delivers comparable performance in days —
              with nothing glued to the wall.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#apply" className="btn-gold">
                Apply to Become a Dealer
              </Link>
              <Link href="/about" className="btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </section>

      {/* ── WHAT IS CINELUXE ── */}
      <section className="py-28 px-6 lg:px-12 bg-cinema-950">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                What We Are
              </span>
            </div>
            <h2 className="section-title mb-6">
              Not a Cinema Company.{" "}
              <span className="gold-text">The System That Makes One.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-5">
              CineLuxe is the acoustic and aesthetic layer that turns a room into a
              private cinema. Modular aluminum-framed panels hang on a cleat or
              grid system — stretch fabric or wood veneer on the outside, acoustic
              core inside. Integrated LED lighting, bass traps, and star ceilings
              are part of the same system.
            </p>
            <p className="text-gray-400 leading-relaxed mb-5">
              You bring the projector, the audio system, the seating. CineLuxe handles
              everything that makes the room perform and look extraordinary. Nothing is
              glued, nothing is permanent — every panel can be removed, upgraded,
              or reconfigured.
            </p>
            <p className="text-gray-400 leading-relaxed">
              The established acoustic treatment market carries a significant price tag.
              CineLuxe delivers comparable acoustic performance and a better-looking room
              at a fraction of that investment — and nothing is ever glued to the wall.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden border border-cinema-700">
            <Image
              src="/images/render-small-room-c.jpg"
              alt="CineLuxe modular panel system — full room configuration"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-cinema-950/15" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold-500/40" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold-500/40" />
          </div>
        </div>
      </section>

      {/* ── THE COMPONENTS ── */}
      <section className="py-28 px-6 lg:px-12 bg-cinema-900 border-y border-cinema-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                The System
              </span>
              <div className="gold-divider w-10 my-0" />
            </div>
            <h2 className="section-title mb-4">Every Component. One System.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
              Acoustic panels, integrated lighting, and bass treatment — specified
              together for the room, manufactured to spec, delivered ready to hang.
              Mix and match. Configure to budget. Upgrade any time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {components.map((c, idx) => (
              <div
                key={c.id}
                className="group relative overflow-hidden border border-cinema-700 bg-cinema-950 hover:border-gold-500/30 transition-all duration-500"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.imageAlt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-cinema-950/25 group-hover:bg-cinema-950/5 transition-colors duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs tracking-[0.3em] text-gold-400/80 font-mono">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold-500/50" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold-500/50" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="gold-divider w-6 my-0" />
                    <span className="text-xs tracking-[0.3em] uppercase text-gold-500 font-semibold">
                      {c.label}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">{c.title}</h3>
                  <p className="text-gray-300 text-base leading-relaxed mb-6">{c.body}</p>
                  <div className="border-t border-cinema-700 pt-5 flex flex-col gap-3">
                    {c.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500/70 flex-shrink-0" />
                        <span className="text-sm text-gray-400">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH VISUAL ── */}
      <section className="relative overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
          <Image
            src="/images/render-small-room-b.jpg"
            alt="CineLuxe — complete acoustic panel installation"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-950/85 via-transparent to-cinema-950/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-950/50 via-transparent to-cinema-950/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6">
            <div className="text-center">
              <div className="gold-divider w-12 mx-auto mb-4" />
              <p className="font-serif text-white text-xl md:text-2xl font-light tracking-wide mb-1">
                The Treatment Is the Design.
              </p>
              <p className="text-gray-400 text-xs tracking-[0.4em] uppercase">
                CineLuxe — Modular Acoustic Cinema Systems
              </p>
            </div>
          </div>
          <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-gold-500/40" />
          <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-gold-500/40" />
          <div className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-gold-500/40" />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-gold-500/40" />
        </div>
      </section>

      {/* ── WHY IT WORKS ── */}
      <section className="py-28 px-6 lg:px-12 bg-cinema-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                Why CineLuxe
              </span>
              <div className="gold-divider w-10 my-0" />
            </div>
            <h2 className="section-title mb-4">
              What Makes This Different
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              CineLuxe isn&apos;t a better version of existing acoustic panels.
              It&apos;s a different category entirely.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-cinema-700">
            {whyItWorks.map((item) => (
              <div key={item.title} className="bg-cinema-950 p-8 hover:bg-cinema-900 transition-colors group">
                <div className="gold-divider w-8 mb-5 group-hover:w-12 transition-all duration-300" />
                <h3 className="font-serif text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28 px-6 lg:px-12 bg-cinema-900 border-y border-cinema-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                For Dealers
              </span>
              <div className="gold-divider w-10 my-0" />
            </div>
            <h2 className="section-title mb-4">How a Project Comes Together</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From room dimensions to finished cinema — here&apos;s what it looks like
              to specify CineLuxe on a project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative group">
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-cinema-600 z-0" />
                )}
                <div className="relative z-10 flex flex-col items-center text-center px-4 pb-8 md:pb-0">
                  <div className="w-16 h-16 border border-cinema-600 bg-cinema-900 flex items-center justify-center mb-4 group-hover:border-gold-500/40 transition-colors">
                    <span className="text-gold-500/70 font-mono text-sm">{step.step}</span>
                  </div>
                  <h3 className="font-serif font-bold text-white text-base mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.body}</p>
                </div>
                {i < howItWorks.length - 1 && (
                  <div className="md:hidden mx-auto w-px h-8 bg-cinema-600 mb-4" />
                )}
              </div>
            ))}
          </div>

          {/* Install comparison */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Lead Time", cineluxe: "2–4 weeks", traditional: "2–6 months" },
              { label: "Install Time", cineluxe: "1–3 days", traditional: "4–12+ weeks" },
              { label: "Trades Required", cineluxe: "0–1 tech", traditional: "3–5 minimum" },
            ].map((row) => (
              <div key={row.label} className="border border-cinema-700 bg-cinema-950 p-6">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">{row.label}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gold-500/60 mb-1">CineLuxe</p>
                    <p className="font-serif text-xl font-bold text-white">{row.cineluxe}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-1">Traditional</p>
                    <p className="font-serif text-xl font-bold text-gray-600 line-through">{row.traditional}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
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
              More Installs →
            </Link>
          </div>
          {/* Portrait row */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            {galleryPortrait.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden group border border-cinema-800 hover:border-gold-500/30 transition-colors duration-300"
                style={{ aspectRatio: "3/4" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-cinema-950/20 group-hover:bg-cinema-950/0 transition-colors duration-500" />
              </div>
            ))}
          </div>
          {/* Landscape row */}
          <div className="grid grid-cols-3 gap-2">
            {galleryLandscape.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden group border border-cinema-800 hover:border-gold-500/30 transition-colors duration-300"
                style={{ aspectRatio: "16/9" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 33vw, 33vw"
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
                Clients Who Expect{" "}
                <span className="gold-text">the Room to Match the System</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                High-end cinema clients don&apos;t want untreated drywall behind
                a $100K audio system. They want a room that looks and sounds
                like it was built for the purpose — because it was. CineLuxe
                gives dealers the product to close that conversation.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Walk a qualified client through a finished CineLuxe installation
                and the room does the selling. The panels, the lighting, the star
                ceiling — it&apos;s a showpiece. And it&apos;s yours to offer.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {venues.map((venue) => (
                <div key={venue.title} className="p-6 border border-cinema-700 bg-cinema-900 hover:border-gold-500/20 transition-colors">
                  <div className="text-gold-500/70 text-2xl mb-4">{venue.icon}</div>
                  <h3 className="font-serif font-bold text-white mb-2">{venue.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{venue.description}</p>
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
                The Partnership
              </span>
              <div className="gold-divider w-10 my-0" />
            </div>
            <h2 className="section-title mb-4">What Dealers Get</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              CineLuxe is built to make authorized dealers look extraordinary
              on every project they bring it to.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-cinema-700">
            {dealerBenefits.map((b) => (
              <div key={b.title} className="bg-cinema-900 p-8 hover:bg-cinema-800 transition-colors group">
                <div className="gold-divider w-8 mb-5 group-hover:w-12 transition-all duration-300" />
                <h3 className="font-serif text-xl font-bold text-white mb-3">{b.title}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/denver-render-rear.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-cinema-950/92" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(212,160,23,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="text-gold-500/30 text-7xl font-serif leading-none mb-6">&ldquo;</div>
          <blockquote className="font-serif text-2xl md:text-3xl text-white leading-relaxed font-light mb-8">
            Most rooms are built and then treated. CineLuxe rooms are designed
            so that the treatment is inseparable from the architecture. Nothing
            glued. Nothing hidden. Nothing compromised.
          </blockquote>
          <div className="gold-divider w-12 mx-auto mb-4" />
          <cite className="text-xs tracking-[0.3em] uppercase text-gray-500 not-italic">
            CineLuxe Design Philosophy
          </cite>
        </div>
      </section>

      {/* ── DEALER APPLICATION ── */}
      <section id="apply" className="py-28 px-6 lg:px-12 bg-cinema-950 border-t border-cinema-700">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                Limited Territories Available
              </span>
              <div className="gold-divider w-10 my-0" />
            </div>
            <h2 className="section-title mb-4">
              Apply to Become a{" "}
              <span className="gold-text">CineLuxe Dealer</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Dealer territories are limited and awarded selectively. Fill out the
              application below and our team will be in touch within 3–5 business days.
            </p>
          </div>
          <div className="border border-cinema-700 bg-cinema-900 p-8 md:p-12">
            <DealerForm />
          </div>
        </div>
      </section>
    </>
  );
}
