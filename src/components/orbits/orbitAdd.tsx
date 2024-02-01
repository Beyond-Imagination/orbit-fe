import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import { isValidCron } from 'cron-validator'

import { IPostOrbitRequest } from '@/types'
import { postOrbit } from '@/api/orbit'
import { Check, Stop } from '@/icon'
import AddButton from '@/components/orbits/addButton'
import ErrorAlert from '@/components/alerts/error'
import { useCredential } from '@/hooks'
import Loading from '@/app/loading'
import Tooltip from './tooltip'

type Inputs = {
    channelName: string
    format: string
    timezone: string
    cron: string
    message: string
}

export default function OrbitAdd() {
    const credential = useCredential()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>()
    const [adding, setAdding] = useState<boolean>(false)
    const timezoneList = Intl.supportedValuesOf('timeZone')
    const errorMessage: string | undefined = errors?.channelName?.message || errors?.cron?.message || errors?.message?.message

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (body: IPostOrbitRequest) => {
            return postOrbit(body)
        },
        onSuccess: async () => {
            reset()
            setAdding(false)
            await queryClient.invalidateQueries({ queryKey: ['orbits'] })
        },
    })

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const request: IPostOrbitRequest = {
            body: {
                channelName: data.channelName,
                format: data.format,
                timezone: data.timezone,
                cron: data.cron,
                message: data.message,
                serverUrl: credential.serverUrl,
            },
            secret: {
                token: credential.token,
            },
        }
        mutation.mutate(request)
    }

    const [showTooltipStop, setShowTooltipStop] = useState(false)
    const [showTooltipCheck, setShowTooltipCheck] = useState(false)

    if (!adding) {
        return <AddButton setAdding={setAdding} />
    }

    return (
        <div className=" border-2 border-[#9C4A98] rounded p-2 w-full">
            {mutation.isLoading && <Loading />}
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
                                    {...register('channelName', { required: 'channel name is required' })}
                                />
                            </label>
                        </div>
                        <div className="w-32">
                            <label htmlFor="add/FormatSelect" className="text-lg font-semibold">
                                Format
                                <select
                                    id="add/FormatSelect"
                                    className="border rounded w-full p-1"
                                    {...register('format', { required: 'format is required' })}
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
                                    className="border rounded w-full p-1"
                                    {...register('timezone', { required: 'timezone is required' })}
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
                                    className="border rounded w-full p-1"
                                    placeholder="* * * * *"
                                    {...register('cron', { validate: value => isValidCron(value, { alias: true }) || 'invalid cron format' })}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="basis-2/12">
                        <div className="flex gap-2 justify-end">
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setAdding(false)}
                                    onMouseEnter={() => setShowTooltipStop(true)}
                                    onMouseLeave={() => setShowTooltipStop(false)}
                                    className="w-6 h-6"
                                >
                                    <Stop />
                                </button>
                                <Tooltip message="Cancel add" show={showTooltipStop} />
                            </div>
                            <div className="relative">
                                <button
                                    type="submit"
                                    onMouseEnter={() => setShowTooltipCheck(true)}
                                    onMouseLeave={() => setShowTooltipCheck(false)}
                                    className="w-6 h-6"
                                >
                                    <Check />
                                </button>
                                <Tooltip message="Add message" show={showTooltipCheck} />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="add/MessageTextarea" className="flex flex-col text-lg font-semibold">
                        message
                        <textarea
                            id="add/MessageTextarea"
                            className="border rounded p-2"
                            placeholder="write your message"
                            {...register('message', { required: 'message is required' })}
                        />
                    </label>
                </div>
                {errorMessage && <ErrorAlert message={errorMessage} />}
            </form>
        </div>
    )
}
