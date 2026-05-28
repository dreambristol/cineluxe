import { NextRequest, NextResponse } from "next/server";
import { updateApplicationStatus, ApplicationStatus } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const { status, notes } = await req.json();
  const validStatuses: ApplicationStatus[] = ["new", "reviewing", "approved", "declined"];

  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    await updateApplicationStatus(id, status, notes);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/applications/patch]", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
