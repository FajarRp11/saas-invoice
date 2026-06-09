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
import { useActionState, useEffect } from "react";
import { updateClient } from "@/app/actions/client";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import type { Client } from "@/app/(app)/clients/data-table/columns";

interface EditClientDialogProps {
  client: Client;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditClientDialog({
  client,
  open,
  onOpenChange,
}: EditClientDialogProps) {
  const updateClientWithId = updateClient.bind(null, client.id);
  const [state, formAction, isPending] = useActionState(
    updateClientWithId,
    null,
  );
  const fieldErrors =
    typeof state?.error === "object" ? state.error.fieldErrors : null;

  const router = useRouter();

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message || "Client updated successfully!");
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
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>
              Update the details for {client.name}.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mb-2">
            <Field>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                name="name"
                placeholder="John Doe"
                defaultValue={client.name}
              />
              <FieldError>{fieldErrors?.name}</FieldError>
            </Field>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Field>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  placeholder="client@mail.com"
                  defaultValue={client.email ?? ""}
                />
                <FieldError>{fieldErrors?.email}</FieldError>
              </Field>
              <Field>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  name="phone"
                  type="tel"
                  placeholder="08123456789"
                  defaultValue={client.phone ?? ""}
                />
                <FieldError>{fieldErrors?.phone}</FieldError>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="edit-city">City</Label>
                <Input
                  id="edit-city"
                  name="city"
                  placeholder="Jakarta"
                  defaultValue={client.city ?? ""}
                />
                <FieldError>{fieldErrors?.city}</FieldError>
              </Field>
              <Field>
                <Label htmlFor="edit-country">Country</Label>
                <Input
                  id="edit-country"
                  name="country"
                  placeholder="Indonesia"
                  defaultValue={client.country ?? ""}
                />
                <FieldError>{fieldErrors?.country}</FieldError>
              </Field>
            </div>
            <Field>
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                name="address"
                placeholder="Jl. Example No. 123"
                defaultValue={client.address ?? ""}
              />
              <FieldError>{fieldErrors?.address}</FieldError>
            </Field>
            <Field>
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                name="notes"
                placeholder="Notes"
                defaultValue={client.notes ?? ""}
              />
              <FieldError>{fieldErrors?.notes}</FieldError>
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
