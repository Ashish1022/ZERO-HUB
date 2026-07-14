import React from 'react'
import { Globe, Rocket, Shield, Users, Zap, Store, BarChart, Bot, Lock, Plug } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DocsPager } from '@/modules/docs/ui/components/docs-pager'

interface FeatureCardProps {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    gradient: string
    iconColor: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, gradient, iconColor }) => (
    <Card className={`${gradient} border-opacity-20 hover:scale-105 transition-transform duration-300`}>
        <CardHeader className="text-center pb-3">
            <div className={`w-12 h-12 ${iconColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <Icon className="h-6 w-6" />
            </div>
            <CardTitle className="text-lg text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
            <CardDescription className="text-center text-zinc-300">{description}</CardDescription>
        </CardContent>
    </Card>
)

interface StatsCardProps {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
    gradient: string
    iconColor: string
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, value, label, gradient, iconColor }) => (
    <div className={`${gradient} p-6 rounded-lg border border-opacity-20 text-center`}>
        <div className={`w-12 h-12 ${iconColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
            <Icon className="h-6 w-6" />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-zinc-400">{label}</div>
    </div>
)

const DocsOverview: React.FC = () => {
    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                    <Rocket className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-blue-300 font-medium">Multi-Tenant E-commerce Platform</span>
                </div>

                <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
                    ZERO | HUB
                </h1>

                <p className="text-xl text-zinc-300 mb-4 max-w-3xl mx-auto leading-relaxed">
                    Transform your business from offline to online with our comprehensive business operations platform.
                    Launch your unique ecommerce store with your own subdomain—no platform fees, just a simple monthly subscription.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                <StatsCard
                    icon={Store}
                    value="100+"
                    label="Integrations"
                    gradient="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500"
                    iconColor="bg-blue-500/20 text-blue-400"
                />
                <StatsCard
                    icon={Shield}
                    value="99.9%"
                    label="Uptime"
                    gradient="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500"
                    iconColor="bg-green-500/20 text-green-400"
                />
                <StatsCard
                    icon={Zap}
                    value="<10min"
                    label="Setup Time"
                    gradient="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500"
                    iconColor="bg-purple-500/20 text-purple-400"
                />
                <StatsCard
                    icon={Users}
                    value="24/7"
                    label="Support"
                    gradient="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500"
                    iconColor="bg-amber-500/20 text-amber-400"
                />
            </div>

            <section className="mb-16 scroll-mt-20" id="core-features">
                <div className="text-center mb-12">
                    <h2 id="core-features" className="text-3xl font-bold text-white mb-4">Everything You Need to Succeed Online</h2>
                    <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
                        Comprehensive tools and features designed to help you build, manage, and scale your online business efficiently.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={BarChart}
                        title="Advanced Analytics"
                        description="Real-time, customizable dashboards for tracking performance and business trends"
                        gradient="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20"
                        iconColor="bg-blue-500/20 text-blue-400"
                    />
                    <FeatureCard
                        icon={Zap}
                        title="Automation Tools"
                        description="Reduce manual tasks and optimize your business processes automatically"
                        gradient="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20"
                        iconColor="bg-purple-500/20 text-purple-400"
                    />
                    <FeatureCard
                        icon={Lock}
                        title="Enterprise Security"
                        description="Bank-grade data protection with encryption, audits, and compliance"
                        gradient="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20"
                        iconColor="bg-green-500/20 text-green-400"
                    />
                    <FeatureCard
                        icon={Plug}
                        title="100+ Integrations"
                        description="Connect with your favorite tools and services via powerful APIs"
                        gradient="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20"
                        iconColor="bg-amber-500/20 text-amber-400"
                    />
                    <FeatureCard
                        icon={Bot}
                        title="AI Insights"
                        description="Predictive analytics that surface patterns and smart recommendations"
                        gradient="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20"
                        iconColor="bg-indigo-500/20 text-indigo-400"
                    />
                    <FeatureCard
                        icon={Globe}
                        title="Custom Subdomains"
                        description="Your unique store URL that reflects your brand identity"
                        gradient="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-teal-500/20"
                        iconColor="bg-teal-500/20 text-teal-400"
                    />
                </div>
            </section>

            <section className="mb-16 scroll-mt-20" id="business-stages">
                <div className="text-center mb-12">
                    <h2 id="business-stages" className="text-3xl font-bold text-white mb-4">Perfect For Every Business Stage</h2>
                    <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
                        Whether you&apos;re just starting out or scaling to enterprise level, ZERO | HUB has the right solution for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 text-center">
                        <CardHeader>
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Rocket className="h-8 w-8 text-green-400" />
                            </div>
                            <CardTitle className="text-xl text-white">Small Businesses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-zinc-300 mb-4">
                                Perfect for entrepreneurs launching their first online storefront with minimal investment.
                            </p>
                            <ul className="text-sm text-zinc-400 space-y-1 text-left">
                                <li>• Quick setup and launch</li>
                                <li>• Affordable pricing</li>
                                <li>• Easy-to-use interface</li>
                                <li>• Basic analytics and tools</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 text-center">
                        <CardHeader>
                            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BarChart className="h-8 w-8 text-purple-400" />
                            </div>
                            <CardTitle className="text-xl text-white">Growing Merchants</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-zinc-300 mb-4">
                                Ideal for businesses needing enhanced CMS, analytics, and marketing capabilities.
                            </p>
                            <ul className="text-sm text-zinc-400 space-y-1 text-left">
                                <li>• Advanced marketing tools</li>
                                <li>• Enhanced analytics</li>
                                <li>• SEO optimization</li>
                                <li>• Priority support</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-center">
                        <CardHeader>
                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-8 w-8 text-blue-400" />
                            </div>
                            <CardTitle className="text-xl text-white">Enterprises</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-zinc-300 mb-4">
                                Comprehensive solution for large organizations requiring white-labeling and team access.
                            </p>
                            <ul className="text-sm text-zinc-400 space-y-1 text-left">
                                <li>• White-label customization</li>
                                <li>• Team collaboration tools</li>
                                <li>• Enterprise security</li>
                                <li>• Dedicated support</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>
            <DocsPager
                next={{
                    href: "/docs/introduction",
                    title: "Introduction",
                }}
            />
        </div>
    )
}

export default DocsOverview