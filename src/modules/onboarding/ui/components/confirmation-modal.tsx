"use client"
import type { z } from "zod"
import type { bankFormSchema } from "../../schema"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Loader2,
    AlertTriangle,
    CheckCircle,
    Building,
    User,
    CreditCard,
    Shield,
    Eye,
    EyeOff,
    Copy,
    Check,
} from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { businessSubcategories } from "@/constants/razorpay-business-categories"

type ConfirmationModalProps = {
    data: z.infer<typeof bankFormSchema>
    isOpen: boolean
    isLoading: boolean
    onClose: () => void
    onConfirm: (data: z.infer<typeof bankFormSchema>) => void
}

export function ConfirmationModal({ data, isOpen, isLoading, onClose, onConfirm }: ConfirmationModalProps) {
    const [showFullAccountNumber, setShowFullAccountNumber] = useState(false)
    const [copiedField, setCopiedField] = useState<string | null>(null)

    const getSubcategoryLabel = (subcategory: string) => {
        return businessSubcategories.find((sub) => sub.value === subcategory)?.label
    }

    const getCountryLabel = (code: string) => {
        const countries: Record<string, string> = {
            in: "India",
            us: "United States",
            gb: "United Kingdom",
            ca: "Canada",
            au: "Australia",
            sg: "Singapore",
            ae: "United Arab Emirates",
            de: "Germany",
            fr: "France",
            jp: "Japan",
            cn: "China",
            br: "Brazil",
            za: "South Africa",
            other: "Other",
        }
        return countries[code] || code
    }

    const formatAddress = () => {
        let address = data.streetAddress
        if (data.addressLine2) address += ", " + data.addressLine2
        address += ", " + data.city
        address += ", " + data.state
        address += " " + data.postalCode
        address += ", " + getCountryLabel(data.country)
        return address
    }

    const copyToClipboard = async (text: string, fieldName: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedField(fieldName)
            toast.success(`${fieldName} copied to clipboard`)
            setTimeout(() => setCopiedField(null), 2000)
        } catch {
            toast.error("Failed to copy to clipboard")
        }
    }

    const maskAccountNumber = (accountNumber: string) => {
        if (accountNumber.length <= 4) return accountNumber
        const firstFour = accountNumber.substring(0, 4)
        const lastFour = accountNumber.substring(accountNumber.length - 4)
        const middle = "*".repeat(Math.max(0, accountNumber.length - 8))
        return `${firstFour}${middle}${lastFour}`
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-full max-w-[95vw] sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-black border-zinc-700 max-h-[95vh] overflow-y-auto backdrop-blur-sm p-4 sm:p-6">
                <DialogHeader className="pb-4 sm:pb-6 space-y-3">
                    <DialogTitle className="text-xl sm:text-2xl font-bold flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-400" />
                        </div>
                        <span className="leading-tight">Final Verification Required</span>
                    </DialogTitle>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        Please carefully review all information before submission
                    </p>
                </DialogHeader>

                <div className="space-y-4 sm:space-y-6">
                    {/* Warning Section */}
                    <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-zinc-700/30 flex items-center justify-center flex-shrink-0">
                                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-yellow-300 text-base sm:text-lg mb-2">
                                    Important: Information Cannot Be Changed
                                </h3>
                                <p className="text-yellow-200/90 leading-relaxed text-sm sm:text-base">
                                    Once submitted, this information cannot be modified without contacting support and completing
                                    additional verification (7-10 business days). Please ensure everything is 100% accurate.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Business Information */}
                    <Card className="bg-zinc-800/30 border-zinc-700">
                        <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
                            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-white text-base sm:text-lg">
                                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg bg-zinc-700/50 border border-zinc-600/50 flex items-center justify-center flex-shrink-0">
                                    <Building className="h-3 w-3 sm:h-4 sm:w-4 text-zinc-300" />
                                </div>
                                Business Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs sm:text-sm font-medium text-zinc-200">Legal Business Name</label>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyToClipboard(data.legalBusinessName, "Business Name")}
                                            className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-slate-400 hover:text-white"
                                        >
                                            {copiedField === "Business Name" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                        </Button>
                                    </div>
                                    <p className="text-zinc-100 font-medium bg-slate-700/50 rounded-lg p-2 sm:p-3 text-sm sm:text-base break-words">
                                        {data.legalBusinessName}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-zinc-200">Business Category</label>
                                    <p className="text-zinc-100 font-medium bg-slate-700/50 rounded-lg p-2 sm:p-3 text-sm sm:text-base break-words">
                                        {getSubcategoryLabel(data.businessSubcategory)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card className="bg-zinc-800/30 border-zinc-700">
                        <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
                            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-white text-base sm:text-lg">
                                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg bg-zinc-700/50 border border-zinc-600/50 flex items-center justify-center flex-shrink-0">
                                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-zinc-300" />
                                </div>
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-zinc-200">Contact Name</label>
                                    <p className="text-zinc-100 font-medium bg-slate-700/50 rounded-lg p-2 sm:p-3 text-sm sm:text-base break-words">
                                        {data.contactName}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-zinc-200">Email Address</label>
                                    <p className="text-zinc-100 font-medium bg-slate-700/50 rounded-lg p-2 sm:p-3 text-sm sm:text-base break-all">
                                        {data.email}
                                    </p>
                                </div>
                                <div className="space-y-2 lg:col-span-1">
                                    <label className="text-xs sm:text-sm font-medium text-zinc-200">Phone Number</label>
                                    <p className="text-zinc-100 font-medium bg-slate-700/50 rounded-lg p-2 sm:p-3 text-sm sm:text-base">
                                        {data.phone}
                                    </p>
                                </div>
                            </div>

                            <Separator className="bg-slate-700 my-4" />

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs sm:text-sm font-medium text-zinc-200">Business Address</label>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyToClipboard(formatAddress(), "Address")}
                                        className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-slate-400 hover:text-white"
                                    >
                                        {copiedField === "Address" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                    </Button>
                                </div>
                                <p className="text-zinc-100 font-medium bg-slate-700/50 rounded-lg p-2 sm:p-3 leading-relaxed text-sm sm:text-base break-words">
                                    {formatAddress()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Banking Information */}
                    <Card className="bg-zinc-800/30 border-zinc-700">
                        <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
                            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-white text-base sm:text-lg">
                                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg bg-zinc-700/50 border border-zinc-600/50 flex items-center justify-center flex-shrink-0">
                                    <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-zinc-300" />
                                </div>
                                <span className="flex-1">Banking Information</span>
                                <Badge variant="destructive" className="text-xs sm:text-sm px-2 py-1">
                                    Cannot be changed
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-zinc-200">Account Holder Name</label>
                                    <p className="text-zinc-100 font-medium bg-slate-700/50 rounded-lg p-2 sm:p-3 text-sm sm:text-base break-words">
                                        {data.accountHolderName}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs sm:text-sm font-medium text-zinc-200">Account Number</label>
                                        <div className="flex items-center gap-1 sm:gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setShowFullAccountNumber(!showFullAccountNumber)}
                                                className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-slate-400 hover:text-white"
                                            >
                                                {showFullAccountNumber ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => copyToClipboard(data.accountNumber, "Account Number")}
                                                className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-slate-400 hover:text-white"
                                            >
                                                {copiedField === "Account Number" ? (
                                                    <Check className="h-3 w-3" />
                                                ) : (
                                                    <Copy className="h-3 w-3" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-zinc-100 font-medium bg-slate-700/50 rounded-lg p-2 sm:p-3 font-mono text-sm sm:text-base break-all">
                                        {showFullAccountNumber ? data.accountNumber : maskAccountNumber(data.accountNumber)}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs sm:text-sm font-medium text-zinc-200">IFSC Code</label>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyToClipboard(data.ifscCode, "IFSC Code")}
                                            className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-slate-400 hover:text-white"
                                        >
                                            {copiedField === "IFSC Code" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                        </Button>
                                    </div>
                                    <p className="text-zinc-100 font-medium bg-slate-700/50 rounded-lg p-2 sm:p-3 font-mono text-sm sm:text-base">
                                        {data.ifscCode}
                                    </p>
                                </div>
                            </div>

                            <Separator className="bg-slate-700 my-4" />

                            <div className="space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-zinc-200">Bank & Branch Details</label>
                                <div className="bg-slate-700/50 rounded-lg p-2 sm:p-3">
                                    <p className="text-zinc-100 font-medium text-sm sm:text-base break-words">{data.bankName}</p>
                                    <p className="text-zinc-400 text-xs sm:text-sm break-words">{data.branchName}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs sm:text-sm font-medium text-zinc-200">PAN Card Number</label>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyToClipboard(data.panCardNumber, "PAN Number")}
                                        className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-slate-400 hover:text-white"
                                    >
                                        {copiedField === "PAN Number" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                    </Button>
                                </div>
                                <p className="text-zinc-100 font-medium bg-slate-700/50 rounded-lg p-2 sm:p-3 font-mono text-sm sm:text-base">
                                    {data.panCardNumber}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Final Confirmation */}
                    <div className="bg-zinc-800/20 border border-zinc-700/50 rounded-xl p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-zinc-700/20 flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-green-300 text-base sm:text-lg mb-2">Ready for Submission</h3>
                                <p className="text-green-200/90 leading-relaxed text-sm sm:text-base">
                                    By clicking &quot;Confirm & Submit&quot;, you certify that all information provided is accurate and complete.
                                    You understand that this information cannot be changed without additional verification.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="pt-4 sm:pt-6 border-t border-slate-700 flex-col sm:flex gap-2 sm:gap-0 flex">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                        className="w-full sm:w-auto border-zinc-700 text-zinc-300 hover:bg-zinc-800 order-2 sm:order-1"
                    >
                        Go Back & Edit
                    </Button>
                    <Button
                        onClick={() => onConfirm(data)}
                        disabled={isLoading}
                        className="w-full sm:w-auto bg-zinc-600 hover:bg-zinc-500 text-zinc-100 order-1 sm:order-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Shield className="mr-2 h-4 w-4" />
                                Confirm & Submit
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
