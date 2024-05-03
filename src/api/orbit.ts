import { SERVER_URL } from '@/config'
import { ICredential, IDeleteOrbitRequest, IGetOrbitResponse, IPostOrbitRequest, IPutOrbitRequest, ISendOrbitRequest } from '@/types'

export async function getOrbits(credential: ICredential): Promise<IGetOrbitResponse> {
    const query = new URLSearchParams({ serverUrl: credential.serverUrl })
    const res = await fetch(`${SERVER_URL}/v1/orbits?${query}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${credential.token}`,
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

export async function putOrbit(request: IPutOrbitRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/orbits/${request.uri.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${request.secret.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
}

export async function deleteOrbit(request: IDeleteOrbitRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/orbits/${request.uri.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${request.secret.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
}

export async function sendOrbit(request: ISendOrbitRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/orbits/${request.uri.id}/send`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${request.secret.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
}
