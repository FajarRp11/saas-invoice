import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";

import { getDashboardData } from "@/app/actions/dashboard";
import { columns } from "./data-table/columns";
import { DataTable } from "./data-table/data-table";
import StatusStatsCard from "@/components/status-stats-card";

export default async function DashbioardPage() {
  const data = await getDashboardData();

  console.log(data);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards
            revenueThisMonth={data.revenueThisMonth ?? 0}
            outstanding={data.outstanding ?? 0}
            totalCLients={data.totalClients}
          />
          <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-3 px-4 lg:px-6">
            <ChartAreaInteractive data={data.monthlyRevenue} />
            <StatusStatsCard data={data.statusMap} />
          </div>
          <div className="px-4 lg:px-6">
            <DataTable columns={columns} data={data.recentInvoices} />
          </div>
        </div>
      </div>
    </div>
  );
}
