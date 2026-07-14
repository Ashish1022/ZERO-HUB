import { Crown, Rocket, Sparkles } from "lucide-react"

export const plans = [
    {
        id: "starter",
        name: "Starter",
        description: "Launch your first storefront with essential tools.",
        monthlyPrice: 300,
        yearlyPrice: 3000,
        popular: false,
        icon: Rocket,
        accentColor: "text-emerald-400",
        borderColor: "border-slate-700/50",
        hoverBorder: "hover:border-emerald-500/40",
        selectedBorder: "border-emerald-500/60",
        selectedBg: "bg-emerald-950/20",
        iconBg: "bg-emerald-900/50",
        features: [
            "1 storefront",
            "Up to 100 products",
            "500MB media storage",
            "2 basic templates",
            "Standard payment integration (Stripe, Razorpay)",
            "Basic content editor",
            "SEO meta & sitemap support",
            "Basic analytics (views, clicks)",
            "1 admin user",
            "Free SSL certificate",
            "Email support"
        ],
        limits: {
            storage: "200MB",
            products: 100,
            bandwidth: "300MB/month",
            customDomains: 1
        },
        features_detailed: {
            analytics: "Product views, traffic overview, top categories",
            support: "Email support (48-hour response time)",
            integrations: "Razorpay, Stripe, WhatsApp Business",
            backups: "Weekly automated backups (15-day retention)"
        }
    },
    {
        id: "pro",
        name: "Professional",
        description: "Scale your store with powerful tools and more flexibility.",
        monthlyPrice: 500,
        yearlyPrice: 5000,
        popular: true,
        icon: Crown,
        accentColor: "text-purple-400",
        borderColor: "border-zinc-700/50",
        hoverBorder: "hover:border-purple-500/40",
        selectedBorder: "border-purple-500/60",
        selectedBg: "bg-purple-950/20",
        iconBg: "bg-purple-900/50",
        features: [
            "1 storefront",
            "Up to 500 products",
            "10GB media storage",
            "10 modern templates",
            "Advanced CMS with reusable blocks",
            "Custom domain & branding",
            "SEO tools & social meta previews",
            "Advanced analytics (sales, devices, referrers)",
            "Up to 5 team members",
            "Marketing tools (banners, discounts)",
            "Priority email + chat support"
        ],
        limits: {
            storage: "600MB",
            products: 500,
            bandwidth: "1GB/month",
            customDomains: 3
        },
        features_detailed: {
            analytics: "Real-time dashboard with conversions, traffic sources, device breakdown",
            support: "Priority email + live chat (12-hour SLA)",
            integrations: "20+ tools including Mailchimp, Shiprocket, GA4",
            backups: "Daily backups with 30-day retention and 1-click restore"
        }
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "Premium features, scalability, and dedicated support.",
        monthlyPrice: 1500,
        yearlyPrice: 15000,
        popular: false,
        icon: Sparkles,
        accentColor: "text-blue-400",
        borderColor: "border-zinc-700/50",
        hoverBorder: "hover:border-blue-500/40",
        selectedBorder: "border-blue-500/60",
        selectedBg: "bg-blue-950/20",
        iconBg: "bg-blue-900/50",
        features: [
            "1 storefront",
            "Unlimited products",
            "1TB media storage",
            "All templates + custom design options",
            "White-label branding & theme override",
            "Enterprise CMS (custom layouts, dynamic sections)",
            "Full SEO suite (schema, JSON-LD, structured data)",
            "Enterprise analytics dashboard",
            "Unlimited team members",
            "Custom domain support with CDN",
            "24/7 premium support",
            "Dedicated account manager"
        ],
        limits: {
            storage: "10GB",
            products: "Unlimited",
            bandwidth: "10GB/month",
            customDomains: 10
        },
        features_detailed: {
            analytics: "Custom reporting, exportable insights, KPI builder",
            support: "24/7 priority support via phone, email & chat",
            integrations: "Unlimited integrations, API access, custom middleware",
            backups: "Real-time backups, geo-redundant, 90-day retention, compliance-ready"
        }
    }
]

export const faqs = [
    {
        question: "Can I upgrade or downgrade my plan anytime?",
        answer:
            "Yes, you can change your plan at any time. Upgrades take effect immediately with prorated billing. Downgrades take effect at your next billing cycle, and you'll receive account credit for the unused portion.",
    },
    {
        question: "What happens if I exceed my project or storage limits?",
        answer:
            "We'll notify you when you approach 80% and 95% of your limits. If you exceed them, you'll have a 7-day grace period to upgrade. Your existing projects will continue running without interruption during this period.",
    },
    {
        question: "Do you offer a free trial?",
        answer:
            "Yes! All new accounts get a 14-day free trial of the Professional plan. No credit card required. You can explore all features and decide which plan works best for your needs.",
    },
    {
        question: "What kind of projects can I deploy on ZeroHub?",
        answer:
            "ZeroHub supports various project types including React, Vue, Angular, Node.js, Python, static sites, and more. We provide optimized deployment pipelines for popular frameworks and custom Docker container support.",
    },
    {
        question: "Is my code and data secure?",
        answer:
            "Absolutely. We use enterprise-grade encryption, secure Git integration, and isolated deployment environments. All plans include SSL certificates, and higher tiers offer additional security features like audit logs and compliance reporting.",
    },
    {
        question: "What payment methods do you accept?",
        answer:
            "We accept all major credit cards (Visa, MasterCard, American Express, Discover) and PayPal. Enterprise customers can also pay via bank transfer with net-30 terms available.",
    },
    {
        question: "Can I use my own custom domain?",
        answer:
            "Yes, all plans support custom domains with free SSL certificates. The number of custom domains varies by plan, and we provide easy DNS configuration guides.",
    },
    {
        question: "Do you offer refunds?",
        answer:
            "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied within the first 30 days, we'll provide a full refund, no questions asked.",
    },
]