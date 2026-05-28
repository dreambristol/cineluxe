import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-cinema-950 border-t border-cinema-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 border border-gold-500 rotate-45 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-gold-500" />
              </div>
              <span className="text-lg font-serif font-bold tracking-[0.15em] uppercase">
                Cine<span className="text-gold-400">Luxe</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Bringing the private cinema experience to luxury homes and premium venues worldwide.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Become a Dealer" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="mailto:dealers@cineluxe.us" className="hover:text-gold-400 transition-colors">
                  dealers@cineluxe.us
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="btn-outline text-xs py-2 px-5">
                Apply Now
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-cinema-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} CineLuxe. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-gold-500 inline-block" />
            <span className="w-1 h-1 rounded-full bg-gold-500 inline-block mx-1" />
            <span className="w-1 h-1 rounded-full bg-gold-500 inline-block" />
          </div>
        </div>
      </div>
    </footer>
  );
}
