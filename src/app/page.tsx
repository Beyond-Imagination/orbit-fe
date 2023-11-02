'use client'

import OrbitList from '@/components/orbits/orbitList'
import { useOrbits } from '@/hooks'

export default function Home() {
    const orbits = useOrbits()

    return (
        <main className="w-full">
            <OrbitList orbits={orbits} />
        </main>
    )
}
