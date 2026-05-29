"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CineLuxeMark from "@/components/CineLuxeMark";

interface Field {
  label: string;
  id: string;
  type?: "text" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
  required?: boolean;
  hint?: string;
}

const sections: { title: string; fields: Field[] }[] = [
  {
    title: "Your Portfolio",
    fields: [
      { id: "portfolio_projects", label: "Describe 3–5 recent private cinema or luxury AV projects", type: "textarea", placeholder: "Project name, scope, approximate value, outcome…", required: true },
      { id: "portfolio_urls", label: "Portfolio or project photo URLs (optional)", type: "textarea", placeholder: "One URL per line" },
      { id: "typical_project_value", label: "Typical project value range", type: "select", options: ["Under $25,000", "$25,000–$75,000", "$75,000–$150,000", "$150,000–$500,000", "Over $500,000"], required: true },
      { id: "projects_per_year", label: "How many private cinema projects do you complete per year?", type: "select", options: ["1–2", "3–5", "6–10", "10+"], required: true },
    ],
  },
  {
    title: "Your Business",
    fields: [
      { id: "facility_type", label: "Facility type", type: "select", options: ["Dedicated showroom", "Shared showroom", "Warehouse / fabrication only", "Home office / mobile"], required: true },
      { id: "team_size", label: "Full-time team size", type: "select", options: ["1–2", "3–5", "6–15", "16+"] },
      { id: "certifications", label: "Relevant certifications or memberships (CEDIA, HTA, etc.)", placeholder: "e.g. CEDIA ESC-T, HTA Certified" },
    ],
  },
  {
    title: "Fit & Vision",
    fields: [
      { id: "why_cineluxe", label: "Why do you want to carry CineLuxe?", type: "textarea", placeholder: "What draws you to this product and how does it fit your current offerings?", required: true, hint: "Be specific. Generic answers are not reviewed." },
      { id: "target_market", label: "Describe your ideal CineLuxe client", type: "textarea", placeholder: "Who are they, how do they find you, what's their budget?" },
      { id: "additional_notes", label: "Anything else you'd like us to know?", type: "textarea", placeholder: "Optional" },
    ],
  },
];

export default function FormalApplicationPage() {
  const { token } = useParams<{ token: string }>();
  const [valid, setValid] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`/api/apply/${token}`)
      .then(r => r.json())
      .then(d => setValid(d.valid === true))
      .catch(() => setValid(false));
  }, [token]);

  const set = (id: string, val: string) => setForm(p => ({ ...p, [id]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch(`/api/apply/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      setSubmitted(true);
    } else {
      setError(data.error ?? "Something went wrong. Please try again.");
    }
    setSaving(false);
  };

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
            This application link has expired or already been used. If you believe this is an error, please contact{" "}
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
          <CineLuxeMark className="h-10 w-auto mx-auto mb-6" />
          <h1 className="font-serif text-2xl text-white mb-3">Application Received</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Thank you for completing your formal application. Our team will review your submission and be in touch regarding next steps.
          </p>
          <p className="text-gray-600 text-xs mt-6">You will receive a $50 invoice via email shortly.</p>
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
          <span className="text-gray-500 text-sm ml-2">Formal Dealer Application</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="gold-divider w-10 mb-5" />
          <h1 className="font-serif text-3xl font-bold mb-3">Formal Application</h1>
          <p className="text-gray-400 leading-relaxed">
            This is Stage 2 of the CineLuxe dealer authorization process. Please answer all required questions thoroughly — vague or incomplete applications are not advanced.
          </p>
          <div className="mt-4 border border-gold-500/20 bg-gold-500/5 px-4 py-3 text-sm text-gold-400">
            A $50 application fee will be invoiced separately upon receipt of this form.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {sections.map(section => (
            <div key={section.title}>
              <h2 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-6 pb-2 border-b border-cinema-700">
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.fields.map(field => (
                  <div key={field.id}>
                    <label className="block text-sm text-gray-300 mb-1.5">
                      {field.label}
                      {field.required && <span className="text-gold-500 ml-1">*</span>}
                    </label>
                    {field.hint && <p className="text-xs text-gray-600 mb-2">{field.hint}</p>}
                    {field.type === "textarea" ? (
                      <textarea
                        value={form[field.id] ?? ""}
                        onChange={e => set(field.id, e.target.value)}
                        required={field.required}
                        placeholder={field.placeholder}
                        rows={5}
                        className="w-full bg-cinema-800 border border-cinema-600 text-white placeholder-gray-700 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors rounded-sm resize-none"
                      />
                    ) : field.type === "select" ? (
                      <select
                        value={form[field.id] ?? ""}
                        onChange={e => set(field.id, e.target.value)}
                        required={field.required}
                        className="w-full bg-cinema-800 border border-cinema-600 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors rounded-sm appearance-none"
                      >
                        <option value="">Select…</option>
                        {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={form[field.id] ?? ""}
                        onChange={e => set(field.id, e.target.value)}
                        required={field.required}
                        placeholder={field.placeholder}
                        className="w-full bg-cinema-800 border border-cinema-600 text-white placeholder-gray-700 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors rounded-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" disabled={saving} className="btn-gold w-full py-4 text-sm disabled:opacity-50">
            {saving ? "Submitting…" : "Submit Formal Application"}
          </button>

          <p className="text-gray-700 text-xs text-center">
            By submitting this application you confirm all information is accurate. A $50 application fee invoice will follow.
          </p>
        </form>
      </div>
    </div>
  );
}
