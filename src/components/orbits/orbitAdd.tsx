import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { AccessToken, IPostOrbitRequest } from '@/types'
import { postOrbit } from '@/api/orbit'
import { Check, Stop } from '@/icon'
import AddButton from '@/components/orbits/addButton'

interface OrbitAddProps {
    accessToken: AccessToken
}

export default function OrbitAdd({ accessToken }: OrbitAddProps) {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (body: IPostOrbitRequest) => {
            return postOrbit(body)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orbits'] })
        },
    })

    const [adding, setAdding] = useState<boolean>(false)

    // orbit form
    const [channelName, setChannelName] = useState<string>('')
    const [format, setFormat] = useState<string>('cron')
    const [timezone, setTimezone] = useState<string>('ETC/UTC')
    const [cron, setCron] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const timezoneList = Intl.supportedValuesOf('timeZone')

    if (!adding) {
        return <AddButton setAdding={setAdding} />
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const request: IPostOrbitRequest = {
            body: {
                channel: channelName,
                format,
                timezone,
                cron,
                message,
                serverUrl: accessToken.serverUrl,
            },
            secret: {
                token: accessToken.token,
            },
        }
        mutation.mutate(request)
    }

    return (
        <div className=" border-2 border-[#9C4A98] rounded p-2 w-full">
            <form onSubmit={onSubmit}>
                <div className="flex justify-between">
                    <div className="basis-10/12 flex gap-6">
                        <div className="w-44">
                            <label htmlFor="add/ChannelNameInput" className="text-lg font-semibold">
                                Channel Name
                                <input
                                    id="add/ChannelNameInput"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChannelName(e.target.value)}
                                    className="border rounded w-full p-1"
                                    placeholder="your channel name"
                                />
                            </label>
                        </div>
                        <div className="w-32">
                            <label htmlFor="add/FormatSelect" className="text-lg font-semibold">
                                Format
                                <select
                                    id="add/FormatSelect"
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormat(e.target.value)}
                                    className="border rounded w-full p-1"
                                >
                                    <option>cron</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-68">
                            <label htmlFor="add/TimezoneSelect" className="text-lg font-semibold">
                                timezone
                                <select
                                    id="add/TimezoneSelect"
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTimezone(e.target.value)}
                                    className="border rounded w-full p-1"
                                >
                                    {timezoneList.map(value => (
                                        <option key={`add/${value}`}>{value}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="w-44">
                            <label htmlFor="add/CronInput" className="text-lg font-semibold">
                                cron
                                <input
                                    id="add/CronInput"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCron(e.target.value)}
                                    className="border rounded w-full p-1"
                                    placeholder="* * * * *"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="basis-2/12">
                        <div className="flex gap-2 justify-end">
                            <button type="button" onClick={() => setAdding(false)} className="w-6 h-6">
                                <Stop />
                            </button>
                            <button type="submit" className="w-6 h-6">
                                <Check />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="add/MessageTextarea" className="flex flex-col text-lg font-semibold">
                        message
                        <textarea
                            id="add/MessageTextarea"
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                            className="border rounded p-2"
                            placeholder="write your message"
                        />
                    </label>
                </div>
            </form>
        </div>
    )
}
