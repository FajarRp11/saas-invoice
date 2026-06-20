import { getInvoiceById } from "@/app/actions/invoice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneratePDFButton } from "@/components/generate-pdf-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SendInvoiceButton } from "@/components/send-invoice-button";
import RecordPaymentDialog from "@/components/record-payment-dialog";

interface InvoiceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED";

const statusConfig: Record<
  InvoiceStatus,
  { label: string; className: string }
> = {
  DRAFT: {
    label: "Draft",
    className: "bg-muted text-muted-foreground border-border",
  },
  SENT: {
    label: "Sent",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  PAID: {
    label: "Paid",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
  OVERDUE: {
    label: "Overdue",
    className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-neutral-100 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400",
  },
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function InvoiceDetailPage({
  params,
}: InvoiceDetailPageProps) {
  const { id } = await params;
  const invoice = await getInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  const config = statusConfig[invoice.status as InvoiceStatus];

  return (
    <div className="container mx-auto py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/invoices">
            <Button variant="outline" size="sm">
              <ArrowLeftIcon className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{invoice.invoiceNumber}</h1>
              <Badge className={config.className}>{config.label}</Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              Created on {formatDate(invoice.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <GeneratePDFButton
            invoiceId={invoice.id}
            initialPdfUrl={invoice.pdfUrl}
          />
          {invoice.pdfUrl && (
            <SendInvoiceButton
              invoiceId={invoice.id}
              disabled={!invoice.pdfUrl || invoice.status === "PAID"}
            />
          )}

          {invoice.status !== "DRAFT" && invoice.status !== "CANCELLED" && (
            <RecordPaymentDialog invoiceId={invoice.id} invoiceTotal={invoice.total} />
          )}

          <Link href={`/invoices/${invoice.id}/edit`}>
            <Button variant="outline" size="sm">
              <PencilIcon className="h-4 w-4" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Client & Dates */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Client Info */}
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground mb-1">
                  Billed To
                </p>
                <p className="font-semibold">{invoice.client.name}</p>
                {invoice.client.email && (
                  <p className="text-sm text-muted-foreground">
                    {invoice.client.email}
                  </p>
                )}
              </div>
              {/* Issue Date */}
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground mb-1">
                  Issue Date
                </p>
                <p className="font-medium">{formatDate(invoice.issueDate)}</p>
              </div>
              {/* Due Date */}
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground mb-1">
                  Due Date
                </p>
                <p className="font-medium">{formatDate(invoice.dueDate)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Items Table */}
        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">#</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center w-[80px]">Qty</TableHead>
                  <TableHead className="text-right w-[160px]">
                    Unit Price
                  </TableHead>
                  <TableHead className="text-right w-[160px]">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.description && (
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.unitPrice)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(item.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="text-right">
                    Subtotal
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(invoice.subtotal)}
                  </TableCell>
                </TableRow>
                {invoice.taxPercent > 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-right">
                      Tax ({invoice.taxPercent}%)
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(invoice.taxAmount)}
                    </TableCell>
                  </TableRow>
                )}
                {invoice.discount > 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-right">
                      Discount
                    </TableCell>
                    <TableCell className="text-right text-destructive">
                      - {formatCurrency(invoice.discount)}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow className="text-base font-bold">
                  <TableCell colSpan={4} className="text-right">
                    Grand Total
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(invoice.total)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>

        {/* Notes & Terms */}
        {(invoice.notes || invoice.termsCondition) && (
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {invoice.notes && (
                  <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground mb-2">
                      Notes
                    </p>
                    <p className="text-sm whitespace-pre-line">
                      {invoice.notes}
                    </p>
                  </div>
                )}
                {invoice.termsCondition && (
                  <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground mb-2">
                      Terms & Conditions
                    </p>
                    <p className="text-sm whitespace-pre-line">
                      {invoice.termsCondition}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Activity / Metadata */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground mb-1">
                  Status
                </p>
                <Badge className={config.className}>{config.label}</Badge>
              </div>
              {invoice.sentAt && (
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground mb-1">
                    Sent At
                  </p>
                  <p>{formatDate(invoice.sentAt)}</p>
                </div>
              )}
              {invoice.lastReminderAt && (
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground mb-1">
                    Last Reminder
                  </p>
                  <p>{formatDate(invoice.lastReminderAt)}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground mb-1">
                  Last Updated
                </p>
                <p>{formatDate(invoice.updatedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
