import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about CineLuxe — our story, our craft, and our commitment to delivering the world's finest private cinema experiences.",
};

const values = [
  {
    title: "Craftsmanship",
    description:
      "Every installation is a bespoke work. We don't do off-the-shelf. Every system is engineered for the space, the client, and the vision.",
  },
  {
    title: "Discretion",
    description:
      "Our clients are private individuals. We operate with the utmost confidentiality and professionalism on every project.",
  },
  {
    title: "Excellence",
    description:
      "We only use reference-grade equipment and work with the finest acoustic architects, interior designers, and AV engineers in the industry.",
  },
  {
    title: "Partnership",
    description:
      "Our dealer relationships are long-term partnerships, not transactions. We grow together and invest in your success.",
  },
];

const timeline = [
  {
    year: "2012",
    title: "Founded",
    description:
      "CineLuxe was founded with a simple idea: the private cinema experience should be as extraordinary as the homes it lives in.",
  },
  {
    year: "2015",
    title: "First Dealer Network",
    description:
      "We launched our authorized dealer program, partnering with the world's leading luxury AV integrators.",
  },
  {
    year: "2018",
    title: "100 Installations",
    description:
      "We reached our 100th completed installation across three continents, cementing our reputation in the ultra-luxury market.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description:
      "Opened dedicated support offices in Europe and the Middle East to serve our growing international dealer network.",
  },
  {
    year: "2024",
    title: "500+ Installations",
    description:
      "Today, over 500 CineLuxe cinemas exist in private residences, superyachts, and premium venues worldwide.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative py-28 px-6 lg:px-12 border-b border-cinema-700 overflow-hidden">
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
              Our Story
            </span>
          </div>
          <h1 className="section-title mb-6 max-w-2xl">
            Built for Those Who{" "}
            <span className="gold-text">Accept No Less</span>{" "}
            Than the Best
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            CineLuxe was born from a belief that private cinema — truly great
            private cinema — should be an art form. Over a decade later, that
            belief drives every system we design, every dealer we partner with,
            and every screen we bring to life.
          </p>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                Our Mission
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              The World&apos;s Finest Private Cinema. In Your Client&apos;s Home.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              We design, engineer, and install private cinema systems that
              combine reference-grade audio and projection with bespoke acoustic
              architecture. The result is an experience that doesn&apos;t just
              match the finest commercial cinemas — it surpasses them.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our authorized dealers are our most important partners. We don&apos;t
              sell direct. Every CineLuxe installation is delivered through a
              dealer who shares our commitment to excellence and client service.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {values.map((value) => (
              <div key={value.title} className="bg-cinema-800 border border-cinema-600 p-6 rounded-sm hover:border-gold-600/50 transition-colors">
                <div className="w-6 h-px bg-gold-500 mb-4" />
                <h3 className="font-serif font-bold text-white mb-2 text-lg">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="bg-cinema-900 border-y border-cinema-700 py-28 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="gold-divider w-10 my-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
                Our History
              </span>
              <div className="gold-divider w-10 my-0" />
            </div>
            <h2 className="section-title">A Decade of Excellence</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-cinema-600 hidden md:block" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={item.year} className="flex gap-8 items-start group">
                  {/* Year */}
                  <div className="w-16 flex-shrink-0 text-right">
                    <span className="text-gold-500 font-mono text-sm font-bold">
                      {item.year}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="relative flex-shrink-0 hidden md:flex items-center justify-center mt-1">
                    <div className="w-3 h-3 border border-gold-500 rotate-45 bg-cinema-900 group-hover:bg-gold-500 transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <h3 className="font-serif font-bold text-lg text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DEALER CTA ── */}
      <section className="py-24 px-6 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title mb-4">
            Become Part of the{" "}
            <span className="gold-text">CineLuxe Story</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            We&apos;re selective about who we partner with — because our clients
            deserve the best. If you share our commitment to excellence, we want
            to hear from you.
          </p>
          <Link href="/contact" className="btn-gold">
            Apply to Become a Dealer
          </Link>
        </div>
      </section>
    </>
  );
}
