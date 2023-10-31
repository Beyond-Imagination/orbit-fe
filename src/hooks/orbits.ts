import { useQuery } from 'react-query'

import { AccessToken, IOrbit } from '@/types'
import { getOrbits } from '@/api/orbit'

// eslint-disable-next-line
export function useOrbits(accessToken: AccessToken): IOrbit[] {
    const { data } = useQuery(['orbits', accessToken], getOrbits, {
        enabled: !!accessToken,
        refetchOnWindowFocus: false,
        suspense: true,
    })

    return data?.orbits as IOrbit[]
}
