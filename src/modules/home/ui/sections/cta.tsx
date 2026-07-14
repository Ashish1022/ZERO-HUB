"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export const CTASection = () => {

    const router = useRouter();

    return (
        <section className="py-12 relative">
            <div className="container px-2 md:px-6 mx-auto">
                <div
                    className="text-center"
                >
                    <div
                    >
                        <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/15 transition-colors">
                            <Sparkles className="h-3.5 w-3.5 mr-2" />
                            Free 14-day trial
                        </Badge>
                    </div>

                    <h2
                        className="text-3xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent pb-2"
                    >
                        Ready to get started?
                    </h2>

                    <p
                        className="text-lg text-zinc-400 mb-5 max-w-2xl mx-auto"
                    >
                        Join thousands of teams using our platform to boost productivity.
                    </p>

                    <div
                        className="flex flex-wrap justify-center gap-4 mb-6"
                    >
                        {["No credit card required", "Cancel anytime", "Setup in 5 minutes"].map((feature, index) => (
                            <div key={index} className="flex items-center text-zinc-300">
                                <CheckCircle2 className="h-4 w-4 text-green-400 mr-2" />
                                <span className="text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div
                        className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
                    >
                        <Button
                            size="lg"
                            className="bg-white text-black hover:bg-zinc-100 transition-all duration-200 group px-6 py-3 text-base font-medium"
                            onClick={() => router.push('/sign-up')}
                        >
                            Start free trial
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-white transition-all duration-200 px-6 py-3 text-base"
                            onClick={() => router.push('/docs')}
                        >
                            View docs
                        </Button>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />
        </section>
    )
}
