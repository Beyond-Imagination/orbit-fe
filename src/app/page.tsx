'use client'

import { useEffect, useState } from 'react'

import { AccessToken } from '@/types'
import { useOrbits } from '@/hooks'
import OrbitList from '@/components/orbits/orbitList'
import getUserAccessToken from '@/services/space/auth'

export default function Home() {
    const [accessToken, setAccessToken] = useState<AccessToken | null>(null)

    const orbits = useOrbits(accessToken as AccessToken)

    useEffect(() => {
        getUserAccessToken().then(data => {
            setAccessToken(data as AccessToken)
        })
    }, [])

    return (
        <main className="w-full">
            {
                accessToken ? <OrbitList orbits={orbits} accessToken={accessToken} /> : <div>loading</div> // TODO: access token hook 추가 후 loading 제거
            }
        </main>
    )
}
