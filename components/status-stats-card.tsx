import React from "react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface StatusStatsCardProps {
  data: {
    DRAFT: number;
    SENT: number;
    PAID: number;
    OVERDUE: number;
    CANCELLED: number;
  };
}

const StatusStatsCard = ({ data }: StatusStatsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Status</CardTitle>
        <CardDescription>Overview of invoices by current status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p className="text-gray-700">Draft</p>
          <Badge className="bg-muted text-muted-foreground border-border">
            {data.DRAFT}
          </Badge>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between">
          <p className="text-gray-700">Sent</p>
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {data.SENT}
          </Badge>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between">
          <p className="text-gray-700">Paid</p>
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            {data.PAID}
          </Badge>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between">
          <p className="text-gray-700">Overdue</p>
          <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
            {data.OVERDUE}
          </Badge>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between">
          <p className="text-gray-700">Cancelled</p>
          <Badge className="bg-neutral-100 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
            {data.CANCELLED}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusStatsCard;
