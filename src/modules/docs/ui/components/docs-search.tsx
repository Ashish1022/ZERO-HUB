"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, FileText, Hash, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DocsSearchProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const originalSearchResults = [
    {
        title: "Account Setup Guide",
        description: "Complete guide to creating your ZERO | HUB seller account and setting up your online store",
        href: "/docs/account-setup",
        type: "page",
    },
    {
        title: "Getting Started",
        description: "Learn how to integrate and use our platform effectively",
        href: "/docs",
        type: "page",
    },
    {
        title: "Authentication API",
        description: "Learn how to authenticate users and manage sessions",
        href: "/docs/api/authentication",
        type: "page",
    },
    {
        title: "Cloud Installation",
        description: "Get started quickly with our cloud-hosted solution",
        href: "/docs/installation/cloud",
        type: "page",
    },
    {
        title: "Account Subscription",
        description: "Upgrade your account status and access premium features",
        href: "/docs/account-subscription",
        type: "page",
    },
    {
        title: "Account Verification",
        description: "Configure your bank account and complete verification process",
        href: "/docs/account-verification",
        type: "page",
    },
    {
        title: "JWT Authentication",
        description: "Configure JWT-based authentication",
        href: "/docs/authentication/jwt",
        type: "section",
    },
    {
        title: "User Registration",
        description: "How to register new users via API",
        href: "/docs/api/authentication#register",
        type: "section",
    },
    {
        title: "Environment Variables",
        description: "Configure your app using environment variables",
        href: "/docs/configuration/app#environment-variables",
        type: "section",
    },
    {
        title: "Overview",
        description: "Account setup overview and step-by-step process",
        href: "/docs/account-setup#overview",
        type: "section",
    },
    {
        title: "Registration Form",
        description: "Complete the registration form with required information",
        href: "/docs/account-setup#step-2-registration",
        type: "section",
    },
    {
        title: "Email Verification",
        description: "Verify your account with OTP code sent to your email",
        href: "/docs/account-setup#step-3-verification",
        type: "section",
    },
    {
        title: "Admin Dashboard",
        description: "Access and navigate your admin dashboard after verification",
        href: "/docs/account-setup#step-4-dashboard",
        type: "section",
    },
    {
        title: "Store Configuration",
        description: "Configure your store settings and choose templates",
        href: "/docs/account-setup#step-5-configuration",
        type: "section",
    },
    {
        title: "Store Preview",
        description: "Preview how your store will appear to customers",
        href: "/docs/account-setup#step-6-preview",
        type: "section",
    },
]

// Additional search results from the subscription page
const subscriptionPageResults = [
    {
        title: "Subscription Activation Guide",
        description: "Complete guide to purchasing and activating your ZERO | HUB subscription plan to unlock premium features",
        href: "/docs/account-subscription",
        type: "page",
    },
    {
        title: "Subscription Overview",
        description: "Understanding the subscription process from purchase to activation",
        href: "/docs/account-subscription#overview",
        type: "section",
    },
    {
        title: "Access Admin Dashboard",
        description: "Login to admin panel to begin subscription process",
        href: "/docs/account-subscription#step-1-dashboard",
        type: "section",
    },
    {
        title: "Purchase Subscription Button",
        description: "Locate the Purchase Subscription button in the left sidebar navigation menu",
        href: "/docs/account-subscription#step-2-purchase-button",
        type: "section",
    },
    {
        title: "Choose Subscription Plan",
        description: "Compare and select Basic, Professional, or Enterprise subscription plans",
        href: "/docs/account-subscription#step-3-plans",
        type: "section",
    },
    {
        title: "Basic Plan",
        description: "Perfect for small businesses - Up to 100 products, basic analytics, email support",
        href: "/docs/account-subscription#step-3-plans",
        type: "section",
    },
    {
        title: "Professional Plan",
        description: "Most popular - Up to 1,000 products, advanced analytics, priority support, custom themes",
        href: "/docs/account-subscription#step-3-plans",
        type: "section",
    },
    {
        title: "Enterprise Plan",
        description: "For large-scale operations - Unlimited products, full analytics suite, 24/7 phone support",
        href: "/docs/account-subscription#step-3-plans",
        type: "section",
    },
    {
        title: "Complete Payment Process",
        description: "Secure checkout with credit cards, digital wallets, and bank transfer options",
        href: "/docs/account-subscription#step-4-payment",
        type: "section",
    },
    {
        title: "Payment Methods",
        description: "Credit/Debit cards, PayPal, Apple Pay, Google Pay, and bank transfer options",
        href: "/docs/account-subscription#step-4-payment",
        type: "section",
    },
    {
        title: "Security Features",
        description: "SSL encryption, PCI compliance, and fraud protection for secure payments",
        href: "/docs/account-subscription#step-4-payment",
        type: "section",
    },
    {
        title: "Automatic Redirect",
        description: "Automatic redirect to dashboard after successful payment completion",
        href: "/docs/account-subscription#step-5-activation",
        type: "section",
    },
    {
        title: "Verify Subscription Status",
        description: "Confirm subscription activation by checking sidebar button status change",
        href: "/docs/account-subscription#step-6-verification",
        type: "section",
    },
    {
        title: "Enhanced Analytics",
        description: "Access detailed sales reports, customer analytics, and performance metrics",
        href: "/docs/account-subscription#additional-features",
        type: "section",
    },
    {
        title: "Premium Themes",
        description: "Professional store designs and customization options for subscribers",
        href: "/docs/account-subscription#additional-features",
        type: "section",
    },
    {
        title: "Priority Support",
        description: "Dedicated customer assistance with faster response times for subscribers",
        href: "/docs/account-subscription#additional-features",
        type: "section",
    },
    {
        title: "Payment Issues",
        description: "Troubleshooting payment problems, declined transactions, and billing information",
        href: "/docs/account-subscription#troubleshooting",
        type: "section",
    },
    {
        title: "Subscription Not Activated",
        description: "Solutions for subscription activation delays and processing issues",
        href: "/docs/account-subscription#troubleshooting",
        type: "section",
    },
    {
        title: "Button Status Not Changing",
        description: "Fix issues with subscription button not updating after purchase",
        href: "/docs/account-subscription#troubleshooting",
        type: "section",
    },
]

const bankVerificationResults = [
    {
        title: "Bank Verification Guide",
        description: "Complete guide to verifying your bank account for secure payment collection from customers on ZERO | HUB platform",
        href: "/docs/bank-verification",
        type: "page",
    },
    {
        title: "Bank Verification Overview",
        description: "After successfully creating your ZERO | HUB seller account and activating your subscription, you must verify your bank account to collect payments",
        href: "/docs/bank-verification#overview",
        type: "section",
    },
    {
        title: "Prerequisites",
        description: "Requirements and documents needed before starting the bank verification process",
        href: "/docs/bank-verification#prerequisites",
        type: "section",
    },
    {
        title: "Account Requirements",
        description: "ZERO | HUB account created, email verification completed, subscription plan activated",
        href: "/docs/bank-verification#prerequisites",
        type: "section",
    },
    {
        title: "Required Documents",
        description: "Bank account details, PAN card number, business registration details",
        href: "/docs/bank-verification#prerequisites",
        type: "section",
    },
    {
        title: "Step 1: Access Admin Dashboard",
        description: "Log into your admin dashboard to find the Verify Bank button on the right side of the interface",
        href: "/docs/bank-verification#step-1-dashboard",
        type: "section",
    },
    {
        title: "Verify Bank Button",
        description: "Located on the right side of dashboard, visible only after subscription activation",
        href: "/docs/bank-verification#step-1-dashboard",
        type: "section",
    },
    {
        title: "Step 2: Complete Bank Verification Form",
        description: "Fill out all required fields with accurate information for payment management",
        href: "/docs/bank-verification#step-2-form",
        type: "section",
    },
    {
        title: "Business Information",
        description: "Legal business name, business subcategory, contact name, PAN card number",
        href: "/docs/bank-verification#step-2-form",
        type: "section",
    },
    {
        title: "Business Address",
        description: "Complete business address including street, city, state, postal code, and country",
        href: "/docs/bank-verification#step-2-form",
        type: "section",
    },
    {
        title: "Bank Account Details",
        description: "Account holder name, bank name, account number, IFSC code, branch name",
        href: "/docs/bank-verification#step-2-form",
        type: "section",
    },
    {
        title: "PAN Card Number",
        description: "Business PAN for tax compliance - format: ABCDE1234F (5 letters, 4 digits, 1 letter)",
        href: "/docs/bank-verification#step-2-form",
        type: "section",
    },
    {
        title: "IFSC Code",
        description: "Bank's IFSC routing code for account identification and transfers",
        href: "/docs/bank-verification#step-2-form",
        type: "section",
    },
    {
        title: "Terms Acceptance",
        description: "Checkbox to accept payment processing terms and conditions",
        href: "/docs/bank-verification#step-2-form",
        type: "section",
    },
    {
        title: "Step 3: Review Information Thoroughly",
        description: "Carefully review all entered information before submission as data cannot be easily changed after verification",
        href: "/docs/bank-verification#step-3-review",
        type: "section",
    },
    {
        title: "Verification Checklist",
        description: "Critical checks including account numbers match, IFSC code accuracy, PAN card format",
        href: "/docs/bank-verification#step-3-review",
        type: "section",
    },
    {
        title: "Step 4: Bank Verification Process",
        description: "System processing and verification of provided bank account details through secure banking channels",
        href: "/docs/bank-verification#step-4-verification",
        type: "section",
    },
    {
        title: "Verification Timeline",
        description: "Immediate form validation, 24-48 hours bank verification, account activation upon approval",
        href: "/docs/bank-verification#step-4-verification",
        type: "section",
    },
    {
        title: "Status Updates",
        description: "Email confirmation upon submission, progress updates during verification, approval notification",
        href: "/docs/bank-verification#step-4-verification",
        type: "section",
    },
    {
        title: "Step 5: Verification Complete - Start Selling",
        description: "Once approved, begin adding products and accepting payments from customers",
        href: "/docs/bank-verification#step-5-complete",
        type: "section",
    },
    {
        title: "Add Products",
        description: "Create product listings with images, descriptions, and pricing to attract customers",
        href: "/docs/bank-verification#step-5-complete",
        type: "section",
    },
    {
        title: "Customize Store",
        description: "Configure store settings, branding, and layout to match your business identity",
        href: "/docs/bank-verification#step-5-complete",
        type: "section",
    },
    {
        title: "Accept Payments",
        description: "With verified banking, process secure payments from customers worldwide",
        href: "/docs/bank-verification#step-5-complete",
        type: "section",
    },
    {
        title: "Troubleshooting",
        description: "Common issues and solutions during the bank verification process",
        href: "/docs/bank-verification#troubleshooting",
        type: "section",
    },
    {
        title: "Verification Failed",
        description: "Solutions for incorrect account details, name mismatches, invalid PAN format, incomplete address",
        href: "/docs/bank-verification#troubleshooting",
        type: "section",
    },
    {
        title: "Verification Pending",
        description: "Information being processed with banking partners, typically takes 24-48 hours",
        href: "/docs/bank-verification#troubleshooting",
        type: "section",
    },
    {
        title: "Contact Support",
        description: "Phone support, email assistance, and documentation for faster resolution",
        href: "/docs/bank-verification#troubleshooting",
        type: "section",
    },
    {
        title: "Security & Privacy",
        description: "Enterprise-grade security measures protecting your banking information",
        href: "/docs/bank-verification#security",
        type: "section",
    },
    {
        title: "Data Protection",
        description: "256-bit SSL encryption, PCI DSS compliance, regular security audits",
        href: "/docs/bank-verification#security",
        type: "section",
    },
    {
        title: "Privacy Commitment",
        description: "Limited data access, no data selling, secure storage in encrypted data centers",
        href: "/docs/bank-verification#security",
        type: "section",
    },
    {
        title: "Quick Reference",
        description: "Essential information and requirements checklist at a glance",
        href: "/docs/bank-verification#quick-reference",
        type: "section",
    },
    {
        title: "Required Fields Checklist",
        description: "Complete list of required fields for bank verification form",
        href: "/docs/bank-verification#quick-reference",
        type: "section",
    },
    {
        title: "Quick Tips",
        description: "Double-check account numbers, use exact business name, verify IFSC code, complete address",
        href: "/docs/bank-verification#quick-reference",
        type: "section",
    },
]

const allSearchResults = [...originalSearchResults, ...subscriptionPageResults, ...bankVerificationResults]

export function DocsSearch({ open, onOpenChange }: DocsSearchProps) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState(allSearchResults)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const router = useRouter()

    useEffect(() => {
        if (!query.trim()) {
            setResults(allSearchResults)
            setSelectedIndex(0)
            return
        }

        const filtered = allSearchResults.filter(
            (result) =>
                result.title.toLowerCase().includes(query.toLowerCase()) ||
                result.description.toLowerCase().includes(query.toLowerCase()),
        )
        setResults(filtered)
        setSelectedIndex(0)
    }, [query])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!open) return

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault()
                    setSelectedIndex((prev) => (prev + 1) % results.length)
                    break
                case "ArrowUp":
                    e.preventDefault()
                    setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
                    break
                case "Enter":
                    e.preventDefault()
                    if (results[selectedIndex]) {
                        router.push(results[selectedIndex].href)
                        onOpenChange(false)
                        setQuery("")
                    }
                    break
                case "Escape":
                    onOpenChange(false)
                    setQuery("")
                    break
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [open, results, selectedIndex, router, onOpenChange])

    const handleResultClick = (href: string) => {
        router.push(href)
        onOpenChange(false)
        setQuery("")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="container mx-auto px-2 md:px-6 p-0 bg-zinc-900 border-zinc-800 scrollbar-hide">
                <DialogHeader className="p-4 pb-0">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <Input
                            placeholder="Search documentation..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-10 bg-zinc-800 border-zinc-700 focus:border-blue-500 text-white placeholder:text-zinc-400"
                            autoFocus
                        />
                    </div>
                </DialogHeader>

                <div className="max-h-96 overflow-y-auto p-4 pt-2">
                    {results.length === 0 ? (
                        <div className="py-8 text-center text-zinc-400">
                            <Search className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>No results found for &quot;{query}&quot;</p>
                        </div>
                    ) : (
                        <ScrollArea className="space-y-1">
                            {results.map((result, index) => (
                                <button
                                    key={`${result.href}-${index}`}
                                    onClick={() => handleResultClick(result.href)}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                                        index === selectedIndex ? "bg-blue-500/10 border border-blue-500/20" : "hover:bg-zinc-800/50",
                                    )}
                                >
                                    <div className="flex-shrink-0">
                                        {result.type === "page" ? (
                                            <FileText className="h-4 w-4 text-blue-400" />
                                        ) : (
                                            <Hash className="h-4 w-4 text-purple-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-white truncate">{result.title}</div>
                                        <div className="text-sm text-zinc-400 truncate">{result.description}</div>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                                </button>
                            ))}
                        </ScrollArea>
                    )}
                </div>

                <div className="border-t border-zinc-800 p-3 text-xs text-zinc-500">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">↑↓</kbd>
                                Navigate
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">↵</kbd>
                                Select
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">esc</kbd>
                                Close
                            </span>
                        </div>
                        <div className="text-zinc-600">
                            {results.length} result{results.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}