import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Header from '@/components/header/index'

describe('Header', () => {
    it('renders a heading', () => {
        render(<Header />)

        const heading = screen.getByText('Orbit')

        expect(heading).toBeInTheDocument()
    })
})
