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
import { useActionState, useEffect, useState } from "react";
import { createClient } from "@/app/actions/client";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

export default function CreateClientDialog() {
  const [state, formAction, isPending] = useActionState(createClient, null);
  const fieldErrors =
    typeof state?.error === "object" ? state.error.fieldErrors : null;

  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message || "Client created successfully!");
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
          Add Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form action={formAction}>
          <DialogHeader className="mb-4">
            <DialogTitle>Add Client</DialogTitle>
            <DialogDescription>
              Add a new client to your account.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mb-2">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="John Doe" />
              <FieldError>{fieldErrors?.name}</FieldError>
            </Field>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Field>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="client@mail.com"
                />
                <FieldError>{fieldErrors?.email}</FieldError>
              </Field>
              <Field>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="08123456789"
                />
                <FieldError>{fieldErrors?.phone}</FieldError>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" placeholder="Jakarta" />
                <FieldError>{fieldErrors?.city}</FieldError>
              </Field>
              <Field>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" placeholder="Indonesia" />
                <FieldError>{fieldErrors?.country}</FieldError>
              </Field>
            </div>
            <Field>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Jl. Example No. 123"
              />
              <FieldError>{fieldErrors?.address}</FieldError>
            </Field>
            <Field>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" placeholder="Notes" />
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
