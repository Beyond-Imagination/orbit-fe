import { ICheckChannelNameRequest } from '@/types'

export async function checkChannelNameExists(request: ICheckChannelNameRequest): Promise<boolean> {
    const url = `${request.serverUrl}/api/http/chats/channels/is-name-free`
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${request.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ name: `${request.channelName}` }),
    })
    const isChannelFree: boolean = await response.json()
    return !isChannelFree
}
