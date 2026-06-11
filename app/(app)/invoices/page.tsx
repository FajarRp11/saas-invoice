import { columns } from "./data-table/columns";
import { DataTable } from "@/components/ui/data-table";
import { getInvoices } from "@/app/actions/invoice";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div className="container mx-auto py-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">
            Manage and track your invoices
          </p>
        </div>
        <Link href="/invoices/create">
          <Button>
            <PlusIcon />
            Create Invoice
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={invoices} />
    </div>
  );
}
