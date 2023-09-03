import { QueryFunctionContext } from 'react-query'

import { SERVER_URL } from '@/config'
import { AccessToken, IGetOrbitResponse, IPostOrbitRequest } from '@/types'

// eslint-disable-next-line
export async function getOrbits({ queryKey }: QueryFunctionContext<[string, AccessToken]>): Promise<IGetOrbitResponse> {
    const [, { token, serverUrl }] = queryKey
    const query = new URLSearchParams({ serverUrl })
    const res = await fetch(`${SERVER_URL}/v1/orbits?${query}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}

export async function postOrbit(request: IPostOrbitRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/orbits`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${request.secret.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
}
