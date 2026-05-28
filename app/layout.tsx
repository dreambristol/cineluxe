import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecaptchaProvider from "@/components/RecaptchaProvider";

export const metadata: Metadata = {
  title: {
    default: "CineLuxe — Private Cinema Experiences",
    template: "%s | CineLuxe",
  },
  description:
    "CineLuxe delivers bespoke private cinema systems for luxury homes and premium venues. Become an authorized dealer and offer your clients the ultimate screening experience.",
  openGraph: {
    type: "website",
    siteName: "CineLuxe",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-cinema-950 text-white antialiased">
        <RecaptchaProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
