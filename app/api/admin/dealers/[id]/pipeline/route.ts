import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  getApplicationById,
  updatePipelineStage,
  createToken,
  PipelineStage,
} from "@/lib/db";
import { upsertDealerProfile, trackDealerEvent } from "@/lib/klaviyo";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const CALENDLY_URL = process.env.CALENDLY_SCHEDULING_URL ?? "https://calendly.com/cineluxe";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.cineluxe.us";

async function sendFormalAppInvite(firstName: string, email: string, company: string, token: string) {
  if (!resend) return;
  await resend.emails.send({
    from: "CineLuxe <dealers@cineluxe.us>",
    to: [email],
    subject: "Next Step: Your CineLuxe Formal Dealer Application",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; color: #1a1a1a;">
        <h2 style="border-bottom: 2px solid #d4a017; padding-bottom: 12px;">Your Application Has Been Selected</h2>
        <p>Hi ${firstName},</p>
        <p>After reviewing your initial application for <strong>${company}</strong>, we'd like to invite you to complete the next stage of the CineLuxe authorized dealer process.</p>
        <p>Please complete your formal application using the link below. A <strong>$50 application fee</strong> will be invoiced separately once your formal application is received.</p>
        <p style="margin: 32px 0;">
          <a href="${BASE_URL}/apply/${token}" style="background: #d4a017; color: #000; padding: 14px 28px; text-decoration: none; font-family: sans-serif; font-size: 13px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase;">
            Complete Formal Application
          </a>
        </p>
        <p style="color: #555; font-size: 14px;">This link is unique to your application and expires in 30 days.</p>
        <p style="margin-top: 32px;">— The CineLuxe Team</p>
        <hr style="border: none; border-top: 1px solid #eee; margin-top: 32px;" />
        <p style="font-size: 12px; color: #999;">CineLuxe — Modular Acoustic Panel Systems for Private Cinema</p>
      </div>
    `,
  });
}

async function sendCallInvite(firstName: string, email: string, company: string) {
  if (!resend) return;
  await resend.emails.send({
    from: "CineLuxe <dealers@cineluxe.us>",
    to: [email],
    subject: "Schedule Your CineLuxe Dealer Interview",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; color: #1a1a1a;">
        <h2 style="border-bottom: 2px solid #d4a017; padding-bottom: 12px;">You're Moving Forward</h2>
        <p>Hi ${firstName},</p>
        <p>Your formal application for <strong>${company}</strong> has been reviewed and we'd like to schedule a video call as the final step before authorization.</p>
        <p>Please book your interview using the link below. Calls must be scheduled <strong>within 30 days</strong>.</p>
        <p style="margin: 32px 0;">
          <a href="${CALENDLY_URL}" style="background: #d4a017; color: #000; padding: 14px 28px; text-decoration: none; font-family: sans-serif; font-size: 13px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase;">
            Schedule Your Interview
          </a>
        </p>
        <p style="color: #555; font-size: 14px;">This is a video call with the CineLuxe team. Plan for approximately 30 minutes.</p>
        <p style="margin-top: 32px;">— The CineLuxe Team</p>
        <hr style="border: none; border-top: 1px solid #eee; margin-top: 32px;" />
        <p style="font-size: 12px; color: #999;">CineLuxe — Modular Acoustic Panel Systems for Private Cinema</p>
      </div>
    `,
  });
}

async function sendOnboardingInvite(firstName: string, email: string, company: string, token: string) {
  if (!resend) return;
  await resend.emails.send({
    from: "CineLuxe <dealers@cineluxe.us>",
    to: [email],
    subject: "Welcome — Complete Your CineLuxe Dealer Onboarding",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; color: #1a1a1a;">
        <h2 style="border-bottom: 2px solid #d4a017; padding-bottom: 12px;">One Last Step</h2>
        <p>Hi ${firstName},</p>
        <p>Your interview was a success. We're pleased to move forward with authorizing <strong>${company}</strong> as a CineLuxe dealer.</p>
        <p>Please complete your dealer onboarding to finalize your authorization. This includes your business information and agreement to our Minimum Resale Price policy.</p>
        <p style="margin: 32px 0;">
          <a href="${BASE_URL}/onboard/${token}" style="background: #d4a017; color: #000; padding: 14px 28px; text-decoration: none; font-family: sans-serif; font-size: 13px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase;">
            Complete Onboarding
          </a>
        </p>
        <p style="color: #555; font-size: 14px;">This link is unique to your account and expires in 30 days.</p>
        <p style="margin-top: 32px;">— The CineLuxe Team</p>
        <hr style="border: none; border-top: 1px solid #eee; margin-top: 32px;" />
        <p style="font-size: 12px; color: #999;">CineLuxe — Modular Acoustic Panel Systems for Private Cinema</p>
      </div>
    `,
  });
}

async function sendDeclineEmail(firstName: string, email: string) {
  if (!resend) return;
  await resend.emails.send({
    from: "CineLuxe <dealers@cineluxe.us>",
    to: [email],
    subject: "Your CineLuxe Dealer Application",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; color: #1a1a1a;">
        <h2 style="border-bottom: 2px solid #d4a017; padding-bottom: 12px;">Application Update</h2>
        <p>Hi ${firstName},</p>
        <p>Thank you for your interest and the time you invested in the CineLuxe dealer process. After careful consideration, we're not able to move forward at this time.</p>
        <p style="color: #555;">We appreciate your interest in the program and wish you continued success.</p>
        <p style="margin-top: 32px;">— The CineLuxe Team</p>
        <hr style="border: none; border-top: 1px solid #eee; margin-top: 32px;" />
        <p style="font-size: 12px; color: #999;">CineLuxe — Modular Acoustic Panel Systems for Private Cinema</p>
      </div>
    `,
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const { action } = await req.json();
  const app = await getApplicationById(id);
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    switch (action) {
      case "send_formal_app": {
        const token = await createToken(id, "formal_app", 30);
        const now = new Date();
        await updatePipelineStage(id, "formal_invited", { formalInvitedAt: now });
        await Promise.allSettled([
          sendFormalAppInvite(app.first_name, app.email, app.company, token),
          upsertDealerProfile({ email: app.email, firstName: app.first_name, lastName: app.last_name, company: app.company, dealerStage: "formal_invited", applicationId: id }),
          trackDealerEvent(app.email, "Dealer Formal Invited", { company: app.company, application_id: id }),
        ]);
        return NextResponse.json({ pipeline_stage: "formal_invited" as PipelineStage, formal_invited_at: now.toISOString() });
      }

      case "send_call_invite": {
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 30);
        await updatePipelineStage(id, "call_scheduled", { callDeadline: deadline });
        await Promise.allSettled([
          sendCallInvite(app.first_name, app.email, app.company),
          upsertDealerProfile({ email: app.email, firstName: app.first_name, lastName: app.last_name, company: app.company, dealerStage: "call_scheduled", applicationId: id }),
          trackDealerEvent(app.email, "Dealer Call Scheduled", { company: app.company, deadline: deadline.toISOString() }),
        ]);
        return NextResponse.json({ pipeline_stage: "call_scheduled" as PipelineStage, call_deadline: deadline.toISOString() });
      }

      case "mark_call_complete": {
        await updatePipelineStage(id, "call_complete");
        await Promise.allSettled([
          upsertDealerProfile({ email: app.email, firstName: app.first_name, lastName: app.last_name, company: app.company, dealerStage: "call_complete", applicationId: id }),
          trackDealerEvent(app.email, "Dealer Call Complete", { company: app.company }),
        ]);
        return NextResponse.json({ pipeline_stage: "call_complete" as PipelineStage });
      }

      case "send_onboarding": {
        const token = await createToken(id, "onboarding", 30);
        await updatePipelineStage(id, "onboarding_sent");
        await Promise.allSettled([
          sendOnboardingInvite(app.first_name, app.email, app.company, token),
          upsertDealerProfile({ email: app.email, firstName: app.first_name, lastName: app.last_name, company: app.company, dealerStage: "onboarding_sent", applicationId: id }),
          trackDealerEvent(app.email, "Dealer Onboarding Sent", { company: app.company }),
        ]);
        return NextResponse.json({ pipeline_stage: "onboarding_sent" as PipelineStage });
      }

      case "activate": {
        const now = new Date();
        await updatePipelineStage(id, "active", { activatedAt: now });
        await Promise.allSettled([
          upsertDealerProfile({ email: app.email, firstName: app.first_name, lastName: app.last_name, company: app.company, dealerStage: "active", applicationId: id }),
          trackDealerEvent(app.email, "Dealer Activated", { company: app.company, activated_at: now.toISOString() }),
        ]);
        return NextResponse.json({ pipeline_stage: "active" as PipelineStage, activated_at: now.toISOString() });
      }

      case "decline": {
        await updatePipelineStage(id, "declined");
        await Promise.allSettled([
          sendDeclineEmail(app.first_name, app.email),
          upsertDealerProfile({ email: app.email, firstName: app.first_name, lastName: app.last_name, company: app.company, dealerStage: "declined", applicationId: id }),
          trackDealerEvent(app.email, "Dealer Declined", { company: app.company }),
        ]);
        return NextResponse.json({ pipeline_stage: "declined" as PipelineStage });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (err) {
    console.error("[pipeline]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
