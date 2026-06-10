"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useActionState, useEffect } from "react";
import { updateProduct } from "@/app/actions/product";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import type { Product } from "@/app/(app)/products/data-table/columns";

interface EditProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProductDialog({
  product,
  open,
  onOpenChange,
}: EditProductDialogProps) {
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [state, formAction, isPending] = useActionState(
    updateProductWithId,
    null,
  );
  const fieldErrors =
    typeof state?.error === "object" ? state.error.fieldErrors : null;

  const router = useRouter();

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message || "Product updated successfully!");
        router.refresh();
        onOpenChange(false);
      } else if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form action={formAction}>
          <DialogHeader className="mb-4">
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details for {product.name}.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mb-2">
            <Field>
              <Label htmlFor="edit-product-name">Name</Label>
              <Input
                id="edit-product-name"
                name="name"
                placeholder="Web Development"
                defaultValue={product.name}
              />
              <FieldError>{fieldErrors?.name}</FieldError>
            </Field>
            <Field>
              <Label htmlFor="edit-product-description">Description</Label>
              <Textarea
                id="edit-product-description"
                name="description"
                placeholder="Describe your product or service..."
                defaultValue={product.description ?? ""}
              />
              <FieldError>{fieldErrors?.description}</FieldError>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="edit-product-price">Price</Label>
                <Input
                  id="edit-product-price"
                  name="price"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="0"
                  defaultValue={product.price}
                />
                <FieldError>{fieldErrors?.price}</FieldError>
              </Field>
              <Field>
                <Label htmlFor="edit-product-unit">Unit</Label>
                <Input
                  id="edit-product-unit"
                  name="unit"
                  placeholder="pcs"
                  defaultValue={product.unit}
                />
                <FieldError>{fieldErrors?.unit}</FieldError>
              </Field>
            </div>
            <Field>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="edit-product-isActive"
                  name="isActive"
                  defaultChecked={product.isActive}
                />
                <Label htmlFor="edit-product-isActive">Active</Label>
              </div>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner /> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
