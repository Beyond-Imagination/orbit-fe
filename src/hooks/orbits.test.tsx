import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'

import { useOrbits } from '@/hooks/orbits'
import { useCredential } from '@/hooks/space'
import { getOrbits } from '@/api/orbit'

jest.mock('@/hooks/space', () => ({
    useCredential: jest.fn(),
}))

jest.mock('@/api/orbit', () => ({
    getOrbits: jest.fn(),
}))

const createWrapper = () => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe('useOrbits', () => {
    const credential = { token: faker.string.uuid(), serverUrl: faker.internet.url() }

    const getOrbitsMock = getOrbits as jest.Mock
    const useCredentialMock = useCredential as jest.Mock

    useCredentialMock.mockReturnValue(credential)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should return empty array when no data is fetched', async () => {
        getOrbitsMock.mockResolvedValue({})

        const { result } = renderHook(() => useOrbits(), { wrapper: createWrapper() })

        await waitFor(() => {
            expect(result.current).toEqual([])
        })

        expect(useCredential).toHaveBeenCalled()
        expect(getOrbits).toHaveBeenCalledWith(credential)
    })

    it('should return orbits when data is fetched', async () => {
        const orbits = [
            { id: '1', name: 'Orbit 1' },
            { id: '2', name: 'Orbit 2' },
        ]
        getOrbitsMock.mockResolvedValue({ orbits: orbits })

        const { result } = renderHook(() => useOrbits(), { wrapper: createWrapper() })

        await waitFor(() => {
            expect(result.current).toEqual(orbits)
        })

        expect(useCredential).toHaveBeenCalled()
        expect(getOrbits).toHaveBeenCalledWith(credential)
    })
})
