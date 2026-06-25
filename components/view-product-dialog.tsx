"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/app/(app)/products/data-table/columns";
import { formatCurrency } from "@/lib/format";

interface ViewProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewProductDialog({
  product,
  open,
  onOpenChange,
}: ViewProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-4">
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>
            Viewing details for {product.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <DetailRow label="Name" value={product.name} />
            <Badge variant={product.isActive ? "default" : "secondary"}>
              {product.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <DetailRow label="Description" value={product.description} />
          <div className="grid grid-cols-2 gap-4">
            <DetailRow
              label="Price"
              value={formatCurrency(
                product.price,
                product.organization.currency,
              )}
            />
            <DetailRow label="Unit" value={product.unit} />
          </div>
          <DetailRow
            label="Created"
            value={new Date(product.createdAt).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="grid gap-1">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-sm">{value || "-"}</span>
    </div>
  );
}
