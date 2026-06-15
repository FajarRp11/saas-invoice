"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Trash2, Pencil } from "lucide-react";
import DeleteInvoiceDialog from "@/components/delete-invoice-dialog";
import Link from "next/link";

export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED";

export type InvoiceWithClient = {
  id: string;
  organizationId: string;
  clientId: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  notes: string | null;
  termsCondition: string | null;
  subtotal: number;
  taxPercent: number;
  taxAmount: number;
  discount: number;
  total: number;
  pdfUrl: string | null;
  sentAt: Date | null;
  lastReminderAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  client: {
    id: string;
    name: string;
    email: string | null;
  };
};

export const statusConfig: Record<
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

function InvoiceActions({ invoice }: { invoice: InvoiceWithClient }) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(invoice.invoiceNumber)}
          >
            Copy invoice number
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/invoices/${invoice.id}`}>
              <Eye className="h-4 w-4" />
              <span>View invoice</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/invoices/${invoice.id}/edit`}>
              <Pencil className="h-4 w-4" />
              <span>Edit invoice</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete invoice</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteInvoiceDialog
        invoice={invoice}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}

export const columns: ColumnDef<InvoiceWithClient>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "Invoice #",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.invoiceNumber}</span>
    ),
  },
  {
    accessorKey: "client.name",
    header: "Client",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span>{row.original.client.name}</span>
        {row.original.client.email && (
          <span className="text-xs text-muted-foreground">
            {row.original.client.email}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const config = statusConfig[row.original.status];
      return <Badge className={config.className}>{config.label}</Badge>;
    },
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ row }) => {
      const date = new Date(row.original.issueDate);
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const date = new Date(row.original.dueDate);
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatCurrency(row.original.total)}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <InvoiceActions invoice={row.original} />,
  },
];
