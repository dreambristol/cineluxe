import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecaptchaProvider from "@/components/RecaptchaProvider";

const BASE_URL = "https://www.cineluxe.us";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "CineLuxe — Modular Acoustic Panel Systems for Private Cinema",
    template: "%s | CineLuxe",
  },

  description:
    "CineLuxe is a modular acoustic panel system for private cinema rooms — stretch fabric panels, integrated LED lighting, fiber optic star ceilings, and precision bass treatment. Configured for any room. Installed by authorized dealers.",

  keywords: [
    "private cinema acoustic panels",
    "home theater acoustic treatment",
    "modular home theater wall panels",
    "acoustic panel system private cinema",
    "stretch fabric acoustic panels",
    "fiber optic star ceiling home theater",
    "home theater acoustic panels dealer",
    "private cinema room design",
    "luxury home theater panels",
    "home theater dealer program",
    "authorized home theater dealer",
    "private cinema installer",
    "bass treatment home theater",
    "home theater wall treatment",
    "modular acoustic panels",
  ],

  authors: [{ name: "CineLuxe", url: BASE_URL }],
  creator: "CineLuxe",
  publisher: "CineLuxe",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "CineLuxe",
    title: "CineLuxe — Modular Acoustic Panel Systems for Private Cinema",
    description:
      "Modular acoustic panel systems for private cinema rooms. Stretch fabric panels, LED lighting, fiber optic star ceilings, and bass treatment — authorized dealer network.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CineLuxe — Private Cinema Acoustic Panel System",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CineLuxe — Modular Acoustic Panel Systems for Private Cinema",
    description:
      "Modular acoustic panel systems for private cinema rooms. Authorized dealer network — apply to carry CineLuxe.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },

  alternates: {
    canonical: BASE_URL,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CineLuxe",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.svg`,
  description:
    "CineLuxe manufactures modular acoustic panel systems for private cinema rooms. Stretch fabric panels, integrated LED lighting, fiber optic star ceilings, and precision bass treatment — sold through an authorized dealer network.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "dealers@cineluxe.us",
    contactType: "sales",
    areaServed: "US",
    availableLanguage: "English",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-cinema-950 text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <RecaptchaProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
