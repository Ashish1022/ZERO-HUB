import { z } from "zod";

export const contactFormSchema = z.object({
    name: z.string(),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address")
        .max(254, "Email must be less than 254 characters")
        .toLowerCase()
        .trim(),
    company: z.string(),
    subject: z.string(),
    message: z.string()
})