import { SERVER_URL } from '@/config'
import { IGetOrbitResponse } from '@/types'

// eslint-disable-next-line
export async function getOrbits({ queryKey }): Promise<IGetOrbitResponse> {
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
