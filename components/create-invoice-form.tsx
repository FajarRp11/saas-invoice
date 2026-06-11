"use client";

import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createInvoice } from "@/app/actions/invoice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
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
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { PlusIcon, Trash2Icon } from "lucide-react";
import type { InvoiceItemFormData } from "@/lib/validations/invoice";

type Client = {
  id: string;
  name: string;
  email: string | null;
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  unit: string;
};

interface CreateInvoiceFormProps {
  clients: Client[];
  products: Product[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function defaultDueDate() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

const emptyItem: InvoiceItemFormData = {
  productId: "",
  name: "",
  description: "",
  quantity: 1,
  unitPrice: 0,
  total: 0,
};

export default function CreateInvoiceForm({
  clients,
  products,
}: CreateInvoiceFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createInvoice, null);
  const fieldErrors =
    typeof state?.error === "object" ? state.error.fieldErrors : null;

  // Form state for complex fields not handled by native inputs
  const [clientId, setClientId] = useState("");
  const [items, setItems] = useState<InvoiceItemFormData[]>([
    { ...emptyItem },
  ]);

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message || "Invoice created successfully!");
        router.push("/invoices");
        router.refresh();
      } else if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state]);

  // Item management
  function addItem() {
    setItems([...items, { ...emptyItem }]);
  }

  function removeItem(index: number) {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  }

  function updateItem(
    index: number,
    field: keyof InvoiceItemFormData,
    value: string | number,
  ) {
    const updated = [...items];
    (updated[index] as Record<string, string | number>)[field] = value;

    // Recalculate total
    if (field === "quantity" || field === "unitPrice") {
      updated[index].total =
        Number(updated[index].quantity) * Number(updated[index].unitPrice);
    }

    setItems(updated);
  }

  function selectProduct(index: number, productId: string) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const updated = [...items];
    updated[index] = {
      productId: product.id,
      name: product.name,
      description: product.description ?? "",
      quantity: updated[index].quantity || 1,
      unitPrice: product.price,
      total: (updated[index].quantity || 1) * product.price,
    };
    setItems(updated);
  }

  return (
    <form action={formAction}>
      {/* Hidden inputs for state-managed values */}
      <input type="hidden" name="clientId" value={clientId} />
      <input
        type="hidden"
        name="items"
        value={JSON.stringify(
          items.map((item) => ({
            ...item,
            quantity: Number(item.quantity),
            unitPrice: Number(item.unitPrice),
            total: Number(item.quantity) * Number(item.unitPrice),
          })),
        )}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Main form */}
        <div className="grid gap-6">
          {/* Client & Dates */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
              <CardDescription>
                Select a client and set invoice dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <Label>Client</Label>
                  <Select value={clientId} onValueChange={setClientId}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                          {client.email && ` (${client.email})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldErrors?.clientId && (
                    <FieldError>{fieldErrors.clientId}</FieldError>
                  )}
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <Label>Issue Date</Label>
                    <Input
                      type="date"
                      name="issueDate"
                      defaultValue={todayISO()}
                    />
                    {fieldErrors?.issueDate && (
                      <FieldError>{fieldErrors.issueDate}</FieldError>
                    )}
                  </Field>
                  <Field>
                    <Label>Due Date</Label>
                    <Input
                      type="date"
                      name="dueDate"
                      defaultValue={defaultDueDate()}
                    />
                    {fieldErrors?.dueDate && (
                      <FieldError>{fieldErrors.dueDate}</FieldError>
                    )}
                  </Field>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
              <CardDescription>
                Add products or services to the invoice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {items.map((item, index) => (
                  <div key={index}>
                    {index > 0 && <Separator className="mb-4" />}
                    <div className="grid gap-3">
                      <div className="flex items-end gap-2">
                        <Field className="flex-1">
                          <Label>Product</Label>
                          <Select
                            value={item.productId || ""}
                            onValueChange={(val) => selectProduct(index, val)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a product (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                              {products.map((product) => (
                                <SelectItem
                                  key={product.id}
                                  value={product.id}
                                >
                                  {product.name} —{" "}
                                  {formatCurrency(product.price)}/
                                  {product.unit}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                        {items.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-destructive h-8"
                            onClick={() => removeItem(index)}
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Field>
                          <Label>Item Name</Label>
                          <Input
                            value={item.name}
                            onChange={(e) =>
                              updateItem(index, "name", e.target.value)
                            }
                            placeholder="Item name"
                          />
                        </Field>
                        <Field>
                          <Label>Description</Label>
                          <Input
                            value={item.description ?? ""}
                            onChange={(e) =>
                              updateItem(index, "description", e.target.value)
                            }
                            placeholder="Optional description"
                          />
                        </Field>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <Field>
                          <Label>Quantity</Label>
                          <Input
                            type="number"
                            min="1"
                            step="any"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(
                                index,
                                "quantity",
                                Number(e.target.value),
                              )
                            }
                          />
                        </Field>
                        <Field>
                          <Label>Unit Price</Label>
                          <Input
                            type="number"
                            min="0"
                            step="any"
                            value={item.unitPrice}
                            onChange={(e) =>
                              updateItem(
                                index,
                                "unitPrice",
                                Number(e.target.value),
                              )
                            }
                          />
                        </Field>
                        <Field>
                          <Label>Total</Label>
                          <Input
                            type="text"
                            value={formatCurrency(item.total)}
                            disabled
                            className="bg-muted"
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                ))}

                {fieldErrors?.items && (
                  <FieldError>{fieldErrors.items}</FieldError>
                )}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={addItem}
                >
                  <PlusIcon className="h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Info</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <Label>Notes</Label>
                  <Textarea
                    name="notes"
                    placeholder="Additional notes for the client..."
                  />
                </Field>
                <Field>
                  <Label>Terms & Conditions</Label>
                  <Textarea
                    name="termsCondition"
                    placeholder="Payment terms, late fees, etc..."
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar summary */}
        <div className="lg:sticky lg:top-20 h-fit">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground shrink-0">
                    Tax (%)
                  </span>
                  <Input
                    type="number"
                    name="taxPercent"
                    min="0"
                    step="any"
                    defaultValue={11}
                    className="h-7 text-sm text-right"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground shrink-0">
                    Discount
                  </span>
                  <Input
                    type="number"
                    name="discount"
                    min="0"
                    step="any"
                    defaultValue={0}
                    className="h-7 text-sm text-right"
                  />
                </div>

                <Separator />

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Create Invoice"}
          </Button>
        </div>
      </div>
    </form>
  );
}
