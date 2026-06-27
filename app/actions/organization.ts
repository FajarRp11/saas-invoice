"use server";

import { prisma } from "@/lib/prisma";
import { OrganizationSchema } from "@/lib/validations/organization";
import { auth } from "@/auth";
import z from "zod";

export const createOrganization = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    // Fetch authenticated session
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: "Unauthorized. Please log in." };
    }

    // Retrieve full user record to obtain the database user id
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, message: "User not found in the database." };
    }

    // Convert FormData to plain object for validation
    const rawData = Object.fromEntries(formData.entries());
    const validationResult = OrganizationSchema.safeParse(rawData);

    if (!validationResult.success) {
      return {
        success: false,
        error: z.flattenError(validationResult.error),
      };
    }

    const {
      name,
      email,
      phone,
      address,
      city,
      country,
      currency,
      taxPercent,
      invoicePrefix,
      nextInvoiceNum,
    } = validationResult.data;

    // Create the organization in database
    await prisma.organization.create({
      data: {
        userId: user.id,
        name,
        email: email || null,
        phone: phone || null,
        address: address || null,
        city: city || null,
        country: country || null,
        currency,
        taxPercent,
        invoicePrefix,
        nextInvoiceNum,
      },
    });

    return {
      success: true,
      message: "Organization created successfully!",
    };
  } catch (error: any) {
    console.error("Create organization error:", error);
    return {
      success: false,
      message: error?.message || "An unexpected error occurred on the server.",
    };
  }
};

export const updateOrganization = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: "Unauthorized. Please log in." };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, message: "User not found in the database." };
    }

    const org = await prisma.organization.findFirst({
      where: { userId: user.id },
    });

    if (!org) {
      return { success: false, message: "Organization not found." };
    }

    // Convert FormData to plain object for validation
    const rawData = Object.fromEntries(formData.entries());
    const validationResult = OrganizationSchema.safeParse(rawData);

    if (!validationResult.success) {
      return {
        success: false,
        error: z.flattenError(validationResult.error),
      };
    }

    const {
      name,
      email,
      phone,
      address,
      city,
      country,
      currency,
      taxPercent,
      invoicePrefix,
      nextInvoiceNum,
    } = validationResult.data;

    // Update the organization in database
    await prisma.organization.update({
      where: {
        id: org.id,
      },
      data: {
        name,
        email: email || null,
        phone: phone || null,
        address: address || null,
        city: city || null,
        country: country || null,
        currency,
        taxPercent,
        invoicePrefix,
        nextInvoiceNum,
      },
    });

    return {
      success: true,
      message: "Organization updated successfully!",
    };
  } catch (error: any) {
    console.error("Update organization error:", error);
    return {
      success: false,
      message: error?.message || "An unexpected error occurred on the server.",
    };
  }
};

