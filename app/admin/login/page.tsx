"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      const from = searchParams.get("from") ?? "/admin";
      router.push(from);
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cinema-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo mark */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-gold-500/40" />
            <span className="font-serif text-xl tracking-widest text-white">CL</span>
            <div className="w-8 h-0.5 bg-gold-500/40" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white mb-1">Admin Access</h1>
          <p className="text-gray-500 text-sm">Dealer applications dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="border border-cinema-700 bg-cinema-900 p-8">
          <div className="flex flex-col gap-1.5 mb-6">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              className="bg-cinema-800 border border-cinema-600 text-white px-4 py-3 text-sm
                         focus:outline-none focus:border-gold-500 transition-colors rounded-sm"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
