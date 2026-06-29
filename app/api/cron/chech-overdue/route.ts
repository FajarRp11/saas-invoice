import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const now = new Date();

  const overdueInvoices = await prisma.invoice.updateMany({
    where: {
      status: "SENT",
      dueDate: { lt: now },
    },
    data: {
      status: "OVERDUE",
    },
  });

  return NextResponse.json({
    success: true,
    updated: overdueInvoices.count,
    timestamp: now.toISOString(),
  });
}
