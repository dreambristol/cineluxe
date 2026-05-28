import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CineLuxe — Modular Acoustic Panel Systems",
  description:
    "CineLuxe manufactures modular acoustic panel systems for private cinema. Stretch fabric panels, integrated LED lighting, fiber optic star ceilings, and bass treatment — configured for any room, installed in days.",
};

const panelOptions = [
  {
    label: "H33 Slim",
    depth: "33mm frame",
    body: "Melamine foam core. Light absorption, minimal depth. Best for spaces where room size matters and acoustic needs are moderate.",
  },
  {
    label: "H75 Mid",
    depth: "75mm frame",
    body: "Multi-blend polyester fiber core. Improved low-mid absorption and visual depth. The most versatile option for dedicated cinema rooms.",
  },
  {
    label: "H120 Deep",
    depth: "120mm frame",
    body: "Maximum absorption and diffusion. Deep fiber or melamine fill with optional diffuser face cuts. For high-performance and flagship builds.",
  },
];

const finishes = [
  {
    label: "Stretch Fabric",
    body: "Premium fabric stretched over the aluminum frame for a seamless, modern look. Available in multiple colors and textures.",
  },
  {
    label: "Wood Veneer",
    body: "Real wood finish from light oak to rich walnut. Adds warmth and a timeless quality to diffuser panels and feature walls.",
  },
  {
    label: "Diffuser Cuts",
    body: "Geometric slot, wave, or QRD-style diffuser faces for acoustic precision and visual texture. Available on H75 and H120 frames.",
  },
];

const lightingOptions = [
  {
    label: "RGBW Perimeter",
    body: "Diffused LED strips routed behind panel edges. 16 million colors plus tunable white from candlelit 2800K to daylight 6500K. Available on H75+ and H120.",
  },
  {
    label: "Fiber Optic Star Ceiling",
    body: "Programmable fiber optic twinkle ceiling with adjustable density and shooting star effects. A showpiece element that closes rooms.",
  },
  {
    label: "Track & Can Lighting",
    body: "Integrated track lighting for architectural accents or mini recessed cans for task lighting — both pre-mounted into panel frames.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative py-28 px-6 lg:px-12 border-b border-cinema-700 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/denver-render-front.jpg"
            alt="CineLuxe acoustic panel installation"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-cinema-950/85" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="gold-divider w-10 my-0" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
              About CineLuxe
            </span>
          </div>
          <h1 className="section-title mb-6 max-w-2xl">
            The Modular System Behind{" "}
            <span className="gold-text">Extraordinary Cinema Rooms</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            CineLuxe is a modular acoustic panel system for private cinema.
            Aluminum-framed panels with acoustic cores, integrated LED lighting,
            fiber optic star ceilings, and precision bass treatment — configured
            for any room, installed in 1–3 days. Nothing glued. Nothing permanent.
          </p>
        </div>
      </section>

      {/* ── THE PRODUCT ── */}
      <section className="py-28 px-6 lg:px-12 bg-cinema-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                How It&apos;s Built
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Acoustic Performance and Visual Identity. One System.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-5">
              Every CineLuxe panel is an aluminum frame with an acoustic core inside
              and a finished face outside. The core handles absorption, diffusion, or
              both. The face is stretch fabric, wood veneer, or geometric diffuser
              cuts — your choice for the room. The frame hangs on a cleat or
              aluminum grid system. No adhesive. No demolition to reconfigure.
            </p>
            <p className="text-gray-400 leading-relaxed mb-5">
              Integrated LED lighting, bass traps, and fiber optic star ceilings
              are part of the same modular system. Everything wires through the
              frame via daisy-chain connectors — no visible cables, no electrician
              required.
            </p>
            <p className="text-gray-500 leading-relaxed">
              The result is a room where the acoustic treatment and the interior
              design are the same thing. The panels aren&apos;t behind the design —
              they are the design.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-6">
              Frame Depth Options
            </h3>
            {panelOptions.map((opt) => (
              <div key={opt.label} className="border border-cinema-700 bg-cinema-900 p-6 hover:border-gold-500/20 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif font-bold text-white">{opt.label}</span>
                  <span className="text-xs text-gold-500/60 font-mono">{opt.depth}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{opt.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINISHES ── */}
      <section className="py-20 px-6 lg:px-12 bg-cinema-900 border-y border-cinema-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="gold-divider w-10 my-0" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
              Surface Finishes
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {finishes.map((f, i) => (
              <div key={f.label} className="relative overflow-hidden group">
                <div className="relative aspect-video mb-4 overflow-hidden border border-cinema-700">
                  <Image
                    src={i === 0 ? "/images/denver-render-side.jpg" : i === 1 ? "/images/denver-render-rear.jpg" : "/images/render-small-room-a.jpg"}
                    alt={f.label}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-cinema-950/30" />
                </div>
                <h3 className="font-serif font-bold text-white mb-2">{f.label}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTING ── */}
      <section className="py-28 px-6 lg:px-12 bg-cinema-950">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-video overflow-hidden border border-cinema-700">
            <Image
              src="/images/render-small-room-b.jpg"
              alt="CineLuxe integrated LED lighting and star ceiling"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-cinema-950/15" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold-500/40" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold-500/40" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                Integrated Lighting
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Zero Visual Noise.{" "}
              <span className="gold-text">Maximum Impact.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              All CineLuxe lighting is built into the panel system — not added
              on top of it. LED elements route through the aluminum frame via
              daisy-chain connectors. No visible wires. No electrician required.
              No clutter.
            </p>
            <div className="space-y-5">
              {lightingOptions.map((opt) => (
                <div key={opt.label} className="flex gap-4">
                  <div className="w-1 flex-shrink-0 bg-gold-500/30 rounded-full mt-1" />
                  <div>
                    <h4 className="font-serif font-bold text-white mb-1">{opt.label}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{opt.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-20 px-6 lg:px-12 bg-cinema-900 border-y border-cinema-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="gold-divider w-10 my-0" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
              Installations
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { src: "/images/2390031948913825473.jpg", alt: "CineLuxe panel installation" },
              { src: "/images/3467950884395237053.jpg", alt: "CineLuxe acoustic detail" },
              { src: "/images/5858629690666302780.jpg", alt: "CineLuxe full room" },
              { src: "/images/2835573788900979249.jpg", alt: "CineLuxe render" },
              { src: "/images/1927444799465522527.jpg", alt: "CineLuxe cinema room" },
              { src: "/images/6061619855247223613.jpg", alt: "CineLuxe panel system" },
            ].map((img, i) => (
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
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-cinema-950/20 group-hover:bg-cinema-950/0 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEALER PROGRAM ── */}
      <section className="py-28 px-6 lg:px-12 bg-cinema-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="gold-divider w-10 my-0" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
              Dealer Program
            </span>
            <div className="gold-divider w-10 my-0" />
          </div>
          <h2 className="section-title mb-6">
            Sold Exclusively{" "}
            <span className="gold-text">Through Authorized Dealers</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            CineLuxe does not sell direct to end clients. Every installation is
            delivered through an authorized dealer — an AV integrator, luxury
            designer, or custom home builder who owns the client relationship
            and the full project.
          </p>
          <p className="text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
            Dealers get full acoustic design support on every project. Share the
            room dimensions and we produce the panel layout. You present it,
            your client approves it, we manufacture and ship. Your team installs
            in 1–3 days.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 text-left">
            {[
              {
                label: "AV Integrators",
                body: "Add CineLuxe to cinema projects you're already doing. The panels make your audio system perform the way it was designed to — and make the room unforgettable.",
              },
              {
                label: "Luxury Designers",
                body: "Specify CineLuxe on cinema rooms where the interior is as important as the acoustics. The panels are the design statement, not an afterthought.",
              },
              {
                label: "Custom Builders",
                body: "Offer CineLuxe as a flagship cinema amenity on high-end residential projects. We work from pre-construction drawings through installation.",
              },
            ].map((item) => (
              <div key={item.label} className="border border-cinema-700 bg-cinema-900 p-6">
                <div className="gold-divider w-6 mb-3" />
                <h3 className="font-serif font-bold text-white mb-2">{item.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <Link href="/#apply" className="btn-gold">
            Apply to Become a Dealer
          </Link>
        </div>
      </section>
    </>
  );
}
