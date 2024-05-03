import { useSuspenseQuery } from '@tanstack/react-query'

import { ICredential } from '@/types'
import getCredential from '@/services/space/auth'

export function useCredential(): ICredential {
    const { data: credential } = useSuspenseQuery<ICredential | null>({
        queryKey: ['accessToken'],
        queryFn: () => getCredential(),
        gcTime: 1000 * 60 * 9, // 9 minutes
        staleTime: 1000 * 60 * 9, // 9 minutes
    })

    return credential!
}
