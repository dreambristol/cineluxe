import { NextRequest, NextResponse } from "next/server";
import { getToken, markTokenUsed, insertFormalApplication, updatePipelineStage } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } }
) {
  const record = await getToken(params.token);
  const valid =
    record !== null &&
    record.type === "formal_app" &&
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
    record.type !== "formal_app" ||
    record.used_at !== null ||
    (record.expires_at !== null && new Date(record.expires_at) <= new Date())
  ) {
    return NextResponse.json({ error: "This link is invalid or has expired." }, { status: 400 });
  }

  const body = await req.json();

  try {
    await insertFormalApplication(record.application_id, {
      portfolioProjects: body.portfolio_projects ?? "",
      portfolioUrls: body.portfolio_urls ?? "",
      typicalProjectValue: body.typical_project_value ?? "",
      projectsPerYear: body.projects_per_year ?? "",
      facilityType: body.facility_type ?? "",
      teamSize: body.team_size ?? "",
      certifications: body.certifications ?? "",
      whyCineluxe: body.why_cineluxe ?? "",
      targetMarket: body.target_market ?? "",
      additionalNotes: body.additional_notes ?? "",
    });

    await updatePipelineStage(record.application_id, "formal_submitted");
    await markTokenUsed(params.token);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[apply]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
