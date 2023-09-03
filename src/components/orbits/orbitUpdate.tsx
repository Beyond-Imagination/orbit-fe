import { Dispatch, SetStateAction, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { AccessToken, IOrbit, IPutOrbitRequest } from '@/types'
import { Check, Stop } from '@/icon'
import { putOrbit } from '@/api/orbit'

interface OrbitUpdateProps {
    orbit: IOrbit
    setUpdating: Dispatch<SetStateAction<boolean>>
    accessToken: AccessToken
}

export default function OrbitUpdate({ orbit, setUpdating, accessToken }: OrbitUpdateProps) {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (body: IPutOrbitRequest) => {
            return putOrbit(body)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orbits'] })
            setUpdating(false)
        },
    })

    // orbit form
    const [channelName, setChannelName] = useState<string>(orbit.channelName)
    const [format, setFormat] = useState<string>(orbit.format)
    const [timezone, setTimezone] = useState<string>(orbit.timezone)
    const [cron, setCron] = useState<string>(orbit.cron)
    const [message, setMessage] = useState<string>(orbit.message)

    function submit(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault()
        const request: IPutOrbitRequest = {
            body: {
                channel: channelName,
                format,
                timezone,
                cron,
                message,
                serverUrl: accessToken.serverUrl,
            },
            uri: {
                id: orbit._id,
            },
            secret: {
                token: accessToken.token,
            },
        }
        mutation.mutate(request)
    }

    return (
        <div className="flex flex-col gap-2">
            <form>
                <div className="flex justify-between">
                    <div className="basis-10/12 flex gap-6">
                        <div className="w-40">
                            <label htmlFor={`${orbit._id}/ChannelNameInput`} className="text-lg font-semibold">
                                Channel Name
                                <input
                                    id={`${orbit._id}/ChannelNameInput`}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChannelName(e.target.value)}
                                    className="border rounded w-full p-1"
                                    value={channelName}
                                />
                            </label>
                        </div>
                        <div className="w-32">
                            <label htmlFor={`${orbit._id}/FormatSelect`} className="text-lg font-semibold">
                                Format
                                <select
                                    id={`${orbit._id}/FormatSelect`}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormat(e.target.value)}
                                    className="border rounded w-full p-1"
                                >
                                    <option>cron</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-32">
                            <label htmlFor={`${orbit._id}/TimezoneSelect`} className="text-lg font-semibold">
                                timezone
                                <select
                                    id={`${orbit._id}/TimezoneSelect`}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTimezone(e.target.value)}
                                    className="border rounded w-full p-1"
                                >
                                    <option>ETC/UTC</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-56">
                            <label htmlFor={`${orbit._id}/CronInput`} className="text-lg font-semibold">
                                cron
                                <input
                                    id={`${orbit._id}/CronInput`}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCron(e.target.value)}
                                    className="border rounded w-full p-1"
                                    value={cron}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="basis-2/12">
                        <div className="flex gap-2 justify-end">
                            <button type="button" onClick={() => setUpdating(false)} className="w-6 h-6">
                                <Stop />
                            </button>
                            <button type="submit" onClick={(e: React.MouseEvent<HTMLElement>) => submit(e)} className="w-6 h-6">
                                <Check />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor={`${orbit._id}/MessageTextarea`} className="flex flex-col text-lg font-semibold">
                        message
                        <textarea
                            id={`${orbit._id}/MessageTextarea`}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                            className="border rounded p-2"
                            value={message}
                        />
                    </label>
                </div>
            </form>
        </div>
    )
}
