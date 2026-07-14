import React from 'react'
import { ArrowRight, CheckCircle, Shield, Zap, Mail, CreditCard, Store, Palette, Star, Gift, Building, Lock, AlertTriangle, FileText, MapPin, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DocsToc } from '@/modules/docs/ui/components/docs-toc'
import { DocsHeader } from '@/modules/docs/ui/components/header'
import { Callout } from '@/modules/docs/ui/components/callout'
import { DocsPager } from '@/modules/docs/ui/components/docs-pager'
import Image from 'next/image'

const ImagePlaceholder = ({ src }: { src: string }) => (
    <div className="bg-zinc-800/30 border-2 border-dashed border-zinc-600 rounded-lg p-2">
        <Image
            className="text-zinc-500 mx-auto border-white border rounded-lg"
            src={src}
            width={1080}
            height={720}
            alt='image'
        />
    </div>
)

const DocsPage = () => {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <DocsHeader
                heading="Bank Verification Guide"
                text="Complete guide to verifying your bank account for secure payment collection from customers on ZERO | HUB platform."
                badge="Payment Setup"
            />

            <DocsToc className="mb-8" />

            <div className="space-y-12">
                <section className="scroll-mt-20" id="overview">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Overview</h2>
                    <p className="text-zinc-300 leading-7 mb-8">
                        After successfully creating your ZERO | HUB seller account and activating your subscription, you must verify your bank account to collect payments from customers.
                        This verification process ensures secure transactions and compliance with financial regulations.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
                        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                            <CardHeader className="text-center">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Store className="h-6 w-6 text-blue-400" />
                                </div>
                                <CardTitle className="text-lg">Access Dashboard</CardTitle>
                                <CardDescription>Navigate to admin panel</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                            <CardHeader className="text-center">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Building className="h-6 w-6 text-purple-400" />
                                </div>
                                <CardTitle className="text-lg">Click Verify Bank</CardTitle>
                                <CardDescription>Locate verification button</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                            <CardHeader className="text-center">
                                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <FileText className="h-6 w-6 text-green-400" />
                                </div>
                                <CardTitle className="text-lg">Complete Form</CardTitle>
                                <CardDescription>Fill verification details</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                            <CardHeader className="text-center">
                                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <CheckCircle className="h-6 w-6 text-amber-400" />
                                </div>
                                <CardTitle className="text-lg">Start Selling</CardTitle>
                                <CardDescription>Begin accepting payments</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="mt-8">
                        <Callout variant="warning">
                            <p>
                                <strong>Important:</strong> Without bank verification, you cannot collect payments from customers. Complete this process to unlock full selling capabilities.
                            </p>
                        </Callout>
                    </div>
                </section>

                {/* Prerequisites */}
                <section className="scroll-mt-20" id="prerequisites">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Prerequisites</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Before starting the bank verification process, ensure you have completed these requirements and gathered all necessary documents.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-green-500/10 border-green-500/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                    Account Requirements
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                                        <span className="text-zinc-300">ZERO | HUB account created</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                                        <span className="text-zinc-300">Email verification completed</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                                        <span className="text-zinc-300">Subscription plan activated</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-500/10 border-blue-500/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <FileText className="h-5 w-5 text-blue-400" />
                                    Required Documents
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-zinc-300">Bank account details</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-zinc-300">PAN card number</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-zinc-300">Business registration details</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-1-dashboard">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Step 1: Access Admin Dashboard</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Log into your admin dashboard where you&apos;ll find the &quot;Verify Bank&quot; button on the right side of the interface after successful subscription activation.
                    </p>

                    <ImagePlaceholder src='/docs/bank-verify-button.png' />

                    <div className="mt-6">
                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5 text-purple-400" />
                                    Button Location
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                                        <span className="text-zinc-300">Located on the right side of dashboard</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-zinc-300">Visible only after subscription activation</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                                        <span className="text-zinc-300">Clearly labeled &quot;Verify Bank&quot;</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-2-form">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Step 2: Complete Bank Verification Form</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Click the &quot;Verify Bank&quot; button to be redirected to the bank verification page. Fill out all required fields with accurate information as this data will be used for payment management.
                    </p>

                    <ImagePlaceholder src='/docs/bank-details-page.png' />

                    <div className="mt-8">
                        <Callout variant="warning">
                            <p>
                                <strong>Critical:</strong> Double-check all information before submission. Incorrect details may delay verification or cause payment processing issues.
                            </p>
                        </Callout>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold tracking-tight mb-6 scroll-m-20">Required Information</h3>

                        <div className="space-y-6">
                            {/* Business Information */}
                            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Building className="h-5 w-5 text-blue-400" />
                                        Business Information
                                    </CardTitle>
                                    <CardDescription>Legal business details and classification</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">Legal Business Name</div>
                                            <div className="text-sm text-zinc-400">Official registered business name</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">Business Subcategory</div>
                                            <div className="text-sm text-zinc-400">Industry classification category</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">Contact Name</div>
                                            <div className="text-sm text-zinc-400">Primary business contact person</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">PAN Card Number</div>
                                            <div className="text-sm text-zinc-400">Business PAN for tax compliance</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Address Information */}
                            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-green-400" />
                                        Business Address
                                    </CardTitle>
                                    <CardDescription>Complete business address details</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">Street Address</div>
                                            <div className="text-sm text-zinc-400">Primary business address line</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">Address Line 2</div>
                                            <div className="text-sm text-zinc-400">Additional address details (optional)</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">City</div>
                                            <div className="text-sm text-zinc-400">Business location city</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">State</div>
                                            <div className="text-sm text-zinc-400">State or province</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">Postal Code</div>
                                            <div className="text-sm text-zinc-400">ZIP or postal code</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">Country</div>
                                            <div className="text-sm text-zinc-400">Business country location</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Bank Account Details */}
                            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5 text-purple-400" />
                                        Bank Account Details
                                    </CardTitle>
                                    <CardDescription>Banking information for payment collection</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">Account Holder Name</div>
                                            <div className="text-sm text-zinc-400">Name as per bank records</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">Bank Name</div>
                                            <div className="text-sm text-zinc-400">Official bank name</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">Account Number</div>
                                            <div className="text-sm text-zinc-400">Bank account number</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">Confirm Account Number</div>
                                            <div className="text-sm text-zinc-400">Re-enter account number</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">IFSC Code</div>
                                            <div className="text-sm text-zinc-400">Bank&apos;s IFSC routing code</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium text-white">Branch Name</div>
                                            <div className="text-sm text-zinc-400">Bank branch location</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Terms and Conditions */}
                            <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-amber-400" />
                                        Terms Acceptance
                                    </CardTitle>
                                    <CardDescription>Agreement to platform terms and conditions</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="font-medium text-white">Terms Accepted</div>
                                        <div className="text-sm text-zinc-400">Checkbox to accept payment processing terms and conditions</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-3-review">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Step 3: Review Information Thoroughly</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Before submitting your bank verification form, carefully review all entered information. This data will be used for payment management and cannot be easily changed after verification.
                    </p>

                    <ImagePlaceholder src='/docs/bank-submission-confirmation.png' />

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold tracking-tight mb-6 scroll-m-20">Verification Checklist</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-red-500/10 border-red-500/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <AlertTriangle className="h-5 w-5 text-red-400" />
                                        Critical Checks
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">Account Numbers Match</div>
                                                <div className="text-sm text-zinc-400">Verify both account number fields are identical</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">IFSC Code Accuracy</div>
                                                <div className="text-sm text-zinc-400">Double-check IFSC code format and validity</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">PAN Card Format</div>
                                                <div className="text-sm text-zinc-400">Ensure PAN follows correct format (ABCDE1234F)</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-blue-500/10 border-blue-500/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <CheckCircle className="h-5 w-5 text-blue-400" />
                                        Final Verification
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">Business Name Spelling</div>
                                                <div className="text-sm text-zinc-400">Match exactly with registration documents</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">Address Completeness</div>
                                                <div className="text-sm text-zinc-400">Include all required address components</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">Contact Information</div>
                                                <div className="text-sm text-zinc-400">Verify contact name and details are current</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Callout>
                            <p>
                                <strong>Important:</strong> Once submitted, bank verification details cannot be easily modified. Contact support for any changes after submission.
                            </p>
                        </Callout>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-4-verification">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Step 4: Bank Verification Process</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        After submitting your bank verification form, the system will process your information and verify the provided bank account details through secure banking channels.
                    </p>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold tracking-tight mb-6 scroll-m-20">Verification Timeline</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="bg-blue-500/10 border-blue-500/20">
                                <CardHeader className="text-center">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <FileText className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <CardTitle className="text-lg">Immediate</CardTitle>
                                    <CardDescription>Form validation</CardDescription>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-sm text-zinc-300">Initial validation of submitted information and format checks</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-amber-500/10 border-amber-500/20">
                                <CardHeader className="text-center">
                                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Lock className="h-6 w-6 text-amber-400" />
                                    </div>
                                    <CardTitle className="text-lg">24-48 Hours</CardTitle>
                                    <CardDescription>Bank verification</CardDescription>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-sm text-zinc-300">Secure verification with banking partners and account validation</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-green-500/10 border-green-500/20">
                                <CardHeader className="text-center">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <CheckCircle className="h-6 w-6 text-green-400" />
                                    </div>
                                    <CardTitle className="text-lg">Upon Approval</CardTitle>
                                    <CardDescription>Account activation</CardDescription>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-sm text-zinc-300">Full payment collection capabilities enabled for your account</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-blue-400" />
                                    Status Updates
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-zinc-300">Email confirmation upon form submission</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-amber-400 rounded-full" />
                                        <span className="text-zinc-300">Progress updates during verification process</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                                        <span className="text-zinc-300">Approval notification with next steps</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-5-complete">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Step 5: Verification Complete - Start Selling</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Once your bank verification is approved, you&apos;ll be redirected back to your admin dashboard where you can begin adding products and accepting payments from customers.
                    </p>

                    <ImagePlaceholder src='/docs/bank-verified.png' />

                    <div className="mt-8">
                        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                            <CardHeader className="text-center">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Gift className="h-8 w-8 text-green-400" />
                                </div>
                                <CardTitle className="text-xl">Congratulations!</CardTitle>
                                <CardDescription>Your bank account has been successfully verified</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-zinc-300 mb-6">
                                    You can now start adding products to your store and begin collecting payments from customers. Your ZERO | HUB seller account is fully operational!
                                </p>
                                <div className="flex justify-center">
                                    <Button className="bg-green-600 hover:bg-green-700">
                                        Start Adding Products
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold tracking-tight mb-6 scroll-m-20">What&apos;s Next?</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                                        <Store className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <CardTitle className="text-lg">Add Products</CardTitle>
                                    <CardDescription>Upload your products to start selling</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-zinc-300">Create product listings with images, descriptions, and pricing to attract customers.</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-3">
                                        <Palette className="h-6 w-6 text-purple-400" />
                                    </div>
                                    <CardTitle className="text-lg">Customize Store</CardTitle>
                                    <CardDescription>Personalize your store appearance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-zinc-300">Configure your store settings, branding, and layout to match your business identity.</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                                        <CreditCard className="h-6 w-6 text-green-400" />
                                    </div>
                                    <CardTitle className="text-lg">Accept Payments</CardTitle>
                                    <CardDescription>Start receiving customer payments</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-zinc-300">With verified banking, you can now process secure payments from customers worldwide.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Troubleshooting */}
                <section className="scroll-mt-20" id="troubleshooting">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Troubleshooting</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Common issues and solutions during the bank verification process.
                    </p>

                    <div className="space-y-6">
                        <Card className="bg-red-500/10 border-red-500/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-red-400" />
                                    Verification Failed
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-white mb-2">Common Causes:</h4>
                                        <div className="space-y-2 text-sm text-zinc-300">
                                            <div className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2" />
                                                <span>Incorrect account number or IFSC code</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2" />
                                                <span>Mismatch between account holder name and business name</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2" />
                                                <span>Invalid PAN card format or number</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2" />
                                                <span>Incomplete or invalid address information</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white mb-2">Solution:</h4>
                                        <p className="text-sm text-zinc-300">Review all entered information carefully and resubmit with corrected details. Contact support if issues persist.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-amber-500/10 border-amber-500/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                                    Verification Pending
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-white mb-2">What it means:</h4>
                                        <p className="text-sm text-zinc-300">Your information is being processed and verified with banking partners. This is normal and typically takes 24-48 hours.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white mb-2">What to do:</h4>
                                        <p className="text-sm text-zinc-300">Wait for the verification process to complete. You&apos;ll receive an email notification once it&apos;s done.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-500/10 border-blue-500/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-blue-400" />
                                    Need Help?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-blue-400" />
                                        <span className="text-zinc-300">Contact support for assistance</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-blue-400" />
                                        <span className="text-zinc-300">Email us with your verification details</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-4 w-4 text-blue-400" />
                                        <span className="text-zinc-300">Provide clear documentation for faster resolution</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Security Notice */}
                <section className="scroll-mt-20" id="security">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Security & Privacy</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Your banking information is protected with enterprise-grade security measures.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-green-400" />
                                    Data Protection
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                                        <div>
                                            <div className="font-medium text-white">256-bit SSL Encryption</div>
                                            <div className="text-sm text-zinc-400">All data transmitted securely</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                                        <div>
                                            <div className="font-medium text-white">PCI DSS Compliance</div>
                                            <div className="text-sm text-zinc-400">Industry-standard security protocols</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                                        <div>
                                            <div className="font-medium text-white">Regular Security Audits</div>
                                            <div className="text-sm text-zinc-400">Continuous monitoring and updates</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Lock className="h-5 w-5 text-blue-400" />
                                    Privacy Commitment
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                                        <div>
                                            <div className="font-medium text-white">Limited Data Access</div>
                                            <div className="text-sm text-zinc-400">Only authorized personnel can view</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                                        <div>
                                            <div className="font-medium text-white">No Data Selling</div>
                                            <div className="text-sm text-zinc-400">Your information is never sold to third parties</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                                        <div>
                                            <div className="font-medium text-white">Secure Storage</div>
                                            <div className="text-sm text-zinc-400">Encrypted storage in secure data centers</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-6">
                        <Callout>
                            <p>
                                <strong>Privacy First:</strong> We only collect the minimum information required for bank verification and payment processing. Your data is never shared without your explicit consent.
                            </p>
                        </Callout>
                    </div>
                </section>

                {/* Quick Reference */}
                <section className="scroll-mt-20" id="quick-reference">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Quick Reference</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Essential information and requirements at a glance.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-blue-400" />
                                    Required Fields Checklist
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                        <span className="text-zinc-300">Legal Business Name</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                        <span className="text-zinc-300">Business Subcategory</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                        <span className="text-zinc-300">Contact Name</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                        <span className="text-zinc-300">Complete Address</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                        <span className="text-zinc-300">Account Holder Name</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                        <span className="text-zinc-300">Bank Account Number</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                        <span className="text-zinc-300">IFSC Code</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                        <span className="text-zinc-300">PAN Card Number</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                        <span className="text-zinc-300">Terms Acceptance</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-amber-400" />
                                    Quick Tips
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <Star className="h-4 w-4 text-amber-400 mt-0.5" />
                                        <span className="text-zinc-300">Double-check account numbers before submission</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Star className="h-4 w-4 text-amber-400 mt-0.5" />
                                        <span className="text-zinc-300">Use exact business name from registration</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Star className="h-4 w-4 text-amber-400 mt-0.5" />
                                        <span className="text-zinc-300">Verify IFSC code with your bank</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Star className="h-4 w-4 text-amber-400 mt-0.5" />
                                        <span className="text-zinc-300">PAN format: ABCDE1234F (5 letters, 4 digits, 1 letter)</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Star className="h-4 w-4 text-amber-400 mt-0.5" />
                                        <span className="text-zinc-300">Complete address improves verification speed</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Star className="h-4 w-4 text-amber-400 mt-0.5" />
                                        <span className="text-zinc-300">Keep banking documents handy for reference</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>

            <DocsPager />
        </div>
    )
}

export default DocsPage