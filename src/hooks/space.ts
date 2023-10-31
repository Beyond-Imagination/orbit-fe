import { useQuery } from 'react-query'

import { ICredential } from '@/types'
import getCredential from '@/services/space/auth'

// eslint-disable-next-line
export function useCredential(): ICredential {
    const { data: credential } = useQuery<ICredential>(['accessToken'], () => getCredential(), {
        suspense: true,
        cacheTime: 1000 * 60 * 9, // 9 minutes
        staleTime: 1000 * 60 * 9, // 9 minutes
    })

    return credential!
}
