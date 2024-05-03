'use client'

import Orbit from '@/components/orbits/orbit'
import OrbitAdd from '@/components/orbits/orbitAdd'
import { useOrbits } from '@/hooks'

export default function OrbitList() {
    const orbits = useOrbits()
    return (
        <div className="flex flex-col space-y-2 w-full">
            {orbits.map(orbit => (
                <Orbit key={orbit._id} orbit={orbit} />
            ))}
            <OrbitAdd key="add" />
        </div>
    )
}
