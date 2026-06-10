import { coerce, literal, object, string } from "zod";

export const ProductSchema = object({
  name: string().min(3, "Name must be at least 3 characters long"),
  description: string().optional().or(literal("")),
  price: string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a valid positive number",
    })
    .transform((val) => Number(val)),
  unit: string().min(1, "Unit is required"),
  isActive: coerce.boolean().optional().default(false),
});
