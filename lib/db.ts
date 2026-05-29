import { sql } from "@vercel/postgres";
import { randomBytes } from "crypto";

// ─── Bootstrap ───────────────────────────────────────────────────────────────

export async function ensureTable() {
  // Core applications table
  await sql`
    CREATE TABLE IF NOT EXISTS dealer_applications (
      id                  SERIAL PRIMARY KEY,
      created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      first_name          TEXT NOT NULL,
      last_name           TEXT NOT NULL,
      email               TEXT NOT NULL,
      phone               TEXT,
      company             TEXT NOT NULL,
      website             TEXT,
      country             TEXT NOT NULL,
      state               TEXT,
      business_type       TEXT NOT NULL,
      years_in_business   TEXT,
      annual_revenue      TEXT,
      client_base         TEXT,
      showroom            TEXT,
      message             TEXT,
      status              TEXT NOT NULL DEFAULT 'new',
      notes               TEXT,
      pipeline_stage      TEXT NOT NULL DEFAULT 'screening',
      formal_invited_at   TIMESTAMPTZ,
      call_deadline       TIMESTAMPTZ,
      call_scheduled_at   TIMESTAMPTZ,
      activated_at        TIMESTAMPTZ
    );
  `;

  // Migrate existing rows that are missing pipeline columns
  await sql`
    ALTER TABLE dealer_applications
      ADD COLUMN IF NOT EXISTS pipeline_stage    TEXT NOT NULL DEFAULT 'screening',
      ADD COLUMN IF NOT EXISTS formal_invited_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS call_deadline     TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS call_scheduled_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS activated_at      TIMESTAMPTZ;
  `;

  // Token table — secure one-time links for formal app + onboarding
  await sql`
    CREATE TABLE IF NOT EXISTS dealer_tokens (
      id             SERIAL PRIMARY KEY,
      application_id INT NOT NULL REFERENCES dealer_applications(id),
      token          TEXT NOT NULL UNIQUE,
      type           TEXT NOT NULL,
      used_at        TIMESTAMPTZ,
      expires_at     TIMESTAMPTZ,
      created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  // Formal application (stage 2)
  await sql`
    CREATE TABLE IF NOT EXISTS dealer_formal_applications (
      id                    SERIAL PRIMARY KEY,
      application_id        INT NOT NULL REFERENCES dealer_applications(id),
      submitted_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      portfolio_projects    TEXT,
      portfolio_urls        TEXT,
      typical_project_value TEXT,
      projects_per_year     TEXT,
      facility_type         TEXT,
      team_size             TEXT,
      certifications        TEXT,
      why_cineluxe          TEXT,
      target_market         TEXT,
      additional_notes      TEXT
    );
  `;

  // Onboarding (stage 4)
  await sql`
    CREATE TABLE IF NOT EXISTS dealer_onboarding (
      id                       SERIAL PRIMARY KEY,
      application_id           INT NOT NULL REFERENCES dealer_applications(id),
      submitted_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      legal_business_name      TEXT,
      entity_type              TEXT,
      ein                      TEXT,
      business_address         TEXT,
      business_city            TEXT,
      business_state           TEXT,
      business_zip             TEXT,
      business_country         TEXT,
      primary_contact_name     TEXT,
      primary_contact_email    TEXT,
      primary_contact_phone    TEXT,
      billing_contact_name     TEXT,
      billing_contact_email    TEXT,
      resale_certificate_number TEXT,
      resale_state             TEXT,
      map_agreed               BOOLEAN DEFAULT FALSE,
      map_signature            TEXT,
      map_agreed_at            TIMESTAMPTZ,
      map_ip_address           TEXT
    );
  `;

  // Dealer builds
  await sql`
    CREATE TABLE IF NOT EXISTS dealer_builds (
      id              SERIAL PRIMARY KEY,
      application_id  INT NOT NULL REFERENCES dealer_applications(id),
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      project_name    TEXT NOT NULL,
      client_location TEXT,
      estimated_value TEXT,
      status          TEXT NOT NULL DEFAULT 'active',
      notes           TEXT
    );
  `;

  // Dealer invoices
  await sql`
    CREATE TABLE IF NOT EXISTS dealer_invoices (
      id              SERIAL PRIMARY KEY,
      application_id  INT NOT NULL REFERENCES dealer_applications(id),
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      invoice_number  TEXT,
      amount          TEXT,
      status          TEXT NOT NULL DEFAULT 'unpaid',
      due_date        TEXT,
      notes           TEXT
    );
  `;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type ApplicationStatus = "new" | "reviewing" | "approved" | "declined";

export type PipelineStage =
  | "screening"
  | "formal_invited"
  | "formal_submitted"
  | "call_scheduled"
  | "call_complete"
  | "onboarding_sent"
  | "active"
  | "declined";

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
  pipeline_stage: PipelineStage;
  formal_invited_at: string | null;
  call_deadline: string | null;
  call_scheduled_at: string | null;
  activated_at: string | null;
}

export interface DealerToken {
  id: number;
  application_id: number;
  token: string;
  type: "formal_app" | "onboarding";
  used_at: string | null;
  expires_at: string | null;
  created_at: string;
}

export interface DealerBuild {
  id: number;
  application_id: number;
  created_at: string;
  project_name: string;
  client_location: string;
  estimated_value: string;
  status: "active" | "complete" | "on_hold";
  notes: string;
}

export interface DealerInvoice {
  id: number;
  application_id: number;
  created_at: string;
  invoice_number: string;
  amount: string;
  status: "unpaid" | "paid" | "overdue";
  due_date: string;
  notes: string;
}

// ─── Application Queries ──────────────────────────────────────────────────────

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
}) {
  await ensureTable();
  const rows = await sql<DealerApplication>`
    SELECT * FROM dealer_applications
    ORDER BY created_at DESC;
  `;
  let data = rows.rows;

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

export async function updatePipelineStage(
  id: number,
  stage: PipelineStage,
  extra?: {
    callDeadline?: Date;
    callScheduledAt?: Date;
    activatedAt?: Date;
    formalInvitedAt?: Date;
  }
) {
  await sql`
    UPDATE dealer_applications
    SET
      pipeline_stage      = ${stage},
      formal_invited_at   = COALESCE(${extra?.formalInvitedAt?.toISOString() ?? null}, formal_invited_at),
      call_deadline       = COALESCE(${extra?.callDeadline?.toISOString() ?? null}, call_deadline),
      call_scheduled_at   = COALESCE(${extra?.callScheduledAt?.toISOString() ?? null}, call_scheduled_at),
      activated_at        = COALESCE(${extra?.activatedAt?.toISOString() ?? null}, activated_at)
    WHERE id = ${id};
  `;
}

// ─── Token Queries ────────────────────────────────────────────────────────────

export async function createToken(
  applicationId: number,
  type: "formal_app" | "onboarding",
  expiryDays = 30
): Promise<string> {
  await ensureTable();
  const token = randomBytes(32).toString("hex");
  const expires = new Date();
  expires.setDate(expires.getDate() + expiryDays);

  await sql`
    INSERT INTO dealer_tokens (application_id, token, type, expires_at)
    VALUES (${applicationId}, ${token}, ${type}, ${expires.toISOString()});
  `;
  return token;
}

export async function getToken(token: string): Promise<DealerToken | null> {
  await ensureTable();
  const result = await sql<DealerToken>`
    SELECT * FROM dealer_tokens WHERE token = ${token} LIMIT 1;
  `;
  return result.rows[0] ?? null;
}

export async function markTokenUsed(token: string) {
  await sql`
    UPDATE dealer_tokens SET used_at = NOW() WHERE token = ${token};
  `;
}

// ─── Formal Application Queries ───────────────────────────────────────────────

export async function insertFormalApplication(
  applicationId: number,
  data: {
    portfolioProjects: string;
    portfolioUrls: string;
    typicalProjectValue: string;
    projectsPerYear: string;
    facilityType: string;
    teamSize: string;
    certifications: string;
    whyCineluxe: string;
    targetMarket: string;
    additionalNotes: string;
  }
) {
  await ensureTable();
  await sql`
    INSERT INTO dealer_formal_applications
      (application_id, portfolio_projects, portfolio_urls, typical_project_value,
       projects_per_year, facility_type, team_size, certifications,
       why_cineluxe, target_market, additional_notes)
    VALUES
      (${applicationId}, ${data.portfolioProjects}, ${data.portfolioUrls},
       ${data.typicalProjectValue}, ${data.projectsPerYear}, ${data.facilityType},
       ${data.teamSize}, ${data.certifications}, ${data.whyCineluxe},
       ${data.targetMarket}, ${data.additionalNotes});
  `;
}

// ─── Onboarding Queries ───────────────────────────────────────────────────────

export async function insertOnboarding(
  applicationId: number,
  data: {
    legalBusinessName: string;
    entityType: string;
    ein: string;
    businessAddress: string;
    businessCity: string;
    businessState: string;
    businessZip: string;
    businessCountry: string;
    primaryContactName: string;
    primaryContactEmail: string;
    primaryContactPhone: string;
    billingContactName: string;
    billingContactEmail: string;
    resaleCertificateNumber: string;
    resaleState: string;
    mapSignature: string;
    mapIpAddress: string;
  }
) {
  await ensureTable();
  await sql`
    INSERT INTO dealer_onboarding
      (application_id, legal_business_name, entity_type, ein,
       business_address, business_city, business_state, business_zip, business_country,
       primary_contact_name, primary_contact_email, primary_contact_phone,
       billing_contact_name, billing_contact_email,
       resale_certificate_number, resale_state,
       map_agreed, map_signature, map_agreed_at, map_ip_address)
    VALUES
      (${applicationId}, ${data.legalBusinessName}, ${data.entityType}, ${data.ein},
       ${data.businessAddress}, ${data.businessCity}, ${data.businessState},
       ${data.businessZip}, ${data.businessCountry},
       ${data.primaryContactName}, ${data.primaryContactEmail}, ${data.primaryContactPhone},
       ${data.billingContactName}, ${data.billingContactEmail},
       ${data.resaleCertificateNumber}, ${data.resaleState},
       true, ${data.mapSignature}, NOW(), ${data.mapIpAddress});
  `;
}

// ─── Build Queries ────────────────────────────────────────────────────────────

export async function listBuilds(applicationId: number) {
  await ensureTable();
  const result = await sql<DealerBuild>`
    SELECT * FROM dealer_builds
    WHERE application_id = ${applicationId}
    ORDER BY created_at DESC;
  `;
  return result.rows;
}

export async function insertBuild(
  applicationId: number,
  data: {
    projectName: string;
    clientLocation: string;
    estimatedValue: string;
    status: string;
    notes: string;
  }
) {
  await ensureTable();
  await sql`
    INSERT INTO dealer_builds
      (application_id, project_name, client_location, estimated_value, status, notes)
    VALUES
      (${applicationId}, ${data.projectName}, ${data.clientLocation},
       ${data.estimatedValue}, ${data.status}, ${data.notes});
  `;
}

export async function updateBuild(
  id: number,
  data: { status?: string; notes?: string; estimatedValue?: string }
) {
  await sql`
    UPDATE dealer_builds
    SET
      status          = COALESCE(${data.status ?? null}, status),
      notes           = COALESCE(${data.notes ?? null}, notes),
      estimated_value = COALESCE(${data.estimatedValue ?? null}, estimated_value)
    WHERE id = ${id};
  `;
}

// ─── Invoice Queries ──────────────────────────────────────────────────────────

export async function listInvoices(applicationId: number) {
  await ensureTable();
  const result = await sql<DealerInvoice>`
    SELECT * FROM dealer_invoices
    WHERE application_id = ${applicationId}
    ORDER BY created_at DESC;
  `;
  return result.rows;
}

export async function insertInvoice(
  applicationId: number,
  data: {
    invoiceNumber: string;
    amount: string;
    status: string;
    dueDate: string;
    notes: string;
  }
) {
  await ensureTable();
  await sql`
    INSERT INTO dealer_invoices
      (application_id, invoice_number, amount, status, due_date, notes)
    VALUES
      (${applicationId}, ${data.invoiceNumber}, ${data.amount},
       ${data.status}, ${data.dueDate}, ${data.notes});
  `;
}

export async function updateInvoiceStatus(id: number, status: string) {
  await sql`
    UPDATE dealer_invoices SET status = ${status} WHERE id = ${id};
  `;
}
