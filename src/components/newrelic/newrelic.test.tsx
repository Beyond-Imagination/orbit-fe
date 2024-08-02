import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import Newrelic from './index'

describe('Newrelic', () => {
    it('should have a Newrelic Script', () => {
        const { baseElement } = render(<Newrelic />)

        const script = baseElement.querySelector('#newrelic')
        expect(script).not.toBeNull()
        expect(script).toBeInTheDocument()
    })
})
