import React from 'react'
import { render, screen, within } from '@testing-library/react'

import AddButton from '@/components/orbits/addButton'

describe('AddButton', () => {
    it('renders a AddButton', () => {
        const setAdding = jest.fn()

        render(<AddButton setAdding={setAdding} />)

        const button = screen.getByTestId('AddButton')
        expect(button).toHaveAttribute('type', 'button')
        expect(button).toHaveAttribute('data-tooltip-id', 'Plus')
        expect(button).toHaveAttribute('data-tooltip-content', 'Add new orbit message')

        const plus = within(button).getByTestId('plus-icon')
        expect(plus).toBeInTheDocument()
    })
})
