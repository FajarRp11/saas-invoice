"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { recordPayment } from "@/app/actions/invoice";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { CircleDollarSign } from "lucide-react";
import type { PaymentMethod } from "@/app/generated/prisma/enums";

const paymentMethods: { value: PaymentMethod; label: string }[] = [
  { value: "BANK_TRANSFER", label: "Bank Transfer" },
  { value: "CASH", label: "Cash" },
  { value: "CREDIT_CARD", label: "Credit Card" },
  { value: "MIDTRANS", label: "Midtrans" },
  { value: "OTHER", label: "Other" },
];

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

const RecordPaymentDialog = ({
  invoiceId,
  invoiceTotal,
}: {
  invoiceId: string;
  invoiceTotal: number;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>("BANK_TRANSFER");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const amount = Number(formData.get("amount"));
    const paidAt = new Date(formData.get("paidAt") as string);
    const note = (formData.get("note") as string) || undefined;

    if (!amount || amount <= 0) {
      toast.error("Amount must be greater than 0");
      setLoading(false);
      return;
    }

    try {
      await recordPayment(invoiceId, {
        amount,
        method,
        paidAt,
        note,
      });
      toast.success("Payment recorded successfully!");
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error("Error recording payment:", error);
      toast.error("Failed to record payment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <CircleDollarSign className="h-4 w-4" />
          Record Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Record a payment received for this invoice.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mb-2">
            <Field>
              <Label htmlFor="payment-amount">Amount (IDR)</Label>
              <Input
                id="payment-amount"
                name="amount"
                type="number"
                min="0"
                step="any"
                placeholder="0"
                required
              />
              <p className="text-xs text-muted-foreground">
                Total yang harus dibayar:{" "}
                <span className="font-semibold text-foreground">
                  {formatCurrency(invoiceTotal)}
                </span>
              </p>

            </Field>
            <Field>
              <Label>Payment Method</Label>
              <Select
                value={method}
                onValueChange={(val) => setMethod(val as PaymentMethod)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="payment-date">Paid At</Label>
              <Input
                id="payment-date"
                name="paidAt"
                type="date"
                defaultValue={todayISO()}
                required
              />
            </Field>
            <Field>
              <Label htmlFor="payment-note">Note (optional)</Label>
              <Textarea
                id="payment-note"
                name="note"
                placeholder="e.g. Transfer via BCA"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Save Payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RecordPaymentDialog;
