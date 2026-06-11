import { getClients } from "@/app/actions/client";
import { getProducts } from "@/app/actions/product";
import CreateInvoiceForm from "@/components/create-invoice-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default async function CreateInvoicePage() {
  const [clients, products] = await Promise.all([getClients(), getProducts()]);

  const activeProducts = products.filter((p) => p.isActive);

  return (
    <div className="container mx-auto py-4">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/invoices">
          <Button variant="outline" size="sm">
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Create Invoice</h1>
          <p className="text-muted-foreground">
            Create a new invoice for your client
          </p>
        </div>
      </div>
      <CreateInvoiceForm clients={clients} products={activeProducts} />
    </div>
  );
}
