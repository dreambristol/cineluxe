import { NextRequest, NextResponse } from "next/server";
import { getToken, markTokenUsed, insertOnboarding, updatePipelineStage } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } }
) {
  const record = await getToken(params.token);
  const valid =
    record !== null &&
    record.type === "onboarding" &&
    record.used_at === null &&
    (record.expires_at === null || new Date(record.expires_at) > new Date());

  return NextResponse.json({ valid });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const record = await getToken(params.token);
  if (
    !record ||
    record.type !== "onboarding" ||
    record.used_at !== null ||
    (record.expires_at !== null && new Date(record.expires_at) <= new Date())
  ) {
    return NextResponse.json({ error: "This link is invalid or has expired." }, { status: 400 });
  }

  const body = await req.json();

  if (!body.map_signature?.trim() || !body.map_agreed) {
    return NextResponse.json({ error: "MRP policy signature is required." }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  try {
    await insertOnboarding(record.application_id, {
      legalBusinessName: body.legal_business_name ?? "",
      entityType: body.entity_type ?? "",
      ein: body.ein ?? "",
      businessAddress: body.business_address ?? "",
      businessCity: body.business_city ?? "",
      businessState: body.business_state ?? "",
      businessZip: body.business_zip ?? "",
      businessCountry: body.business_country ?? "",
      primaryContactName: body.primary_contact_name ?? "",
      primaryContactEmail: body.primary_contact_email ?? "",
      primaryContactPhone: body.primary_contact_phone ?? "",
      billingContactName: body.billing_contact_name ?? "",
      billingContactEmail: body.billing_contact_email ?? "",
      resaleCertificateNumber: body.resale_certificate_number ?? "",
      resaleState: body.resale_state ?? "",
      mapSignature: body.map_signature,
      mapIpAddress: ip,
    });

    await updatePipelineStage(record.application_id, "active", { activatedAt: new Date() });
    await markTokenUsed(params.token);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[onboard]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
