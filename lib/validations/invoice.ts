import z, { object, string, number, literal, array } from "zod";

export const InvoiceItemSchema = object({
  productId: string().optional().or(literal("")),
  name: string().min(1, "Item name is required"),
  description: string().optional().or(literal("")),
  quantity: number().min(1, "Quantity must be at least 1"),
  unitPrice: number().min(0, "Unit price must be positive"),
  total: number(),
});

export const InvoiceSchema = object({
  clientId: string().min(1, "Client is required"),
  issueDate: string().min(1, "Issue date is required"),
  dueDate: string().min(1, "Due date is required"),
  notes: string().optional().or(literal("")),
  termsCondition: string().optional().or(literal("")),
  taxPercent: number().min(0, "Tax percent must be positive"),
  discount: number().min(0, "Discount must be positive"),
  items: array(InvoiceItemSchema).min(1, "At least one item is required"),
});

export type InvoiceFormData = z.infer<typeof InvoiceSchema>;
export type InvoiceItemFormData = z.infer<typeof InvoiceItemSchema>;
