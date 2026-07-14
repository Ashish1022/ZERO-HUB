import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import './globals.css'

import { TRPCReactProvider } from '@/trpc/client'
import { ThemeProvider } from '@/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZERO | HUB',
  description:
    'Take your business online effortlessly with cutting-edge technology. Digitize your store, accept payments, manage products, and grow your brand— all in one platform.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NuqsAdapter>
            <TRPCReactProvider>
              <Toaster />
              {children}
            </TRPCReactProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  )
}
