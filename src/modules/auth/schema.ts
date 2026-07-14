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
    phone: z
        .string()
        .min(1, "Phone number is required")
        .refine(
            (val) => /^\+?[1-9]\d{7,14}$/.test(val),
            "Please enter a valid phone number"
        ),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(72, "Password must be less than 72 characters.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[0-9]/, "Password must contain at least one number."),
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
    store: z
        .string()
        .min(1, "Store name is required")
        .max(100, "Store name must be less than 100 characters.")
        .trim()
})

export const otpSchema = z.object({
    otp: z
        .string()
        .length(6, "Please enter the 6-digit code.")
        .regex(/^\d{6}$/, "The code must be 6 digits.")
});

export const verifySchema = registerSchema.merge(otpSchema)