"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Client } from "@/app/(app)/clients/data-table/columns";

interface ViewClientDialogProps {
  client: Client;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewClientDialog({
  client,
  open,
  onOpenChange,
}: ViewClientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-4">
          <DialogTitle>Client Details</DialogTitle>
          <DialogDescription>
            Viewing details for {client.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <DetailRow label="Name" value={client.name} />
          <div className="grid grid-cols-2 gap-4">
            <DetailRow label="Email" value={client.email} />
            <DetailRow label="Phone" value={client.phone} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DetailRow label="City" value={client.city} />
            <DetailRow label="Country" value={client.country} />
          </div>
          <DetailRow label="Address" value={client.address} />
          <DetailRow label="Notes" value={client.notes} />
          <DetailRow
            label="Created"
            value={new Date(client.createdAt).toLocaleDateString("id-ID", {
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
