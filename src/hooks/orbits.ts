import { useQuery } from 'react-query'

import { IOrbit } from '@/types'
import { getOrbits } from '@/api/orbit'
import { useCredential } from '@/hooks/space'

// eslint-disable-next-line
export function useOrbits(): IOrbit[] {
    const credential = useCredential()
    const { data } = useQuery(['orbits', credential], getOrbits, {
        enabled: !!credential,
        refetchOnWindowFocus: false,
        suspense: true,
    })

    return data?.orbits || ([] as IOrbit[])
}
