import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import ErrorAlert from './Error'

describe('ErrorAlert', () => {
    it('renders a heading', () => {
        const errorMessage = faker.lorem.slug()

        render(<ErrorAlert message={errorMessage} />)

        const error = screen.getByText(errorMessage)

        expect(error).toBeInTheDocument()
    })
})
