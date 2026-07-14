import React from 'react'

import { ThemeProvider } from '@/providers/theme-provider'
import { Header } from '@/modules/auth/ui/components/header'
import { BackgroundAnimations } from '@/components/background-animation'

const SubscriptionsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Header />
            <BackgroundAnimations />
            {children}
        </ThemeProvider>
    )
}

export default SubscriptionsLayout