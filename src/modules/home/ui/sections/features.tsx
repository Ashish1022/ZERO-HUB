import {
    memo,
} from "react"
import {
    Layers,
    LineChart,
    Shield,
    Sparkles,
    Zap,
    ArrowRight
} from "lucide-react"
import {
    Badge
} from "@/components/ui/badge"
import Image from "next/image"

type IconComponent = React.ComponentType<{ className?: string }>

interface BadgeConfig {
    text: string
    variant: 'blue' | 'purple'
}

interface Feature {
    id: string
    title: string
    description: string
    icon: IconComponent
    badge?: BadgeConfig
    gradient: string
    size: 'small' | 'large' | 'wide'
    hasImage?: boolean
    imageAlt?: string
    hasAnimation?: boolean
    ctaText?: string
}

interface FeatureIconProps {
    icon: IconComponent
    gradient: string
    isHovered?: boolean
}

interface FeatureBadgeProps {
    badge?: BadgeConfig
}

interface FeatureCardProps {
    feature: Feature
    className?: string
}

interface WideFeatureCardProps {
    feature: Feature
}

const FEATURES: Feature[] = [
    {
        id: 'analytics',
        title: 'Advanced Analytics',
        description: 'Gain valuable insights with our powerful analytics tools. Track performance, monitor trends, and make data-driven decisions with customizable dashboards and real-time reporting.',
        icon: LineChart,
        badge: { text: 'Premium', variant: 'blue' },
        gradient: 'from-blue-500 to-purple-600',
        size: 'large',
        hasImage: true,
        imageAlt: 'Advanced analytics dashboard showing data visualizations',
        ctaText: 'Explore dashboard'
    },
    {
        id: 'automation',
        title: 'Automation',
        description: 'Automate repetitive tasks and workflows to save time and reduce errors. Focus on what matters most to your business.',
        icon: Zap,
        gradient: 'from-amber-500 to-orange-600',
        size: 'small'
    },
    {
        id: 'security',
        title: 'Enterprise Security',
        description: 'Bank-level security to protect your data. End-to-end encryption, regular audits, and compliance with industry standards.',
        icon: Shield,
        gradient: 'from-green-500 to-emerald-600',
        size: 'small'
    },
    {
        id: 'integration',
        title: 'Seamless Integration',
        description: 'Connect with your favorite tools and services. Our platform integrates with over 100+ applications.',
        icon: Layers,
        gradient: 'from-purple-500 to-violet-600',
        size: 'small'
    },
    {
        id: 'ai',
        title: 'AI-Powered Insights',
        description: 'Leverage the power of artificial intelligence to uncover hidden patterns and opportunities in your data. Get personalized recommendations and predictive analytics.',
        icon: Sparkles,
        badge: { text: 'New', variant: 'purple' },
        gradient: 'from-pink-500 to-rose-600',
        size: 'wide',
        hasAnimation: true,
        ctaText: 'Explore AI features'
    },
] as const

const FeatureIcon = memo<FeatureIconProps>(({ icon: Icon, gradient, isHovered = false }) => (
    <div className={`w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mr-3 transition-all duration-300 ${isHovered ? `bg-gradient-to-br ${gradient}` : ''
        }`}>
        <Icon className={`h-6 w-6 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-zinc-400'
            }`} />
    </div>
))

FeatureIcon.displayName = 'FeatureIcon'

const FeatureBadge = memo<FeatureBadgeProps>(({ badge }) => {
    if (!badge) return null

    const variants: Record<BadgeConfig['variant'], string> = {
        blue: 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20',
        purple: 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'
    }

    return (
        <Badge className={`mb-1 ${variants[badge.variant]} border-none`}>
            {badge.text}
        </Badge>
    )
})

FeatureBadge.displayName = 'FeatureBadge'

const AnimationCircles = memo(() => {
    const circles = [
        { size: 128, color: 'group-hover:border-purple-700/50' },
        { size: 192, color: 'group-hover:border-pink-700/30' },
        { size: 256, color: 'group-hover:border-purple-700/20' }
    ]

    return (
        <div className="absolute inset-0">
            {circles.map(({ size, color }, index) => (
                <div
                    key={`circle-${index}`}
                    className={`absolute top-1/2 left-1/2 rounded-full border border-zinc-700 ${color} transition-colors duration-300`}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        marginLeft: `${-size / 2}px`,
                        marginTop: `${-size / 2}px`
                    }}
                />
            ))}
        </div>
    )
})

AnimationCircles.displayName = 'AnimationCircles'

const AnalyticsImage = memo(() => (
    <div className="bg-zinc-950/50 rounded-lg overflow-hidden h-[240px] w-full group-hover:bg-zinc-950/70 transition-all duration-300 relative">
        <Image
            src="/docs/sales-analytics.png"
            alt="Advanced analytics dashboard showing data visualizations and metrics"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
))

AnalyticsImage.displayName = 'AnalyticsImage'

const FeatureCard = memo<FeatureCardProps>(({ feature, className = '' }) => {
    const {
        title,
        description,
        icon,
        badge,
        gradient,
        hasImage,
        ctaText
    } = feature

    const baseClasses = "bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden group hover:border-zinc-700 transition-all duration-300"

    return (
        <div className={`${baseClasses} ${className}`}>
            <div className="p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                    <FeatureIcon icon={icon} gradient={gradient} />
                    <div>
                        <FeatureBadge badge={badge} />
                        <h3 className="text-xl font-semibold text-white">{title}</h3>
                    </div>
                </div>

                <p className="text-zinc-400 mb-6">{description}</p>

                {hasImage && feature.id === 'analytics' && (
                    <div className="mt-auto">
                        <AnalyticsImage />
                        {ctaText && (
                            <button className="mt-4 flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 group/cta">
                                <span className="text-sm font-medium">{ctaText}</span>
                                <ArrowRight className="ml-2 h-4 w-4 group-hover/cta:translate-x-1 transition-transform duration-200" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
})

FeatureCard.displayName = 'FeatureCard'

const WideFeatureCard = memo<WideFeatureCardProps>(({ feature }) => {
    const { title, description, icon, badge, gradient } = feature

    return (
        <div className="md:col-span-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden group hover:border-zinc-700 transition-all duration-300">
            <div className="p-6 h-full flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                    <div className="flex items-center mb-4">
                        <FeatureIcon icon={icon} gradient={gradient} />
                        <div>
                            <FeatureBadge badge={badge} />
                            <h3 className="text-xl font-semibold text-white">{title}</h3>
                        </div>
                    </div>
                    <p className="text-zinc-400 mb-4">{description}</p>
                </div>
                <div className="md:w-1/2 bg-zinc-950/50 rounded-lg p-4 h-[200px] w-full flex items-center justify-center overflow-hidden group-hover:bg-zinc-950/70 transition-all duration-300">
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-500/20 group-hover:to-pink-600/20 transition-all duration-500">
                                <Sparkles className="h-10 w-10 text-zinc-400 group-hover:text-purple-300 transition-colors duration-300" />
                            </div>
                        </div>
                        <AnimationCircles />
                    </div>
                </div>
            </div>
        </div>
    )
})

WideFeatureCard.displayName = 'WideFeatureCard'

export const FeaturesSection = memo(() => {
    const largeFeatures = FEATURES.filter(f => f.size === 'large')
    const wideFeatures = FEATURES.filter(f => f.size === 'wide')
    const smallFeatures = FEATURES.filter(f => f.size === 'small')

    const [primaryFeature] = largeFeatures
    const [wideFeature] = wideFeatures
    const mainGridFeatures = smallFeatures.slice(0, 3)
    const additionalFeatures = smallFeatures.slice(3)

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container px-2 mx-auto md:px-6 relative z-10">
                <header className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 border-zinc-700 text-zinc-400 px-4 py-1">
                        <span className="mr-1 bg-green-500 w-2 h-2 rounded-full inline-block" aria-hidden="true" />
                        New Features
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                        Powerful Features for Your Business
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Everything you need to streamline your workflow and boost productivity
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="region" aria-label="Main features">
                    {primaryFeature && (
                        <FeatureCard
                            feature={primaryFeature}
                            className="md:col-span-2 md:row-span-2"
                        />
                    )}
                    {mainGridFeatures.map((feature: Feature) => (
                        <FeatureCard key={feature.id} feature={feature} />
                    ))}
                    {wideFeature && <WideFeatureCard feature={wideFeature} />}
                </div>

                {additionalFeatures.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6" role="region" aria-label="Additional features">
                        {additionalFeatures.map((feature: Feature) => (
                            <FeatureCard key={feature.id} feature={feature} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
})

FeaturesSection.displayName = 'FeaturesSection'