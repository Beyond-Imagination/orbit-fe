import { render, screen } from '@testing-library/react'
import { useState } from 'react'

import Orbit from '@/components/orbits/Orbit'
import { IOrbit } from '@/types'

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}))

jest.mock('@/components/orbits/OrbitUpdate', () => () => <div>OrbitUpdate</div>)
jest.mock('@/components/orbits/OrbitRead', () => () => <div>OrbitRead</div>)

describe('Orbit', () => {
    const useStateMock = useState as jest.Mock
    it('renders a Orbit on read mode', () => {
        useStateMock.mockImplementation(() => [false, jest.fn()])

        const orbit: IOrbit = {
            _id: 'id',
            type: 'type',
            channelName: 'name',
            timezone: 'timezone',
            message: 'message',
            status: 'status',
        }

        render(<Orbit orbit={orbit} />)

        const orbitRead = screen.getByText('OrbitRead')

        expect(orbitRead).toBeInTheDocument()
    })

    it('renders a Orbit on update mode', () => {
        useStateMock.mockImplementation(() => [true, jest.fn()])

        const orbit: IOrbit = {
            _id: 'id',
            type: 'type',
            channelName: 'name',
            timezone: 'timezone',
            message: 'message',
            status: 'status',
        }

        render(<Orbit orbit={orbit} />)

        const orbitUpdate = screen.getByText('OrbitUpdate')

        expect(orbitUpdate).toBeInTheDocument()
    })
})
