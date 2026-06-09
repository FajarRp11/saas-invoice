import { object, string, number, coerce, email } from "zod";

export const OrganizationSchema = object({
  name: string().min(1, "Organization name is required"),
  email: email("Email is not valid").optional().or(string().length(0)),
  phone: string().optional(),
  address: string().optional(),
  city: string().optional(),
  country: string().optional(),
  currency: string().min(1, "Currency is required").default("IDR"),
  taxPercent: coerce
    .number({ message: "Tax must be a number" })
    .min(0, "Tax cannot be less than 0%")
    .max(100, "Tax cannot exceed 100%")
    .default(11),
  invoicePrefix: string().min(1, "Invoice prefix is required").default("INV"),
  nextInvoiceNum: coerce
    .number({ message: "Next invoice number must be a number" })
    .int("Next invoice number must be an integer")
    .min(1, "Next invoice number must be at least 1")
    .default(1),
});
