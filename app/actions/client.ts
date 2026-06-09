"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ClientSchema } from "@/lib/validations/client";
import { redirect } from "next/navigation";
import z, { email, success } from "zod";

export async function getClients() {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const clients = await prisma.client.findMany({
    where: {
      organizationId: session.user.organizationId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return clients;
}

export async function createClient(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const validationsFields = ClientSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationsFields.success) {
    return {
      error: z.flattenError(validationsFields.error),
    };
  }

  const { name, email, phone, address, city, country, notes } =
    validationsFields.data;

  try {
    await prisma.client.create({
      data: {
        organizationId: session.user.organizationId,
        name,
        email,
        phone,
        address,
        city,
        country,
        notes,
      },
    });
  } catch (error) {
    return { success: false, message: "Client created failed" };
  }

  return { success: true, message: "Client created successfully" };
}

export async function updateClient(
  id: string,
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const validationsFields = ClientSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationsFields.success) {
    return {
      error: z.flattenError(validationsFields.error),
    };
  }

  const { name, email, phone, address, city, country, notes } =
    validationsFields.data;

  try {
    await prisma.client.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
        address,
        city,
        country,
        notes,
      },
    });
  } catch (error) {
    return { success: false, message: "Client updated failed" };
  }

  return { success: true, message: "Client updated successfully" };
}

export async function getClientById(id: string) {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const client = await prisma.client.findUnique({
    where: {
      id,
    },
  });

  return client;
}

export async function deleteClient(id: string) {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  try {
    await prisma.client.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return { success: false, message: "Client deleted failed" };
  }

  return { success: true, message: "Client deleted successfully" };
}
