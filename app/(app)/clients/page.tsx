import { columns, Client } from "./data-table/columns";
import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

async function getData(): Promise<Client[]> {
  const session = await auth();
  const organizationId = session?.user?.organizationId;

  if (!organizationId) {
    return [];
  }

  return prisma.client.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
  });
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
