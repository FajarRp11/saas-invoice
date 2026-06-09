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
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import ViewClientDialog from "@/components/view-client-dialog";
import EditClientDialog from "@/components/edit-client-dialog";
import DeleteClientDialog from "@/components/delete-client-dialog";

// Type matching the Prisma Client model
export type Client = {
  id: string;
  organizationId: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

function ClientActions({ client }: { client: Client }) {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
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
            onClick={() => navigator.clipboard.writeText(client.id)}
          >
            Copy client ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setViewOpen(true)}>
            <Eye />
            <span>View client</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil />
            <span>Edit client</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 />
            <span>Delete client</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewClientDialog
        client={client}
        open={viewOpen}
        onOpenChange={setViewOpen}
      />
      <EditClientDialog
        client={client}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteClientDialog
        client={client}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email ?? "-",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => row.original.phone ?? "-",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => row.original.address ?? "-",
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => row.original.city ?? "-",
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => row.original.country ?? "-",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ClientActions client={row.original} />,
  },
];
