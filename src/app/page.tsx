'use client'

import dynamic from 'next/dynamic'

const OrbitList = dynamic(() => import('@/components/orbits/orbitList'), {
    ssr: false,
})

export default function Home() {
    return (
        <main className="w-full">
            <OrbitList />
        </main>
    )
}
