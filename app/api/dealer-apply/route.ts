import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { insertApplication } from "@/lib/db";

// ─── Types ───────────────────────────────────────────────────────────────────

interface DealerFormPayload {
  recaptchaToken: string;
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
}

interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  "error-codes"?: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function verifyRecaptcha(token: string): Promise<{ ok: boolean; score: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn("RECAPTCHA_SECRET_KEY not set — skipping verification");
    return { ok: true, score: 1 };
  }

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }).toString(),
  });

  const data: RecaptchaVerifyResponse = await res.json();
  const score = data.score ?? 0;
  return { ok: data.success && score >= 0.5, score };
}

function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn("Gmail credentials not set — email notifications disabled");
    return null;
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

async function sendNotificationEmail(data: Omit<DealerFormPayload, "recaptchaToken">) {
  const transporter = createTransporter();
  if (!transporter) return;

  const toAddress = process.env.GMAIL_NOTIFY_TO ?? process.env.GMAIL_USER;

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; color: #1a1a1a;">
      <h2 style="border-bottom: 2px solid #d4a017; padding-bottom: 12px; color: #111;">
        New Dealer Application — CineLuxe
      </h2>

      <table style="width:100%; border-collapse: collapse; font-size: 14px; margin-top: 20px;">
        <tr><td style="padding:8px 0; color:#666; width:160px;">Name</td><td style="padding:8px 0; font-weight:bold;">${data.firstName} ${data.lastName}</td></tr>
        <tr style="background:#fafafa;"><td style="padding:8px 4px; color:#666;">Email</td><td style="padding:8px 4px;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding:8px 0; color:#666;">Phone</td><td style="padding:8px 0;">${data.phone || "—"}</td></tr>
        <tr style="background:#fafafa;"><td style="padding:8px 4px; color:#666;">Company</td><td style="padding:8px 4px; font-weight:bold;">${data.company}</td></tr>
        <tr><td style="padding:8px 0; color:#666;">Website</td><td style="padding:8px 0;">${data.website || "—"}</td></tr>
        <tr style="background:#fafafa;"><td style="padding:8px 4px; color:#666;">Location</td><td style="padding:8px 4px;">${data.state ? `${data.state}, ` : ""}${data.country}</td></tr>
        <tr><td style="padding:8px 0; color:#666;">Business Type</td><td style="padding:8px 0;">${data.businessType}</td></tr>
        <tr style="background:#fafafa;"><td style="padding:8px 4px; color:#666;">Years in Business</td><td style="padding:8px 4px;">${data.yearsInBusiness || "—"}</td></tr>
        <tr><td style="padding:8px 0; color:#666;">Annual Revenue</td><td style="padding:8px 0;">${data.annualRevenue || "—"}</td></tr>
        <tr style="background:#fafafa;"><td style="padding:8px 4px; color:#666;">Showroom</td><td style="padding:8px 4px;">${data.showroom || "—"}</td></tr>
      </table>

      ${data.clientBase ? `
        <h3 style="margin-top:24px; color:#111;">Client Base</h3>
        <p style="background:#f5f5f5; padding:12px; border-left:3px solid #d4a017; margin:0;">${data.clientBase}</p>
      ` : ""}

      ${data.message ? `
        <h3 style="margin-top:24px; color:#111;">Additional Notes</h3>
        <p style="background:#f5f5f5; padding:12px; border-left:3px solid #d4a017; margin:0;">${data.message}</p>
      ` : ""}

      <p style="margin-top:32px; font-size:12px; color:#999;">
        Submitted via cineluxe.us dealer application form
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"CineLuxe Site" <${process.env.GMAIL_USER}>`,
    to: toAddress,
    replyTo: data.email,
    subject: `New Dealer Application — ${data.company} (${data.country})`,
    html,
  });
}

async function sendConfirmationEmail(data: Omit<DealerFormPayload, "recaptchaToken">) {
  const transporter = createTransporter();
  if (!transporter) return;

  await transporter.sendMail({
    from: `"CineLuxe" <${process.env.GMAIL_USER}>`,
    to: data.email,
    subject: "We received your CineLuxe dealer application",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; color: #1a1a1a;">
        <h2 style="border-bottom: 2px solid #d4a017; padding-bottom: 12px;">
          Application Received
        </h2>
        <p>Hi ${data.firstName},</p>
        <p>
          Thank you for applying to the CineLuxe authorized dealer program.
          Our team will review your application and be in touch within 3–5 business days.
        </p>
        <p style="color:#555;">
          If you have any questions in the meantime, reply to this email or reach us at
          <a href="mailto:dealers@cineluxe.us">dealers@cineluxe.us</a>.
        </p>
        <p style="margin-top:32px;">— The CineLuxe Team</p>
        <hr style="border:none; border-top:1px solid #eee; margin-top:32px;" />
        <p style="font-size:12px; color:#999;">CineLuxe — Modular Acoustic Panel Systems for Private Cinema</p>
      </div>
    `,
  });
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body: DealerFormPayload = await req.json();

    // 1. Verify reCAPTCHA
    const { ok } = await verifyRecaptcha(body.recaptchaToken);
    if (!ok) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    // 2. Basic field validation
    const required = ["firstName", "lastName", "email", "company", "country", "businessType"] as const;
    for (const field of required) {
      if (!body[field]?.trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // 3. Save to Postgres
    const { recaptchaToken, ...formData } = body;
    await insertApplication(formData);

    // 4. Send emails (non-blocking — don't fail the submission if email fails)
    await Promise.allSettled([
      sendNotificationEmail(formData),
      sendConfirmationEmail(formData),
    ]);

    return NextResponse.json(
      { success: true, message: "Application received" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[dealer-apply]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email dealers@cineluxe.us." },
      { status: 500 }
    );
  }
}
