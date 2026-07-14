"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

export const description = "An interactive area chart"

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    totalGrossSales: {
        label: " Gross Sales",
        color: "oklch(0.488 0.243 264.376)",
    },
    totalNetSales: {
        label: " Net Sales",
        color: "oklch(0.696 0.17 162.48)",
    },
} satisfies ChartConfig

export function GrossNetSales({ tenantId }: { tenantId: string }) {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.analytics.getTenantMonthlySales.queryOptions({ tenantId: tenantId }));

    const chartData = data?.map(item => ({
        date: item.month,
        totalGrossSales: typeof item.totalGrossSales === 'string'
            ? parseFloat(item.totalGrossSales)
            : item.totalGrossSales,
        totalNetSales: typeof item.totalNetSales === 'string'
            ? parseFloat(item.totalNetSales)
            : item.totalNetSales,
    })) || [];

    return (
        <Card className="@container/card">
            <CardHeader className="relative flex items-center">
                <CardTitle>Gross v/s Net Sales</CardTitle>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="fillGrossSales" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="var(--color-totalGrossSales)"
                                    stopOpacity={1.0}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-totalGrossSales)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillNetSales" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="var(--color-totalNetSales)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-totalNetSales)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                // Handle both date strings and month names
                                try {
                                    const date = new Date(value);
                                    if (!isNaN(date.getTime())) {
                                        return date.toLocaleDateString("en-IN", {
                                            month: "short",
                                            year: "2-digit",
                                        });
                                    }
                                } catch {
                                    return value;
                                }
                                return value;
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        try {
                                            const date = new Date(value);
                                            if (!isNaN(date.getTime())) {
                                                return date.toLocaleDateString("en-IN", {
                                                    month: "long",
                                                    year: "numeric",
                                                });
                                            }
                                        } catch {
                                            return value;
                                        }
                                        return value;
                                    }}
                                    indicator="dot"
                                    formatter={(value, name) => [
                                        new Intl.NumberFormat('en-IN', {
                                            style: 'currency',
                                            currency: 'INR'
                                        }).format(Number(value)),
                                        chartConfig[name as keyof typeof chartConfig]?.label || name
                                    ]}
                                />
                            }
                        />
                        <Area
                            dataKey="totalNetSales"
                            type="natural"
                            fill="url(#fillNetSales)"
                            stroke="var(--color-totalNetSales)"
                            stackId="a"
                        />
                        <Area
                            dataKey="totalGrossSales"
                            type="natural"
                            fill="url(#fillGrossSales)"
                            stroke="var(--color-totalGrossSales)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}


export const GrossNetSalesLoading = () => {
    return (
        <div className="@container/card">
            <div className="border rounded-lg bg-card text-card-foreground shadow-sm">
                {/* Header skeleton */}
                <div className="flex-col space-y-1.5 p-6 relative flex items-center">
                    <div className="h-6 w-48 bg-muted animate-pulse rounded" />
                </div>

                {/* Content skeleton */}
                <div className="p-6 px-2 pt-4 sm:px-6 sm:pt-6">
                    <div className="aspect-auto h-[250px] w-full relative">
                        {/* Chart area background */}
                        <div className="h-full w-full bg-muted/10 rounded-lg relative overflow-hidden">

                            {/* Grid lines */}
                            <div className="absolute inset-0">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={`horizontal-${i}`}
                                        className="absolute w-full border-t border-muted/30"
                                        style={{ top: `${(i + 1) * 20}%` }}
                                    />
                                ))}
                            </div>

                            {/* Animated line paths */}
                            <div className="absolute inset-4">
                                {/* First line (Gross Sales) */}
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path
                                        d="M5,60 Q25,45 35,50 T55,40 T75,35 T95,30"
                                        fill="none"
                                        stroke="oklch(0.488 0.243 264.376)"
                                        strokeWidth="0.8"
                                        opacity="0.7"
                                        className="animate-pulse"
                                    />
                                    <path
                                        d="M5,60 Q25,45 35,50 T55,40 T75,35 T95,30 L95,100 L5,100 Z"
                                        fill="url(#gradientGross)"
                                        opacity="0.3"
                                        className="animate-pulse"
                                    />
                                    <defs>
                                        <linearGradient id="gradientGross" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="oklch(0.488 0.243 264.376)" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="oklch(0.488 0.243 264.376)" stopOpacity="0.1" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Second line (Net Sales) */}
                                <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path
                                        d="M5,70 Q25,65 35,68 T55,58 T75,55 T95,50"
                                        fill="none"
                                        stroke="oklch(0.696 0.17 162.48)"
                                        strokeWidth="0.8"
                                        opacity="0.7"
                                        className="animate-pulse"
                                        style={{ animationDelay: '0.2s' }}
                                    />
                                    <path
                                        d="M5,70 Q25,65 35,68 T55,58 T75,55 T95,50 L95,100 L5,100 Z"
                                        fill="url(#gradientNet)"
                                        opacity="0.2"
                                        className="animate-pulse"
                                        style={{ animationDelay: '0.2s' }}
                                    />
                                    <defs>
                                        <linearGradient id="gradientNet" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="oklch(0.696 0.17 162.48)" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="oklch(0.696 0.17 162.48)" stopOpacity="0.1" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Data points */}
                                {[15, 30, 45, 60, 75, 90].map((x, i) => (
                                    <div key={`point-${i}`} className="absolute">
                                        <div
                                            className="w-2 h-2 bg-muted rounded-full animate-pulse"
                                            style={{
                                                left: `${x}%`,
                                                top: `${45 + Math.sin(i) * 15}%`,
                                                animationDelay: `${i * 0.1}s`
                                            }}
                                        />
                                        <div
                                            className="w-2 h-2 bg-muted rounded-full animate-pulse"
                                            style={{
                                                left: `${x}%`,
                                                top: `${65 + Math.cos(i) * 10}%`,
                                                animationDelay: `${i * 0.1 + 0.3}s`
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* X-axis labels skeleton */}
                        <div className="flex justify-between mt-2 px-4">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={`x-label-${i}`}
                                    className="h-3 w-8 bg-muted animate-pulse rounded"
                                    style={{ animationDelay: `${i * 0.05}s` }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Legend skeleton */}
                    <div className="flex items-center justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-muted animate-pulse" style={{ backgroundColor: 'oklch(0.488 0.243 264.376)', opacity: 0.7 }} />
                            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-muted animate-pulse" style={{ backgroundColor: 'oklch(0.696 0.17 162.48)', opacity: 0.7, animationDelay: '0.2s' }} />
                            <div className="h-4 w-16 bg-muted animate-pulse rounded" style={{ animationDelay: '0.2s' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
