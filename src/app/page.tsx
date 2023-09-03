'use client'

import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { AccessToken } from '@/types'
import OrbitList from '@/components/orbits/orbitList'
import getUserAccessToken from '@/services/space/auth'

export default function Home() {
    const [accessToken, setAccessToken] = useState<AccessToken | null>(null)
    const queryClient = new QueryClient()

    useEffect(() => {
        getUserAccessToken().then(data => {
            setAccessToken(data as AccessToken)
        })
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <main className="flex flex-col items-center justify-between p-4">
                {
                    accessToken ? <OrbitList accessToken={accessToken} /> : <div>loading</div> // TODO: error 처리
                }
            </main>
        </QueryClientProvider>
    )
}
