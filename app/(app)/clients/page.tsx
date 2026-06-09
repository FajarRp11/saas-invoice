import { columns } from "./data-table/columns";
import { DataTable } from "@/components/ui/data-table";
import { getClients } from "@/app/actions/client";
import CreateClientDialog from "@/components/create-client-dialog";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="container mx-auto py-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-muted-foreground">Manage your clients</p>
        </div>
        <CreateClientDialog />
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  );
}
