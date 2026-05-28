import { NextRequest, NextResponse } from "next/server";
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
