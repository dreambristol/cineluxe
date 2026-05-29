"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type ApplicationStatus = "new" | "reviewing" | "approved" | "declined";
type PipelineStage =
  | "screening"
  | "formal_invited"
  | "formal_submitted"
  | "call_scheduled"
  | "call_complete"
  | "onboarding_sent"
  | "active"
  | "declined";

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
  pipeline_stage: PipelineStage;
  formal_invited_at: string | null;
  call_deadline: string | null;
  call_scheduled_at: string | null;
  activated_at: string | null;
}

interface Build {
  id: number;
  project_name: string;
  client_location: string;
  estimated_value: string;
  status: string;
  notes: string;
  created_at: string;
}

interface Invoice {
  id: number;
  invoice_number: string;
  amount: string;
  status: string;
  due_date: string;
  notes: string;
  created_at: string;
}

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  reviewing: "bg-gold-500/15 text-gold-400 border-gold-500/30",
  approved: "bg-green-500/15 text-green-400 border-green-500/30",
  declined: "bg-red-500/15 text-red-400 border-red-500/30",
};

const PIPELINE_LABELS: Record<PipelineStage, string> = {
  screening: "Screening",
  formal_invited: "Formal App Sent",
  formal_submitted: "Formal App In",
  call_scheduled: "Call Scheduled",
  call_complete: "Call Complete",
  onboarding_sent: "Onboarding Sent",
  active: "Active Dealer",
  declined: "Declined",
};

const PIPELINE_STYLES: Record<PipelineStage, string> = {
  screening: "bg-gray-500/15 text-gray-400 border-gray-500/30",
  formal_invited: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  formal_submitted: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  call_scheduled: "bg-gold-500/15 text-gold-400 border-gold-500/30",
  call_complete: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  onboarding_sent: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  active: "bg-green-500/15 text-green-400 border-green-500/30",
  declined: "bg-red-500/15 text-red-400 border-red-500/30",
};

function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 border rounded-sm font-semibold ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

function PipelineBadge({ stage }: { stage: PipelineStage }) {
  return (
    <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 border rounded-sm font-semibold ${PIPELINE_STYLES[stage]}`}>
      {PIPELINE_LABELS[stage]}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function daysUntil(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
}

// ─── Builds & Invoices Tab ────────────────────────────────────────────────────

function DealerActivityTab({ app }: { app: Application }) {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [tab, setTab] = useState<"builds" | "invoices">("builds");
  const [showBuildForm, setShowBuildForm] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [buildForm, setBuildForm] = useState({ project_name: "", client_location: "", estimated_value: "", status: "active", notes: "" });
  const [invoiceForm, setInvoiceForm] = useState({ invoice_number: "", amount: "", status: "unpaid", due_date: "", notes: "" });

  useEffect(() => {
    fetch(`/api/admin/dealers/${app.id}/builds`).then(r => r.json()).then(d => setBuilds(d.builds ?? []));
    fetch(`/api/admin/dealers/${app.id}/invoices`).then(r => r.json()).then(d => setInvoices(d.invoices ?? []));
  }, [app.id]);

  const addBuild = async () => {
    setSaving(true);
    await fetch(`/api/admin/dealers/${app.id}/builds`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildForm),
    });
    const res = await fetch(`/api/admin/dealers/${app.id}/builds`);
    const data = await res.json();
    setBuilds(data.builds ?? []);
    setShowBuildForm(false);
    setBuildForm({ project_name: "", client_location: "", estimated_value: "", status: "active", notes: "" });
    setSaving(false);
  };

  const addInvoice = async () => {
    setSaving(true);
    await fetch(`/api/admin/dealers/${app.id}/invoices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceForm),
    });
    const res = await fetch(`/api/admin/dealers/${app.id}/invoices`);
    const data = await res.json();
    setInvoices(data.invoices ?? []);
    setShowInvoiceForm(false);
    setInvoiceForm({ invoice_number: "", amount: "", status: "unpaid", due_date: "", notes: "" });
    setSaving(false);
  };

  const Input = ({ label, value, onChange, placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-gray-600 mb-1 block">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-cinema-800 border border-cinema-600 text-white placeholder-gray-700 px-3 py-2 text-sm focus:outline-none focus:border-gold-500 transition-colors rounded-sm" />
    </div>
  );

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(["builds", "invoices"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`text-xs uppercase tracking-widest px-4 py-2 border transition-all ${tab === t ? "border-gold-500/40 text-gold-400 bg-cinema-800" : "border-cinema-700 text-gray-500 hover:text-gray-300"}`}>
            {t} ({t === "builds" ? builds.length : invoices.length})
          </button>
        ))}
      </div>

      {tab === "builds" && (
        <div className="space-y-3">
          {builds.length === 0 && <p className="text-gray-600 text-sm">No builds logged yet.</p>}
          {builds.map(b => (
            <div key={b.id} className="border border-cinema-700 bg-cinema-950 p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium text-sm">{b.project_name}</span>
                <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 border rounded-sm ${b.status === "complete" ? "text-green-400 border-green-500/30" : b.status === "on_hold" ? "text-yellow-400 border-yellow-500/30" : "text-blue-400 border-blue-500/30"}`}>{b.status}</span>
              </div>
              {b.client_location && <div className="text-gray-500 text-xs">{b.client_location}</div>}
              {b.estimated_value && <div className="text-gold-400 text-xs">{b.estimated_value}</div>}
              {b.notes && <div className="text-gray-600 text-xs">{b.notes}</div>}
            </div>
          ))}
          {!showBuildForm ? (
            <button onClick={() => setShowBuildForm(true)} className="text-xs text-gold-500 hover:text-gold-400 transition-colors">+ Add Build</button>
          ) : (
            <div className="border border-cinema-700 bg-cinema-950 p-4 space-y-3">
              <Input label="Project Name *" value={buildForm.project_name} onChange={v => setBuildForm(p => ({ ...p, project_name: v }))} />
              <Input label="Client Location" value={buildForm.client_location} onChange={v => setBuildForm(p => ({ ...p, client_location: v }))} placeholder="City, State" />
              <Input label="Estimated Value" value={buildForm.estimated_value} onChange={v => setBuildForm(p => ({ ...p, estimated_value: v }))} placeholder="$0" />
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-600 mb-1 block">Status</label>
                <select value={buildForm.status} onChange={e => setBuildForm(p => ({ ...p, status: e.target.value }))}
                  className="w-full bg-cinema-800 border border-cinema-600 text-white px-3 py-2 text-sm focus:outline-none focus:border-gold-500 rounded-sm">
                  <option value="active">Active</option>
                  <option value="complete">Complete</option>
                  <option value="on_hold">On Hold</option>
                </select>
              </div>
              <Input label="Notes" value={buildForm.notes} onChange={v => setBuildForm(p => ({ ...p, notes: v }))} />
              <div className="flex gap-2">
                <button onClick={addBuild} disabled={saving || !buildForm.project_name} className="btn-gold text-xs py-1.5 px-4 disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
                <button onClick={() => setShowBuildForm(false)} className="text-xs text-gray-500 hover:text-gray-300">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "invoices" && (
        <div className="space-y-3">
          {invoices.length === 0 && <p className="text-gray-600 text-sm">No invoices logged yet.</p>}
          {invoices.map(inv => (
            <div key={inv.id} className="border border-cinema-700 bg-cinema-950 p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium text-sm">{inv.invoice_number || "Invoice"}</span>
                <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 border rounded-sm ${inv.status === "paid" ? "text-green-400 border-green-500/30" : inv.status === "overdue" ? "text-red-400 border-red-500/30" : "text-yellow-400 border-yellow-500/30"}`}>{inv.status}</span>
              </div>
              {inv.amount && <div className="text-gold-400 text-sm font-medium">{inv.amount}</div>}
              {inv.due_date && <div className="text-gray-500 text-xs">Due {inv.due_date}</div>}
              {inv.notes && <div className="text-gray-600 text-xs">{inv.notes}</div>}
            </div>
          ))}
          {!showInvoiceForm ? (
            <button onClick={() => setShowInvoiceForm(true)} className="text-xs text-gold-500 hover:text-gold-400 transition-colors">+ Add Invoice</button>
          ) : (
            <div className="border border-cinema-700 bg-cinema-950 p-4 space-y-3">
              <Input label="Invoice Number" value={invoiceForm.invoice_number} onChange={v => setInvoiceForm(p => ({ ...p, invoice_number: v }))} placeholder="INV-001" />
              <Input label="Amount *" value={invoiceForm.amount} onChange={v => setInvoiceForm(p => ({ ...p, amount: v }))} placeholder="$0.00" />
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-600 mb-1 block">Status</label>
                <select value={invoiceForm.status} onChange={e => setInvoiceForm(p => ({ ...p, status: e.target.value }))}
                  className="w-full bg-cinema-800 border border-cinema-600 text-white px-3 py-2 text-sm focus:outline-none focus:border-gold-500 rounded-sm">
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <Input label="Due Date" value={invoiceForm.due_date} onChange={v => setInvoiceForm(p => ({ ...p, due_date: v }))} placeholder="MM/DD/YYYY" />
              <Input label="Notes" value={invoiceForm.notes} onChange={v => setInvoiceForm(p => ({ ...p, notes: v }))} />
              <div className="flex gap-2">
                <button onClick={addInvoice} disabled={saving || !invoiceForm.amount} className="btn-gold text-xs py-1.5 px-4 disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
                <button onClick={() => setShowInvoiceForm(false)} className="text-xs text-gray-500 hover:text-gray-300">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function DetailPanel({
  app,
  onClose,
  onUpdate,
}: {
  app: Application;
  onClose: () => void;
  onUpdate: (id: number, updates: Partial<Application>) => void;
}) {
  const [status, setStatus] = useState<ApplicationStatus>(app.status);
  const [notes, setNotes] = useState(app.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [pipelineAction, setPipelineAction] = useState(false);
  const [detailTab, setDetailTab] = useState<"info" | "pipeline" | "activity">("info");

  const handleSave = async () => {
    setSaving(true);
    await fetch(`/api/admin/applications/${app.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes, previousStatus: app.status }),
    });
    onUpdate(app.id, { status, notes });
    setSaving(false);
  };

  const advancePipeline = async (action: string) => {
    setPipelineAction(true);
    const res = await fetch(`/api/admin/dealers/${app.id}/pipeline`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const data = await res.json();
    if (data.pipeline_stage) {
      onUpdate(app.id, {
        pipeline_stage: data.pipeline_stage,
        call_deadline: data.call_deadline,
        formal_invited_at: data.formal_invited_at,
        activated_at: data.activated_at,
      });
    }
    setPipelineAction(false);
  };

  const Field = ({ label, value }: { label: string; value: string }) =>
    value ? (
      <div>
        <div className="text-[10px] uppercase tracking-widest text-gray-600 mb-0.5">{label}</div>
        <div className="text-sm text-gray-300">{value}</div>
      </div>
    ) : null;

  const stage = app.pipeline_stage;

  const nextActions: { label: string; action: string; style?: string }[] = [];
  if (stage === "screening" && app.status === "approved") {
    nextActions.push({ label: "Send Formal Application", action: "send_formal_app" });
  }
  if (stage === "formal_submitted") {
    nextActions.push({ label: "Send Call Invitation", action: "send_call_invite" });
    nextActions.push({ label: "Decline", action: "decline", style: "border-red-500/30 text-red-400 hover:bg-red-500/10" });
  }
  if (stage === "call_scheduled" || stage === "call_complete") {
    if (stage === "call_scheduled") {
      nextActions.push({ label: "Mark Call Complete", action: "mark_call_complete" });
    }
    if (stage === "call_complete") {
      nextActions.push({ label: "Send Onboarding", action: "send_onboarding" });
    }
    nextActions.push({ label: "Decline", action: "decline", style: "border-red-500/30 text-red-400 hover:bg-red-500/10" });
  }
  if (stage === "onboarding_sent") {
    nextActions.push({ label: "Activate Dealer", action: "activate" });
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-xl bg-cinema-900 border-l border-cinema-700 overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-cinema-700 sticky top-0 bg-cinema-900 z-10">
          <div>
            <div className="gold-divider w-8 mb-3" />
            <h2 className="font-serif text-xl font-bold text-white">{app.first_name} {app.last_name}</h2>
            <p className="text-gray-400 text-sm">{app.company}</p>
            <div className="flex gap-2 mt-2">
              <StatusBadge status={app.status} />
              <PipelineBadge stage={app.pipeline_stage} />
            </div>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors mt-1 text-lg leading-none">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-cinema-700">
          {(["info", "pipeline", "activity"] as const).map(t => (
            <button key={t} onClick={() => setDetailTab(t)}
              className={`flex-1 text-xs uppercase tracking-widest py-3 transition-colors ${detailTab === t ? "text-gold-400 border-b border-gold-500" : "text-gray-500 hover:text-gray-300"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="p-6 flex-1 space-y-6">

          {/* INFO TAB */}
          {detailTab === "info" && (
            <>
              <div className="border border-cinema-700 bg-cinema-950 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-gray-500">Application Status</span>
                  <StatusBadge status={status} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(["new", "reviewing", "approved", "declined"] as ApplicationStatus[]).map((s) => (
                    <button key={s} onClick={() => setStatus(s)}
                      className={`text-xs py-2 px-3 border transition-all ${status === s ? STATUS_STYLES[s] + " scale-[0.98]" : "border-cinema-700 text-gray-500 hover:border-gray-600 hover:text-gray-300"}`}>
                      {s}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-600 mb-1 block">Internal Notes</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                    placeholder="Add notes for your team…"
                    className="w-full bg-cinema-800 border border-cinema-600 text-white placeholder-gray-700 px-3 py-2 text-sm focus:outline-none focus:border-gold-500 transition-colors rounded-sm resize-none" />
                </div>
                <button onClick={handleSave} disabled={saving} className="btn-gold w-full text-sm py-2 disabled:opacity-50">
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>

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

              {app.message && (
                <div className="border-t border-cinema-700 pt-4">
                  <div className="text-[10px] uppercase tracking-widest text-gold-500 font-semibold mb-2">Message</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{app.message}</p>
                </div>
              )}

              <div className="text-xs text-gray-600 border-t border-cinema-800 pt-3">
                Submitted {formatDate(app.created_at)}
              </div>
            </>
          )}

          {/* PIPELINE TAB */}
          {detailTab === "pipeline" && (
            <div className="space-y-4">
              {/* Stage progress */}
              <div className="space-y-2">
                {(["screening", "formal_invited", "formal_submitted", "call_scheduled", "call_complete", "onboarding_sent", "active"] as PipelineStage[]).map((s, i) => {
                  const stages: PipelineStage[] = ["screening", "formal_invited", "formal_submitted", "call_scheduled", "call_complete", "onboarding_sent", "active"];
                  const current = stages.indexOf(stage);
                  const thisIdx = i;
                  const isPast = thisIdx < current;
                  const isCurrent = thisIdx === current;
                  return (
                    <div key={s} className={`flex items-center gap-3 py-2 px-3 border rounded-sm ${isCurrent ? "border-gold-500/40 bg-cinema-800" : isPast ? "border-green-500/20 bg-green-500/5" : "border-cinema-700 opacity-40"}`}>
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isCurrent ? "bg-gold-400" : isPast ? "bg-green-400" : "bg-cinema-600"}`} />
                      <span className={`text-xs ${isCurrent ? "text-gold-400 font-semibold" : isPast ? "text-green-400" : "text-gray-600"}`}>
                        {PIPELINE_LABELS[s]}
                      </span>
                      {s === "call_scheduled" && app.call_deadline && (
                        <span className={`ml-auto text-xs ${daysUntil(app.call_deadline) <= 7 ? "text-red-400" : "text-gray-500"}`}>
                          {daysUntil(app.call_deadline)}d left
                        </span>
                      )}
                      {isPast && <span className="ml-auto text-green-400 text-xs">✓</span>}
                    </div>
                  );
                })}
              </div>

              {/* Next actions */}
              {nextActions.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-[10px] uppercase tracking-widest text-gray-500">Next Action</div>
                  {nextActions.map(action => (
                    <button key={action.action} disabled={pipelineAction}
                      onClick={() => advancePipeline(action.action)}
                      className={`w-full text-sm py-2.5 border transition-all disabled:opacity-50 ${action.style ?? "btn-gold"}`}>
                      {pipelineAction ? "Processing…" : action.label}
                    </button>
                  ))}
                </div>
              )}

              {stage === "active" && (
                <div className="border border-green-500/20 bg-green-500/5 p-4 text-center">
                  <div className="text-green-400 text-xs uppercase tracking-widest">Active Dealer</div>
                  {app.activated_at && <div className="text-gray-500 text-xs mt-1">Since {formatDate(app.activated_at)}</div>}
                </div>
              )}

              {stage === "declined" && (
                <div className="border border-red-500/20 bg-red-500/5 p-4 text-center">
                  <div className="text-red-400 text-xs uppercase tracking-widest">Declined</div>
                </div>
              )}
            </div>
          )}

          {/* ACTIVITY TAB */}
          {detailTab === "activity" && (
            app.pipeline_stage === "active" ? (
              <DealerActivityTab app={app} />
            ) : (
              <div className="py-8 text-center">
                <div className="text-gray-600 text-sm">Builds and invoices are tracked once a dealer is active.</div>
              </div>
            )
          )}

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

  const handleUpdate = (id: number, updates: Partial<Application>) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, ...updates } : null);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  const counts = {
    all: applications.length,
    new: applications.filter(a => a.status === "new").length,
    reviewing: applications.filter(a => a.status === "reviewing").length,
    approved: applications.filter(a => a.status === "approved").length,
    active: applications.filter(a => a.pipeline_stage === "active").length,
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
            <span className="text-gray-500 text-sm">Dealer Pipeline</span>
          </div>
          <button onClick={handleLogout} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Sign out</button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {[
            { label: "Total", count: counts.all, status: "all" },
            { label: "New", count: counts.new, status: "new" },
            { label: "Reviewing", count: counts.reviewing, status: "reviewing" },
            { label: "Approved", count: counts.approved, status: "approved" },
            { label: "Active Dealers", count: counts.active, status: "active_dealers" },
          ].map(s => (
            <button key={s.status} onClick={() => setStatusFilter(s.status)}
              className={`border p-4 text-left transition-all ${statusFilter === s.status ? "border-gold-500/40 bg-cinema-800" : "border-cinema-700 bg-cinema-900 hover:border-cinema-600"}`}>
              <div className="text-2xl font-serif font-bold gold-text mb-0.5">{s.count}</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input type="search" placeholder="Search by name, email, or company…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-cinema-800 border border-cinema-600 text-white placeholder-gray-600 px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500 transition-colors rounded-sm" />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="bg-cinema-800 border border-cinema-600 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500 transition-colors rounded-sm appearance-none cursor-pointer">
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="reviewing">Reviewing</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
            <option value="active_dealers">Active Dealers</option>
          </select>
          <button onClick={fetchApplications} className="btn-outline text-sm px-4 py-2.5">Refresh</button>
        </div>

        {/* Table */}
        <div className="border border-cinema-700 bg-cinema-900 overflow-x-auto">
          {loading ? (
            <div className="py-24 text-center text-gray-600 text-sm tracking-widest uppercase">Loading…</div>
          ) : applications.filter(a => {
            if (statusFilter === "active_dealers") return a.pipeline_stage === "active";
            return true;
          }).length === 0 ? (
            <div className="py-24 text-center">
              <div className="text-gold-500/30 text-4xl mb-4">◈</div>
              <p className="text-gray-600 text-sm">No applications.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cinema-700 bg-cinema-950">
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Company</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-semibold hidden md:table-cell">Business Type</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-semibold hidden lg:table-cell">Location</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Pipeline</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-semibold hidden sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {applications
                  .filter(a => statusFilter === "active_dealers" ? a.pipeline_stage === "active" : true)
                  .map((app, i) => (
                  <tr key={app.id} onClick={() => setSelected(app)}
                    className={`border-b border-cinema-800 cursor-pointer hover:bg-cinema-800 transition-colors ${i % 2 === 0 ? "" : "bg-cinema-950/40"} ${selected?.id === app.id ? "bg-cinema-800 border-l-2 border-l-gold-500/50" : ""}`}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{app.first_name} {app.last_name}</div>
                      <div className="text-gray-500 text-xs">{app.email}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{app.company}</td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell"><span className="text-xs">{app.business_type}</span></td>
                    <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">{[app.state, app.country].filter(Boolean).join(", ")}</td>
                    <td className="px-4 py-3">
                      <PipelineBadge stage={app.pipeline_stage} />
                      {app.call_deadline && app.pipeline_stage === "call_scheduled" && (
                        <div className={`text-xs mt-1 ${daysUntil(app.call_deadline) <= 7 ? "text-red-400" : "text-gray-500"}`}>
                          {daysUntil(app.call_deadline)}d left
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs hidden sm:table-cell whitespace-nowrap">{formatDate(app.created_at)}</td>
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

      {selected && (
        <DetailPanel app={selected} onClose={() => setSelected(null)} onUpdate={handleUpdate} />
      )}
    </div>
  );
}
