import { z } from "zod";

export const subscribeSchema = z.object({
    plan: z.string(),
});

export const bankFormSchema = z
    .object({
        legalBusinessName: z
            .string()
            .min(3, { message: "Business name must be at least 3 characters" })
            .max(100, { message: "Business name must not exceed 100 characters" }),
        businessSubcategory: z.string().min(1, { message: "Please select a business subcategory" }),

        contactName: z
            .string()
            .min(3, { message: "Contact name must be at least 3 characters" })
            .max(50, { message: "Contact name must not exceed 50 characters" }),
        email: z.string().email({ message: "Please enter a valid email address" }),
        phone: z
            .string(),

        streetAddress: z
            .string()
            .min(5, { message: "Street address must be at least 5 characters" })
            .max(100, { message: "Street address must not exceed 100 characters" }),
        addressLine2: z.string().max(100, { message: "Address line 2 must not exceed 100 characters" }),
        city: z
            .string()
            .min(2, { message: "City must be at least 2 characters" })
            .max(50, { message: "City must not exceed 50 characters" }),
        state: z
            .string()
            .min(2, { message: "State must be at least 2 characters" })
            .max(50, { message: "State must not exceed 50 characters" }),
        postalCode: z.string().regex(/^\d{6}$/, { message: "Please enter a valid 6-digit postal code" }),
        country: z.string().min(2, { message: "Please select a country" }),

        accountHolderName: z
            .string()
            .min(3, { message: "Name must be at least 3 characters" })
            .max(50, { message: "Name must not exceed 50 characters" }),
        accountNumber: z
            .string()
            .min(8, { message: "Account number must be at least 8 digits" })
            .max(20, { message: "Account number must not exceed 20 digits" })
            .regex(/^\d+$/, { message: "Account number must contain only digits" }),
        confirmAccountNumber: z.string().min(8, { message: "Account number must be at least 8 digits" }),
        ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
            message: "Invalid IFSC code format (e.g., HDFC0001234)",
        }),
        bankName: z.string().min(2, { message: "Bank name is required" }),
        branchName: z.string().min(2, { message: "Branch name is required" }),
        panCardNumber: z
            .string()
            .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
                message: "Invalid PAN format. It should be in the format AAAAA0000A",
            }),

        termsAccepted: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions",
        }),
    })
    .refine((data) => data.accountNumber === data.confirmAccountNumber, {
        message: "Account numbers do not match",
        path: ["confirmAccountNumber"],
    })

export const getSubscription = z.object({
    subscriptionId: z.string()
})

export const getBankDetails = z.object({
    accountNumber: z.string()
})