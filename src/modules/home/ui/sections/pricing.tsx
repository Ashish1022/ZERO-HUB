"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Star, Zap, ArrowRight, Sparkles } from "lucide-react"
import { plans } from "@/constants"
import { formatPrice } from "@/lib/utils"
import { useRouter } from "next/navigation"

type BillingPeriod = "monthly" | "yearly"

interface Plan {
    id: string
    name: string
    description: string
    monthlyPrice: number
    yearlyPrice: number
    popular?: boolean
    cta: string
    features: string[]
}

interface PlanCardProps {
    plan: Plan
    billingPeriod: BillingPeriod
    isPopular: boolean
}

interface BillingToggleProps {
    billingPeriod: BillingPeriod
    onBillingChange: (period: BillingPeriod) => void
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, billingPeriod, isPopular }) => {
    const price = billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
    const savings = billingPeriod === "yearly" ? plan.monthlyPrice * 12 - plan.yearlyPrice : 0

    const router = useRouter();

    return (
        <div
            className={`relative bg-zinc-900/80 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 ${isPopular
                ? "border-purple-500/50 shadow-lg shadow-purple-500/10 hover:shadow-xl hover:shadow-purple-500/20 ring-2 ring-purple-500/20"
                : "border-zinc-800 hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-900/50"
                }`}
        >
            {isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-center py-2 text-xs font-medium flex items-center justify-center">
                    <Star className="h-3 w-3 mr-1 fill-white" />
                    Most Popular
                </div>
            )}

            <div className={`p-6 ${isPopular ? "pt-10" : ""} h-full flex flex-col`}>
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                        {isPopular && <Sparkles className="h-5 w-5 text-purple-400" />}
                    </div>
                    <p className="text-zinc-400 text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                    <div className="flex items-baseline mb-2">
                        <span className="text-4xl font-bold text-white">{formatPrice(price)}</span>
                        <span className="text-zinc-400 ml-2">/ {billingPeriod}</span>
                    </div>
                    {billingPeriod === "yearly" && savings > 0 && (
                        <div className="flex items-center text-xs text-green-400">
                            <Zap className="h-3 w-3 mr-1" />
                            {formatPrice(savings)} savings per year
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <Button
                        className={`w-full transition-all duration-300 ${isPopular
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                            : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-600"
                            }`}
                            onClick={()=>router.push('/sign-up')}
                    >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                <div className="flex-1">
                    <div className="border-t border-zinc-800 pt-4">
                        <h4 className="text-sm font-medium mb-4 text-zinc-300">Everything included:</h4>
                        <ul className="space-y-3">
                            {plan.features.map((feature: string, i: number) => (
                                <li key={i} className="flex items-start group">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="text-sm text-zinc-300 group-hover:text-white transition-colors duration-200">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

const BillingToggle: React.FC<BillingToggleProps> = ({ billingPeriod, onBillingChange }) => (
    <div className="flex items-center justify-center mb-8 space-x-4 bg-zinc-800/50 p-1 rounded-full border border-zinc-700">
        <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${billingPeriod === "monthly"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "text-zinc-400 hover:text-white"
                }`}
            onClick={() => onBillingChange("monthly")}
            aria-pressed={billingPeriod === "monthly"}
        >
            Monthly
        </button>
        <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${billingPeriod === "yearly"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "text-zinc-400 hover:text-white"
                }`}
            onClick={() => onBillingChange("yearly")}
            aria-pressed={billingPeriod === "yearly"}
        >
            Yearly
            <Badge className="ml-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 border-none text-xs">
                Save 16%
            </Badge>
        </button>
    </div>
)

export const PricingSection: React.FC = () => {
    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly")

    const handleBillingChange = (period: BillingPeriod) => {
        setBillingPeriod(period)
    }

    const planCards = useMemo(() =>
        (plans as Plan[]).map((plan: Plan) => (
            <PlanCard
                key={plan.id}
                plan={plan}
                billingPeriod={billingPeriod}
                isPopular={Boolean(plan.popular)}
            />
        )), [billingPeriod]
    )

    return (
        <section className="py-20 relative overflow-hidden" aria-labelledby="pricing-heading">
            <div className="container px-2 mx-auto relative z-10 md:px-6">
                <div className="text-center mb-8">
                    <Badge variant="outline" className="mb-4 border-zinc-700 text-zinc-400 px-4 py-1">
                        <span className="mr-1 bg-green-500 w-2 h-2 rounded-full inline-block" aria-hidden="true"></span>
                        Pricing
                    </Badge>

                    <h2
                        id="pricing-heading"
                        className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400"
                    >
                        Simple, Transparent Pricing
                    </h2>

                    <p className="text-zinc-400 max-w-2xl mx-auto py-2 text-lg leading-relaxed">
                        Choose the plan that works best for your business. All plans include a 14-day free trial.
                    </p>

                    <div className="flex items-center flex-col">
                        <BillingToggle
                            billingPeriod={billingPeriod}
                            onBillingChange={handleBillingChange}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-6 mb-8 w-full max-w-6xl">
                            {planCards}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}