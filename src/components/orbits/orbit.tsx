import { useState } from 'react'

import { AccessToken, IOrbit } from '@/types'
import OrbitRead from '@/components/orbits/orbitRead'
import OrbitUpdate from '@/components/orbits/orbitUpdate'

interface OrbitProps {
    orbit: IOrbit
    accessToken: AccessToken
}

export default function Orbit({ orbit, accessToken }: OrbitProps) {
    const [isUpdating, setUpdating] = useState<boolean>(false)
    return (
        <div className="border-2 border-[#9C4A98] rounded p-2 w-full">
            {isUpdating ? (
                <OrbitUpdate orbit={orbit} setUpdating={setUpdating} accessToken={accessToken} />
            ) : (
                <OrbitRead orbit={orbit} setUpdating={setUpdating} accessToken={accessToken} />
            )}
        </div>
    )
}
