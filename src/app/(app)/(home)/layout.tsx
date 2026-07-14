import React from 'react'

import { Navbar } from '@/modules/home/ui/components/navbar'
import { Footer } from '@/modules/home/ui/components/footer'
import { BackgroundAnimations } from '@/components/background-animation'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <BackgroundAnimations />
            <Navbar />
            <main className='flex-1'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default HomeLayout