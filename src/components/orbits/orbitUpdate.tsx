import { Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { isValidCron } from 'cron-validator'

import { AccessToken, IOrbit, IPutOrbitRequest } from '@/types'
import { Check, Stop } from '@/icon'
import { putOrbit } from '@/api/orbit'
import ErrorAlert from '@/components/alerts/error'

interface OrbitUpdateProps {
    orbit: IOrbit
    setUpdating: Dispatch<SetStateAction<boolean>>
    accessToken: AccessToken
}

type Inputs = {
    channelName: string
    format: string
    timezone: string
    cron: string
    message: string
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
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            channelName: orbit.channelName,
            format: orbit.format,
            timezone: orbit.timezone,
            cron: orbit.cron,
            message: orbit.message,
        },
    })
    const timezoneList = Intl.supportedValuesOf('timeZone')
    const errorMessage: string | undefined = errors?.channelName?.message || errors?.cron?.message || errors?.message?.message

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const request: IPutOrbitRequest = {
            body: {
                channel: data.channelName,
                format: data.format,
                timezone: data.timezone,
                cron: data.cron,
                message: data.message,
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
                            <label htmlFor={`${orbit._id}/FormatSelect`} className="text-lg font-semibold">
                                Format
                                <select
                                    id={`${orbit._id}/FormatSelect`}
                                    className="border rounded w-full p-1"
                                    defaultValue={watch('format')}
                                    {...register('format', { required: 'format is required' })}
                                >
                                    <option>cron</option>
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
                        <div className="w-44">
                            <label htmlFor={`${orbit._id}/CronInput`} className="text-lg font-semibold">
                                cron
                                <input
                                    id={`${orbit._id}/CronInput`}
                                    className="border rounded w-full p-1"
                                    value={watch('cron')}
                                    {...register('cron', { validate: value => isValidCron(value, { alias: true }) || 'invalid cron format' })}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="basis-2/12">
                        <div className="flex gap-2 justify-end">
                            <button type="button" onClick={() => setUpdating(false)} className="w-6 h-6">
                                <Stop />
                            </button>
                            <button type="submit" className="w-6 h-6">
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
                            className="border rounded p-2"
                            value={watch('message')}
                            {...register('message', { required: 'message is required' })}
                        />
                    </label>
                </div>
                {errorMessage && <ErrorAlert message={errorMessage} />}
            </form>
        </div>
    )
}
