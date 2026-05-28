import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin — CineLuxe",
  robots: { index: false, follow: false },
};

// Admin section uses its own layout (no public navbar/footer)
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cinema-950 text-white min-h-screen">
      {children}
    </div>
  );
}
