import { z } from "zod";

export const reviewSchema = z.object({
    name: z.string(),
    email: z
        .string()
        .email("Please enter a valid email address")
        .max(254, "Email must be less than 254 characters")
        .toLowerCase()
        .trim()
        .optional(),
    title: z.string().min(1, { message: "Title is required." }),
    description: z.string().min(1, { message: "Description is required." }),
    rating: z.number().min(1, { message: "Rating is required." }).max(5),
    product: z.string(),
    tenant: z.string()
})