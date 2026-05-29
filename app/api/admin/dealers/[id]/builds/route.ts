import { NextRequest, NextResponse } from "next/server";
import { listBuilds, insertBuild } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  const builds = await listBuilds(id);
  return NextResponse.json({ builds });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  const body = await req.json();
  await insertBuild(id, {
    projectName: body.project_name ?? "",
    clientLocation: body.client_location ?? "",
    estimatedValue: body.estimated_value ?? "",
    status: body.status ?? "active",
    notes: body.notes ?? "",
  });
  return NextResponse.json({ success: true });
}
