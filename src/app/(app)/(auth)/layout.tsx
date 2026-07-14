import React from 'react'

import { Footer } from '@/modules/auth/ui/components/footer'
import { Header } from '@/modules/auth/ui/components/header'
import { ThemeProvider } from '@/providers/theme-provider'
import { BackgroundAnimations } from '@/components/background-animation'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <BackgroundAnimations />
            <div className='flex flex-col min-h-screen'>
                <Header />
                <main className='flex-1'>
                    {children}
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    )
}

export default AuthLayout