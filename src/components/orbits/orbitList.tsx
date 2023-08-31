import { useQuery } from 'react-query'

import { AccessToken } from '@/types'
import Orbit from '@/components/orbits/orbit'
import AddButton from '@/components/orbits/addButton'
import { getOrbits } from '@/api/orbit'

interface OrbitListProps {
    accessToken: AccessToken
}

export default function OrbitList({ accessToken }: OrbitListProps) {
    const { data, error, isFetching } = useQuery(['orbits', accessToken], getOrbits, {
        enabled: !!accessToken,
    })

    // TODO: 에러처리 변경
    if (error || isFetching || !data) {
        return <div>error</div>
    }

    return (
        <div className="flex flex-col space-y-2 w-full">
            {data.orbits.map(orbit => (
                <Orbit key={orbit.id} orbit={orbit} />
            ))}
            <AddButton />
        </div>
    )
}
