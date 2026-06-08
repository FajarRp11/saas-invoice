"use server";
import { prisma } from "@/lib/prisma";
import { LoginSchmea, RegisterSchmea } from "@/lib/validations/auth";
import { hashSync } from 'bcrypt-ts'
import { error } from "console";
import { redirect } from "next/navigation";
import z from "zod";
import { Prisma } from "../generated/prisma/client";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const signUpCredentials = async (prevState: unknown, formData: FormData) => {
  const validationsFields = RegisterSchmea.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationsFields.success) {
    return {
      error: z.flattenError(validationsFields.error),
    };
  }

  const { name, email, password } = validationsFields.data;
  const hashedPassword = hashSync(password, 12);

  try {
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword
      }
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2002") {
        return { message: "Email already registered" }
      }
    }
    return { message: "Failed to register" }
  }

  redirect("/login")
};


export const signInCredentials = async (prevSate: unknown, formData: FormData) => {
  const validationsFields = LoginSchmea.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationsFields.success) {
    return {
      error: z.flattenError(validationsFields.error),
    };
  }

  const { email, password } = validationsFields.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials." }
          break;
        default:
          return { message: "Something went wrong" }
          break;
      }
    }

    throw error;
  }
}

export const signOutAction = async () => {
  await signOut({ redirectTo: "/login" })
}

export const signInWithGoogle = async () => {
  await signIn("google", { redirectTo: "/dashboard" })
}