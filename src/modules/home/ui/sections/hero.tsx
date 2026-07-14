"use client"

import { memo, useEffect, useMemo, useState, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { CORNER_NODES, FEATURES, TECH_STACKS } from "@/constants"

interface TechStackProps {
    techs: string[];
    side: 'left' | 'right';
    baseDelay?: number;
}

interface CornerNodeProps {
    Icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
    position: string;
    delay: number;
    isRight?: boolean;
}

interface FeatureDisplayProps {
    features: typeof FEATURES;
    activeFeature: number;
    onFeatureChange: (index: number) => void;
}

const TechStack = memo<TechStackProps>(({ techs, side, baseDelay = 0.5 }) => (
    <div className={`absolute ${side === 'left' ? 'left-2 sm:left-4 lg:left-6' : 'right-2 sm:right-4 lg:right-6'} top-[48%] -translate-y-1/2 z-10 hidden sm:block`}>
        {techs.map((tech, index) => (
            <div
                key={tech}
                className="bg-zinc-800/90 border border-zinc-700 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-300 mb-3 backdrop-blur-sm hover:bg-zinc-700/90 hover:scale-105 transition-all duration-300 opacity-90 shadow-lg"
                style={{
                    animationDelay: `${baseDelay + (index * 0.15)}s`,
                    animationFillMode: 'both'
                }}
            >
                {tech}
            </div>
        ))}
    </div>
), (prevProps, nextProps) => {
    return prevProps.side === nextProps.side &&
        prevProps.baseDelay === nextProps.baseDelay &&
        prevProps.techs.length === nextProps.techs.length &&
        prevProps.techs.every((tech, index) => tech === nextProps.techs[index]);
});
TechStack.displayName = 'TechStack';

const CornerNode = memo<CornerNodeProps>(({ Icon, color, bgColor, position, delay, isRight = false }) => (
    <div
        className={`absolute ${position} z-20`}
        style={{
            animationDelay: `${delay}s`,
            animationFillMode: 'both'
        }}
    >
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-zinc-800/90 border border-zinc-600 flex items-center justify-center shadow-lg backdrop-blur-sm">
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
        </div>
        <div
            className={`absolute w-12 sm:w-16 h-0.5 ${bgColor} opacity-60`}
            style={{
                transformOrigin: `${isRight ? 'right' : 'left'} center`,
                [isRight ? 'right' : 'left']: "100%",
                top: "50%",
                transform: "translateY(-50%)",
                animationDelay: `${delay + 0.2}s`,
                animationFillMode: 'both'
            }}
        />
    </div>
), (prevProps, nextProps) => {
    return prevProps.color === nextProps.color &&
        prevProps.bgColor === nextProps.bgColor &&
        prevProps.position === nextProps.position &&
        prevProps.delay === nextProps.delay &&
        prevProps.isRight === nextProps.isRight;
});
CornerNode.displayName = 'CornerNode';

const FeatureDisplay = memo<FeatureDisplayProps>(({ features, activeFeature }) => (
    <div className="relative mx-auto mb-8 sm:mb-12" style={{ perspective: '1000px' }}>
        <div className="relative h-48 sm:h-56 md:h-64 w-64 sm:w-72 md:w-80 mx-auto rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-700/30 to-zinc-900/50 backdrop-blur-sm rounded-xl">
                <div className="h-8 sm:h-10 flex items-center px-4 bg-zinc-800/80 border-b border-zinc-700">
                    {['bg-red-500', 'bg-yellow-500', 'bg-green-500'].map((color, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full ${color} ${i > 0 ? 'ml-2' : ''}`} />
                    ))}
                    <div className="h-4 w-24 sm:w-32 ml-4 bg-zinc-700 rounded-sm opacity-60" />
                </div>

                <div className="relative h-32 sm:h-40 md:h-48 w-full p-4">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className={`absolute inset-4 flex flex-col items-center justify-center transition-all duration-500 ${activeFeature === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                }`}
                        >
                            <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full ${feature.color} flex items-center justify-center mb-3 shadow-lg`}>
                                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                            </div>
                            <div className="text-zinc-200 font-semibold text-sm sm:text-base md:text-lg text-center">{feature.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 h-8 sm:h-12 w-48 sm:w-56 md:w-64 bg-gradient-to-b from-zinc-600/20 via-zinc-700/10 to-transparent blur-md rounded-full opacity-60"
            style={{ transform: 'translateX(-50%) rotateX(60deg) scaleY(0.3)' }} />
    </div>
), (prevProps, nextProps) => {
    return prevProps.activeFeature === nextProps.activeFeature &&
        prevProps.features === nextProps.features;
});
FeatureDisplay.displayName = 'FeatureDisplay';

const OrbitingParticles = memo(() => {
    const [mounted, setMounted] = useState(false);
    const particlesRef = useRef<Array<{ angle: number; duration: number; size: string }> | null>(null);

    if (!particlesRef.current) {
        particlesRef.current = Array.from({ length: 6 }, (_, i) => ({
            angle: i * 60,
            duration: 20 + (i % 3) * 5,
            size: i % 2 === 0 ? 'w-1.5 h-1.5' : 'w-1 h-1'
        }));
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {particlesRef.current.map((particle, i) => (
                <div
                    key={i}
                    className={`absolute ${particle.size} rounded-full bg-blue-400/40 shadow-sm`}
                    style={{
                        animation: `orbit-${i} ${particle.duration}s linear infinite`,
                        transform: `rotate(${particle.angle}deg) translateX(80px) translateY(-20px)`
                    }}
                />
            ))}
        </div>
    );
});
OrbitingParticles.displayName = 'OrbitingParticles';

const FloatingParticles = memo(() => {
    const [particles, setParticles] = useState<Array<{ left: string; top: string; duration: number; delay: number }> | null>(null);

    useEffect(() => {
        const generated = Array.from({ length: 10 }, () => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 5,
        }));
        setParticles(generated);
    }, []);

    if (!particles) return null;

    return (
        <div className="absolute inset-0">
            {particles.map((p, i) => (
                <div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-blue-500/50"
                    style={{
                        left: p.left,
                        top: p.top,
                        animation: `float ${p.duration}s ease-in-out infinite ${p.delay}s`,
                    }}
                />
            ))}
        </div>
    );
});
FloatingParticles.displayName = 'FloatingParticles';

export const HeroSection = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const router = useRouter();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleFeatureChange = (index: number) => {
        setActiveFeature(index);
    }

    const handleGetStarted = () => {
        router.push("/sign-up");
    }

    const handleViewDemo = () => {
        router.push('/docs/get-started/account-setup')
    }

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setActiveFeature(prev => (prev + 1) % FEATURES.length);
        }, 2000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const cssStyles = useMemo(() => `
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 0.8; }
        }
        @keyframes slideInRight {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 0.8; }
        }
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes scaleX {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; width: 130px; }
          50% { opacity: 0.5; width: 170px; }
        }
        @keyframes float {
          0%, 100% { opacity: 0; transform: translateY(0px); }
          50% { opacity: 0.8; transform: translateY(-20px); }
        }
        @keyframes orbit {
          from { 
            transform: rotate(var(--angle-offset, 0deg)) translateX(60px) translateY(30px);
          }
          to { 
            transform: rotate(calc(var(--angle-offset, 0deg) + 360deg)) translateX(60px) translateY(30px);
          }
        }
        .rotate-x-12 { transform: perspective(800px) rotateX(12deg); }
        .rotate-x-60 { transform: perspective(800px) rotateX(60deg); }
    `, []);

    return (
        <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
            <div className="container md:px-6 px-2 mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">
                    <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            Take Your <span className="text-zinc-400">Business Online</span>
                            <span className="relative ml-2 inline-block">
                                <span className="relative z-10">Effortlessly</span>
                                <span className="absolute bottom-2 left-0 w-full h-3 bg-zinc-800 rounded-sm -z-10" />
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            From offline to online — the effortless way to digitize your business with cutting-edge technology.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                            <Button
                                size="lg"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-lg hover:bg-zinc-100 transition-all duration-300 hover:scale-105"
                                onClick={handleGetStarted}
                            >
                                Start Selling
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-zinc-300 bg-transparent border border-zinc-700 rounded-lg hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300"
                                onClick={handleViewDemo}
                            >
                                View Demo
                            </Button>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl" />
                            <TechStack techs={TECH_STACKS.left} side="left" baseDelay={0.5} />
                            <TechStack techs={TECH_STACKS.right} side="right" baseDelay={0.7} />
                            <div className="relative h-full w-full flex items-center justify-center">
                                <div className="absolute inset-0">
                                    {CORNER_NODES.map((node, index) => (
                                        <CornerNode key={index} {...node} />
                                    ))}
                                </div>
                                <div className="relative w-full max-w-sm mx-auto">
                                    <FeatureDisplay
                                        features={FEATURES}
                                        activeFeature={activeFeature}
                                        onFeatureChange={handleFeatureChange}
                                    />
                                    <div className="relative w-48 sm:w-56 md:w-64 h-4 mx-auto bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 animate-pulse rounded-full" />
                                    </div>
                                    <OrbitingParticles />
                                    <FloatingParticles />
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-900/80 border border-zinc-700 rounded-full px-4 py-2 backdrop-blur-sm">
                                <span className="text-zinc-400 text-sm font-medium tracking-wider">ZERO | HUB</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{cssStyles}</style>
        </section>
    );
}