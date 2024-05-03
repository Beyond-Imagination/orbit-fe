import { useSuspenseQuery } from '@tanstack/react-query'

import { IOrbit } from '@/types'
import { getOrbits } from '@/api/orbit'
import { useCredential } from '@/hooks/space'

export function useOrbits(): IOrbit[] {
    const credential = useCredential()

    const { data } = useSuspenseQuery({
        queryKey: ['orbits'],
        queryFn: () => getOrbits(credential),
        refetchOnWindowFocus: false,
    })

    return data?.orbits || ([] as IOrbit[])
}
