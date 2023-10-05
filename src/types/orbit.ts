export interface IOrbit {
    _id: string
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
        channelName: string
        timezone: string
        cron: string
        message: string
        serverUrl: string
    }
    secret: {
        token: string
    }
}

export interface IPutOrbitRequest {
    body: {
        format: string
        channelName: string
        timezone: string
        cron: string
        message: string
        serverUrl: string
    }
    uri: {
        id: string
    }
    secret: {
        token: string
    }
}

export interface IDeleteOrbitRequest {
    uri: {
        id: string
    }
    secret: {
        token: string
    }
}

export interface ISendOrbitRequest {
    body: {
        serverUrl: string
    }
    uri: {
        id: string
    }
    secret: {
        token: string
    }
}
