"use client"

import toast from 'react-hot-toast'
import React, { useState } from 'react'
import { ArrowRight, BarChart3, CheckCircle2, Clock, Cpu, Database, HelpCircle, Loader, Shield, Star, Users, Zap, Globe, FileText, Bot } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { useMutation } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
import { faqs, plans } from '@/constants/plans'
import { Skeleton } from "@/components/ui/skeleton"
import { formatPrice } from '@/lib/utils'

export const SubscriptionView = () => {

    const [billingPeriod, setBillingPeriod] = useState("monthly")
    const [selectedPlan, setSelectedPlan] = useState("pro")
    const [showDetailedFeatures, setShowDetailedFeatures] = useState(false)

    const trpc = useTRPC();
    const subscribeMutation = useMutation(trpc.onboarding.subscribe.mutationOptions({
        onSuccess: (data) => {
            window.location.href = data!.subscription.short_url
        },
        onError: () => {
            toast.error("Payment failed");
        }
    }));

    const handleProceed = () => {
        subscribeMutation.mutate({
            plan: selectedPlan,
        });
    };

    const selectedPlanData = plans.find((plan) => plan.id === selectedPlan)

    return (
        <div className="min-h-screen text-white">
            <main className="relative z-10">
                <section className="container px-4 py-12 mx-auto">
                    <div className="max-w-3xl mx-auto text-center">
                        <Badge className="mb-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-purple-500/30 text-xs">
                            <Zap className="h-3 w-3 mr-1" />
                            Simple, Transparent Pricing
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                            Deploy with Confidence
                        </h1>
                        <p className="text-lg text-zinc-400 mb-6 max-w-xl mx-auto">
                            Choose the perfect plan for your development workflow. Scale as you grow with no hidden fees.
                        </p>
                        <div className="flex items-center justify-center space-x-6 mb-6 text-xs text-zinc-500 flex-wrap gap-3">
                            <div className="flex items-center">
                                <Shield className="h-3 w-3 mr-1 text-emerald-400" />
                                <span>Enterprise Security</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-blue-400" />
                                <span>99.9% Uptime</span>
                            </div>
                            <div className="flex items-center">
                                <Globe className="h-3 w-3 mr-1 text-purple-400" />
                                <span>Global CDN</span>
                            </div>
                            <div className="flex items-center">
                                <Bot className="h-3 w-3 mr-1 text-yellow-400" />
                                <span>AI-Powered</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container px-4 mx-auto">
                    <div className="container mx-auto">
                        <div className="flex items-center justify-center mb-6 space-x-3">
                            <span className={`text-sm ${billingPeriod === "monthly" ? "text-white" : "text-zinc-400"}`}>
                                Monthly
                            </span>
                            <div
                                className={`w-10 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${billingPeriod === "yearly" ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-zinc-700"
                                    }`}
                                onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full bg-white transition-transform ${billingPeriod === "yearly" ? "translate-x-5" : ""
                                        }`}
                                />
                            </div>
                            <span className="flex items-center">
                                <span className={`text-sm ${billingPeriod === "yearly" ? "text-white" : "text-zinc-400"}`}>
                                    Yearly
                                </span>
                                <Badge className="ml-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 border-none text-xs px-2 py-0.5">
                                    Save 17%
                                </Badge>
                            </span>
                        </div>

                        <div className="flex justify-center mb-6">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowDetailedFeatures(!showDetailedFeatures)}
                                className="border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 text-xs px-3 py-1.5"
                            >
                                <FileText className="h-3 w-3 mr-1" />
                                {showDetailedFeatures ? "Simple View" : "Detailed Features"}
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {plans.map((plan) => {
                                const IconComponent = plan.icon
                                const isSelected = selectedPlan === plan.id

                                return (
                                    <div
                                        key={plan.id}
                                        className={`group relative cursor-pointer ${plan.popular ? "md:-mt-2 md:mb-2" : ""
                                            }`}
                                        onClick={() => setSelectedPlan(plan.id)}
                                    >
                                        <div
                                            className={`absolute -inset-0.5 bg-gradient-to-r from-zinc-600/20 to-zinc-700/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300 ${isSelected ? "opacity-75" : ""
                                                }`}
                                        />

                                        <div
                                            className={`relative bg-zinc-900/80 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-300 ${isSelected
                                                ? `${plan.selectedBorder} ${plan.selectedBg} shadow-xl scale-102`
                                                : `${plan.borderColor} ${plan.hoverBorder} hover:scale-101`
                                                }`}
                                        >
                                            {plan.popular && (
                                                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600/90 to-purple-700/90 text-center py-2 text-xs font-semibold">
                                                    <div className="flex items-center justify-center">
                                                        <Star className="h-3 w-3 mr-1 fill-current text-yellow-300" />
                                                        Most Popular
                                                        <Star className="h-3 w-3 ml-1 fill-current text-yellow-300" />
                                                    </div>
                                                </div>
                                            )}

                                            <div className={`p-5 ${plan.popular ? "pt-11" : ""}`}>
                                                <div className="flex items-start mb-4">
                                                    <div className={`w-8 h-8 rounded-lg ${plan.iconBg} flex items-center justify-center mr-3 ring-1 ring-white/10`}>
                                                        <IconComponent className={`h-4 w-4 ${plan.accentColor}`} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                                                        <p className="text-zinc-400 text-xs leading-relaxed">{plan.description}</p>
                                                    </div>
                                                </div>

                                                <div className="mb-5">
                                                    <div className="flex items-baseline mb-1">
                                                        <span className="text-2xl font-bold text-white">
                                                            {billingPeriod === "monthly" ? formatPrice(plan.monthlyPrice) : formatPrice(plan.yearlyPrice)}
                                                        </span>
                                                        <span className="text-zinc-400 ml-1 text-sm">/ {billingPeriod}</span>
                                                    </div>
                                                    {billingPeriod === "yearly" && (
                                                        <div className="text-xs text-green-400 font-medium">
                                                            Save {formatPrice(plan.monthlyPrice * 12 - plan.yearlyPrice)} per year
                                                        </div>
                                                    )}
                                                </div>

                                                {!showDetailedFeatures ? (
                                                    <div className="space-y-2.5 mb-5">
                                                        {plan.features.slice(0, 6).map((feature, i) => (
                                                            <div key={i} className="flex items-start">
                                                                <div className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center mr-2 mt-0.5 ring-1 ring-zinc-700">
                                                                    <CheckCircle2 className="h-2.5 w-2.5 text-green-400" />
                                                                </div>
                                                                <span className="text-xs text-zinc-200 leading-relaxed">{feature}</span>
                                                            </div>
                                                        ))}
                                                        {plan.features.length > 6 && (
                                                            <div className="text-xs text-zinc-500 pl-6 font-medium">
                                                                +{plan.features.length - 6} more features
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3 mb-5">
                                                        <div className="border border-zinc-800 rounded-lg p-3 bg-zinc-800/40">
                                                            <div className="flex items-center mb-2">
                                                                <BarChart3 className={`h-3 w-3 mr-2 ${plan.accentColor}`} />
                                                                <span className="text-xs font-semibold">Analytics</span>
                                                            </div>
                                                            <p className="text-xs text-zinc-400 leading-relaxed">{plan.features_detailed.analytics}</p>
                                                        </div>
                                                        <div className="border border-zinc-800 rounded-lg p-3 bg-zinc-800/40">
                                                            <div className="flex items-center mb-2">
                                                                <Users className={`h-3 w-3 mr-2 ${plan.accentColor}`} />
                                                                <span className="text-xs font-semibold">Support</span>
                                                            </div>
                                                            <p className="text-xs text-zinc-400 leading-relaxed">{plan.features_detailed.support}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="border-t border-zinc-800 pt-4 mb-5">
                                                    <h4 className="text-xs font-semibold text-zinc-300 mb-3 flex items-center">
                                                        <Database className="h-3 w-3 mr-1" />
                                                        Limits
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                                        <div className="flex justify-between items-center p-2 bg-zinc-800/30 rounded text-xs">
                                                            <span className="text-zinc-500">Products</span>
                                                            <span className={`font-semibold ${plan.accentColor}`}>{plan.limits.products}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center p-2 bg-zinc-800/30 rounded text-xs">
                                                            <span className="text-zinc-500">Storage</span>
                                                            <span className={`font-semibold ${plan.accentColor}`}>{plan.limits.storage}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center p-2 bg-zinc-800/30 rounded text-xs">
                                                            <span className="text-zinc-500">Bandwidth</span>
                                                            <span className={`font-semibold ${plan.accentColor}`}>{plan.limits.bandwidth}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center p-2 bg-zinc-800/30 rounded text-xs">
                                                            <span className="text-zinc-500">Domains</span>
                                                            <span className={`font-semibold ${plan.accentColor}`}>{plan.limits.customDomains}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div
                                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
                                                            ? `border-purple-500 bg-purple-500`
                                                            : "border-zinc-600"
                                                            }`}
                                                    >
                                                        {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                                                    </div>
                                                    <span
                                                        className={`text-xs font-semibold transition-colors ${isSelected ? plan.accentColor : "text-zinc-400"
                                                            }`}
                                                    >
                                                        {isSelected ? "Selected" : "Select Plan"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {selectedPlanData && (
                            <Card className="bg-zinc-900/80 backdrop-blur-sm border-zinc-700/50 mb-8 max-w-3xl mx-auto">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-lg flex items-center">
                                        <div
                                            className={`w-6 h-6 rounded-lg ${selectedPlanData.iconBg} flex items-center justify-center mr-2`}
                                        >
                                            <Cpu className="h-3 w-3 text-white" />
                                        </div>
                                        Order Summary - {selectedPlanData.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold mb-2 text-zinc-200 text-sm">Billing Details</h4>
                                            <p className="text-zinc-400 text-xs mb-4">Billed {billingPeriod} • Cancel anytime</p>

                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between items-center p-2 bg-zinc-800/30 rounded text-sm">
                                                    <span className="text-zinc-400">Plan price:</span>
                                                    <span className="font-medium">
                                                        {billingPeriod === "monthly" ? 
                                                        formatPrice(selectedPlanData.monthlyPrice) : 
                                                        formatPrice(selectedPlanData.yearlyPrice + (2 * selectedPlanData.monthlyPrice)
                                                        )}
                                                    </span>
                                                </div>
                                                {billingPeriod === "yearly" && (
                                                    <div className="flex justify-between items-center p-2 bg-green-950/20 border border-green-800/30 rounded text-sm">
                                                        <span className="text-green-400">Annual savings:</span>
                                                        <span className="text-green-400 font-medium">-{formatPrice(selectedPlanData.monthlyPrice * 12 - selectedPlanData.yearlyPrice)}</span>
                                                    </div>
                                                )}
                                                <div className="border-t border-zinc-800 pt-2 flex justify-between items-center font-bold">
                                                    <span>Total:</span>
                                                    <span className={selectedPlanData.accentColor}>
                                                        {billingPeriod === "monthly" ? formatPrice(selectedPlanData.monthlyPrice) : formatPrice(selectedPlanData.yearlyPrice)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-2 text-zinc-200 text-sm">What You Get</h4>
                                            <div className="space-y-2 text-xs text-zinc-300">
                                                <div className="flex items-center p-1.5 bg-zinc-800/20 rounded">
                                                    <CheckCircle2 className="h-3 w-3 text-green-400 mr-2" />
                                                    <span>{selectedPlanData.limits.products} active products</span>
                                                </div>
                                                <div className="flex items-center p-1.5 bg-zinc-800/20 rounded">
                                                    <CheckCircle2 className="h-3 w-3 text-green-400 mr-2" />
                                                    <span>{selectedPlanData.limits.storage} storage</span>
                                                </div>
                                                <div className="flex items-center p-1.5 bg-zinc-800/20 rounded">
                                                    <CheckCircle2 className="h-3 w-3 text-green-400 mr-2" />
                                                    <span>{selectedPlanData.limits.bandwidth}Bandwidth</span>
                                                </div>
                                                <div className="flex items-center p-1.5 bg-zinc-800/20 rounded">
                                                    <CheckCircle2 className="h-3 w-3 text-green-400 mr-2" />
                                                    <span>{selectedPlanData.limits.customDomains} domains</span>
                                                </div>
                                                <div className="flex items-center p-1.5 bg-zinc-800/20 rounded">
                                                    <CheckCircle2 className="h-3 w-3 text-green-400 mr-2" />
                                                    <span>{selectedPlanData.limits.bandwidth} bandwidth</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-6">
                                        <Button
                                            onClick={handleProceed}
                                            disabled={subscribeMutation.isPending}
                                            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-2 text-sm font-semibold"
                                        >
                                            {subscribeMutation.isPending ? (
                                                <div className="flex items-center">
                                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                                    Processing...
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    Start with {selectedPlanData.name}
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </div>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </section>

                <section className="container px-4 py-12 mx-auto">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
                            <p className="text-zinc-400">Everything you need to know about ZeroHub pricing</p>
                        </div>
                        <Accordion type="single" collapsible className="space-y-3">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-zinc-800 bg-zinc-900/40 rounded-lg px-4 data-[state=open]:bg-zinc-900/60"
                                >
                                    <AccordionTrigger className="text-left hover:text-purple-400 hover:no-underline py-4">
                                        <div className="flex items-center">
                                            <HelpCircle className="h-4 w-4 mr-3 text-purple-400 flex-shrink-0" />
                                            <span className="font-semibold text-sm">{faq.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-zinc-400 pl-7 pb-4 text-xs leading-relaxed">{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>
            </main>

            <footer className="border-t border-zinc-800 bg-zinc-900/60 backdrop-blur-sm">
                <div className="container px-4 py-8 mx-auto">
                    <div className="text-center text-zinc-400">
                        <div className="flex items-center justify-center space-x-6 mb-4 text-xs flex-wrap gap-3">
                            <div className="flex items-center">
                                <Shield className="h-3 w-3 mr-1 text-green-400" />
                                <span>Enterprise Security</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-blue-400" />
                                <span>30-day Guarantee</span>
                            </div>
                            <div className="flex items-center">
                                <Database className="h-3 w-3 mr-1 text-purple-400" />
                                <span>Daily Backups</span>
                            </div>
                            <div className="flex items-center">
                                <Globe className="h-3 w-3 mr-1 text-emerald-400" />
                                <span>Global CDN</span>
                            </div>
                        </div>
                        <p className="text-xs mb-1">Questions about pricing or need help choosing a plan?</p>
                        <p className="text-xs font-medium">Contact us at <span className="text-purple-400">hello@zerohub.com</span></p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export function PricingLoading() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800 z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/40 via-zinc-900/60 to-zinc-900/80 z-0" />

                <div className="container relative z-10 mx-auto px-4 sm:px-6">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <div className="mb-6">
                            <Skeleton className="h-6 w-48 bg-zinc-800" />
                        </div>
                        <Skeleton className="h-16 w-full max-w-2xl mb-6 bg-zinc-800" />
                        <Skeleton className="h-6 w-full max-w-xl mb-8 bg-zinc-800" />
                    </div>
                </div>
            </section>

            <section className="py-12 bg-zinc-900">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex justify-center mb-12">
                            <Skeleton className="h-12 w-80 bg-zinc-800" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[...Array(3)].map((_, index) => (
                                <Card key={index} className="border-zinc-700 bg-zinc-800/50 h-full">
                                    <CardHeader className="pb-0">
                                        <Skeleton className="h-8 w-24 mb-2 bg-zinc-700" />
                                        <Skeleton className="h-4 w-full bg-zinc-700" />
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="mb-6">
                                            <Skeleton className="h-12 w-32 mb-2 bg-zinc-700" />
                                            <Skeleton className="h-4 w-40 bg-zinc-700" />
                                        </div>
                                        <div className="space-y-3">
                                            {[...Array(8)].map((_, featureIndex) => (
                                                <div key={featureIndex} className="flex items-start">
                                                    <Skeleton className="h-5 w-5 mr-3 mt-0.5 bg-zinc-700" />
                                                    <Skeleton className="h-4 w-full bg-zinc-700" />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Skeleton className="h-10 w-full bg-zinc-700" />
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-16">
                            <Card className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-zinc-700">
                                <CardContent className="p-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex-1">
                                            <Skeleton className="h-6 w-40 mb-2 bg-zinc-700" />
                                            <Skeleton className="h-8 w-64 mb-2 bg-zinc-700" />
                                            <Skeleton className="h-4 w-full max-w-2xl bg-zinc-700" />
                                        </div>
                                        <Skeleton className="h-12 w-40 bg-zinc-700" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-zinc-900/50 border-t border-zinc-800">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <Skeleton className="h-10 w-64 mx-auto mb-4 bg-zinc-800" />
                            <Skeleton className="h-4 w-96 mx-auto bg-zinc-800" />
                        </div>

                        <div className="overflow-x-auto">
                            <div className="min-w-full border border-zinc-800 rounded-lg bg-zinc-900/50">
                                <div className="grid grid-cols-4 gap-4 p-4 border-b border-zinc-800">
                                    <Skeleton className="h-6 w-20 bg-zinc-800" />
                                    <Skeleton className="h-6 w-16 bg-zinc-800" />
                                    <Skeleton className="h-6 w-16 bg-zinc-800" />
                                    <Skeleton className="h-6 w-24 bg-zinc-800" />
                                </div>
                                {[...Array(8)].map((_, index) => (
                                    <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b border-zinc-800 last:border-b-0">
                                        <Skeleton className="h-4 w-24 bg-zinc-800" />
                                        <Skeleton className="h-4 w-12 bg-zinc-800" />
                                        <Skeleton className="h-4 w-16 bg-zinc-800" />
                                        <Skeleton className="h-4 w-20 bg-zinc-800" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-zinc-900 border-t border-zinc-800">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <Skeleton className="h-10 w-80 mx-auto mb-4 bg-zinc-800" />
                            <Skeleton className="h-4 w-64 mx-auto bg-zinc-800" />
                        </div>

                        <div className="space-y-6">
                            {[...Array(6)].map((_, index) => (
                                <Card key={index} className="bg-zinc-800/50 border-zinc-700">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <Skeleton className="h-8 w-8 rounded-full bg-zinc-700" />
                                            <div className="flex-1">
                                                <Skeleton className="h-6 w-3/4 mb-2 bg-zinc-700" />
                                                <Skeleton className="h-4 w-full mb-1 bg-zinc-700" />
                                                <Skeleton className="h-4 w-5/6 bg-zinc-700" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <Skeleton className="h-4 w-48 mx-auto mb-4 bg-zinc-800" />
                            <Skeleton className="h-10 w-40 mx-auto bg-zinc-800" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-zinc-900/50 border-t border-zinc-800">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <Skeleton className="h-10 w-96 mx-auto mb-4 bg-zinc-800" />
                            <Skeleton className="h-4 w-64 mx-auto bg-zinc-800" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, index) => (
                                <Card key={index} className="bg-zinc-800/50 border-zinc-700">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col h-full">
                                            <div className="mb-6">
                                                <div className="flex gap-1 mb-4">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Skeleton key={i} className="h-4 w-4 bg-zinc-700" />
                                                    ))}
                                                </div>
                                                <Skeleton className="h-4 w-full mb-2 bg-zinc-700" />
                                                <Skeleton className="h-4 w-full mb-2 bg-zinc-700" />
                                                <Skeleton className="h-4 w-3/4 bg-zinc-700" />
                                            </div>
                                            <div className="mt-auto">
                                                <Skeleton className="h-5 w-32 mb-1 bg-zinc-700" />
                                                <Skeleton className="h-4 w-40 bg-zinc-700" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-br from-zinc-900 to-zinc-800 border-t border-zinc-800">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <Skeleton className="h-12 w-80 mx-auto mb-6 bg-zinc-800" />
                        <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-8 bg-zinc-800" />
                        <div className="flex flex-wrap gap-4 justify-center mb-6">
                            <Skeleton className="h-12 w-40 bg-zinc-800" />
                            <Skeleton className="h-12 w-32 bg-zinc-800" />
                        </div>
                        <Skeleton className="h-4 w-64 mx-auto bg-zinc-800" />
                    </div>
                </div>
            </section>
        </div>
    )
}
