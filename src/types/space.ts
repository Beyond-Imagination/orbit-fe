export interface ICredential {
    token: string
    serverUrl: string
}

export interface Team {
    id: string
    name: string
    memberships: [Membership]
}

export interface ICheckChannelNameRequest {
    serverUrl: string
    token: string
    channelName: string
}

interface Membership {
    member: Member
}

interface Member {
    id: string
    username: string
}
