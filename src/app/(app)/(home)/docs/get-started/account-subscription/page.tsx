import React from 'react'
import { CheckCircle, Shield, Users, Zap, CreditCard, Store, User, Palette, Star, Crown } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
                heading="Subscription Activation Guide"
                text="Complete guide to purchasing and activating your ZERO | HUB subscription plan to unlock premium features."
                badge="Account Setup"
            />

            <div className="space-y-12">
                <section className="scroll-mt-20" id="overview">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20" id="overview">Overview</h2>
                    <p className="text-zinc-300 leading-7 mb-8">
                        After successfully creating your ZERO | HUB seller account, you&apos;ll need to activate a subscription plan to access full platform features.
                        This guide walks you through the subscription process from accessing the purchase button to verifying your active subscription.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
                        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                            <CardHeader className="text-center">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Store className="h-6 w-6 text-blue-400" />
                                </div>
                                <CardTitle className="text-lg">Access Dashboard</CardTitle>
                                <CardDescription>Login to admin panel</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                            <CardHeader className="text-center">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <CreditCard className="h-6 w-6 text-purple-400" />
                                </div>
                                <CardTitle className="text-lg">Purchase Plan</CardTitle>
                                <CardDescription>Select subscription tier</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                            <CardHeader className="text-center">
                                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Shield className="h-6 w-6 text-green-400" />
                                </div>
                                <CardTitle className="text-lg">Complete Payment</CardTitle>
                                <CardDescription>Secure checkout process</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                            <CardHeader className="text-center">
                                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <CheckCircle className="h-6 w-6 text-amber-400" />
                                </div>
                                <CardTitle className="text-lg">Verify Status</CardTitle>
                                <CardDescription>Confirm activation</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-1-dashboard">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20" id="step-1-dashboard">Step 1: Access Admin Dashboard</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        After completing your account setup and email verification, log into your admin dashboard to begin the subscription process.
                    </p>

                    <ImagePlaceholder src='/docs/login.png' />

                    <div className="mt-6">
                        <Callout>
                            <p>
                                <strong>Prerequisites:</strong> Ensure you have completed account registration and email verification before proceeding with subscription purchase.
                            </p>
                        </Callout>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-2-purchase-button">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20" id="step-2-purchase-button">Step 2: Locate Purchase Subscription Button</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        In your admin dashboard, look for the &quot;Purchase Subscription&quot; button located in the left sidebar navigation menu.
                    </p>

                    <ImagePlaceholder
                        src='/docs/subscription-button.png'
                    />

                    <div className="mt-8">
                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-purple-400" />
                                    Button Location
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                                        <span className="text-zinc-300">Located in the left sidebar navigation</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-zinc-300">Clearly labeled &quot;Purchase Subscription&quot;</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                                        <span className="text-zinc-300">Visible immediately after login</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-3-plans">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20" id="step-3-plans">Step 3: Choose Your Subscription Plan</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Click the &quot;Purchase Subscription&quot; button to navigate to the subscription plans page where you can compare and select the plan that best fits your business needs.
                    </p>

                    <ImagePlaceholder
                        src='/docs/subscription-page.png'
                    />

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold tracking-tight mb-6 scroll-m-20" id="available-plans">Available Plans</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="bg-gradient-to-br from-slate-500/10 to-zinc-500/10 border-slate-500/20">
                                <CardHeader className="text-center">
                                    <div className="w-12 h-12 bg-slate-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <User className="h-6 w-6 text-slate-400" />
                                    </div>
                                    <CardTitle className="text-lg">Basic Plan</CardTitle>
                                    <CardDescription>Perfect for small businesses</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm text-zinc-300">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>Up to 100 products</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>Basic analytics</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>Email support</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 relative">
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-medium">
                                        Most Popular
                                    </div>
                                </div>
                                <CardHeader className="text-center">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Star className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <CardTitle className="text-lg">Professional Plan</CardTitle>
                                    <CardDescription>Ideal for growing businesses</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm text-zinc-300">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>Up to 1,000 products</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>Advanced analytics</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>Priority support</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>Custom themes</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                                <CardHeader className="text-center">
                                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Crown className="h-6 w-6 text-amber-400" />
                                    </div>
                                    <CardTitle className="text-lg">Enterprise Plan</CardTitle>
                                    <CardDescription>For large-scale operations</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm text-zinc-300">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>Unlimited products</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>Full analytics suite</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>24/7 phone support</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>White-label options</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-4-payment">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20" id="step-4-payment">Step 4: Complete Payment Process</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        After selecting your preferred subscription plan, proceed to the secure checkout page to complete your payment and activate your subscription.
                    </p>

                    <ImagePlaceholder
                        src='/docs/purchase-page.png'
                    />

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold tracking-tight mb-6 scroll-m-20" id="payment-information">Payment Information Required</h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="bg-zinc-800/20 border-zinc-700/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <CreditCard className="h-5 w-5 text-blue-400" />
                                        Payment Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">Credit/Debit Card</div>
                                                <div className="text-sm text-zinc-400">Visa, MasterCard, American Express</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">Digital Wallets</div>
                                                <div className="text-sm text-zinc-400">PayPal, Apple Pay, Google Pay</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">Bank Transfer</div>
                                                <div className="text-sm text-zinc-400">Direct bank payment options</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-zinc-800/20 border-zinc-700/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Shield className="h-5 w-5 text-green-400" />
                                        Security Features
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">SSL Encryption</div>
                                                <div className="text-sm text-zinc-400">256-bit secure connection</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">PCI Compliance</div>
                                                <div className="text-sm text-zinc-400">Industry-standard security</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">Fraud Protection</div>
                                                <div className="text-sm text-zinc-400">Advanced fraud detection</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Callout variant="info">
                            <p>
                                <strong>Secure Processing:</strong> All payments are processed through our secure payment gateway with industry-standard encryption and security measures.
                            </p>
                        </Callout>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-5-activation">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20" id="step-5-activation">Step 5: Automatic Redirect to Dashboard</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Upon successful payment completion, you will be automatically redirected back to your admin dashboard. The system will process your subscription activation in the background.
                    </p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Callout>
                            <p>
                                <strong>Processing Time:</strong> Subscription activation typically takes 1-3 minutes after successful payment.
                            </p>
                        </Callout>

                        <Callout variant="info">
                            <p>
                                <strong>Email Confirmation:</strong> You will receive a confirmation email with your subscription details and receipt.
                            </p>
                        </Callout>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-6-verification">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20" id="step-6-verification">Step 6: Verify Subscription Status</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        To confirm your subscription has been successfully activated, check the sidebar where the &quot;Purchase Subscription&quot; button should now display as &quot;Subscription Purchased&quot;.
                    </p>

                    <ImagePlaceholder
                        src='/docs/subcription-complete.png'
                    />

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold tracking-tight mb-6 scroll-m-20" id="verification-steps">Verification Steps</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-red-500/10 border-red-500/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <CreditCard className="h-5 w-5 text-red-400" />
                                        Before Purchase
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                                            <span className="font-medium text-white">Purchase Subscription</span>
                                        </div>
                                        <p className="text-sm text-zinc-400 mt-2">Button appears when no active subscription exists</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-green-500/10 border-green-500/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <CheckCircle className="h-5 w-5 text-green-400" />
                                        After Purchase
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                                            <span className="font-medium text-white">Subscription Purchased</span>
                                        </div>
                                        <p className="text-sm text-zinc-400 mt-2">Button confirms active subscription status</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="scroll-mt-20" id="additional-features">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20" id="additional-features">Additional Subscription Features</h2>
                    <p className="text-zinc-300 leading-7 mb-8">
                        With your subscription activated, you now have access to enhanced features and capabilities within your ZERO | HUB seller account.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-blue-400" />
                                    <CardTitle className="text-lg">Enhanced Analytics</CardTitle>
                                </div>
                                <CardDescription>Advanced reporting and insights</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-zinc-300">
                                    Access detailed sales reports, customer analytics, and performance metrics to grow your business.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Palette className="h-5 w-5 text-purple-400" />
                                    <CardTitle className="text-lg">Premium Themes</CardTitle>
                                </div>
                                <CardDescription>Professional store designs</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-zinc-300">
                                    Choose from a collection of premium themes to create a unique and professional storefront.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-green-400" />
                                    <CardTitle className="text-lg">Priority Support</CardTitle>
                                </div>
                                <CardDescription>Dedicated customer assistance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-zinc-300">
                                    Get priority support with faster response times and dedicated assistance for your business needs.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="scroll-mt-20" id="troubleshooting">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20" id="troubleshooting">Troubleshooting</h2>

                    <div className="space-y-6">
                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Payment Issues</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-zinc-300">• Verify that your payment method has sufficient funds</p>
                                <p className="text-sm text-zinc-300">• Check that all billing information is entered correctly</p>
                                <p className="text-sm text-zinc-300">• Try using a different payment method if the transaction fails</p>
                                <p className="text-sm text-zinc-300">• Contact your bank if payments are being declined</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Subscription Not Activated</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-zinc-300">• Wait 5-10 minutes as activation may take time to process</p>
                                <p className="text-sm text-zinc-300">• Refresh your browser and check the sidebar button status</p>
                                <p className="text-sm text-zinc-300">• Check your email for payment confirmation</p>
                                <p className="text-sm text-zinc-300">• Contact support if the issue persists after 30 minutes</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Button Status Not Changing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-zinc-300">• Log out and log back into your admin dashboard</p>
                                <p className="text-sm text-zinc-300">• Clear your browser cache and cookies</p>
                                <p className="text-sm text-zinc-300">• Try accessing the dashboard from a different browser</p>
                                <p className="text-sm text-zinc-300">• Ensure you&apos;re logged into the correct account</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>

            <DocsPager
                prev={{
                    href: "/docs/get-started/account-setup",
                    title: "Account Setup Guide",
                }}
                next={{
                    href: "/docs/get-started/account-verification",
                    title: "Account Verification",
                }}
            />
        </div>
    )
}

export default DocsPage