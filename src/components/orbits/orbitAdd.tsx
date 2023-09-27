import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useForm, SubmitHandler } from 'react-hook-form'

import { AccessToken, IPostOrbitRequest } from '@/types'
import { postOrbit } from '@/api/orbit'
import { Check, Stop } from '@/icon'
import AddButton from '@/components/orbits/addButton'

interface OrbitAddProps {
    accessToken: AccessToken
}

type Inputs = {
    channelName: string
    format: string
    timezone: string
    cron: string
    message: string
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
    const { register, handleSubmit } = useForm<Inputs>()
    const [adding, setAdding] = useState<boolean>(false)
    const timezoneList = Intl.supportedValuesOf('timeZone')

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const request: IPostOrbitRequest = {
            body: {
                channel: data.channelName,
                format: data.format,
                timezone: data.timezone,
                cron: data.cron,
                message: data.message,
                serverUrl: accessToken.serverUrl,
            },
            secret: {
                token: accessToken.token,
            },
        }
        mutation.mutate(request)
    }

    if (!adding) {
        return <AddButton setAdding={setAdding} />
    }

    return (
        <div className=" border-2 border-[#9C4A98] rounded p-2 w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between">
                    <div className="basis-10/12 flex gap-6">
                        <div className="w-44">
                            <label htmlFor="add/ChannelNameInput" className="text-lg font-semibold">
                                Channel Name
                                <input
                                    id="add/ChannelNameInput"
                                    className="border rounded w-full p-1"
                                    placeholder="your channel name"
                                    {...register('channelName')}
                                />
                            </label>
                        </div>
                        <div className="w-32">
                            <label htmlFor="add/FormatSelect" className="text-lg font-semibold">
                                Format
                                <select id="add/FormatSelect" className="border rounded w-full p-1" {...register('format')}>
                                    <option>cron</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-68">
                            <label htmlFor="add/TimezoneSelect" className="text-lg font-semibold">
                                timezone
                                <select id="add/TimezoneSelect" className="border rounded w-full p-1" {...register('timezone')}>
                                    {timezoneList.map(value => (
                                        <option key={`add/${value}`}>{value}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="w-44">
                            <label htmlFor="add/CronInput" className="text-lg font-semibold">
                                cron
                                <input id="add/CronInput" className="border rounded w-full p-1" placeholder="* * * * *" {...register('cron')} />
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
                        <textarea id="add/MessageTextarea" className="border rounded p-2" placeholder="write your message" {...register('message')} />
                    </label>
                </div>
            </form>
        </div>
    )
}
