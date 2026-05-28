import { sql } from "@vercel/postgres";

// ─── Bootstrap ───────────────────────────────────────────────────────────────
// Run once to create the table. Called lazily from the API routes.

export async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS dealer_applications (
      id            SERIAL PRIMARY KEY,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      first_name    TEXT NOT NULL,
      last_name     TEXT NOT NULL,
      email         TEXT NOT NULL,
      phone         TEXT,
      company       TEXT NOT NULL,
      website       TEXT,
      country       TEXT NOT NULL,
      state         TEXT,
      business_type TEXT NOT NULL,
      years_in_business TEXT,
      annual_revenue    TEXT,
      client_base       TEXT,
      showroom          TEXT,
      message           TEXT,
      status            TEXT NOT NULL DEFAULT 'new',
      notes             TEXT
    );
  `;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type ApplicationStatus = "new" | "reviewing" | "approved" | "declined";

export interface DealerApplication {
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

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function insertApplication(data: {
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
}) {
  await ensureTable();
  const result = await sql`
    INSERT INTO dealer_applications
      (first_name, last_name, email, phone, company, website, country, state,
       business_type, years_in_business, annual_revenue, client_base, showroom, message)
    VALUES
      (${data.firstName}, ${data.lastName}, ${data.email}, ${data.phone},
       ${data.company}, ${data.website}, ${data.country}, ${data.state},
       ${data.businessType}, ${data.yearsInBusiness}, ${data.annualRevenue},
       ${data.clientBase}, ${data.showroom}, ${data.message})
    RETURNING id;
  `;
  return result.rows[0];
}

export async function listApplications(opts?: {
  status?: string;
  search?: string;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}) {
  await ensureTable();
  // Build safe, simple query (no dynamic SQL injection — all filters via params)
  const rows = await sql<DealerApplication>`
    SELECT * FROM dealer_applications
    ORDER BY created_at DESC;
  `;
  let data = rows.rows;

  // Client-side filtering (dataset is small; avoids dynamic SQL complexity)
  if (opts?.status && opts.status !== "all") {
    data = data.filter((r) => r.status === opts!.status);
  }
  if (opts?.search) {
    const q = opts.search.toLowerCase();
    data = data.filter(
      (r) =>
        r.first_name?.toLowerCase().includes(q) ||
        r.last_name?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.company?.toLowerCase().includes(q)
    );
  }
  return data;
}

export async function getApplicationById(id: number) {
  await ensureTable();
  const result = await sql<DealerApplication>`
    SELECT * FROM dealer_applications WHERE id = ${id} LIMIT 1;
  `;
  return result.rows[0] ?? null;
}

export async function updateApplicationStatus(
  id: number,
  status: ApplicationStatus,
  notes?: string
) {
  await sql`
    UPDATE dealer_applications
    SET status = ${status}, notes = ${notes ?? ""}
    WHERE id = ${id};
  `;
}
