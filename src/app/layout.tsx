'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Header from '@/components/header'
import Newrelic from '@/components/newrelic'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                suspense: true,
            },
            mutations: {
                useErrorBoundary: true,
                retry: 1,
            },
        },
    })

    return (
        <html lang="en">
            <Newrelic />
            <QueryClientProvider client={queryClient}>
                <body className={inter.className}>
                    <Header />
                    <div className="flex items-center justify-center p-4">{children}</div>
                </body>
            </QueryClientProvider>
        </html>
    )
}
