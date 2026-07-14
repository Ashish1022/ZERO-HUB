import React from 'react'
import { CheckCircle, Globe, Rocket, Shield, Users, Zap, Store, Settings, Palette, BarChart, Bot, Plug, IndianRupee, Clock, Target, TrendingUp, Award } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DocsHeader } from '@/modules/docs/ui/components/header'
import { DocsPager } from '@/modules/docs/ui/components/docs-pager'

interface BenefitCardProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    gradient: string;
    iconColor: string;
}

interface FeatureHighlightProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    color: string;
}

const BenefitCard = ({ icon: Icon, title, description, gradient, iconColor }: BenefitCardProps) => (
    <Card className={`${gradient} border-opacity-20 hover:scale-105 transition-all duration-300 hover:shadow-lg`}>
        <CardHeader className="pb-3">
            <div className={`w-12 h-12 ${iconColor} rounded-full flex items-center justify-center mb-3`}>
                <Icon className="h-6 w-6" />
            </div>
            <CardTitle className="text-lg text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
            <p className="text-zinc-300 text-sm leading-relaxed">{description}</p>
        </CardContent>
    </Card>
)

const FeatureHighlight = ({ icon: Icon, title, description, color }: FeatureHighlightProps) => (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/50 hover:border-opacity-100 transition-colors">
        <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <Icon className="h-4 w-4" />
        </div>
        <div>
            <h4 className="font-medium text-white mb-1">{title}</h4>
            <p className="text-sm text-zinc-400">{description}</p>
        </div>
    </div>
)

const IntroductionPage = () => {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <DocsHeader
                heading="Welcome to ZERO | HUB"
                text="Your complete guide to building a successful online business with our multi-tenant ecommerce platform. No platform fees, just pure growth potential."
                badge="Introduction"
            />

            <div className="space-y-12">
                <section className="scroll-mt-20" id="what-is-zerohub">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20" id="what-is-zerohub">What is ZERO | HUB?</h2>

                    <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 rounded-lg p-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Rocket className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2" id="multi-tenant-platform">Multi-Tenant Business Operations Platform</h3>
                                <p className="text-zinc-300 leading-7">
                                    ZERO | HUB is a comprehensive business operations platform designed to help companies transition from offline to online presence.
                                    We provide a full suite of tools to set up and manage digital storefronts and workflows—all from a single, powerful dashboard.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-zinc-300 leading-7 mb-6">
                        Unlike traditional ecommerce platforms that charge platform fees on every sale, ZERO | HUB operates on a simple monthly subscription model.
                        This means you keep 100% of your revenue while getting access to enterprise-grade features that scale with your business.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Globe className="h-5 w-5 text-blue-400" />
                                    Your Unique Subdomain
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-zinc-300 text-sm mb-3">
                                    Get your own branded subdomain like <code className="bg-zinc-700 px-2 py-1 rounded text-blue-300">yourstore.zerohub.site</code>
                                    that reflects your brand identity and builds customer trust.
                                </p>
                                <div className="flex items-center gap-2 text-sm text-green-400">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>SSL certificate included</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <IndianRupee className="h-5 w-5 text-green-400" />
                                    No Platform Fees
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-zinc-300 text-sm mb-3">
                                    Keep 100% of your revenue. Pay only a simple monthly subscription fee,
                                    no matter how much you sell.
                                </p>
                                <div className="flex items-center gap-2 text-sm text-green-400">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Transparent pricing</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Key Benefits */}
                <section className="scroll-mt-20" id="key-benefits">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20" id="why-choose-zerohub">Why Choose ZERO | HUB?</h2>
                    <p className="text-zinc-300 leading-7 mb-8">
                        Our platform is built specifically for businesses that want to maintain control over their brand,
                        revenue, and customer relationships while leveraging powerful ecommerce technology.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <BenefitCard
                            icon={Zap}
                            title="Lightning Fast Setup"
                            description="Launch your complete online store in under 10 minutes with our streamlined setup process and pre-configured templates."
                            gradient="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20"
                            iconColor="bg-amber-500/20 text-amber-400"
                        />
                        <BenefitCard
                            icon={Shield}
                            title="Enterprise Security"
                            description="Bank-grade security with SSL certificates, data encryption, regular audits, and compliance with industry standards."
                            gradient="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20"
                            iconColor="bg-green-500/20 text-green-400"
                        />
                        <BenefitCard
                            icon={TrendingUp}
                            title="Scalable Growth"
                            description="Start small and scale to enterprise level. Our infrastructure grows with your business without performance compromises."
                            gradient="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20"
                            iconColor="bg-blue-500/20 text-blue-400"
                        />
                        <BenefitCard
                            icon={Bot}
                            title="AI-Powered Insights"
                            description="Get intelligent recommendations and predictive analytics that help you make data-driven decisions for your business."
                            gradient="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20"
                            iconColor="bg-purple-500/20 text-purple-400"
                        />
                        <BenefitCard
                            icon={Plug}
                            title="100+ Integrations"
                            description="Connect seamlessly with your favorite tools, payment gateways, marketing platforms, and business applications."
                            gradient="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-teal-500/20"
                            iconColor="bg-teal-500/20 text-teal-400"
                        />
                        <BenefitCard
                            icon={Users}
                            title="24/7 Expert Support"
                            description="Get help when you need it with our dedicated support team available round the clock via chat, email, and phone."
                            gradient="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20"
                            iconColor="bg-indigo-500/20 text-indigo-400"
                        />
                    </div>
                </section>

                {/* Perfect For */}
                <section className="scroll-mt-20" id="perfect-for">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20" id="who-is-zerohub-for">Who is ZERO | HUB Perfect For?</h2>
                    <p className="text-zinc-300 leading-7 mb-8">
                        Our platform serves businesses at every stage of their digital transformation journey,
                        from first-time entrepreneurs to established enterprises.
                    </p>

                    <div className="space-y-8">
                        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <Rocket className="h-6 w-6 text-green-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl text-white">
                                            <h3 id="small-businesses-startups">Small Businesses & Startups</h3>
                                        </CardTitle>
                                        <CardDescription>Launching your first online storefront</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-zinc-300 mb-4">
                                    Perfect for entrepreneurs who want to test their business ideas online without heavy upfront investment or complex technical setup.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FeatureHighlight
                                        icon={Clock}
                                        title="Quick Launch"
                                        description="Get online in minutes, not weeks"
                                        color="bg-green-500/20 text-green-400"
                                    />
                                    <FeatureHighlight
                                        icon={IndianRupee}
                                        title="Low Cost"
                                        description="Starting at just ₹300/month"
                                        color="bg-green-500/20 text-green-400"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                                        <BarChart className="h-6 w-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl text-white">
                                            <h3 id="growing-merchants">Growing Merchants</h3>
                                        </CardTitle>
                                        <CardDescription>Scaling your existing business online</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-zinc-300 mb-4">
                                    Ideal for established businesses ready to enhance their online presence with advanced features,
                                    marketing tools, and detailed analytics.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FeatureHighlight
                                        icon={Zap}
                                        title="Marketing Tools"
                                        description="Advanced CMS, SEO, and automation"
                                        color="bg-purple-500/20 text-purple-400"
                                    />
                                    <FeatureHighlight
                                        icon={BarChart}
                                        title="Analytics"
                                        description="Detailed insights and reporting"
                                        color="bg-purple-500/20 text-purple-400"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                                        <Award className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl text-white">
                                            <h3 id="enterprise-organizations">Enterprise Organizations</h3>
                                        </CardTitle>
                                        <CardDescription>Large-scale operations and teams</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-zinc-300 mb-4">
                                    Comprehensive solution for organizations that need white-labeling, team collaboration,
                                    advanced security, and dedicated support.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FeatureHighlight
                                        icon={Palette}
                                        title="White-Label"
                                        description="Full brand customization"
                                        color="bg-blue-500/20 text-blue-400"
                                    />
                                    <FeatureHighlight
                                        icon={Users}
                                        title="Team Access"
                                        description="Multi-user collaboration"
                                        color="bg-blue-500/20 text-blue-400"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="scroll-mt-20" id="platform-architecture">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20" id="platform-architecture">Platform Architecture</h2>
                    <p className="text-zinc-300 leading-7 mb-6">
                        Understanding how ZERO | HUB works will help you make the most of our platform&apos;s capabilities.
                    </p>

                    <div className="bg-zinc-800/20 border border-zinc-700/50 rounded-lg p-6 mb-6" id="multi-tenant-architecture">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2" id="multi-tenant-architecture">
                            <Globe className="h-5 w-5 text-blue-400" />
                            Multi-Tenant Architecture
                        </h3>
                        <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                            Each store operates as an independent tenant with its own subdomain, database space, and customizations.
                            This ensures complete data isolation, security, and the ability to scale independently.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <Store className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                                <div className="text-sm font-medium text-white">Isolated Stores</div>
                                <div className="text-xs text-zinc-400">Complete separation</div>
                            </div>
                            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                                <Shield className="h-6 w-6 text-green-400 mx-auto mb-2" />
                                <div className="text-sm font-medium text-white">Secure Data</div>
                                <div className="text-xs text-zinc-400">Bank-grade protection</div>
                            </div>
                            <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                <Zap className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                                <div className="text-sm font-medium text-white">High Performance</div>
                                <div className="text-xs text-zinc-400">Optimized delivery</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-green-400" />
                                    Your Subdomain
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-zinc-300 text-sm mb-3">
                                    <code className="bg-zinc-700 px-2 py-1 rounded text-blue-300">yourstore.zerohub.site</code>
                                </p>
                                <ul className="text-sm text-zinc-400 space-y-1">
                                    <li>• Custom branding</li>
                                    <li>• SSL security</li>
                                    <li>• Fast global CDN</li>
                                    <li>• Mobile optimized</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5 text-purple-400" />
                                    Admin Dashboard
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-zinc-300 text-sm mb-3">
                                    Centralized control panel for your business
                                </p>
                                <ul className="text-sm text-zinc-400 space-y-1">
                                    <li>• Store management</li>
                                    <li>• Product catalog</li>
                                    <li>• Order processing</li>
                                    <li>• Analytics & reports</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>

            <DocsPager
                prev={{
                    href: '/docs',
                    title: 'Overview'
                }}
                next={{
                    href: "/docs/get-started/account-setup",
                    title: "Account Setup Guide",
                }}
            />
        </div>
    )
}

export default IntroductionPage