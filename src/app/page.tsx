'use client'

import OrbitList from '@/components/orbits/orbitList'
import { IOrbit } from '@/types'

// temp orbit list
const list: IOrbit[] = [
    {
        id: '1',
        format: 'cron',
        mode: 'read',
        channelName: 'test 1',
        timezone: 'Asia/Seoul',
        cron: '* * * * *',
        message: 'message 1',
    },
    {
        id: '2',
        format: 'cron',
        mode: 'write',
        channelName: 'test 2',
        timezone: 'Asia/Seoul',
        cron: '* * * * *',
        message: 'message 2',
    },
    {
        id: '3',
        format: 'cron',
        mode: 'read',
        channelName: 'test 3',
        timezone: 'Asia/Seoul',
        cron: '* * * * *',
        message: 'message 3',
    },
]

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between p-4">
            <OrbitList orbits={list} />
        </main>
    )
}
