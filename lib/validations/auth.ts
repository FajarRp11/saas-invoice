import { object, string, email } from "zod";

export const RegisterSchmea = object({
  name: string().min(1, "Name must be at least 1 character"),
  email: email("Email is not valid"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password did not match",
  path: ["confirmPassword"],
});


export const LoginSchmea = object({
  email: email("Email is not valid"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
})