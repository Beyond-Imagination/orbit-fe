import { useQuery } from 'react-query'

import { AccessToken } from '@/types'
import { getOrbits } from '@/api/orbit'
import Orbit from '@/components/orbits/orbit'
import OrbitAdd from '@/components/orbits/orbitAdd'

interface OrbitListProps {
    accessToken: AccessToken
}

export default function OrbitList({ accessToken }: OrbitListProps) {
    const { data, error, isFetching } = useQuery(['orbits', accessToken], getOrbits, {
        enabled: !!accessToken,
    })

    // TODO: 에러처리 변경
    if (error || isFetching || !data) {
        return <div>loading</div>
    }

    return (
        <div className="flex flex-col space-y-2 w-full">
            {data.orbits.map(orbit => (
                <Orbit key={orbit._id} orbit={orbit} accessToken={accessToken} />
            ))}
            <OrbitAdd key="add" accessToken={accessToken} />
        </div>
    )
}
