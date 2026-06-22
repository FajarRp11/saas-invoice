"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProductSchema } from "@/lib/validations/product";
import { redirect } from "next/navigation";
import z from "zod";

export async function getProducts() {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const products = await prisma.product.findMany({
    where: {
      organizationId: session.user.organizationId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      organization: {
        select: {
          currency: true,
        },
      },
    },
  });

  return products;
}

export async function createProduct(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const validationsFields = ProductSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationsFields.success) {
    return { error: z.flattenError(validationsFields.error) };
  }

  const { name, description, price, unit } = validationsFields.data;
  const isActive = formData.get("isActive") === "on";

  try {
    await prisma.product.create({
      data: {
        organizationId: session.user.organizationId,
        name,
        description: description || null,
        price,
        unit,
        isActive,
      },
    });
  } catch (error) {
    return { success: false, message: "Product created failed" };
  }

  return { success: true, message: "Product created successfully" };
}

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const validationsFields = ProductSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationsFields.success) {
    return { error: z.flattenError(validationsFields.error) };
  }

  const { name, description, price, unit } = validationsFields.data;
  const isActive = formData.get("isActive") === "on";

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        description: description || null,
        price,
        unit,
        isActive,
      },
    });
  } catch (error) {
    return { success: false, message: "Product updated failed" };
  }

  return { success: true, message: "Product updated successfully" };
}

export async function deleteProduct(id: string) {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  try {
    await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    return { success: false, message: "Product deleted failed" };
  }

  return { success: true, message: "Product deleted successfully" };
}
