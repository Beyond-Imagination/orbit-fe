'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                suspense: true,
            },
        },
    })

    return (
        <html lang="en">
            <QueryClientProvider client={queryClient}>
                <body className={inter.className}>
                    <Header />
                    <div className="flex items-center justify-center p-4">{children}</div>
                </body>
            </QueryClientProvider>
        </html>
    )
}
