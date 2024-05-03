import React, { Dispatch, SetStateAction } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IDeleteOrbitRequest, IOrbit, ISendOrbitRequest } from '@/types'
import { deleteOrbit, sendOrbit } from '@/api/orbit'
import { Edit, PaperAirplane, Trash, Scheduled, Success, Fail } from '@/icon'
import { useCredential } from '@/hooks'
import Loading from '@/app/loading'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import OrbitCronOutput from '@/components/orbits/OrbitCronOutput'
import OrbitWeeklyOutput from '@/components/orbits/OrbitWeeklyOutput'

interface OrbitReadProps {
    orbit: IOrbit
    setUpdating: Dispatch<SetStateAction<boolean>>
}

type Weekly = {
    days: number[]
    time: string
}

function OrbitStatus({ orbit }: { orbit: IOrbit }) {
    switch (orbit.status) {
        case 'success':
            return <Success />
        case 'fail':
            return <Fail />
        default:
            return <Scheduled />
    }
}

export default function OrbitRead({ orbit, setUpdating }: OrbitReadProps) {
    const credential = useCredential()
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: (request: IDeleteOrbitRequest) => {
            return deleteOrbit(request)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['orbits'] })
        },
    })
    const sendMessageMutation = useMutation({
        mutationFn: (request: ISendOrbitRequest) => {
            return sendOrbit(request)
        },
    })

    return (
        <div className="flex flex-col gap-2">
            {(deleteMutation.isPending || sendMessageMutation.isPending) && <Loading />}
            <div className="flex justify-between">
                <div className="basis-10/12 flex gap-6">
                    <div className="w-44">
                        <p className="text-lg font-semibold">Channel Name</p>
                        <div className="border rounded text-center p-1">{orbit.channelName}</div>
                    </div>
                    <div className="w-32">
                        <p className="text-lg font-semibold">Type</p>
                        <div className="border rounded text-center p-1 ">{orbit.type}</div>
                    </div>
                    <div className="w-58">
                        <div className="text-lg font-semibold">timezone</div>
                        <div className="border rounded text-center p-1">{orbit.timezone}</div>
                    </div>

                    {orbit.type === 'cron' && <OrbitCronOutput cron={orbit.cron as string} />}
                </div>
                <OrbitStatus orbit={orbit} />
                <div className="basis-2/12">
                    <div className="relative flex gap-2 justify-end">
                        <button
                            type="button"
                            onClick={() =>
                                sendMessageMutation.mutate({
                                    body: { serverUrl: credential.serverUrl },
                                    uri: { id: orbit._id },
                                    secret: { token: credential.token },
                                })
                            }
                            data-tooltip-id="Send"
                            data-tooltip-content="Sending orbit message immediately"
                            className="w-6 h-6"
                        >
                            <PaperAirplane />
                        </button>
                        <Tooltip id="Send" place="top" border="2px solid purple" />
                        <button
                            type="button"
                            onClick={() => setUpdating(true)}
                            data-tooltip-id="Edit"
                            data-tooltip-content="Edit orbit message"
                            className="w-6 h-6"
                        >
                            <Edit />
                        </button>
                        <Tooltip id="Edit" place="top" border="2px solid purple" />
                        <button
                            type="button"
                            onClick={() =>
                                deleteMutation.mutate({
                                    body: { serverUrl: credential.serverUrl },
                                    uri: { id: orbit._id },
                                    secret: { token: credential.token },
                                })
                            }
                            data-tooltip-id="Delete"
                            data-tooltip-content="Delete orbit message"
                            className="w-6 h-6"
                        >
                            <Trash />
                        </button>
                        <Tooltip id="Delete" place="top" border="2px solid purple" />
                    </div>
                </div>
            </div>
            {orbit.type === 'weekly' && <OrbitWeeklyOutput weekly={orbit.weekly as Weekly} />}
            <div>
                <p className="text-lg font-semibold">message</p>
                <pre className="border rounded p-2">{orbit.message}</pre>
            </div>
        </div>
    )
}
