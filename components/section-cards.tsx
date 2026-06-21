"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { BanknoteArrowUp, BanknoteArrowDown, UsersRound } from "lucide-react";

interface sectionCardsProps {
  revenueThisMonth: number;
  outstanding: number;
  totalCLients: number;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

export function SectionCards({
  revenueThisMonth,
  outstanding,
  totalCLients,
}: sectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Revenue This Month</CardDescription>
          <CardAction>
            <BanknoteArrowUp />
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(revenueThisMonth)}
          </p>
        </CardContent>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Outstanding Balance</CardDescription>
          <CardAction>
            <BanknoteArrowDown />
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(outstanding)}
          </p>
        </CardContent>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total CLients</CardDescription>
          <CardAction>
            <UsersRound />
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalCLients ?? 0}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
