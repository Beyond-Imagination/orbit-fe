import { render, screen } from '@testing-library/react'

import { IOrbit } from '@/types'
import OrbitStatus from '@/components/orbits/OrbitStatus'

describe('OrbitStatus', () => {
    const orbit: IOrbit = {
        _id: 'id',
        type: 'type',
        channelName: 'name',
        timezone: 'timezone',
        message: 'message',
        status: 'success',
    }

    it('renders a success icon when status is success', () => {
        orbit.status = 'success'

        render(<OrbitStatus orbit={orbit} />)

        const successIcon = screen.getByTestId('success-icon')

        expect(successIcon).toBeInTheDocument()
    })

    it('renders a fail icon when status is fail', () => {
        orbit.status = 'fail'

        render(<OrbitStatus orbit={orbit} />)

        const failIcon = screen.getByTestId('fail-icon')

        expect(failIcon).toBeInTheDocument()
    })

    it('renders a scheduled icon when status is scheduled', () => {
        orbit.status = 'scheduled'

        render(<OrbitStatus orbit={orbit} />)

        const scheduledIcon = screen.getByTestId('scheduled-icon')

        expect(scheduledIcon).toBeInTheDocument()
    })

    it('renders a scheduled icon when status is unknown', () => {
        orbit.status = 'unknown'

        render(<OrbitStatus orbit={orbit} />)

        const scheduledIcon = screen.getByTestId('scheduled-icon')

        expect(scheduledIcon).toBeInTheDocument()
    })
})
