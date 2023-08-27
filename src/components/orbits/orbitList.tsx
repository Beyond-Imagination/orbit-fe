import { IOrbit } from '@/types'
import Orbit from '@/components/orbits/orbit'

interface OrbitListProps {
    orbits: IOrbit[]
}

export default function OrbitList({ orbits }: OrbitListProps) {
    return (
        <div className="flex flex-col space-y-2 w-full">
            {orbits.map(orbit => (
                <Orbit key={orbit.id} orbit={orbit} />
            ))}
        </div>
    )
}
