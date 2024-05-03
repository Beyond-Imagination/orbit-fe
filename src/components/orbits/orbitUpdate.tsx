import { Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'

import { IOrbit, IPutOrbitRequest } from '@/types'
import { Check, Stop } from '@/icon'
import { putOrbit } from '@/api/orbit'
import ErrorAlert from '@/components/alerts/error'
import { useCredential } from '@/hooks'
import Loading from '@/app/loading'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import OrbitCronInput from '@/components/orbits/OrbitCronInput'
import OrbitWeeklyInput from '@/components/orbits/OrbitWeeklyInput'

interface OrbitUpdateProps {
    orbit: IOrbit
    setUpdating: Dispatch<SetStateAction<boolean>>
}

type Inputs = {
    channelName: string
    type: string
    timezone: string
    cron: string
    weekly: {
        days: number[]
        time: string
    }
    message: string
}

export default function OrbitUpdate({ orbit, setUpdating }: OrbitUpdateProps) {
    const credential = useCredential()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (body: IPutOrbitRequest) => {
            return putOrbit(body)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['orbits'] })
            setUpdating(false)
        },
    })

    const methods = useForm<Inputs>({
        defaultValues: {
            channelName: orbit.channelName,
            type: orbit.type,
            timezone: orbit.timezone,
            cron: orbit.cron,
            weekly: orbit.weekly,
            message: orbit.message,
        },
    })
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = methods

    const timezoneList = Intl.supportedValuesOf('timeZone')
    const errorMessage: string | undefined = errors?.channelName?.message || errors?.cron?.message || errors?.message?.message

    const convertToCronExpression = (days: number[], time: string): string => {
        const [hours, minutes] = time.split(':')

        days.sort()
        const daysCron = days.join(',')
        return `${minutes} ${hours} * * ${daysCron}`
    }

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const request: IPutOrbitRequest = {
            body: {
                channelName: data.channelName,
                type: data.type,
                timezone: data.timezone,
                cron: data.type === 'cron' ? data.cron : convertToCronExpression(data.weekly.days, data.weekly.time),
                weekly: data.weekly,
                message: data.message,
                serverUrl: credential.serverUrl,
            },
            uri: {
                id: orbit._id,
            },
            secret: {
                token: credential.token,
            },
        }
        mutation.mutate(request)
    }

    return (
        <div className="flex flex-col gap-2">
            {mutation.isPending && <Loading />}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between">
                        <div className="basis-10/12 flex gap-6">
                            <div className="w-44">
                                <label htmlFor={`${orbit._id}/ChannelNameInput`} className="text-lg font-semibold">
                                    Channel Name
                                    <input
                                        id={`${orbit._id}/ChannelNameInput`}
                                        className="border rounded w-full p-1"
                                        value={watch('channelName')}
                                        {...register('channelName', { required: 'channel name is required' })}
                                    />
                                </label>
                            </div>
                            <div className="w-32">
                                <label htmlFor={`${orbit._id}/TypeSelect`} className="text-lg font-semibold">
                                    Type
                                    <select
                                        id={`${orbit._id}/TypeSelect`}
                                        className="border rounded w-full p-1"
                                        defaultValue={watch('type')}
                                        {...register('type', { required: 'type is required' })}
                                    >
                                        <option>cron</option>
                                        <option>weekly</option>
                                    </select>
                                </label>
                            </div>
                            <div className="w-68">
                                <label htmlFor={`${orbit._id}/TimezoneSelect`} className="text-lg font-semibold">
                                    timezone
                                    <select
                                        id={`${orbit._id}/TimezoneSelect`}
                                        className="border rounded w-full p-1"
                                        defaultValue={watch('timezone')}
                                        {...register('timezone', { required: 'timezone is required' })}
                                    >
                                        {timezoneList.map(value => (
                                            <option key={`${orbit._id}/${value}`}>{value}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            {orbit.type === 'cron' && <OrbitCronInput />}
                        </div>
                        <div className="basis-2/12">
                            <div className="flex gap-2 justify-end">
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setUpdating(false)}
                                        data-tooltip-id="Stop"
                                        data-tooltip-content="Cancel updating orbit message"
                                        className="w-6 h-6"
                                    >
                                        <Stop />
                                    </button>
                                    <Tooltip id="Stop" place="top" border="2px solid purple" />
                                </div>
                                <div className="relative">
                                    <button
                                        type="submit"
                                        data-tooltip-id="Check"
                                        data-tooltip-content="Save updated orbit message"
                                        className="w-6 h-6"
                                    >
                                        <Check />
                                    </button>
                                    <Tooltip id="Check" place="top" border="2px solid purple" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {orbit.type === 'weekly' && <OrbitWeeklyInput />}

                    <label htmlFor={`${orbit._id}/MessageTextarea`} className="flex flex-col text-lg font-semibold">
                        message
                        <textarea
                            id={`${orbit._id}/MessageTextarea`}
                            className="border rounded p-2"
                            value={watch('message')}
                            {...register('message', { required: 'message is required' })}
                        />
                    </label>
                    {errorMessage && <ErrorAlert message={errorMessage} />}
                </form>
            </FormProvider>
        </div>
    )
}
