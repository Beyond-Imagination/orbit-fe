import { Dispatch, SetStateAction, useState } from 'react'

import { IOrbit } from '@/types'
import { Check, Edit, PaperAirplane, Stop, Trash } from '@/icon'

interface OrbitProps {
    orbit: IOrbit
}

interface ModeProps {
    orbit: IOrbit
    setMode: Dispatch<SetStateAction<string>>
}

function ReadMode({ orbit, setMode }: ModeProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between">
                <div className="basis-10/12">
                    <div className="flex gap-6">
                        <div className="w-36">
                            <p className="text-lg font-semibold">Channel Name</p>
                            <div className="border rounded text-center p-1">{orbit.channelName}</div>
                        </div>
                        <div className="w-32">
                            <p className="text-lg font-semibold">Format</p>
                            <div className="border rounded text-center p-1 ">{orbit.format}</div>
                        </div>
                        <div className="w-32">
                            <p className="text-lg font-semibold">timezone</p>
                            <div className="border rounded text-center p-1">{orbit.timezone}</div>
                        </div>
                        <div className="w-56">
                            <p className="text-lg font-semibold">cron</p>
                            <div className="border rounded text-center p-1">{orbit.cron}</div>
                        </div>
                    </div>
                </div>
                <div className="basis-2/12">
                    <div className="flex gap-2 justify-end">
                        <button type="button" className="w-6 h-6">
                            <PaperAirplane />
                        </button>
                        <button type="button" onClick={() => setMode('write')} className="w-6 h-6">
                            <Edit />
                        </button>
                        <button type="button" className="w-6 h-6">
                            <Trash />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-lg font-semibold">message</p>
                <div className="border rounded p-2">{orbit.message}</div>
            </div>
        </div>
    )
}

function EditMode({ orbit, setMode }: ModeProps) {
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
                        <button type="button" onClick={() => setMode('read')} className="w-6 h-6">
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

export default function Orbit({ orbit }: OrbitProps) {
    const [mode, setMode] = useState<string>(orbit.mode)
    return (
        <div className="border-2 border-[#9C4A98] rounded p-2 w-full">
            {mode === 'read' ? <ReadMode orbit={orbit} setMode={setMode} /> : <EditMode orbit={orbit} setMode={setMode} />}
        </div>
    )
}
