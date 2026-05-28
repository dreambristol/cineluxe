import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { updateApplicationStatus, getApplicationById, ApplicationStatus } from "@/lib/db";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function sendApprovalEmail(firstName: string, email: string, company: string) {
  if (!resend) return;
  const { error } = await resend.emails.send({
    from: "CineLuxe <dealers@cineluxe.us>",
    to: [email],
    subject: "You're approved — Welcome to the CineLuxe Dealer Program",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; color: #1a1a1a;">
        <h2 style="border-bottom: 2px solid #d4a017; padding-bottom: 12px;">
          Welcome to CineLuxe
        </h2>
        <p>Hi ${firstName},</p>
        <p>
          We're pleased to let you know that <strong>${company}</strong> has been approved
          as an authorized CineLuxe dealer. We're excited to work with you.
        </p>
        <p>
          Our team will be in touch shortly with onboarding materials, pricing, and
          everything you need to start offering CineLuxe to your clients.
        </p>
        <p style="color:#555;">
          In the meantime, feel free to reach us at
          <a href="mailto:dealers@cineluxe.us">dealers@cineluxe.us</a> with any questions.
        </p>
        <p style="margin-top:32px;">— The CineLuxe Team</p>
        <hr style="border:none; border-top:1px solid #eee; margin-top:32px;" />
        <p style="font-size:12px; color:#999;">CineLuxe — Modular Acoustic Panel Systems for Private Cinema</p>
      </div>
    `,
  });
  if (error) console.error("[admin/applications] approval email error:", error);
}

async function sendDeclineEmail(firstName: string, email: string, company: string) {
  if (!resend) return;
  const { error } = await resend.emails.send({
    from: "CineLuxe <dealers@cineluxe.us>",
    to: [email],
    subject: "Your CineLuxe dealer application",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; color: #1a1a1a;">
        <h2 style="border-bottom: 2px solid #d4a017; padding-bottom: 12px;">
          Application Update
        </h2>
        <p>Hi ${firstName},</p>
        <p>
          Thank you for your interest in the CineLuxe dealer program. After reviewing
          your application for <strong>${company}</strong>, we're not able to move forward
          at this time.
        </p>
        <p style="color:#555;">
          We appreciate the time you took to apply and wish you continued success.
          If your situation changes in the future, we'd encourage you to apply again.
        </p>
        <p style="margin-top:32px;">— The CineLuxe Team</p>
        <hr style="border:none; border-top:1px solid #eee; margin-top:32px;" />
        <p style="font-size:12px; color:#999;">CineLuxe — Modular Acoustic Panel Systems for Private Cinema</p>
      </div>
    `,
  });
  if (error) console.error("[admin/applications] decline email error:", error);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const { status, notes, previousStatus } = await req.json();
  const validStatuses: ApplicationStatus[] = ["new", "reviewing", "approved", "declined"];

  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    await updateApplicationStatus(id, status, notes);

    // Send status-change emails only when transitioning into approved/declined
    if (status !== previousStatus && (status === "approved" || status === "declined")) {
      const application = await getApplicationById(id);
      if (application) {
        if (status === "approved") {
          await sendApprovalEmail(application.first_name, application.email, application.company);
        } else {
          await sendDeclineEmail(application.first_name, application.email, application.company);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/applications/patch]", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
