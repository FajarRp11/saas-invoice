"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteProduct } from "@/app/actions/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Spinner } from "./ui/spinner";
import type { Product } from "@/app/(app)/products/data-table/columns";

interface DeleteProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteProductDialog({
  product,
  open,
  onOpenChange,
}: DeleteProductDialogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProduct(product.id);
      if (result?.success) {
        toast.success(result.message);
        router.refresh();
        onOpenChange(false);
      } else {
        toast.error(result?.message || "Failed to delete product");
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Product</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{product.name}</strong>? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
