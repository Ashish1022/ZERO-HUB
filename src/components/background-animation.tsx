"use client"

import { motion } from "framer-motion"

export const BackgroundAnimations = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-90" />

            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)`,
                    backgroundSize: "50px 50px",
                }}
            />

            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0062ff" stopOpacity="0" />
                        <stop offset="50%" stopColor="#0062ff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0062ff" stopOpacity="0" />
                    </linearGradient>

                    <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00ff9e" stopOpacity="0" />
                        <stop offset="50%" stopColor="#00ff9e" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#00ff9e" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Blue Line */}
                <motion.path
                    d="M -200 300 Q 400 100, 1000 400 T 2000 300"
                    stroke="url(#lineGradient1)"
                    strokeWidth="1.5"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: 1,
                        opacity: 0.7,
                        x: [-800, 0],
                    }}
                    transition={{
                        pathLength: { duration: 3, ease: "easeInOut" },
                        opacity: { duration: 1, ease: "easeIn" },
                        x: { duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    }}
                />

                {/* Green Line */}
                <motion.path
                    d="M -400 600 C 200 100, 600 900, 1200 400 S 1800 800, 2200 400"
                    stroke="url(#lineGradient2)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: 1,
                        opacity: 0.6,
                        x: [-600, 0],
                    }}
                    transition={{
                        pathLength: { duration: 4, ease: "easeInOut" },
                        opacity: { duration: 1.5, ease: "easeIn" },
                        x: { duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    }}
                />
            </svg>
        </div>
    )
}