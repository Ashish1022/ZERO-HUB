"use client"

import Link from "next/link"
import {
    CheckCircle,
    AlertCircle,
    FileText,
    Calendar,
    CreditCard,
    Download,
    ArrowRight,
    HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

export const AlreadyVerified = ({ accountNumber }: { accountNumber: string }) => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.onboarding.getTenantBankDetails.queryOptions({ accountNumber: accountNumber }))

    return (
        <div className="container py-12 px-4 md:px-6 mx-auto">
            <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-4 mb-8 flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                    <h3 className="font-medium text-emerald-400 mb-1">Bank Details Already Submitted</h3>
                    <p className="text-emerald-200/80">
                        Your bank account information has been successfully verified and is ready to receive payments. Any changes
                        require contacting support and additional verification.
                    </p>
                </div>
            </div>

            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight mb-3">Your Bank Details</h1>
                <p className="text-zinc-400 max-w-2xl mx-auto">
                    View your submitted bank account information and payment history.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 shadow-lg mb-8">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-xl">Bank Account Information</CardTitle>
                                    <CardDescription>Your verified payment details</CardDescription>
                                </div>
                                <Badge variant="outline" className="bg-emerald-900/30 text-emerald-400 border-emerald-700/50 px-3 py-1">
                                    Verified
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-zinc-500 mb-1">Account Holder Name</h4>
                                        <p className="text-zinc-200 font-medium">{data?.accountHolderName}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-zinc-500 mb-1">Account Number</h4>
                                        <p className="text-zinc-200 font-medium">{data?.accountNumber}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-zinc-500 mb-1">IFSC Code</h4>
                                    <p className="text-zinc-200 font-medium">{data?.ifscCode}</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t border-zinc-800 pt-6 mt-2">
                            <div className="w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-center text-zinc-400 text-sm">
                                        <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                                        <span>Changes to bank details require contacting support</span>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Request Changes
                                    </Button>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-700">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-xl">Recent Payments</CardTitle>
                                    <CardDescription>Transactions to your bank account</CardDescription>
                                </div>
                                <Link href="/payments">
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg bg-zinc-800/50">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-emerald-900/30 border border-emerald-700/30 flex items-center justify-center">
                                            <CreditCard className="h-5 w-5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-zinc-200">Monthly Payout</p>
                                            <p className="text-xs text-zinc-500">June 1, 2025</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-emerald-400">$1,245.00</p>
                                        <p className="text-xs text-zinc-500">Completed</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg bg-zinc-800/50">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-emerald-900/30 border border-emerald-700/30 flex items-center justify-center">
                                            <CreditCard className="h-5 w-5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-zinc-200">Monthly Payout</p>
                                            <p className="text-xs text-zinc-500">May 1, 2025</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-emerald-400">$1,120.50</p>
                                        <p className="text-xs text-zinc-500">Completed</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg bg-zinc-800/50">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-emerald-900/30 border border-emerald-700/30 flex items-center justify-center">
                                            <CreditCard className="h-5 w-5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-zinc-200">Monthly Payout</p>
                                            <p className="text-xs text-zinc-500">April 1, 2025</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-emerald-400">$980.25</p>
                                        <p className="text-xs text-zinc-500">Completed</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-zinc-900 border-zinc-700">
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button variant="outline" className="w-full justify-between">
                                <span className="flex items-center">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Bank Details
                                </span>
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" className="w-full justify-between">
                                <span className="flex items-center">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Payment History
                                </span>
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" className="w-full justify-between">
                                <span className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Payment Schedule
                                </span>
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-900/20 to-violet-900/20 border-blue-800/30">
                        <CardHeader>
                            <CardTitle className="text-lg">Important Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-zinc-300">
                                    Changes to bank details require additional verification and can take 7-10 business days to process.
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-zinc-300">
                                    Payments are processed on the 1st of each month. Funds typically arrive in 2-3 business days.
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-zinc-300">
                                    Your bank account has been verified and is ready to receive payments.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-700">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <HelpCircle className="h-5 w-5 text-blue-400" />
                                Need Help?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-zinc-400">
                                If you need to update your bank details or have questions about payments, our support team is here to
                                help.
                            </p>
                            <Link href="/contact">
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                                    Contact Support
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export function BankDetailsAlreadySubmittedLoading() {
    return (
        <div className="container py-12 px-4 md:px-6 mx-auto">
            <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-4 mb-8 flex items-start gap-3">
                <Skeleton className="h-6 w-6 rounded-full bg-emerald-800" />
                <div className="flex-1">
                    <Skeleton className="h-5 w-56 mb-2 bg-emerald-800" />
                    <Skeleton className="h-4 w-full bg-emerald-800" />
                </div>
            </div>

            <div className="mb-10 text-center">
                <Skeleton className="h-10 w-48 mx-auto mb-3 bg-zinc-800" />
                <Skeleton className="h-4 w-80 mx-auto bg-zinc-800" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 shadow-lg mb-8">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Skeleton className="h-6 w-48 mb-2 bg-zinc-700" />
                                    <Skeleton className="h-4 w-40 bg-zinc-700" />
                                </div>
                                <Skeleton className="h-6 w-20 bg-zinc-700" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    {[...Array(4)].map((_, index) => (
                                        <div key={index}>
                                            <Skeleton className="h-4 w-32 mb-1 bg-zinc-700" />
                                            <Skeleton className="h-5 w-40 bg-zinc-700" />
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    {[...Array(4)].map((_, index) => (
                                        <div key={index}>
                                            <Skeleton className="h-4 w-24 mb-1 bg-zinc-700" />
                                            <Skeleton className="h-5 w-36 bg-zinc-700" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t border-zinc-800 pt-6 mt-2">
                            <div className="w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-center">
                                        <Skeleton className="h-4 w-4 mr-2 bg-zinc-700" />
                                        <Skeleton className="h-4 w-64 bg-zinc-700" />
                                    </div>
                                    <Skeleton className="h-8 w-32 bg-zinc-700" />
                                </div>
                            </div>
                        </CardFooter>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-700">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Skeleton className="h-6 w-32 mb-2 bg-zinc-800" />
                                    <Skeleton className="h-4 w-48 bg-zinc-800" />
                                </div>
                                <Skeleton className="h-8 w-20 bg-zinc-800" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[...Array(3)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg bg-zinc-800/50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-10 w-10 rounded-full bg-zinc-700" />
                                            <div>
                                                <Skeleton className="h-4 w-24 mb-1 bg-zinc-700" />
                                                <Skeleton className="h-3 w-20 bg-zinc-700" />
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Skeleton className="h-4 w-20 mb-1 bg-zinc-700" />
                                            <Skeleton className="h-3 w-16 bg-zinc-700" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-zinc-900 border-zinc-700">
                        <CardHeader>
                            <Skeleton className="h-5 w-28 bg-zinc-800" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
                                    <div className="flex items-center">
                                        <Skeleton className="h-4 w-4 mr-2 bg-zinc-800" />
                                        <Skeleton className="h-4 w-32 bg-zinc-800" />
                                    </div>
                                    <Skeleton className="h-4 w-4 bg-zinc-800" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-900/20 to-violet-900/20 border-blue-800/30">
                        <CardHeader>
                            <Skeleton className="h-5 w-40 bg-blue-800/50" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Skeleton className="h-5 w-5 mt-0.5 bg-blue-800/50" />
                                    <Skeleton className="h-4 w-full bg-blue-800/50" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-700">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-5 bg-zinc-800" />
                                <Skeleton className="h-5 w-24 bg-zinc-800" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-4 w-full bg-zinc-800" />
                            <Skeleton className="h-4 w-3/4 bg-zinc-800" />
                            <Skeleton className="h-10 w-full bg-zinc-800" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
