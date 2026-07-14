import React from 'react'

import { SectionCards } from '@/modules/tenants/ui/components/section-cards'
import { ChartAreaInteractive } from '@/modules/tenants/ui/components/chart-area'
import { DataTable } from '@/modules/tenants/ui/components/data-table'
import data from "@/modules/tenants/ui/components/data.json"


const page = () => {
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
        </div>
    )
}

export default page