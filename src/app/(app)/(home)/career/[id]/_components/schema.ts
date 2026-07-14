
import { z } from "zod";

const fileSizeLimit = 5 * 1024 * 1024; // 5MB

const PDF_SCHEMA = z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
        message: "Invalid PDF file type",
    })
    .refine((file) => file.size <= fileSizeLimit, {
        message: "File size should not exceed 5MB",
    })
    .refine((file) => file.size > 0, {
        message: "File cannot be empty",
    });

export const jobApplicationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name must be less than 100 characters")
        .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
        .refine(
            (val) => val.trim().includes(' '),
            "Please enter your full name (first and last name)"
        )
        .refine(
            (val) => val.trim().split(/\s+/).length >= 2,
            "Please enter at least first and last name"
        ),

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
        .regex(
            /^[\+]?[1-9][\d]{0,15}$|^[\+]?[(]?[\d\s\-\(\)]{10,20}$/,
            "Please enter a valid phone number"
        )
        .transform((val) => val.replace(/\s+/g, '').replace(/[()-]/g, ''))
        .refine((val) => val.length >= 10, "Phone number must be at least 10 digits"),

    resume: PDF_SCHEMA,

    coverLetter: z
        .string()
        .optional()
});