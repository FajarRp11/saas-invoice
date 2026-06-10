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
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useActionState, useEffect, useState } from "react";
import { createProduct } from "@/app/actions/product";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

export default function CreateProductDialog() {
  const [state, formAction, isPending] = useActionState(createProduct, null);
  const fieldErrors =
    typeof state?.error === "object" ? state.error.fieldErrors : null;

  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message || "Product created successfully!");
        router.refresh();
        setIsDialogOpen(false);
      } else if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form action={formAction}>
          <DialogHeader className="mb-4">
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>
              Add a new product or service to your catalog.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mb-2">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Web Development" />
              <FieldError>{fieldErrors?.name}</FieldError>
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your product or service..."
              />
              <FieldError>{fieldErrors?.description}</FieldError>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="0"
                />
                <FieldError>{fieldErrors?.price}</FieldError>
              </Field>
              <Field>
                <Label htmlFor="unit">Unit</Label>
                <Input id="unit" name="unit" placeholder="pcs" defaultValue="pcs" />
                <FieldError>{fieldErrors?.unit}</FieldError>
              </Field>
            </div>
            <Field>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isActive"
                  name="isActive"
                  defaultChecked
                />
                <Label htmlFor="isActive">Active</Label>
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
