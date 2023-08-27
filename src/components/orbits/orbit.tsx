import { Dispatch, SetStateAction, useState } from 'react'

import { IOrbit } from '@/types'
import { Check, Edit, Stop, Trash } from '@/icon'

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
            <p>Read Mode</p>
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
                        <button type="button" onClick={() => setMode('write')}>
                            <Edit />
                        </button>
                        <button type="button">
                            <Trash />
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

function WriteMode({ orbit, setMode }: ModeProps) {
    return (
        <div className="w-full">
            <p>Write Mode</p>
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
                        <button type="button" onClick={() => setMode('read')}>
                            <Stop />
                        </button>
                        <button type="button">
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
