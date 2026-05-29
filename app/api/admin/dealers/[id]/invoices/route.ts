import { NextRequest, NextResponse } from "next/server";
import { listInvoices, insertInvoice } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  const invoices = await listInvoices(id);
  return NextResponse.json({ invoices });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  const body = await req.json();
  await insertInvoice(id, {
    invoiceNumber: body.invoice_number ?? "",
    amount: body.amount ?? "",
    status: body.status ?? "unpaid",
    dueDate: body.due_date ?? "",
    notes: body.notes ?? "",
  });
  return NextResponse.json({ success: true });
}
