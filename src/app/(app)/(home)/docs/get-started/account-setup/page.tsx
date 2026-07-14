import React from 'react'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Rocket, Shield, Zap, CreditCard, Store, User, Settings, Palette } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DocsHeader } from '@/modules/docs/ui/components/header'
import { Callout } from '@/modules/docs/ui/components/callout'
import { DocsPager } from '@/modules/docs/ui/components/docs-pager'
import Link from 'next/link'

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
                heading="Account Setup Guide"
                text="Complete guide to creating your ZERO | HUB seller account and setting up your online store in minutes."
                badge="Getting Started"
            />

            <div className="space-y-12">
                {/* Overview */}
                <section className="scroll-mt-20" id="overview">
                    <h2 id="overview" className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Overview</h2>
                    <p className="text-zinc-300 leading-7 mb-8">
                        Setting up your ZERO | HUB seller account is a straightforward process that takes less than 10 minutes.
                        This guide walks you through each step from initial registration to accessing your fully functional admin dashboard.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                            <CardHeader className="text-center">
                                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <User className="h-6 w-6 text-green-400" />
                                </div>
                                <CardTitle className="text-lg">Account Creation</CardTitle>
                                <CardDescription>Register with basic information</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                            <CardHeader className="text-center">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Shield className="h-6 w-6 text-blue-400" />
                                </div>
                                <CardTitle className="text-lg">Email Verification</CardTitle>
                                <CardDescription>Confirm your email with OTP</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                            <CardHeader className="text-center">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Rocket className="h-6 w-6 text-purple-400" />
                                </div>
                                <CardTitle className="text-lg">Store Setup</CardTitle>
                                <CardDescription>Access dashboard and customize</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-1-homepage">
                    <h2 id="step-1-registration-page" className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Step 1: Access the Registration Page</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Begin your journey by navigating to the ZERO | HUB homepage and clicking the &quot;Start Selling&quot; button to access the registration form.
                    </p>

                    <ImagePlaceholder
                        src='/docs/home.png'
                    />

                    <div className="mt-6">
                        <Callout>
                            <p>
                                <strong>Note:</strong> The &quot;Start Selling&quot; button is prominently displayed on the homepage and will redirect you to the registration form.
                            </p>
                        </Callout>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-2-registration">
                    <h2 id="step-2-registration-form" className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Step 2: Complete Registration Form</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Fill out the registration form with the required information to create your seller account. All fields are mandatory for account creation.
                    </p>

                    <ImagePlaceholder
                        src='/docs/signup.png'
                    />

                    <div className="mt-8">
                        <h3 id="required-information" className="text-xl font-semibold tracking-tight mb-6 scroll-m-20">Required Information</h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="bg-zinc-800/20 border-zinc-700/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <User className="h-5 w-5 text-blue-400" />
                                        Account Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">Username</div>
                                                <div className="text-sm text-zinc-400">Creates your unique store URL</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">Email Address</div>
                                                <div className="text-sm text-zinc-400">For verification and notifications</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">Password</div>
                                                <div className="text-sm text-zinc-400">Secure password for account access</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-zinc-800/20 border-zinc-700/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Store className="h-5 w-5 text-purple-400" />
                                        Store Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">Store Display Name</div>
                                                <div className="text-sm text-zinc-400">Public name shown to customers</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2" />
                                            <div>
                                                <div className="font-medium text-white">Phone Number</div>
                                                <div className="text-sm text-zinc-400">For verification and contact</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-3-verification">
                    <h2 id="step-3-email-verification" className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Step 3: Email Verification</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        After submitting the registration form, you&apos;ll receive a one-time password (OTP) via email. Enter this code to verify your account.
                    </p>

                    <ImagePlaceholder
                        src='/docs/otp.png'
                    />

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Callout variant="info">
                            <p>
                                <strong>Check Your Email:</strong> The OTP will be sent to the email address you provided during registration. Check your inbox and spam folder.
                            </p>
                        </Callout>

                        <Callout>
                            <p>
                                <strong>Code Expiry:</strong> The verification code expires after 10 minutes. Request a new code if needed.
                            </p>
                        </Callout>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-4-dashboard">
                    <h2 id="step-4-admin-dashboard" className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Step 4: Admin Dashboard Access</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Upon successful verification, you&apos;ll be automatically redirected to your admin dashboard where you can manage your store.
                    </p>

                    <ImagePlaceholder
                        src='/docs/admin.png'
                    />

                    <div className="mt-8">
                        <h3 id="dashboard-features" className="text-xl font-semibold tracking-tight mb-6 scroll-m-20">Dashboard Features</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 text-center">
                                <Store className="h-8 w-8 text-green-400 mx-auto mb-3" />
                                <div className="font-medium text-white mb-1">Store Management</div>
                                <div className="text-xs text-zinc-400">Configure store settings</div>
                            </div>
                            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 text-center">
                                <Zap className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                                <div className="font-medium text-white mb-1">Product Catalog</div>
                                <div className="text-xs text-zinc-400">Add and manage products</div>
                            </div>
                            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20 text-center">
                                <CreditCard className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                                <div className="font-medium text-white mb-1">Order Management</div>
                                <div className="text-xs text-zinc-400">Track and fulfill orders</div>
                            </div>
                            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20 text-center">
                                <Settings className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                                <div className="font-medium text-white mb-1">Account Settings</div>
                                <div className="text-xs text-zinc-400">Manage account details</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 id="account-information-access" className="text-lg font-semibold text-white mb-4">Account Information Access</h3>
                        <p className="text-zinc-300 mb-4">
                            Click on the user icon in the top-right corner to access your account information, including email, username, and other profile details.
                        </p>

                        <ImagePlaceholder src='/docs/user.png' />
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-5-configuration">
                    <h2 id="step-5-store-configuration" className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Step 5: Store Configuration</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Navigate to the Tenant section in the sidebar to access your store&apos;s main control center and customize your store appearance.
                    </p>

                    <ImagePlaceholder src='/docs/tenant.png' />

                    <div className="mt-8">
                        <h3 id="template-selection" className="text-xl font-semibold tracking-tight mb-6 scroll-m-20">Template Selection</h3>
                        <p className="text-zinc-300 leading-7 mb-6">
                            Choose from available templates to customize your store&apos;s appearance. A default template is pre-selected, with additional premium templates available for purchase.
                        </p>

                        <ImagePlaceholder src='/docs/template.png' />

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-zinc-800/20 border-zinc-700/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-400" />
                                        Default Template
                                    </CardTitle>
                                    <CardDescription>Pre-configured and ready to use</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-zinc-300">
                                        A clean, professional template that&apos;s automatically applied to your store upon account creation.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-zinc-800/20 border-zinc-700/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Palette className="h-5 w-5 text-purple-400" />
                                        Premium Templates
                                    </CardTitle>
                                    <CardDescription>Additional designs available for purchase</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-zinc-300">
                                        Explore and purchase additional templates to give your store a unique appearance.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="scroll-mt-20" id="step-6-preview">
                    <h2 id="step-6-store-preview" className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Step 6: Store Preview</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Use the preview function to see how your store will appear to customers. This allows you to test different templates and configurations before making them live.
                    </p>

                    <ImagePlaceholder src='/templates/1.png' />

                    <div className="mt-8">
                        <Callout>
                            <p>
                                <strong>Live Preview:</strong> The preview shows your store exactly as customers will see it, including all applied themes and configurations.
                            </p>
                        </Callout>
                    </div>
                </section>

                <section className="scroll-mt-20" id="next-steps">
                    <h2 id="next-steps" className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Next Steps</h2>
                    <p className="text-zinc-300 leading-7 mb-8">
                        With your account created and store configured, you&apos;re ready to start building your product catalog and accepting orders.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-blue-400" />
                                    <CardTitle className="text-lg">Activate Account</CardTitle>
                                </div>
                                <CardDescription>Upload your account status</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="ghost" className="w-full justify-between">
                                    <Link href='/docs/account-subscription' className='flex justify-between items-center w-full'>
                                        Account Subscription
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-green-400" />
                                    <CardTitle className="text-lg">Account Verification</CardTitle>
                                </div>
                                <CardDescription>Configure Bank Account</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="ghost" asChild className="w-full justify-between">
                                    <Link href='/docs/account-verification' className='flex justify-between items-center w-full'>
                                        Account Verification
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="scroll-mt-20" id="troubleshooting">
                    <h2 id="troubleshooting" className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Troubleshooting</h2>

                    <div className="space-y-6">
                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Email Verification Issues</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-zinc-300">• Check your spam/junk folder for the verification email</p>
                                <p className="text-sm text-zinc-300">• Ensure the email address was entered correctly during registration</p>
                                <p className="text-sm text-zinc-300">• Request a new verification code if the current one has expired</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Login Problems</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-zinc-300">• Verify that your account has been successfully created and verified</p>
                                <p className="text-sm text-zinc-300">• Check that you&apos;re using the correct username and password</p>
                                <p className="text-sm text-zinc-300">• Use the password reset function if you&apos;ve forgotten your credentials</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>

            <DocsPager
                next={{
                    href: "/docs/get-started/account-subscription",
                    title: "Account Subscription",
                }}
            />
        </div>
    )
}

export default DocsPage