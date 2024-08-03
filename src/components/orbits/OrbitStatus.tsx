import React from 'react'

import { IOrbit } from '@/types'
import { Fail, Scheduled, Success } from '@/icon'

interface OrbitStatusProps {
    orbit: IOrbit
}

export default function OrbitStatus({ orbit }: OrbitStatusProps) {
    switch (orbit.status) {
        case 'success':
            return <Success />
        case 'fail':
            return <Fail />
        default:
            return <Scheduled />
    }
}
