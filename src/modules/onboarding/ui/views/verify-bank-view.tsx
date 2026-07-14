import { AlertTriangle, CheckCircle, FileText, HelpCircle, Info, Lock, Shield } from "lucide-react"
import { BankForm } from "../components/bank-form"
import Link from "next/link"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"

export const VerifyBankView = ({ email, phone }: { email: string; phone: string }) => {
    return (
        <div className="container py-6 sm:py-10 px-2 sm:px-4 md:px-6 mx-auto">
            <div className="bg-red-900/30 border-2 border-red-500/50 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start gap-3">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-300 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-red-300 text-base sm:text-lg mb-1">CRITICAL: Verify All Information</h3>
                    <p className="text-red-200/90 text-sm sm:text-base leading-relaxed">
                        The bank details you provide <span className="font-bold underline">CANNOT be changed later</span> without a
                        formal verification process that takes 7-10 business days. Please ensure all information is 100% accurate
                        before submission.
                    </p>
                </div>
            </div>

            <div className="mb-6 sm:mb-8 text-center max-w-3xl mx-auto px-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-3">
                    Bank Account Details
                </h1>
                <p className="text-zinc-300 text-base sm:text-lg mb-2">
                    Please provide your bank account information for receiving payments and withdrawals.
                </p>
                <p className="text-zinc-400 text-sm">
                    This information is encrypted and securely stored according to financial industry standards.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                <div className="xl:col-span-2">
                    <div className="bg-gradient-to-br bg-black border border-zinc-700 rounded-lg p-3 sm:p-4 shadow-xl">
                        <Tabs defaultValue="form">
                            <TabsList className="grid grid-cols-3 mb-4 sm:mb-6 w-full h-auto">
                                <TabsTrigger value="form" className="text-xs sm:text-sm py-2 sm:py-3">
                                    Bank Details
                                </TabsTrigger>
                                <TabsTrigger value="guide" className="text-xs sm:text-sm py-2 sm:py-3">
                                    Filling Guide
                                </TabsTrigger>
                                <TabsTrigger value="faq" className="text-xs sm:text-sm py-2 sm:py-3">
                                    FAQs
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="form">
                                <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                                    <h3 className="font-medium text-zinc-200 flex items-center gap-2 mb-2 text-sm sm:text-base">
                                        <Info className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                                        Before You Begin
                                    </h3>
                                    <ul className="text-xs sm:text-sm text-zinc-300 space-y-1 ml-4 sm:ml-6 list-disc">
                                        <li>Keep your bank checkbook or bank statement handy</li>
                                        <li>Ensure you are the account holder or authorized signatory</li>
                                        <li>Double-check all details before final submission</li>
                                        <li>Use the exact name as it appears on your bank account</li>
                                    </ul>
                                </div>
                                <BankForm email={email} phone={phone} />
                            </TabsContent>

                            <TabsContent value="guide">
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 sm:p-4">
                                        <h3 className="font-medium text-zinc-200 flex items-center gap-2 mb-3 text-sm sm:text-base">
                                            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                                            How to Find Your Account Details
                                        </h3>
                                        <div className="space-y-3 sm:space-y-4">
                                            <div>
                                                <h4 className="text-xs sm:text-sm font-medium text-zinc-300 mb-1">Account Number</h4>
                                                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                                                    Your account number can be found on your checkbook, bank statement, or online banking portal.
                                                    It&apos;s typically 10-14 digits long.
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-xs sm:text-sm font-medium text-zinc-300 mb-1">IFSC Code</h4>
                                                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                                                    The IFSC code is an 11-character code that identifies your bank branch. It can be found on
                                                    your checkbook, bank statement, or by searching your bank&apos;s website.
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-xs sm:text-sm font-medium text-zinc-300 mb-1">Account Holder Name</h4>
                                                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                                                    Enter your name exactly as it appears on your bank account. Any mismatch may result in payment
                                                    failures.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 sm:p-4">
                                        <h3 className="font-medium text-zinc-200 flex items-center gap-2 mb-3 text-sm sm:text-base">
                                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                                            Common Mistakes to Avoid
                                        </h3>
                                        <ul className="text-xs sm:text-sm text-zinc-400 space-y-2 ml-4 sm:ml-6 list-disc">
                                            <li>Entering a nickname instead of your full legal name</li>
                                            <li>Mixing up account number digits</li>
                                            <li>Using an incorrect or outdated IFSC code</li>
                                            <li>Selecting the wrong account type</li>
                                            <li>Providing a mobile number not registered with your bank</li>
                                        </ul>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="faq">
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="text-zinc-200 text-sm sm:text-base text-left">
                                            Why can&apos;t I change my bank details later?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                            For security reasons and to prevent fraud, bank details cannot be changed without a formal
                                            verification process. This protects both you and our platform from unauthorized transactions.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger className="text-zinc-200 text-sm sm:text-base text-left">
                                            How is my banking information secured?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                            Your bank details are encrypted using AES-256 encryption and stored in compliance with PCI DSS
                                            standards. We never share your complete bank details with any third parties.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger className="text-zinc-200 text-sm sm:text-base text-left">
                                            What if I make a mistake in my bank details?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                            If you discover an error after submission, you&apos;ll need to contact our support team
                                            immediately. You&apos;ll be required to go through a verification process that includes submitting
                                            bank statements and identity documents.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-4">
                                        <AccordionTrigger className="text-zinc-200 text-sm sm:text-base text-left">
                                            How long does verification take?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                            Initial verification happens automatically for most accounts. In some cases, manual verification
                                            may be required, which can take 1-2 business days.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-5">
                                        <AccordionTrigger className="text-zinc-200 text-sm sm:text-base text-left">
                                            When will I receive my payments?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                            Once your bank details are verified, payments are typically processed within 3-5 business days of
                                            the payment cycle, depending on your bank&apos;s processing times.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gradient-to-br from-blue-900/20 to-violet-900/20 border border-blue-700/30 rounded-lg p-4 sm:p-5 shadow-lg">
                        <h3 className="font-semibold text-zinc-200 flex items-center gap-2 mb-4 text-sm sm:text-base">
                            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                            Security Information
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-blue-900/30 border border-blue-700/30 flex items-center justify-center flex-shrink-0">
                                    <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs sm:text-sm font-medium text-zinc-200 mb-1">Bank-Grade Encryption</h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Your data is protected with AES-256 encryption and stored in compliance with PCI DSS standards
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-blue-900/30 border border-blue-700/30 flex items-center justify-center flex-shrink-0">
                                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs sm:text-sm font-medium text-zinc-200 mb-1">Verified Processing</h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        All transactions are processed through secure, regulated payment channels
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-blue-900/30 border border-blue-700/30 flex items-center justify-center flex-shrink-0">
                                    <Info className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs sm:text-sm font-medium text-zinc-200 mb-1">Limited Access</h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Only authorized personnel can access partial bank information for payment processing
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-900/20 border-l-4 border-yellow-600 rounded-lg p-3 sm:p-4">
                        <h3 className="font-medium text-yellow-500 mb-2 text-sm sm:text-base">Important Notice</h3>
                        <p className="text-xs sm:text-sm text-yellow-200/80 mb-3">We will never ask for your:</p>
                        <ul className="text-xs sm:text-sm text-yellow-200/80 space-y-1 ml-4 sm:ml-5 list-disc">
                            <li>Online banking password</li>
                            <li>OTP or security codes</li>
                            <li>Credit/debit card PIN</li>
                            <li>CVV number</li>
                        </ul>
                        <p className="text-xs sm:text-sm text-yellow-200/80 mt-3 leading-relaxed">
                            If anyone claiming to be from our company asks for this information, please report it immediately.
                        </p>
                    </div>

                    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 sm:p-4">
                        <h3 className="font-medium text-zinc-200 flex items-center gap-2 mb-3 text-sm sm:text-base">
                            <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                            Need Help?
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 mb-4 leading-relaxed">
                            Our support team is available to assist you with any questions about adding your bank details.
                        </p>
                        <div className="space-y-2">
                            <Link
                                href="/contact"
                                className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                                Contact Support
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="inline"
                                >
                                    <path
                                        d="M7 17L17 7M17 7H7M17 7V17"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                            <Link
                                href="/docs/payments"
                                className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                                Payment Documentation
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="inline"
                                >
                                    <path
                                        d="M7 17L17 7M17 7H7M17 7V17"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className="text-xs text-zinc-500 space-y-2 leading-relaxed">
                        <p>
                            By providing your bank details, you agree to our{" "}
                            <Link href="/terms" className="text-blue-500 hover:text-blue-400 underline">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-blue-500 hover:text-blue-400 underline">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                        <p>All payment processing is handled in accordance with applicable financial regulations.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function BankingLoading() {
    return (
        <div className="container py-10 px-4 md:px-6 mx-auto">
            <Skeleton className="h-24 w-full mb-8 rounded-lg" />

            <div className="mb-8 text-center max-w-3xl mx-auto">
                <Skeleton className="h-10 w-64 mx-auto mb-3" />
                <Skeleton className="h-5 w-full max-w-md mx-auto mb-2" />
                <Skeleton className="h-4 w-3/4 max-w-sm mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Skeleton className="h-[800px] w-full rounded-lg" />
                </div>

                <div className="space-y-6">
                    <Skeleton className="h-64 rounded-lg" />
                    <Skeleton className="h-40 rounded-lg" />
                    <Skeleton className="h-32 rounded-lg" />
                    <Skeleton className="h-16 rounded-lg" />
                </div>
            </div>
        </div>
    )
}
