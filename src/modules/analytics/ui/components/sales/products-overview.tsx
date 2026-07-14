"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    MoreVerticalIcon,
    TrendingUpIcon,
} from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { formatPrice } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export const schema = z.object({
    productName: z.string().nullable(),
    productRankHigh: z.number().nullable(),
    productRankLow: z.number().nullable(),
    tenantId: z.string().nullable(),
    totalGrossSales: z.string().nullable(),
    totalItemsSold: z.string().nullable(),
    totalNetSales: z.string().nullable(),
    totalCostPrice: z.string().nullable(),
})

type ProductData = z.infer<typeof schema>

function TableCellViewer({ item, rankType }: { item: ProductData; rankType: 'high' | 'low' }) {
    const isMobile = useIsMobile()

    const chartData = React.useMemo(() => {
        const totalSales = parseFloat(item.totalGrossSales || "0")
        const baseMonthly = totalSales / 6

        return [
            { month: "January", sales: Math.round(baseMonthly * 0.8) },
            { month: "February", sales: Math.round(baseMonthly * 1.2) },
            { month: "March", sales: Math.round(baseMonthly * 0.9) },
            { month: "April", sales: Math.round(baseMonthly * 1.1) },
            { month: "May", sales: Math.round(baseMonthly * 1.0) },
            { month: "June", sales: Math.round(baseMonthly * 1.3) },
        ]
    }, [item.totalGrossSales])

    const chartConfig = {
        sales: {
            label: "Sales (Rs.)",
            color: "hsl(var(--primary))",
        },
    } satisfies ChartConfig

    const displayRank = rankType === 'high' ? item.productRankHigh : item.productRankLow

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link" className="w-fit px-0 text-left text-foreground">
                    {item.productName || "Unknown Product"}
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
                <SheetHeader className="gap-1">
                    <SheetTitle>{item.productName || "Unknown Product"}</SheetTitle>
                    <SheetDescription>
                        Product details and sales analytics
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
                    {!isMobile && (
                        <>
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        left: 0,
                                        right: 10,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                        hide
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dot" />}
                                    />
                                    <Area
                                        dataKey="sales"
                                        type="natural"
                                        fill="var(--color-sales)"
                                        fillOpacity={0.6}
                                        stroke="var(--color-sales)"
                                    />
                                </AreaChart>
                            </ChartContainer>
                            <Separator />
                            <div className="grid gap-2">
                                <div className="flex gap-2 font-medium leading-none">
                                    Product Sales Trend{" "}
                                    <TrendingUpIcon className="size-4" />
                                </div>
                                <div className="text-muted-foreground">
                                    Sales trend for {item.productName || "this product"} over the last 6 months.
                                </div>
                            </div>
                            <Separator />
                        </>
                    )}
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <Label className="text-muted-foreground">Rank</Label>
                                <div className="text-lg font-semibold">#{displayRank || "N/A"}</div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label className="text-muted-foreground">Items Sold</Label>
                                <div className="text-lg font-semibold">{item.totalItemsSold || "0"}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <Label className="text-muted-foreground">Gross Sales</Label>
                                <div className="text-lg font-semibold">${parseFloat(item.totalGrossSales || "0").toFixed(2)}</div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label className="text-muted-foreground">Net Sales</Label>
                                <div className="text-lg font-semibold">${parseFloat(item.totalNetSales || "0").toFixed(2)}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label className="text-muted-foreground">Profit</Label>
                            <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                                ${(parseFloat(item.totalGrossSales || "0") - parseFloat(item.totalNetSales || "0")).toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
                <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
                    <Button className="w-full">Edit Product</Button>
                    <SheetClose asChild>
                        <Button variant="outline" className="w-full">
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

const createColumns = (productData: ProductData[], rankType: 'high' | 'low'): ColumnDef<ProductData>[] => [
    {
        accessorKey: rankType === 'high' ? "productRankHigh" : "productRankLow",
        header: () => <div className="text-center">Rank</div>,
        cell: ({ row }) => {
            const rank = rankType === 'high' ? row.original.productRankHigh : row.original.productRankLow
            return (
                <div className="flex items-center justify-center">
                    <Badge variant="secondary" className="text-sm font-semibold">
                        #{rank || "N/A"}
                    </Badge>
                </div>
            )
        },
        enableHiding: false,
    },
    {
        accessorKey: "productName",
        header: () => <div className="text-left">Product</div>,
        cell: ({ row }) => {
            return (
                <div className="text-left">
                    <TableCellViewer item={row.original} rankType={rankType} />
                </div>
            )
        },
        enableHiding: false,
    },
    {
        accessorKey: "totalItemsSold",
        header: () => <div className="text-center">Items Sold</div>,
        cell: ({ row }) => (
            <div className="text-center font-medium">
                {row.original.totalItemsSold || "0"}
            </div>
        ),
        enableHiding: false,
    },
    {
        accessorKey: "totalGrossSales",
        header: () => <div className="text-right">Gross Sales</div>,
        cell: ({ row }) => (
            <div className="text-right font-medium">
                {formatPrice(parseFloat(row.original.totalGrossSales || "0"))}
            </div>
        ),
        enableHiding: false,
    },
    {
        accessorKey: "totalNetSales",
        header: () => <div className="text-right">Net Sales</div>,
        cell: ({ row }) => (
            <div className="text-right font-medium">
                {formatPrice(parseFloat(row.original.totalNetSales || "0"))}
            </div>
        ),
        enableHiding: false,
    },
    {
        accessorKey: "totalCostPrice",
        header: () => <div className="text-right">Cost Price</div>,
        cell: ({ row }) => (
            <div className="text-right font-medium">
                {formatPrice(parseFloat(row.original.totalCostPrice || "0"))}
            </div>
        ),
        enableHiding: false,
    },
    {
        id: "profit",
        header: () => <div className="text-right">Profit</div>,
        cell: ({ row }) => {
            const profit = parseFloat(row.original.totalNetSales || "0") - parseFloat(row.original.totalCostPrice || "0")
            const profitColor = profit >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            return (
                <div className={`text-right font-medium ${profitColor}`}>
                    {formatPrice(profit)}
                </div>
            )
        },
        enableHiding: false,
    },
    {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: () => (
            <div className="flex justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                            size="icon"
                        >
                            <MoreVerticalIcon />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit product</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
]

// Separate table component to avoid re-creating columns on every render
function ProductTable({ 
    data, 
    rankType,
    emptyMessage 
}: { 
    data: ProductData[] | undefined
    rankType: 'high' | 'low'
    emptyMessage: string
}) {
    const columns = React.useMemo(() => createColumns(data || [], rankType), [data, rankType]);

    const table = useReactTable({
        data: data || [],
        columns,
        getRowId: (row) => `${row.tenantId}-${rankType === 'high' ? row.productRankHigh : row.productRankLow}`,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table>
                <TableHeader className="sticky top-0 z-10 bg-muted">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export function ProductsOverview({
    tenantId
}: {
    tenantId: string
}) {
    const [selectedTab, setSelectedTab] = React.useState("top")
    const trpc = useTRPC();
    
    const { data: topProductData } = useSuspenseQuery(
        trpc.analytics.getTenantTopProducts.queryOptions({ tenantId: tenantId })
    );
    
    const { data: lowProductData } = useSuspenseQuery(
        trpc.analytics.getTenantLowProducts.queryOptions({ tenantId: tenantId })
    );

    return (
        <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="flex w-full flex-col justify-start gap-6"
        >
            <div className="flex items-center justify-between px-4 lg:px-6">
                <Label htmlFor="view-selector" className="sr-only">
                    View
                </Label>
                <Select value={selectedTab} onValueChange={setSelectedTab}>
                    <SelectTrigger
                        className="@4xl/main:hidden flex w-full"
                        id="view-selector"
                    >
                        <SelectValue placeholder="Select a view" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="top">Top selling products</SelectItem>
                        <SelectItem value="low">Low selling products</SelectItem>
                    </SelectContent>
                </Select>
                <TabsList className="@4xl/main:flex hidden w-full">
                    <TabsTrigger value="top" className="gap-1">
                        Top selling products
                    </TabsTrigger>
                    <TabsTrigger value="low" className="gap-1">
                        Low selling products
                    </TabsTrigger>
                </TabsList>
            </div>
            
            <TabsContent
                value="top"
                className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
            >
                <ProductTable 
                    data={topProductData}
                    rankType="high"
                    emptyMessage="No top products found."
                />
            </TabsContent>
            
            <TabsContent
                value="low"
                className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
            >
                <ProductTable 
                    data={lowProductData}
                    rankType="low"
                    emptyMessage="No low performing products found."
                />
            </TabsContent>
        </Tabs>
    )
}

export function ProductsOverviewSkeleton() {
    return (
        <Tabs
            defaultValue="top"
            className="flex w-full flex-col justify-start gap-6"
        >
            <div className="flex items-center justify-between px-4 lg:px-6">
                <Label htmlFor="view-selector" className="sr-only">
                    View
                </Label>
                <Select defaultValue="top" disabled>
                    <SelectTrigger
                        className="@4xl/main:hidden flex w-full"
                        id="view-selector"
                    >
                        <Skeleton className="h-4 w-32" />
                        <SelectValue placeholder="Select a view" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="top">Top selling products</SelectItem>
                        <SelectItem value="low">Low selling products</SelectItem>
                    </SelectContent>
                </Select>
                <TabsList className="@4xl/main:flex hidden w-full">
                    <TabsTrigger value="top" className="gap-1" disabled>
                        <Skeleton className="h-4 w-36" />
                    </TabsTrigger>
                    <TabsTrigger value="low" className="gap-1" disabled>
                        <Skeleton className="h-4 w-36" />
                    </TabsTrigger>
                </TabsList>
            </div>
            <TabsContent
                value="top"
                className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
            >
                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-muted">
                            <TableRow>
                                <TableHead>
                                    <div className="text-center">
                                        <Skeleton className="h-4 w-12 mx-auto" />
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="text-left">
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="text-center">
                                        <Skeleton className="h-4 w-20 mx-auto" />
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="text-right">
                                        <Skeleton className="h-4 w-20 ml-auto" />
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="text-right">
                                        <Skeleton className="h-4 w-16 ml-auto" />
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="text-right">
                                        <Skeleton className="h-4 w-12 ml-auto" />
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="text-center">
                                        <Skeleton className="h-4 w-14 mx-auto" />
                                    </div>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <TableRow key={index}>
                                    {/* Rank */}
                                    <TableCell>
                                        <div className="flex items-center justify-center">
                                            <Skeleton className="h-6 w-8 rounded-full" />
                                        </div>
                                    </TableCell>
                                    {/* Product Name */}
                                    <TableCell>
                                        <div className="text-left">
                                            <Skeleton className="h-4 w-32" />
                                        </div>
                                    </TableCell>
                                    {/* Items Sold */}
                                    <TableCell>
                                        <div className="text-center">
                                            <Skeleton className="h-4 w-12 mx-auto" />
                                        </div>
                                    </TableCell>
                                    {/* Gross Sales */}
                                    <TableCell>
                                        <div className="text-right">
                                            <Skeleton className="h-4 w-16 ml-auto" />
                                        </div>
                                    </TableCell>
                                    {/* Net Sales */}
                                    <TableCell>
                                        <div className="text-right">
                                            <Skeleton className="h-4 w-16 ml-auto" />
                                        </div>
                                    </TableCell>
                                    {/* Profit */}
                                    <TableCell>
                                        <div className="text-right">
                                            <Skeleton className="h-4 w-14 ml-auto" />
                                        </div>
                                    </TableCell>
                                    {/* Actions */}
                                    <TableCell>
                                        <div className="flex justify-center">
                                            <Skeleton className="h-8 w-8 rounded" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TabsContent>
            <TabsContent
                value="low"
                className="flex flex-col px-4 lg:px-6"
            >
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
                    <Skeleton className="h-6 w-48" />
                </div>
            </TabsContent>
        </Tabs>
    )
}