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
        <div className="w-full">
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
                <p>message</p>
                <div className="border rounded p-2">{orbit.message}</div>
            </div>
        </div>
    )
}

function WriteMode({ orbit, setMode }: ModeProps) {
    return (
        <div className="w-full">
            <div className="flex flex-row">
                <div className="basis-1/4">
                    <p>channel name</p>
                    <p>{orbit.channelName}</p>
                </div>
                <div className="basis-1/4">
                    <p>format</p>
                    <p>{orbit.format}</p>
                </div>
                <div className="basis-1/4">
                    <p>timezone</p>
                    <p>{orbit.timezone}</p>
                </div>
                <div className="basis-1/4">
                    <p>cron</p>
                    <p>{orbit.cron}</p>
                </div>
                <div className="basis-1/8">
                    <div className="flex space-x-2">
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
                <p>message</p>
                <p>{orbit.cron}</p>
            </div>
        </div>
    )
}

export default function Orbit({ orbit }: OrbitProps) {
    const [mode, setMode] = useState<string>(orbit.mode)
    return (
        <div className="border-2 border-[#9C4A98] rounded p-2 w-full">
            {mode === 'read' ? <ReadMode orbit={orbit} setMode={setMode} /> : <WriteMode orbit={orbit} setMode={setMode} />}
        </div>
    )
}
