import { AccessToken, IOrbit } from '@/types'
import Orbit from '@/components/orbits/orbit'
import OrbitAdd from '@/components/orbits/orbitAdd'

interface OrbitListProps {
    orbits: IOrbit[]
    accessToken: AccessToken
}

export default function OrbitList({ orbits, accessToken }: OrbitListProps) {
    return (
        <div className="flex flex-col space-y-2 w-full">
            {orbits.map(orbit => (
                <Orbit key={orbit._id} orbit={orbit} accessToken={accessToken} />
            ))}
            <OrbitAdd key="add" accessToken={accessToken} />
        </div>
    )
}
