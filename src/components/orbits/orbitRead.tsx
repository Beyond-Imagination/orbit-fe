import { Edit, PaperAirplane, Trash } from '@/icon'
import { IOrbit } from '@/types'
import { Dispatch, SetStateAction } from 'react'

interface OrbitReadProps {
    orbit: IOrbit
    setUpdating: Dispatch<SetStateAction<boolean>>
}

export default function OrbitRead({ orbit, setUpdating }: OrbitReadProps) {
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
                        <button type="button" onClick={() => setUpdating(true)} className="w-6 h-6">
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