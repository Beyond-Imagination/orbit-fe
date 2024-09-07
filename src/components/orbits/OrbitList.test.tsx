import { render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { useOrbits } from '@/hooks'
import OrbitList from '@/components/orbits/OrbitList'

jest.mock('@/components/orbits/Orbit', () => () => <div>orbit</div>)
jest.mock('@/components/orbits/OrbitAdd', () => () => <div>orbitAdd</div>)

jest.mock('@/hooks', () => ({
    useOrbits: jest.fn(),
}))

describe('OrbitList', () => {
    const useOrbitsMock = useOrbits as jest.Mock

    it('renders a list of orbit', () => {
        const length = faker.number.int({ min: 1, max: 10 })
        const orbits = faker.helpers.multiple(
            () => ({
                _id: faker.string.uuid(),
                type: 'type',
                channelName: 'name',
                timezone: 'timezone',
                message: 'message',
                status: 'status',
            }),
            { count: length },
        )

        useOrbitsMock.mockReturnValue(orbits)

        render(<OrbitList />)

        const orbitList = screen.getAllByText('orbit')
        const orbitAdd = screen.getByText('orbitAdd')

        expect(orbitList).toHaveLength(length)
        expect(orbitAdd).toBeInTheDocument()
    })

    it('renders no orbit', () => {
        useOrbitsMock.mockReturnValue([])

        render(<OrbitList />)

        const orbitList = screen.queryByText('orbit')
        const orbitAdd = screen.getByText('orbitAdd')

        expect(orbitList).toBeNull()
        expect(orbitAdd).toBeInTheDocument()
    })
})
