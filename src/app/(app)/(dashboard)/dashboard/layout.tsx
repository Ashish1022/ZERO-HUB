import React from 'react'
import './dashboard.css'

import { ThemeProvider } from '@/providers/theme-provider'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/modules/analytics/ui/components/sidebar/app-sidebar'
import { SiteHeader } from '@/modules/analytics/ui/components/sidebar/site-header'
import { caller } from '@/trpc/server'
import { redirect } from 'next/navigation'
import { Tenant } from '@/payload-types'

export const dynamic = 'force-dynamic'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

    const session = await caller.auth.session();
    if (!session.user) redirect('/login');
    const tenant = session.user.tenants?.[0].tenant as Tenant

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <SidebarProvider>
                <AppSidebar variant="inset" storeName={tenant.store}/>
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            {children}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    )
}

export default DashboardLayout