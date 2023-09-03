export interface IOrbit {
    id?: string
    format: string
    channelName: string
    timezone: string
    cron: string
    message: string
}

export interface IGetOrbitResponse {
    orbits: IOrbit[]
}

export interface IPostOrbitRequest {
    body: {
        format: string
        channel: string
        timezone: string
        cron: string
        message: string
        serverUrl: string
    }
    secret: {
        token: string
    }
}
