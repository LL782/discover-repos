import { render } from '@testing-library/react'
import Home from '../pages'

describe('Discover Repos', () => {
  beforeEach(() => {
    render(<Home />)
  })
  it('Calls GitHub for repositories created in the last seven days with the highest number of stars ', () => {
    expect(true).toBe(false)
  })
})
