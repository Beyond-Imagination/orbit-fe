import '@testing-library/jest-dom'
import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'

import { useCredential } from '@/hooks'

const getCredentialMock = jest.fn()
jest.mock('@/services/space/auth', () => ({
    getCredential: jest.fn().mockImplementation((...args) => getCredentialMock(...args)),
}))

function TestWrapper() {
    // test case 별로 query client 새로 생성하기 위해 component 를 return
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } })
    return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe('useCredential', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should be null before space login', async () => {
        getCredentialMock.mockResolvedValueOnce(null)

        const { result } = renderHook(() => useCredential(), { wrapper: TestWrapper() })

        await waitFor(() => expect(result.current).toBe(null))
        expect(getCredentialMock).toHaveBeenCalledTimes(1)
    })

    it('should return credential after space login', async () => {
        const credential = { token: faker.string.uuid(), serverUrl: faker.internet.url() }
        getCredentialMock.mockResolvedValueOnce(credential)

        const { result } = renderHook(() => useCredential(), { wrapper: TestWrapper() })

        await waitFor(() => expect(result.current).toEqual(credential))
        expect(getCredentialMock).toHaveBeenCalledTimes(1)
    })
})
