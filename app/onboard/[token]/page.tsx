"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CineLuxeMark from "@/components/CineLuxeMark";

const MAP_POLICY = `CineLuxe Minimum Resale Price (MRP) Policy

CineLuxe products are priced by configuration. Authorized dealers receive current price lists upon request. Dealers may not publicly advertise, list, display, quote, or sell CineLuxe products below the Minimum Resale Price (MRP) without prior written approval from CineLuxe. This applies to all channels and transaction types, including websites, social media, print, third-party platforms, and private client quotes or proposals. Violation may result in suspension or termination of dealer authorization. CineLuxe reserves the right to update this policy at any time with reasonable notice to authorized dealers.`;

export default function OnboardingPage() {
  const { token } = useParams<{ token: string }>();
  const [valid, setValid] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [mapAgreed, setMapAgreed] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`/api/onboard/${token}`)
      .then(r => r.json())
      .then(d => setValid(d.valid === true))
      .catch(() => setValid(false));
  }, [token]);

  const set = (id: string, val: string) => setForm(p => ({ ...p, [id]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapAgreed || !form.map_signature?.trim()) {
      setError("You must read and agree to the MRP policy and provide your signature.");
      return;
    }
    setSaving(true);
    setError("");
    const res = await fetch(`/api/onboard/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, map_agreed: true }),
    });
    const data = await res.json();
    if (data.success) {
      setSubmitted(true);
    } else {
      setError(data.error ?? "Something went wrong. Please try again.");
    }
    setSaving(false);
  };

  const Input = ({ id, label, placeholder = "", required = false, hint = "" }: { id: string; label: string; placeholder?: string; required?: boolean; hint?: string }) => (
    <div>
      <label className="block text-sm text-gray-300 mb-1.5">
        {label}{required && <span className="text-gold-500 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-600 mb-2">{hint}</p>}
      <input type="text" value={form[id] ?? ""} onChange={e => set(id, e.target.value)}
        required={required} placeholder={placeholder}
        className="w-full bg-cinema-800 border border-cinema-600 text-white placeholder-gray-700 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors rounded-sm" />
    </div>
  );

  if (valid === null) {
    return (
      <div className="min-h-screen bg-cinema-950 flex items-center justify-center">
        <div className="text-gray-600 text-sm tracking-widest uppercase">Loading…</div>
      </div>
    );
  }

  if (!valid) {
    return (
      <div className="min-h-screen bg-cinema-950 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <CineLuxeMark className="h-10 w-auto mx-auto mb-6 opacity-40" />
          <h1 className="font-serif text-2xl text-white mb-3">Link Unavailable</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            This onboarding link has expired or already been used. Please contact{" "}
            <a href="mailto:dealers@cineluxe.us" className="text-gold-400 hover:text-gold-300">dealers@cineluxe.us</a>.
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-cinema-950 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <CineLuxeMark className="h-12 w-auto mx-auto mb-6" />
          <h1 className="font-serif text-3xl text-white mb-4">Welcome to CineLuxe</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your onboarding is complete. Our team will review your submission and reach out with your official dealer authorization and price list.
          </p>
          <p className="text-gray-600 text-xs mt-6">Questions? <a href="mailto:dealers@cineluxe.us" className="text-gold-500">dealers@cineluxe.us</a></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cinema-950 text-white">
      {/* Header */}
      <div className="border-b border-cinema-800 bg-cinema-900">
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center gap-3">
          <CineLuxeMark className="h-7 w-auto" />
          <span className="font-serif font-bold tracking-[0.15em] text-sm">CINE<span className="text-gold-400">LUXE</span></span>
          <span className="text-cinema-700 ml-2">|</span>
          <span className="text-gray-500 text-sm ml-2">Dealer Onboarding</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="gold-divider w-10 mb-5" />
          <h1 className="font-serif text-3xl font-bold mb-3">Dealer Onboarding</h1>
          <p className="text-gray-400 leading-relaxed">
            You're almost there. Please provide your business information and review the CineLuxe MRP policy below. This information is kept confidential and used for tax and compliance purposes only.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">

          {/* Legal Business Info */}
          <div>
            <h2 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-6 pb-2 border-b border-cinema-700">Legal Business Information</h2>
            <div className="space-y-5">
              <Input id="legal_business_name" label="Legal Business Name" required placeholder="As registered with the state" />
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Entity Type <span className="text-gold-500">*</span></label>
                <select value={form.entity_type ?? ""} onChange={e => set("entity_type", e.target.value)} required
                  className="w-full bg-cinema-800 border border-cinema-600 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold-500 rounded-sm appearance-none">
                  <option value="">Select…</option>
                  {["LLC", "S-Corp", "C-Corp", "Sole Proprietorship", "Partnership", "Other"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <Input id="ein" label="EIN / Tax ID" required placeholder="XX-XXXXXXX" hint="Required for dealer authorization and tax compliance." />
            </div>
          </div>

          {/* Business Address */}
          <div>
            <h2 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-6 pb-2 border-b border-cinema-700">Business Address</h2>
            <div className="space-y-5">
              <Input id="business_address" label="Street Address" required />
              <div className="grid grid-cols-2 gap-4">
                <Input id="business_city" label="City" required />
                <Input id="business_state" label="State / Region" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input id="business_zip" label="ZIP / Postal Code" required />
                <Input id="business_country" label="Country" required placeholder="United States" />
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h2 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-6 pb-2 border-b border-cinema-700">Contacts</h2>
            <div className="space-y-5">
              <div className="text-xs text-gray-600 uppercase tracking-widest">Primary Contact</div>
              <Input id="primary_contact_name" label="Full Name" required />
              <div className="grid grid-cols-2 gap-4">
                <Input id="primary_contact_email" label="Email" required />
                <Input id="primary_contact_phone" label="Phone" required />
              </div>
              <div className="text-xs text-gray-600 uppercase tracking-widest pt-2">Billing Contact (if different)</div>
              <Input id="billing_contact_name" label="Full Name" />
              <Input id="billing_contact_email" label="Email" />
            </div>
          </div>

          {/* Reseller */}
          <div>
            <h2 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-6 pb-2 border-b border-cinema-700">Reseller Information</h2>
            <div className="space-y-5">
              <p className="text-gray-500 text-sm">If your state requires a resale certificate for tax-exempt wholesale purchases, please provide your details below. This is recommended but not required at this stage.</p>
              <div className="grid grid-cols-2 gap-4">
                <Input id="resale_certificate_number" label="Resale Certificate Number" placeholder="Optional" />
                <Input id="resale_state" label="Issuing State" placeholder="Optional" />
              </div>
            </div>
          </div>

          {/* MRP Policy */}
          <div>
            <h2 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-6 pb-2 border-b border-cinema-700">Minimum Resale Price Policy</h2>
            <div className="space-y-5">
              <div className="bg-cinema-900 border border-cinema-700 p-4 rounded-sm">
                <pre className="text-gray-400 text-xs leading-relaxed whitespace-pre-wrap font-sans">{MAP_POLICY}</pre>
              </div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={mapAgreed} onChange={e => setMapAgreed(e.target.checked)}
                  className="mt-0.5 accent-gold-500 w-4 h-4 flex-shrink-0" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  I have read, understand, and agree to the CineLuxe Minimum Resale Price Policy on behalf of my business.
                </span>
              </label>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">
                  Electronic Signature <span className="text-gold-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-2">Type your full legal name to sign. By signing, you agree to the MRP policy above.</p>
                <input type="text" value={form.map_signature ?? ""} onChange={e => set("map_signature", e.target.value)}
                  placeholder="Your full legal name"
                  className="w-full bg-cinema-800 border border-cinema-600 text-white placeholder-gray-700 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors rounded-sm font-serif italic" />
                {form.map_signature && (
                  <p className="text-xs text-gray-600 mt-2">
                    Signed electronically on {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                )}
              </div>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" disabled={saving || !mapAgreed} className="btn-gold w-full py-4 text-sm disabled:opacity-50">
            {saving ? "Submitting…" : "Complete Onboarding"}
          </button>

          <p className="text-gray-700 text-xs text-center leading-relaxed">
            By submitting this form you confirm all information is accurate and legally binding. Your electronic signature on the MRP policy is recorded with a timestamp.
          </p>
        </form>
      </div>
    </div>
  );
}
