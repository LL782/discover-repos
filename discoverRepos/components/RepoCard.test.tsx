import { render, screen } from '@testing-library/react'

import {
  description,
  fakeRepoData,
  name,
  stars,
  url,
} from '../fakeData/fakeRepoData'
import { RepoCard, Props } from './RepoCard'

const addToFavs = jest.fn()
const isFav = jest.fn()
const subFromFavs = jest.fn()
const data = fakeRepoData
const fakeProps: Props = { addToFavs, data, isFav, subFromFavs }

const { findByRole, findByText } = screen
const favToggle = async () => findByRole('checkbox', { name: 'Favourite' })

describe('Repo card', () => {
  describe('Given complete data', () => {
    beforeEach(() => {
      render(<RepoCard {...fakeProps} />)
    })
    it('displays the full name of the repo as a link to the repo', async () => {
      const link: HTMLAnchorElement = await findByRole('link', { name })
      expect(link).toBeInTheDocument()
      expect(link.href).toBe(url)
    })
    it('displays the description', async () => {
      expect(await findByText(description)).toBeInTheDocument()
    })
    it('displays the star gazer count', async () => {
      expect(await findByText(stars)).toBeInTheDocument()
    })
    it('displays a "Favourite" toggle', async () => {
      expect(await favToggle()).toBeInTheDocument()
    })
  })
})
