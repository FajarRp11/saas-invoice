import { getClients } from "@/app/actions/client";
import { getProducts } from "@/app/actions/product";
import { getInvoiceById } from "@/app/actions/invoice";
import EditInvoiceForm from "@/components/edit-invoice-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface EditInvoicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditInvoicePage({
  params,
}: EditInvoicePageProps) {
  const { id } = await params;

  const [invoice, clients, products] = await Promise.all([
    getInvoiceById(id),
    getClients(),
    getProducts(),
  ]);

  if (!invoice) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Invoice Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The invoice you are trying to edit does not exist or you do not have
          permission to view it.
        </p>
        <Link href="/invoices">
          <Button variant="outline">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Invoices
          </Button>
        </Link>
      </div>
    );
  }

  const activeProducts = products.filter((p) => p.isActive);

  const normalizedInvoice = {
    ...invoice,
    issueDate: invoice.issueDate.toISOString(),
    dueDate: invoice.dueDate.toISOString(),
  };

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
          <h1 className="text-2xl font-bold">Edit Invoice</h1>
          <p className="text-muted-foreground">
            Edit details for Invoice #{invoice.invoiceNumber}
          </p>
        </div>
      </div>
      <EditInvoiceForm
        invoice={normalizedInvoice}
        clients={clients}
        products={activeProducts}
      />
    </div>
  );
}
