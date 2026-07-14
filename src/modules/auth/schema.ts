import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address")
        .max(254, "Email must be less than 254 characters")
        .toLowerCase()
        .trim(),
    password: z.string(),
});

export const registerSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address")
        .max(254, "Email must be less than 254 characters")
        .toLowerCase()
        .trim(),
    phone: z.string(),
    password: z.string(),
    username: z
        .string()
        .min(3, "Username must be atleast 3 characters.")
        .max(63, "Username must be less than 63 characters.")
        .regex(
            /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
            "Username can only contains lowercase letters, numbers and hyphens! It must start and end with a letter or number."
        )
        .refine(
            (val) => !val.includes("--"),
            "Username cannot contain consecutive hyphens"
        )
        .transform((val) => val.toLowerCase()),
    store: z.string()
})

export const otpSchema = z.object({
    otp: z.string()
});

export const verifySchema = registerSchema.merge(otpSchema)