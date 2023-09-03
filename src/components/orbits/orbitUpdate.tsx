import { Check, Stop } from '@/icon'
import { IOrbit } from '@/types'
import { Dispatch, SetStateAction } from 'react'

interface OrbitUpdateProps {
    orbit: IOrbit
    setUpdating: Dispatch<SetStateAction<boolean>>
}

export default function OrbitUpdate({ orbit, setUpdating }: OrbitUpdateProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between">
                <div className="basis-10/12">
                    <form className="flex gap-6">
                        <div className="w-40">
                            <label htmlFor={`${orbit.id}/ChannelNameInput`} className="text-lg font-semibold">
                                Channel Name
                                <input id={`${orbit.id}/ChannelNameInput`} className="border rounded w-full p-1" value={orbit.channelName} />
                            </label>
                        </div>
                        <div className="w-32">
                            <label htmlFor={`${orbit.id}/FormatSelect`} className="text-lg font-semibold">
                                Format
                                <select id={`${orbit.id}/FormatSelect`} className="border rounded w-full p-1">
                                    <option>cron</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-32">
                            <label htmlFor={`${orbit.id}/TimezoneSelect`} className="text-lg font-semibold">
                                timezone
                                <select id={`${orbit.id}/TimezoneSelect`} className="border rounded w-full p-1">
                                    <option>ETC/UTC</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-56">
                            <label htmlFor={`${orbit.id}/CronInput`} className="text-lg font-semibold">
                                cron
                                <input id={`${orbit.id}/CronInput`} className="border rounded w-full p-1" value={orbit.cron} />
                            </label>
                        </div>
                    </form>
                </div>
                <div className="basis-2/12">
                    <div className="flex gap-2 justify-end">
                        <button type="button" onClick={() => setUpdating(false)} className="w-6 h-6">
                            <Stop />
                        </button>
                        <button type="button" className="w-6 h-6">
                            <Check />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor={`${orbit.id}/MessageTextarea`} className="flex flex-col text-lg font-semibold">
                    message
                    <textarea id={`${orbit.id}/MessageTextarea`} className="border rounded p-2" value={orbit.message} />
                </label>
            </div>
        </div>
    )
}
