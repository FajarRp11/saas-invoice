import { email, object, string } from "zod";

export const ClientSchema = object({
  name: string().min(1, "Client name is required"),
  email: email("Email is not valid").optional().or(string().length(0)),
  phone: string().optional(),
  address: string().optional(),
  city: string().optional(),
  country: string().optional(),
});
