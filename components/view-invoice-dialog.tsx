"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { InvoiceWithClient } from "@/app/(app)/invoices/data-table/columns";
import { statusConfig } from "@/app/(app)/invoices/data-table/columns";

interface ViewInvoiceDialogProps {
  invoice: InvoiceWithClient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ViewInvoiceDialog({
  invoice,
  open,
  onOpenChange,
}: ViewInvoiceDialogProps) {
  const config = statusConfig[invoice.status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-4">
          <DialogTitle>Invoice Details</DialogTitle>
          <DialogDescription>
            Viewing invoice {invoice.invoiceNumber}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <DetailRow label="Invoice Number" value={invoice.invoiceNumber} />
            <Badge className={config.className}>{config.label}</Badge>
          </div>
          <DetailRow label="Client" value={invoice.client.name} />

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <DetailRow
              label="Issue Date"
              value={formatDate(invoice.issueDate)}
            />
            <DetailRow label="Due Date" value={formatDate(invoice.dueDate)} />
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <DetailRow
              label="Subtotal"
              value={formatCurrency(invoice.subtotal)}
            />
            <DetailRow
              label="Tax"
              value={`${invoice.taxPercent}% (${formatCurrency(invoice.taxAmount)})`}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DetailRow
              label="Discount"
              value={formatCurrency(invoice.discount)}
            />
            <div className="grid gap-1">
              <span className="text-sm font-medium text-muted-foreground">
                Total
              </span>
              <span className="text-sm font-bold">
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>

          {invoice.notes && (
            <>
              <Separator />
              <DetailRow label="Notes" value={invoice.notes} />
            </>
          )}

          {invoice.sentAt && (
            <DetailRow label="Sent At" value={formatDate(invoice.sentAt)} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className="grid gap-1">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-sm">{value || "-"}</span>
    </div>
  );
}
