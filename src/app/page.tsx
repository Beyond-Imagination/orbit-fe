'use client'

import dynamic from 'next/dynamic'
import Loading from '@/app/loading'

const OrbitList = dynamic(() => import('@/components/orbits/orbitList'), {
    ssr: false,
    loading: () => <Loading />,
})

export default function Home() {
    return (
        <main className="w-full">
            <OrbitList />
        </main>
    )
}
