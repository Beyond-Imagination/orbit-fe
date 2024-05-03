import { ChangeEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import OrbitCronInput from '@/components/orbits/OrbitCronInput'
import { IPostOrbitRequest } from '@/types'
import { postOrbit } from '@/api/orbit'
import { Check, Stop } from '@/icon'
import AddButton from '@/components/orbits/addButton'
import ErrorAlert from '@/components/alerts/error'
import OrbitWeeklyInput from '@/components/orbits/OrbitWeeklyInput'
import { useCredential } from '@/hooks'
import Loading from '@/app/loading'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

type Inputs = {
    channelName: string
    type: string
    timezone: string
    cron: string
    message: string
    weekly: {
        days: number[]
        time: string
    }
}

export default function OrbitAdd() {
    const credential = useCredential()
    const methods = useForm<Inputs>()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = methods
    const [adding, setAdding] = useState<boolean>(false)
    const [inputType, setInputType] = useState<string>('cron')
    const onChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
        setInputType(e.target.value)
    }

    const timezoneList = Intl.supportedValuesOf('timeZone')
    const errorMessage: string | undefined =
        errors?.channelName?.message || errors?.cron?.message || errors?.message?.message || errors?.weekly?.message

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

    const convertToCronExpression = (days: number[], time: string): string => {
        const [hours, minutes] = time.split(':')

        days.sort()
        const daysCron = days.join(',')
        return `${minutes} ${hours} * * ${daysCron}`
    }

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const request: IPostOrbitRequest = {
            body: {
                channelName: data.channelName,
                type: data.type,
                timezone: data.timezone,
                cron: data.type === 'cron' ? data.cron : convertToCronExpression(data.weekly.days, data.weekly.time),
                weekly: data.type === 'weekly' ? data.weekly : undefined,
                message: data.message,
                serverUrl: credential.serverUrl,
            },
            secret: {
                token: credential.token,
            },
        }
        mutation.mutate(request)
    }

    if (!adding) {
        return <AddButton setAdding={setAdding} />
    }

    return (
        <div className=" border-2 border-[#9C4A98] rounded p-2 w-full">
            {mutation.isPending && <Loading />}
            <FormProvider {...methods}>
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
                                <label htmlFor="add/TypeSelect" className="text-lg font-semibold">
                                    Type
                                    <select
                                        id="add/TypeSelect"
                                        className="border rounded w-full p-1"
                                        {...register('type', { required: 'type is required' })}
                                        onChange={onChangeType}
                                    >
                                        <option>cron</option>
                                        <option>weekly</option>
                                    </select>
                                </label>
                            </div>
                            <div className="w-44">
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

                            {inputType === 'cron' && <OrbitCronInput />}
                        </div>
                        <div className="basis-2/12">
                            <div className="flex gap-2 justify-end">
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setAdding(false)}
                                        data-tooltip-id="Stop"
                                        data-tooltip-content="Cancel add orbit message"
                                        className="w-6 h-6"
                                    >
                                        <Stop />
                                    </button>
                                    <Tooltip id="Stop" place="top" border="2px solid purple" />
                                </div>
                                <div className="relative">
                                    <button type="submit" data-tooltip-id="Check" data-tooltip-content="Add orbit message" className="w-6 h-6">
                                        <Check />
                                    </button>
                                    <Tooltip id="Check" place="top" border="2px solid purple" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {inputType === 'weekly' && <OrbitWeeklyInput />}

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
            </FormProvider>
        </div>
    )
}
