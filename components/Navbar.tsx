"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CineLuxeMark from "@/components/CineLuxeMark";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Become a Dealer" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cinema-950/90 backdrop-blur-md border-b border-cinema-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <CineLuxeMark className="h-8 w-auto" />
            <span className="text-xl font-serif font-bold tracking-[0.15em] text-white">
              CINE<span className="text-gold-400">LUXE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest uppercase font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-gold-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-gold text-xs py-2 px-6">
              Become a Dealer
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-gold-400 transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block w-6 h-px bg-gold-400 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-gold-400 transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cinema-900 border-t border-cinema-700 px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm tracking-widest uppercase font-medium transition-colors ${
                pathname === link.href ? "text-gold-400" : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
