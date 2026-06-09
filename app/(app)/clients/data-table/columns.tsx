"use client";

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
import { MoreHorizontal } from "lucide-react";

// Mirrors the `Client` model in prisma/schema.prisma
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

const fallback = (value: string | null) =>
  value && value.length > 0 ? value : "-";

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => fallback(row.original.email),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => fallback(row.original.phone),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => fallback(row.original.address),
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => fallback(row.original.city),
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => fallback(row.original.country),
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => fallback(row.original.notes),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) =>
      new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
      }).format(new Date(row.original.createdAt)),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const client = row.original;
      return (
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
            <DropdownMenuItem>View client</DropdownMenuItem>
            <DropdownMenuItem>Edit client</DropdownMenuItem>
            <DropdownMenuItem>Delete client</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
