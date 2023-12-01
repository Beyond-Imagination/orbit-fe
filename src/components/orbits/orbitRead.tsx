import { Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { IDeleteOrbitRequest, IOrbit, ISendOrbitRequest } from '@/types'
import { deleteOrbit, sendOrbit } from '@/api/orbit'
import { Edit, PaperAirplane, Trash } from '@/icon'
import { useCredential } from '@/hooks'

interface OrbitReadProps {
    orbit: IOrbit
    setUpdating: Dispatch<SetStateAction<boolean>>
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
            <div className="flex justify-between">
                <div className="basis-10/12 flex gap-6">
                    <div className="w-44">
                        <p className="text-lg font-semibold">Channel Name</p>
                        <div className="border rounded text-center p-1">{orbit.channelName}</div>
                    </div>
                    <div className="w-32">
                        <p className="text-lg font-semibold">Format</p>
                        <div className="border rounded text-center p-1 ">{orbit.format}</div>
                    </div>
                    <div className="w-58">
                        <div className="text-lg font-semibold">timezone</div>
                        <div className="border rounded text-center p-1">{orbit.timezone}</div>
                    </div>
                    <div className="w-44">
                        <div className="text-lg font-semibold">cron</div>
                        <div className="border rounded text-center p-1">{orbit.cron}</div>
                    </div>
                </div>
                <div className="basis-2/12">
                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            onClick={() =>
                                sendMessageMutation.mutate({
                                    body: { serverUrl: credential.serverUrl },
                                    uri: { id: orbit._id },
                                    secret: { token: credential.token },
                                })
                            }
                            className="w-6 h-6"
                        >
                            <PaperAirplane />
                        </button>
                        <button type="button" onClick={() => setUpdating(true)} className="w-6 h-6">
                            <Edit />
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                deleteMutation.mutate({
                                    body: { serverUrl: credential.serverUrl },
                                    uri: { id: orbit._id },
                                    secret: { token: credential.token },
                                })
                            }
                            className="w-6 h-6"
                        >
                            <Trash />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-lg font-semibold">message</p>
                <pre className="border rounded p-2">{orbit.message}</pre>
            </div>
        </div>
    )
}
