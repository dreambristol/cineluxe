"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type ApplicationStatus = "new" | "reviewing" | "approved" | "declined";

interface Application {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  country: string;
  state: string;
  business_type: string;
  years_in_business: string;
  annual_revenue: string;
  client_base: string;
  showroom: string;
  message: string;
  status: ApplicationStatus;
  notes: string;
}

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  reviewing: "bg-gold-500/15 text-gold-400 border-gold-500/30",
  approved: "bg-green-500/15 text-green-400 border-green-500/30",
  declined: "bg-red-500/15 text-red-400 border-red-500/30",
};

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  new: "New",
  reviewing: "Reviewing",
  approved: "Approved",
  declined: "Declined",
};

function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 border rounded-sm font-semibold ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function DetailPanel({
  app,
  onClose,
  onStatusChange,
}: {
  app: Application;
  onClose: () => void;
  onStatusChange: (id: number, status: ApplicationStatus, notes: string) => void;
}) {
  const [status, setStatus] = useState<ApplicationStatus>(app.status);
  const [notes, setNotes] = useState(app.notes ?? "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`/api/admin/applications/${app.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes, previousStatus: app.status }),
    });
    onStatusChange(app.id, status, notes);
    setSaving(false);
  };

  const Field = ({ label, value }: { label: string; value: string }) =>
    value ? (
      <div>
        <div className="text-[10px] uppercase tracking-widest text-gray-600 mb-0.5">{label}</div>
        <div className="text-sm text-gray-300">{value}</div>
      </div>
    ) : null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="w-full max-w-xl bg-cinema-900 border-l border-cinema-700 overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-cinema-700 sticky top-0 bg-cinema-900 z-10">
          <div>
            <div className="gold-divider w-8 mb-3" />
            <h2 className="font-serif text-xl font-bold text-white">
              {app.first_name} {app.last_name}
            </h2>
            <p className="text-gray-400 text-sm">{app.company}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-white transition-colors mt-1 text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 space-y-6">
          {/* Status & Actions */}
          <div className="border border-cinema-700 bg-cinema-950 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-gray-500">Status</span>
              <StatusBadge status={status} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(STATUS_LABELS) as ApplicationStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`text-xs py-2 px-3 border transition-all ${
                    status === s
                      ? STATUS_STYLES[s] + " scale-[0.98]"
                      : "border-cinema-700 text-gray-500 hover:border-gray-600 hover:text-gray-300"
                  }`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-600 mb-1 block">
                Internal Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add notes for your team…"
                className="w-full bg-cinema-800 border border-cinema-600 text-white placeholder-gray-700 px-3 py-2 text-sm
                           focus:outline-none focus:border-gold-500 transition-colors rounded-sm resize-none"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-gold w-full text-sm py-2 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-widest text-gold-500 font-semibold">Contact</div>
            <Field label="Email" value={app.email} />
            <Field label="Phone" value={app.phone} />
            <Field label="Website" value={app.website} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Country" value={app.country} />
              <Field label="State / Region" value={app.state} />
            </div>
          </div>

          {/* Business */}
          <div className="space-y-3 border-t border-cinema-700 pt-4">
            <div className="text-[10px] uppercase tracking-widest text-gold-500 font-semibold">Business</div>
            <Field label="Business Type" value={app.business_type} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Years in Business" value={app.years_in_business} />
              <Field label="Annual Revenue" value={app.annual_revenue} />
            </div>
            <Field label="Has Showroom?" value={app.showroom} />
            <Field label="Client Base" value={app.client_base} />
          </div>

          {/* Message */}
          {app.message && (
            <div className="border-t border-cinema-700 pt-4">
              <div className="text-[10px] uppercase tracking-widest text-gold-500 font-semibold mb-2">Message</div>
              <p className="text-sm text-gray-400 leading-relaxed">{app.message}</p>
            </div>
          )}

          <div className="text-xs text-gray-600 border-t border-cinema-800 pt-3">
            Submitted {formatDate(app.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Application | null>(null);
  const router = useRouter();

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ status: statusFilter, search });
    const res = await fetch(`/api/admin/applications?${params}`);
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await res.json();
    setApplications(data.applications ?? []);
    setLoading(false);
  }, [statusFilter, search, router]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusChange = (id: number, status: ApplicationStatus, notes: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status, notes } : a))
    );
    if (selected?.id === id) {
      setSelected((prev) => prev ? { ...prev, status, notes } : null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  const counts = {
    all: applications.length,
    new: applications.filter((a) => a.status === "new").length,
    reviewing: applications.filter((a) => a.status === "reviewing").length,
    approved: applications.filter((a) => a.status === "approved").length,
    declined: applications.filter((a) => a.status === "declined").length,
  };

  return (
    <div className="min-h-screen bg-cinema-950 text-white">
      {/* Top bar */}
      <div className="border-b border-cinema-800 bg-cinema-900">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-0.5 bg-gold-500/50" />
              <span className="font-serif font-bold tracking-widest text-sm">CineLuxe</span>
            </div>
            <span className="text-cinema-700">|</span>
            <span className="text-gray-500 text-sm">Dealer Applications</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total", count: counts.all, status: "all" },
            { label: "New", count: counts.new, status: "new" },
            { label: "Reviewing", count: counts.reviewing, status: "reviewing" },
            { label: "Approved", count: counts.approved, status: "approved" },
          ].map((s) => (
            <button
              key={s.status}
              onClick={() => setStatusFilter(s.status)}
              className={`border p-4 text-left transition-all ${
                statusFilter === s.status
                  ? "border-gold-500/40 bg-cinema-800"
                  : "border-cinema-700 bg-cinema-900 hover:border-cinema-600"
              }`}
            >
              <div className="text-2xl font-serif font-bold gold-text mb-0.5">{s.count}</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="search"
            placeholder="Search by name, email, or company…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-cinema-800 border border-cinema-600 text-white placeholder-gray-600 px-4 py-2.5 text-sm
                       focus:outline-none focus:border-gold-500 transition-colors rounded-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-cinema-800 border border-cinema-600 text-white px-4 py-2.5 text-sm
                       focus:outline-none focus:border-gold-500 transition-colors rounded-sm appearance-none cursor-pointer"
          >
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="reviewing">Reviewing</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
          </select>
          <button
            onClick={fetchApplications}
            className="btn-outline text-sm px-4 py-2.5"
          >
            Refresh
          </button>
        </div>

        {/* Table */}
        <div className="border border-cinema-700 bg-cinema-900 overflow-x-auto">
          {loading ? (
            <div className="py-24 text-center text-gray-600 text-sm tracking-widest uppercase">
              Loading…
            </div>
          ) : applications.length === 0 ? (
            <div className="py-24 text-center">
              <div className="text-gold-500/30 text-4xl mb-4">◈</div>
              <p className="text-gray-600 text-sm">No applications yet.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cinema-700 bg-cinema-950">
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Company</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-semibold hidden md:table-cell">Business Type</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-semibold hidden lg:table-cell">Location</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-semibold hidden lg:table-cell">Revenue</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-semibold hidden sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, i) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelected(app)}
                    className={`border-b border-cinema-800 cursor-pointer hover:bg-cinema-800 transition-colors ${
                      i % 2 === 0 ? "" : "bg-cinema-950/40"
                    } ${selected?.id === app.id ? "bg-cinema-800 border-l-2 border-l-gold-500/50" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{app.first_name} {app.last_name}</div>
                      <div className="text-gray-500 text-xs">{app.email}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{app.company}</td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                      <span className="text-xs">{app.business_type}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">
                      {[app.state, app.country].filter(Boolean).join(", ")}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">{app.annual_revenue}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs hidden sm:table-cell whitespace-nowrap">
                      {formatDate(app.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="text-gray-700 text-xs mt-3 text-right">
          {applications.length} application{applications.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Detail panel */}
      {selected && (
        <DetailPanel
          app={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
