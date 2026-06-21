"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getDashboardData() {
  const session = await auth();
  if (!session?.user.organizationId) {
    redirect("/onboarding");
  }

  const organizationId = session.user.organizationId;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endtOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
  );

  const [
    revenueThisMonth,
    outstanding,
    statusCount,
    totalClients,
    recentInvoices,
    revenueLast6Months,
  ] = await Promise.all([
    prisma.payment.aggregate({
      where: {
        invoice: { organizationId },
        paidAt: { gte: startOfMonth, lte: endtOfMonth },
      },
      _sum: { amount: true },
    }),

    prisma.invoice.aggregate({
      where: {
        organizationId,
        status: { in: ["SENT", "OVERDUE"] },
      },
      _sum: { total: true },
    }),

    prisma.invoice.groupBy({
      by: "status",
      where: { organizationId },
      _count: true,
    }),

    prisma.client.count({
      where: { organizationId },
    }),

    prisma.invoice.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        client: { select: { name: true } },
      },
    }),

    prisma.payment.findMany({
      where: {
        invoice: { organizationId },
        paidAt: {
          gte: new Date(now.getFullYear(), now.getMonth() - 5, 1),
        },
      },
      select: { amount: true, paidAt: true },
    }),
  ]);

  const statusMap = {
    DRAFT: 0,
    SENT: 0,
    PAID: 0,
    OVERDUE: 0,
    CANCELLED: 0,
  };

  statusCount.forEach((s) => {
    statusMap[s.status as keyof typeof statusMap] = s._count;
  });

  const monthlyRevenue: { month: string; revenue: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthLabel = targetDate.toLocaleDateString("id-ID", {
      month: "short",
      year: "2-digit",
    });

    const total = revenueLast6Months
      .filter((p) => {
        const paidDate = new Date(p.paidAt);
        return (
          paidDate.getMonth() === targetDate.getMonth() &&
          paidDate.getFullYear() === targetDate.getFullYear()
        );
      })
      .reduce((sum, p) => sum + p.amount, 0);

    monthlyRevenue.push({ month: monthLabel, revenue: total });
  }

  return {
    revenueThisMonth: revenueThisMonth._sum.amount,
    outstanding: outstanding._sum.total,
    statusMap,
    totalClients,
    recentInvoices,
    monthlyRevenue,
  };
}
