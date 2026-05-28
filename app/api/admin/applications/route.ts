import { NextRequest, NextResponse } from "next/server";
import { listApplications } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "all";
  const search = searchParams.get("search") ?? "";

  try {
    const applications = await listApplications({ status, search });
    return NextResponse.json({ applications });
  } catch (err) {
    console.error("[admin/applications]", err);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
