"use client"

import {
    AlertCircle,
    AlertTriangle,
    Building,
    CheckCircle,
    CreditCard,
    FileCheck,
    Globe,
    Home,
    Info,
    Loader,
    Loader2,
    MapPin,
    MapPinned,
    User,
    Eye,
    EyeOff,
    Shield,
    ArrowLeft,
    ArrowRight,
} from "lucide-react"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { bankFormSchema } from "../../schema"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { ConfirmationModal } from "./confirmation-modal"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useMutation } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { COUNTRIES_WITH_STATES, getStatesByCountry, hasStates } from "@/constants/countries"
import { validateIFSC } from "@/lib/razorpay"
import { businessSubcategories } from "@/constants/razorpay-business-categories"

const steps = [
    { id: "business", title: "Business Information", icon: Building },
    { id: "contact", title: "Contact Details", icon: User },
    { id: "bank", title: "Banking Information", icon: CreditCard },
] as const

export const BankForm = ({ email, phone }: { email: string; phone: string }) => {
    const router = useRouter()
    const [ifscStatus, setIfscStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle")
    const [currentStep, setCurrentStep] = useState<"business" | "contact" | "bank">("business")
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [formData, setFormData] = useState<z.infer<typeof bankFormSchema> | null>(null)
    const [showAccountNumber, setShowAccountNumber] = useState(false)

    const form = useForm<z.infer<typeof bankFormSchema>>({
        resolver: zodResolver(bankFormSchema),
        defaultValues: {
            legalBusinessName: "",
            businessSubcategory: "",
            contactName: "",
            email: email,
            phone: phone,
            streetAddress: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "in",
            accountHolderName: "",
            accountNumber: "",
            confirmAccountNumber: "",
            ifscCode: "",
            bankName: "",
            branchName: "",
            panCardNumber: "",
            termsAccepted: false,
        },
    })

    const selectedCountry = form.watch("country")

    const availableStates = useMemo(() => {
        return selectedCountry ? getStatesByCountry(selectedCountry) : []
    }, [selectedCountry])

    useEffect(() => {
        if (selectedCountry) {
            form.setValue("state", "")
        }
    }, [selectedCountry, form])

    const ifscCode = form.watch("ifscCode")
    useEffect(() => {
        if (ifscCode && ifscCode.length === 11) {
            setIfscStatus("checking")

            const validateCode = async () => {
                const result = await validateIFSC(ifscCode)

                if (result.isValid) {
                    form.setValue("bankName", result.bank)
                    form.setValue("branchName", result.branch)
                    setIfscStatus("valid")
                    form.clearErrors("ifscCode")
                    toast.success("IFSC code verified successfully!")
                } else {
                    form.setError("ifscCode", {
                        type: "manual",
                        message: "IFSC code not found. Please check and try again.",
                    })
                    setIfscStatus("invalid")
                    form.setValue("bankName", "")
                    form.setValue("branchName", "")
                    toast.error("Invalid IFSC code")
                }
            }

            const timeoutId = setTimeout(validateCode, 800)
            return () => clearTimeout(timeoutId)
        } else {
            setIfscStatus("idle")
            form.setValue("bankName", "")
            form.setValue("branchName", "")
        }
    }, [ifscCode, form])

    const trpc = useTRPC()

    const verifyMutation = useMutation(
        trpc.onboarding.verify.mutationOptions({
            onError: (error) => {
                toast.error(error.message)
            },
            onSuccess: async () => {
                toast.success("Bank verified! Redirecting to admin page.")
                router.push("/admin")
            },
        }),
    )

    const onSubmit = (data: z.infer<typeof bankFormSchema>) => {
        setFormData(data)
        setShowConfirmation(true)
    }

    const handleConfirm = (data: z.infer<typeof bankFormSchema>) => {
        verifyMutation.mutate(data)
    }

    const getCurrentStepIndex = () => {
        return steps.findIndex((step) => step.id === currentStep)
    }

    const handleNextStep = async () => {

        if (currentStep === "business") {
            const isValid = await form.trigger(["legalBusinessName", "businessSubcategory"])

            if (isValid) {
                setCurrentStep("contact")
            }
        } else if (currentStep === "contact") {
            const isValid = await form.trigger(["contactName", "streetAddress", "city", "state", "postalCode", "country"])

            if (isValid) {
                setCurrentStep("bank")
            }
        }
    }

    const handlePrevStep = () => {
        if (currentStep === "contact") {
            setCurrentStep("business")
        } else if (currentStep === "bank") {
            setCurrentStep("contact")
        }
    }

    return (
        <div className="min-h-screen px-2 sm:px-4 py-4 sm:py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full px-3 sm:px-4 py-2 mb-3 sm:mb-4">
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-zinc-400" />
                        <span className="text-xs sm:text-sm text-zinc-300">Secure Bank Verification</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-2">Complete Your Bank Setup</h1>
                    <p className="text-sm sm:text-base text-zinc-400">Secure your account with verified banking information</p>
                </div>

                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        {steps.map((step, index) => {
                            const isActive = step.id === currentStep
                            const isCompleted = getCurrentStepIndex() > index
                            const StepIcon = step.icon

                            return (
                                <div key={step.id} className="flex items-center">
                                    <div
                                        className={`
                    flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-colors
                    ${isActive
                                                ? "bg-zinc-600 border-zinc-500 text-white"
                                                : isCompleted
                                                    ? "bg-green-600 border-green-500 text-white"
                                                    : "bg-zinc-800 border-zinc-700 text-zinc-400"
                                            }
                  `}
                                    >
                                        <StepIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`
                      w-8 sm:w-12 h-0.5 mx-2 transition-colors
                      ${isCompleted ? "bg-green-500" : "bg-zinc-700"}
                    `}
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div className="text-center mt-3 sm:mt-4">
                        <p className="text-xs sm:text-sm text-zinc-400">
                            Step {getCurrentStepIndex() + 1} of {steps.length}: {steps.find((s) => s.id === currentStep)?.title}
                        </p>
                    </div>
                </div>

                <Card className="bg-zinc-800/50 border-zinc-700">
                    <CardContent className="p-3 sm:p-4 lg:p-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                                {currentStep === "business" && (
                                    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 sm:mb-6">
                                            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-zinc-700/50 border border-zinc-600/50 flex items-center justify-center flex-shrink-0">
                                                <Building className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-300" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg sm:text-xl font-semibold text-white">Business Information</h3>
                                                <p className="text-sm sm:text-base text-slate-400">Tell us about your business</p>
                                            </div>
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="legalBusinessName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                                                        <FormLabel className="flex items-center gap-2 text-slate-200 text-sm sm:text-base">
                                                            Legal Business Name <span className="text-red-400">*</span>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Info className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500 cursor-help" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent className="max-w-xs">
                                                                        <p>
                                                                            Enter the registered legal name of your business as it appears on official
                                                                            documents.
                                                                        </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </FormLabel>
                                                        <Badge variant="destructive" className="text-xs self-start sm:self-center">
                                                            Cannot be changed later
                                                        </Badge>
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your legal business name"
                                                            {...field}
                                                            className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 transition-colors text-sm sm:text-base"
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="flex items-start gap-2 text-slate-400 text-xs sm:text-sm">
                                                        <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                                                        Enter the name exactly as it appears on your registration documents
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="businessSubcategory"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2 text-slate-200 text-sm sm:text-base">
                                                        Business Category <span className="text-red-400">*</span>
                                                    </FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-zinc-100 focus:border-zinc-500 w-full text-sm sm:text-base">
                                                                <SelectValue placeholder="Select business category" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="border-slate-700">
                                                            {businessSubcategories.map((subcategory) => (
                                                                <SelectItem
                                                                    key={subcategory.value}
                                                                    value={subcategory.value}
                                                                    className="text-white hover:bg-slate-700"
                                                                >
                                                                    {subcategory.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormDescription className="flex items-start gap-2 text-slate-400 text-xs sm:text-sm">
                                                        <Info className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                                                        Select the most specific category for your business
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                {currentStep === "contact" && (
                                    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 sm:mb-6">
                                            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-zinc-700/50 border border-zinc-600/50 flex items-center justify-center flex-shrink-0">
                                                <User className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-300" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg sm:text-xl font-semibold text-white">Contact Information</h3>
                                                <p className="text-sm sm:text-base text-slate-400">Provide your contact details</p>
                                            </div>
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="contactName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2 text-slate-200 text-sm sm:text-base">
                                                        Contact Person Name <span className="text-red-400">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter the name of the primary contact person"
                                                            {...field}
                                                            className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 transition-colors text-sm sm:text-base"
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="flex items-start gap-2 text-slate-400 text-xs sm:text-sm">
                                                        <Info className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                                                        Name of the person responsible for this account
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="bg-slate-700/30 rounded-lg p-3 sm:p-4 border border-slate-600">
                                            <div className="flex items-center gap-3 mb-4">
                                                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                                                <h4 className="text-base sm:text-lg font-medium text-white">Business Address</h4>
                                            </div>

                                            <div className="grid gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="streetAddress"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-slate-200 text-sm sm:text-base">
                                                                Street Address <span className="text-red-400">*</span>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Home className="absolute left-3 top-3 h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />
                                                                    <Input
                                                                        placeholder="Street name, building number"
                                                                        {...field}
                                                                        className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 transition-colors pl-9 sm:pl-10 text-sm sm:text-base"
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="addressLine2"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-slate-200 text-sm sm:text-base">Address Line 2</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Apartment, suite, unit, etc. (optional)"
                                                                    {...field}
                                                                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 transition-colors text-sm sm:text-base"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="city"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-slate-200 text-sm sm:text-base">
                                                                    City <span className="text-red-400">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <MapPinned className="absolute left-3 top-3 h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />
                                                                        <Input
                                                                            placeholder="Enter city name"
                                                                            {...field}
                                                                            className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 transition-colors pl-9 sm:pl-10 text-sm sm:text-base"
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="postalCode"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-slate-200 text-sm sm:text-base">
                                                                    Postal Code <span className="text-red-400">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Enter postal/ZIP code"
                                                                        {...field}
                                                                        className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 transition-colors text-sm sm:text-base"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="country"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-slate-200 text-sm sm:text-base">
                                                                    Country <span className="text-red-400">*</span>
                                                                </FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <div className="relative">
                                                                            <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-zinc-100 pl-9 sm:pl-10 focus:border-zinc-500 w-full text-sm sm:text-base">
                                                                                <Globe className="absolute left-3 top-3 h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />
                                                                                <SelectValue placeholder="Select country" />
                                                                            </SelectTrigger>
                                                                        </div>
                                                                    </FormControl>
                                                                    <SelectContent className="border-slate-700">
                                                                        {COUNTRIES_WITH_STATES.map((country) => (
                                                                            <SelectItem
                                                                                key={country.code}
                                                                                value={country.code}
                                                                                className="text-white hover:bg-slate-700"
                                                                            >
                                                                                {country.name}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="state"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-slate-200 text-sm sm:text-base">
                                                                    State/Province <span className="text-red-400">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    {hasStates(selectedCountry) ? (
                                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                                            <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-zinc-100 focus:border-zinc-500 w-full text-sm sm:text-base">
                                                                                <SelectValue placeholder="Select state" />
                                                                            </SelectTrigger>
                                                                            <SelectContent className="border-slate-700">
                                                                                {availableStates.map((state) => (
                                                                                    <SelectItem
                                                                                        key={state.code}
                                                                                        value={state.name.toUpperCase()}
                                                                                        className="text-white hover:bg-slate-700"
                                                                                    >
                                                                                        {state.name}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    ) : (
                                                                        <Input
                                                                            placeholder="Enter state/province"
                                                                            {...field}
                                                                            className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 transition-colors text-sm sm:text-base"
                                                                        />
                                                                    )}
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === "bank" && (
                                    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 sm:mb-6">
                                            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-zinc-700/50 border border-zinc-600/50 flex items-center justify-center flex-shrink-0">
                                                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-300" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg sm:text-xl font-semibold text-white">Banking Information</h3>
                                                <p className="text-sm sm:text-base text-slate-400">Secure bank account details</p>
                                            </div>
                                        </div>

                                        <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                                            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                                                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-red-900/30 flex items-center justify-center flex-shrink-0">
                                                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-red-300 text-base sm:text-lg mb-2">
                                                        Critical: Verify All Information
                                                    </h4>
                                                    <p className="text-red-200/90 leading-relaxed text-sm sm:text-base">
                                                        Bank details <span className="font-bold underline">cannot be changed</span> after submission
                                                        without a formal verification process taking 7-10 business days. Please ensure 100%
                                                        accuracy.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid gap-4 sm:gap-6">
                                            <FormField
                                                control={form.control}
                                                name="accountHolderName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                                                            <FormLabel className="flex items-center gap-2 text-slate-200 text-sm sm:text-base">
                                                                Account Holder Name <span className="text-red-400">*</span>
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Info className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500 cursor-help" />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="max-w-xs">
                                                                            <p>Enter the name exactly as it appears on your bank account.</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </FormLabel>
                                                            <Badge variant="destructive" className="text-xs self-start sm:self-center">
                                                                Cannot be changed
                                                            </Badge>
                                                        </div>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Enter name as per bank records"
                                                                {...field}
                                                                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 focus:border-zinc-500 placeholder:text-zinc-500 text-sm sm:text-base"
                                                            />
                                                        </FormControl>
                                                        <FormDescription className="flex items-start gap-2 text-slate-400 text-xs sm:text-sm">
                                                            <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                                                            Must match exactly with bank records
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="accountNumber"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-2 text-slate-200 text-sm sm:text-base">
                                                                Account Number <span className="text-red-400">*</span>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Input
                                                                        type={showAccountNumber ? "text" : "password"}
                                                                        placeholder="Enter your account number"
                                                                        {...field}
                                                                        className="bg-zinc-800/50 border-zinc-700 text-zinc-100 pr-10 focus:border-zinc-500 placeholder:text-zinc-500 text-sm sm:text-base"
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                                        onClick={() => setShowAccountNumber(!showAccountNumber)}
                                                                    >
                                                                        {showAccountNumber ? (
                                                                            <EyeOff className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />
                                                                        ) : (
                                                                            <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="confirmAccountNumber"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-slate-200 text-sm sm:text-base">
                                                                Confirm Account Number <span className="text-red-400">*</span>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    placeholder="Re-enter account number"
                                                                    {...field}
                                                                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 focus:border-zinc-500 placeholder:text-zinc-500 text-sm sm:text-base"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="ifscCode"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-2 text-slate-200 text-sm sm:text-base">
                                                            IFSC Code <span className="text-red-400">*</span>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Info className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500 cursor-help" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent className="max-w-xs">
                                                                        <p>11-character code that identifies your bank branch</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Input
                                                                    placeholder="e.g., HDFC0001234"
                                                                    {...field}
                                                                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 pr-10 uppercase focus:border-zinc-500 placeholder:text-zinc-500 text-sm sm:text-base"
                                                                    maxLength={11}
                                                                />
                                                                <div className="absolute right-3 top-3">
                                                                    {ifscStatus === "checking" && (
                                                                        <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 animate-spin" />
                                                                    )}
                                                                    {ifscStatus === "valid" && (
                                                                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                                                                    )}
                                                                    {ifscStatus === "invalid" && (
                                                                        <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </FormControl>
                                                        <FormDescription className="flex items-start gap-2 text-slate-400 text-xs sm:text-sm">
                                                            <Info className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                                                            Bank details will be auto-populated upon verification
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {(form.watch("bankName") || form.watch("branchName")) && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 sm:p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                                                    <div>
                                                        <label className="text-xs sm:text-sm text-green-300 font-medium">Bank Name</label>
                                                        <p className="text-white font-medium text-sm sm:text-base break-words">
                                                            {form.watch("bankName")}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs sm:text-sm text-green-300 font-medium">Branch Name</label>
                                                        <p className="text-white font-medium text-sm sm:text-base break-words">
                                                            {form.watch("branchName")}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="bg-slate-700/30 rounded-lg p-3 sm:p-4 border border-slate-600">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <FileCheck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                                                    <h4 className="text-base sm:text-lg font-medium text-white">PAN Card Details</h4>
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="panCardNumber"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-slate-200 text-sm sm:text-base">
                                                                PAN Card Number <span className="text-red-400">*</span>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="e.g., ABCDE1234F"
                                                                    {...field}
                                                                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 uppercase focus:border-zinc-500 placeholder:text-zinc-500 text-sm sm:text-base"
                                                                    maxLength={10}
                                                                />
                                                            </FormControl>
                                                            <FormDescription className="flex items-start gap-2 text-slate-400 text-xs sm:text-sm">
                                                                <Info className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                                                                10-character identification number from Income Tax Department
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="termsAccepted"
                                                render={({ field }) => (
                                                    <FormItem className="bg-slate-700/30 border border-slate-600 rounded-lg p-4 sm:p-6">
                                                        <div className="flex items-start space-x-3">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                    className="rounded border-slate-500 text-blue-600 focus:ring-blue-600 bg-slate-700 mt-1 h-4 w-4 sm:h-5 sm:w-5"
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-2 flex-1 min-w-0">
                                                                <FormLabel className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed">
                                                                    I confirm that all information provided is accurate and complete
                                                                </FormLabel>
                                                                <FormDescription className="text-xs text-slate-400 leading-relaxed">
                                                                    By checking this box, I acknowledge that I am the legal owner or authorized signatory
                                                                    of this account and understand this information cannot be changed without additional
                                                                    verification.
                                                                </FormDescription>
                                                            </div>
                                                        </div>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-6 sm:pt-8 border-t border-slate-700">
                                    <Button
                                        type="button"
                                        onClick={handlePrevStep}
                                        variant="outline"
                                        className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border-zinc-600 w-full sm:w-auto order-2 sm:order-1"
                                        disabled={currentStep === "business"}
                                    >
                                        <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                        Previous
                                    </Button>

                                    {currentStep !== "bank" ? (
                                        <Button
                                            type="button"
                                            onClick={handleNextStep}
                                            className="bg-zinc-600 hover:bg-zinc-500 text-zinc-100 w-full sm:w-auto order-1 sm:order-2"
                                        >
                                            Continue
                                            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            className="bg-zinc-600 hover:bg-zinc-500 text-zinc-100 w-full sm:w-auto order-1 sm:order-2"
                                            disabled={verifyMutation.isPending}
                                        >
                                            {verifyMutation.isPending ? (
                                                <>
                                                    <Loader className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <Shield className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                                    Submit & Verify
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>

            {showConfirmation && formData && (
                <ConfirmationModal
                    data={formData}
                    isOpen={showConfirmation}
                    isLoading={verifyMutation.isPending}
                    onClose={() => setShowConfirmation(false)}
                    onConfirm={handleConfirm}
                />
            )}
        </div>
    )
}
