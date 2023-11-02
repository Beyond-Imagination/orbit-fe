import Orbit from '@/components/orbits/orbit'
import OrbitAdd from '@/components/orbits/orbitAdd'
import { IOrbit } from '@/types'

type Props = {
    orbits: IOrbit[]
}

export default function OrbitList({ orbits }: Props) {
    return (
        <div className="flex flex-col space-y-2 w-full">
            {orbits.map(orbit => (
                <Orbit key={orbit._id} orbit={orbit} />
            ))}
            <OrbitAdd key="add" />
        </div>
    )
}
