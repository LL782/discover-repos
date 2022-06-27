import { fireEvent, render, screen } from '@testing-library/react'

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
const favToggle = async () =>
  findByRole<HTMLInputElement>('checkbox', { name: 'Favourite' })

describe('Repo card', () => {
  describe('Given complete data', () => {
    beforeEach(() => {
      render(<RepoCard {...fakeProps} />)
    })
    afterEach(() => {
      jest.resetAllMocks()
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
    it('defaults the "Favourite" toggle to unchecked', async () => {
      expect((await favToggle()).checked).toBe(false)
    })
    it('adds the repo to "favourites" if the toggle is clicked', async () => {
      const toggle = await favToggle()
      fireEvent.click(toggle)
      expect(addToFavs).toHaveBeenCalledWith()
      expect(subFromFavs).not.toHaveBeenCalled()
    })
    it('allows toggling repeatedly', async () => {
      const toggle = await favToggle()
      fireEvent.click(toggle)
      fireEvent.click(toggle)
      fireEvent.click(toggle)
      expect(addToFavs).toHaveBeenCalledTimes(2)
      expect(subFromFavs).toHaveBeenCalledTimes(1)
    })
  })
  describe('Given a repo that is in the favourites', () => {
    beforeEach(() => {
      isFav.mockReturnValueOnce(true)
      render(<RepoCard {...fakeProps} />)
    })
    it('defaults the "Favourite" toggle to checked', async () => {
      expect((await favToggle()).checked).toBe(true)
    })
    it('subs the repo from "favourites" if the toggle is clicked', async () => {
      const toggle = await favToggle()
      fireEvent.click(toggle)
      expect(subFromFavs).toHaveBeenCalledWith()
      expect(addToFavs).not.toHaveBeenCalled()
    })
  })
})
