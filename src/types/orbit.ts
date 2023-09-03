export interface IOrbit {
    id: string
    format: string
    channelName: string
    timezone: string
    cron: string
    message: string
}

export interface IGetOrbitResponse {
    orbits: IOrbit[]
}
