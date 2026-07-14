"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

export const description = "A line chart with a label"

const chartConfig = {
    totalOrders: {
        label: "Total Orders",
        color: "oklch(0.7715 0.2086 136)",
    },
} satisfies ChartConfig

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

export function TotalOrdersLineChart({ tenantId }: { tenantId: string }) {

    const currentYear = new Date().getFullYear();

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.analytics.getTenantMonthlySales.queryOptions({
        tenantId: tenantId,
    }))

    const chartData = data?.map((item) => ({
        month: monthNames[parseInt(item.month) - 1],
        totalOrders: Number(item.totalOrders) || 0,
    }))

    return (
        <Card>
            <CardHeader>
                <CardTitle>Total Orders</CardTitle>
                <CardDescription>January - December {currentYear}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[250px] pb-0 w-full">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="totalOrders"
                            type="linear"
                            stroke="var(--color-totalOrders)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-totalOrders)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="text-sm">
                <div className="text-muted-foreground leading-none">
                    Showing total orders for {currentYear}
                </div>
            </CardFooter>
        </Card>
    )
}

export function TotalOrdersLineChartLoading() {
    return (
        <Card>
            <CardHeader>
                <div className="h-6 w-32 bg-muted animate-pulse rounded mb-2" />
                <div className="h-4 w-40 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
                <div className="max-h-[250px] pb-0 w-full">
                    <div className="h-[200px] w-full bg-muted/20 animate-pulse rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 flex flex-col justify-around">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-px bg-muted/40 animate-pulse"
                                    style={{ animationDelay: `${i * 100}ms` }}
                                />
                            ))}
                        </div>

                        <div className="absolute inset-4">
                            <svg className="w-full h-full">
                                <path
                                    d="M 0 60 Q 50 40 100 50 T 200 30 T 300 60 T 400 20"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    className="text-muted animate-pulse"
                                    style={{ animationDuration: '2s' }}
                                />
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <circle
                                        key={i}
                                        cx={i * 30 + 10}
                                        cy={Math.random() * 60 + 20}
                                        r="3"
                                        className="fill-muted animate-pulse"
                                        style={{ animationDelay: `${i * 100}ms` }}
                                    />
                                ))}
                            </svg>
                        </div>
                    </div>

                    <div className="flex justify-around mt-2">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-3 w-6 bg-muted animate-pulse rounded"
                                style={{ animationDelay: `${i * 50}ms` }}
                            />
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="text-sm">
                <div className="h-4 w-56 bg-muted animate-pulse rounded" />
            </CardFooter>
        </Card>
    );
}