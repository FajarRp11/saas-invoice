"use server";

import { prisma } from "@/lib/prisma";
import { ChangePasswordSchema } from "@/lib/validations/auth";
import { auth } from "@/auth";
import { compareSync, hashSync } from "bcrypt-ts";
import z from "zod";

export const updatePassword = async (
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

    // Convert FormData to plain object for validation
    const rawData = Object.fromEntries(formData.entries());
    const validationResult = ChangePasswordSchema.safeParse(rawData);

    if (!validationResult.success) {
      return {
        success: false,
        error: z.flattenError(validationResult.error),
      };
    }

    const { currentPassword, password } = validationResult.data;

    // Check password if user has one set in DB
    if (user.password) {
      if (!currentPassword) {
        return {
          success: false,
          error: {
            fieldErrors: {
              currentPassword: ["Current password is required"],
            },
            formErrors: [],
          },
        };
      }

      const match = compareSync(currentPassword, user.password);
      if (!match) {
        return {
          success: false,
          error: {
            fieldErrors: {
              currentPassword: ["Current password is incorrect"],
            },
            formErrors: [],
          },
        };
      }
    }

    // Hash and update the password
    const hashedPassword = hashSync(password, 12);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Password updated successfully!",
    };
  } catch (error: any) {
    console.error("Update password error:", error);
    return {
      success: false,
      message: error?.message || "An unexpected error occurred on the server.",
    };
  }
};
