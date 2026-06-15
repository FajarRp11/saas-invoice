"use server";

import { auth } from "@/auth";
import { InvoicePDF } from "@/components/invoice-pdf";
import { prisma } from "@/lib/prisma";
import { uploadToR2 } from "@/lib/r2";
import { InvoiceSchema, EditInvoiceSchema } from "@/lib/validations/invoice";
import { renderToBuffer } from "@react-pdf/renderer";
import { redirect } from "next/navigation";
import { createElement } from "react";
import z from "zod";

export async function getInvoices() {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const invoices = await prisma.invoice.findMany({
    where: {
      organizationId: session.user.organizationId,
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return invoices;
}

export async function createInvoice(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  let parsedItems: unknown[] = [];
  try {
    parsedItems = JSON.parse(formData.get("items") as string);
  } catch {
    return { error: { formErrors: ["Invalid items data"], fieldErrors: {} } };
  }

  const validationsFields = InvoiceSchema.safeParse({
    clientId: formData.get("clientId"),
    issueDate: formData.get("issueDate"),
    dueDate: formData.get("dueDate"),
    notes: formData.get("notes"),
    termsCondition: formData.get("termsCondition"),
    taxPercent: Number(formData.get("taxPercent")),
    discount: Number(formData.get("discount")),
    items: parsedItems,
  });

  if (!validationsFields.success) {
    return {
      error: z.flattenError(validationsFields.error),
    };
  }

  const {
    clientId,
    issueDate,
    dueDate,
    notes,
    termsCondition,
    taxPercent,
    discount,
    items,
  } = validationsFields.data;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = (subtotal * taxPercent) / 100;
  const total = subtotal + taxAmount - discount;

  try {
    // Get organization for invoice number generation
    const org = await prisma.organization.findUnique({
      where: { id: session.user.organizationId },
      select: { invoicePrefix: true, nextInvoiceNum: true },
    });

    if (!org) {
      return { success: false, message: "Organization not found" };
    }

    // Generate invoice number: e.g. INV-2024-001
    const year = new Date(issueDate).getFullYear();
    const num = String(org.nextInvoiceNum).padStart(3, "0");
    const invoiceNumber = `${org.invoicePrefix}-${year}-${num}`;

    // Create invoice with items in a transaction
    await prisma.$transaction([
      prisma.invoice.create({
        data: {
          organizationId: session.user.organizationId,
          clientId,
          invoiceNumber,
          issueDate: new Date(issueDate),
          dueDate: new Date(dueDate),
          notes: notes || null,
          termsCondition: termsCondition || null,
          subtotal,
          taxPercent,
          taxAmount,
          discount,
          total,
          items: {
            create: items.map((item) => ({
              productId: item.productId || null,
              name: item.name,
              description: item.description || null,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              total: item.total,
            })),
          },
        },
      }),
      // Increment the organization's next invoice number
      prisma.organization.update({
        where: { id: session.user.organizationId },
        data: { nextInvoiceNum: { increment: 1 } },
      }),
    ]);
  } catch (error) {
    console.error("Error creating invoice:", error);
    return { success: false, message: "Failed to create invoice" };
  }

  return { success: true, message: "Invoice created successfully" };
}

export async function deleteInvoice(id: string) {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  try {
    await prisma.invoice.delete({
      where: { id },
    });
  } catch (error) {
    return { success: false, message: "Invoice deleted failed" };
  }

  return { success: true, message: "Invoice deleted successfully" };
}

export async function getInvoiceById(id: string) {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const invoice = await prisma.invoice.findFirst({
    where: {
      id,
      organizationId: session.user.organizationId,
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: true,
    },
  });

  console.log(invoice);

  return invoice;
}

export async function updateInvoice(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const id = formData.get("id") as string;
  if (!id) {
    return { success: false, message: "Invoice ID is required" };
  }

  let parsedItems: unknown[] = [];
  try {
    parsedItems = JSON.parse(formData.get("items") as string);
  } catch {
    return { error: { formErrors: ["Invalid items data"], fieldErrors: {} } };
  }

  const validationsFields = EditInvoiceSchema.safeParse({
    clientId: formData.get("clientId"),
    status: formData.get("status"),
    issueDate: formData.get("issueDate"),
    dueDate: formData.get("dueDate"),
    notes: formData.get("notes"),
    termsCondition: formData.get("termsCondition"),
    taxPercent: Number(formData.get("taxPercent")),
    discount: Number(formData.get("discount")),
    items: parsedItems,
  });

  if (!validationsFields.success) {
    return {
      error: z.flattenError(validationsFields.error),
    };
  }

  const {
    clientId,
    status,
    issueDate,
    dueDate,
    notes,
    termsCondition,
    taxPercent,
    discount,
    items,
  } = validationsFields.data;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = (subtotal * taxPercent) / 100;
  const total = subtotal + taxAmount - discount;

  try {
    // Verify invoice belongs to organization
    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        id,
        organizationId: session.user.organizationId,
      },
    });

    if (!existingInvoice) {
      return { success: false, message: "Invoice not found or unauthorized" };
    }

    // Update in transaction: delete old items and write new ones
    await prisma.$transaction([
      prisma.invoiceItem.deleteMany({
        where: { invoiceId: id },
      }),
      prisma.invoice.update({
        where: { id },
        data: {
          clientId,
          status,
          issueDate: new Date(issueDate),
          dueDate: new Date(dueDate),
          notes: notes || null,
          termsCondition: termsCondition || null,
          subtotal,
          taxPercent,
          taxAmount,
          discount,
          total,
          items: {
            create: items.map((item) => ({
              productId: item.productId || null,
              name: item.name,
              description: item.description || null,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              total: item.total,
            })),
          },
        },
      }),
    ]);
  } catch (error) {
    console.error("Error updating invoice:", error);
    return { success: false, message: "Failed to update invoice" };
  }

  return { success: true, message: "Invoice updated successfully" };
}

export async function generateInvocePDF(invoiceId: string) {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      organization: true,
      items: true,
    },
  });

  if (!invoice) {
    throw new Error("Invoice not found");
  }

  const pdfElement = createElement(InvoicePDF, { invoice }) as any;

  const buffer = await renderToBuffer(pdfElement);

  const key = `invoices/${invoice?.organizationId}/${invoice?.invoiceNumber}.pdf`;
  const pdfUrl = await uploadToR2(buffer, key, "application/pdf");

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { pdfUrl },
  });

  return { pdfUrl };
}
