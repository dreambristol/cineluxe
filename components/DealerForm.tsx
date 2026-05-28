"use client";

import { useState, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  country: string;
  state: string;
  businessType: string;
  yearsInBusiness: string;
  annualRevenue: string;
  clientBase: string;
  showroom: string;
  message: string;
};

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  country: "",
  state: "",
  businessType: "",
  yearsInBusiness: "",
  annualRevenue: "",
  clientBase: "",
  showroom: "",
  message: "",
};

const businessTypes = [
  "AV Integrator / Home Theater Specialist",
  "Luxury Interior Designer",
  "Custom Home Builder / Developer",
  "Yacht / Aviation Fit-Out Specialist",
  "Architect",
  "Luxury Real Estate Professional",
  "Other",
];

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  name: keyof FormData;
  type?: string;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
  placeholder?: string;
  required?: boolean;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
      {label} {required && <span className="text-gold-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      placeholder={placeholder}
      required={required}
      className="bg-cinema-800 border border-cinema-600 text-white placeholder-gray-600 px-4 py-3 text-sm
                 focus:outline-none focus:border-gold-500 transition-colors rounded-sm"
    />
  </div>
);

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
      {label} {required && <span className="text-gold-500">*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      required={required}
      className="bg-cinema-800 border border-cinema-600 text-white px-4 py-3 text-sm
                 focus:outline-none focus:border-gold-500 transition-colors rounded-sm appearance-none cursor-pointer"
    >
      <option value="">Select…</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default function DealerForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (name: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("submitting");
      setErrorMessage("");

      try {
        // Get reCAPTCHA v3 token (invisible — no user interaction required)
        let recaptchaToken = "";
        if (executeRecaptcha) {
          recaptchaToken = await executeRecaptcha("dealer_apply");
        }

        const res = await fetch("/api/dealer-apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, recaptchaToken }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? "Submission failed. Please try again.");
        }

        setStatus("success");
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again or email dealers@cineluxe.us."
        );
      }
    },
    [form, executeRecaptcha]
  );

  if (status === "success") {
    return (
      <div className="card-cinema text-center py-16">
        <div className="text-gold-500 text-5xl mb-6">◈</div>
        <h2 className="font-serif text-2xl font-bold text-white mb-4">
          Application Received
        </h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Thank you for your interest in the CineLuxe dealer program. Our team
          will review your application and reach out within 3–5 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Info */}
      <div>
        <h3 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required />
          <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required />
          <Input label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required />
          <Input label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} />
        </div>
      </div>

      {/* Business Info */}
      <div>
        <h3 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-4">
          Business Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Company Name" name="company" value={form.company} onChange={handleChange} required />
          <Input label="Company Website" name="website" type="url" value={form.website} onChange={handleChange} placeholder="https://" />
          <Input label="Country" name="country" value={form.country} onChange={handleChange} required />
          <Input label="State / Region" name="state" value={form.state} onChange={handleChange} />
          <div className="sm:col-span-2">
            <Select
              label="Business Type"
              name="businessType"
              value={form.businessType}
              onChange={handleChange}
              required
              options={businessTypes.map((b) => ({ value: b, label: b }))}
            />
          </div>
        </div>
      </div>

      {/* Qualification */}
      <div>
        <h3 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-4">
          Qualification Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Years in Business"
            name="yearsInBusiness"
            value={form.yearsInBusiness}
            onChange={handleChange}
            options={[
              { value: "0-2", label: "0–2 years" },
              { value: "3-5", label: "3–5 years" },
              { value: "6-10", label: "6–10 years" },
              { value: "10+", label: "10+ years" },
            ]}
          />
          <Select
            label="Annual Revenue (approx.)"
            name="annualRevenue"
            value={form.annualRevenue}
            onChange={handleChange}
            options={[
              { value: "under-500k", label: "Under $500K" },
              { value: "500k-1m", label: "$500K – $1M" },
              { value: "1m-5m", label: "$1M – $5M" },
              { value: "5m+", label: "$5M+" },
            ]}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              Describe Your Client Base
            </label>
            <textarea
              value={form.clientBase}
              onChange={(e) => handleChange("clientBase", e.target.value)}
              rows={3}
              placeholder="e.g. UHNW homeowners, luxury developers, superyacht owners…"
              className="bg-cinema-800 border border-cinema-600 text-white placeholder-gray-600 px-4 py-3 text-sm
                         focus:outline-none focus:border-gold-500 transition-colors rounded-sm resize-none"
            />
          </div>
          <Select
            label="Do You Have a Showroom?"
            name="showroom"
            value={form.showroom}
            onChange={handleChange}
            options={[
              { value: "yes", label: "Yes — dedicated showroom" },
              { value: "partial", label: "Yes — demo within our office/studio" },
              { value: "no", label: "No — but we are open to it" },
            ]}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <h3 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-4">
          Anything Else?
        </h3>
        <textarea
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          rows={4}
          placeholder="Tell us anything else you think is relevant to your application…"
          className="w-full bg-cinema-800 border border-cinema-600 text-white placeholder-gray-600 px-4 py-3 text-sm
                     focus:outline-none focus:border-gold-500 transition-colors rounded-sm resize-none"
        />
      </div>

      {/* Error message */}
      {status === "error" && errorMessage && (
        <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 rounded-sm">
          {errorMessage}
        </div>
      )}

      {/* Submit */}
      <div className="flex items-center gap-6">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {status === "submitting" ? "Submitting…" : "Submit Application"}
        </button>
        <p className="text-gray-600 text-xs">
          Fields marked <span className="text-gold-500">*</span> are required.
          This form is protected by reCAPTCHA.
        </p>
      </div>
    </form>
  );
}
