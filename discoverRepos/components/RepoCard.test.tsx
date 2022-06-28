import { fireEvent, render, screen } from '@testing-library/react'

import {
  description,
  fakeRepoData,
  name,
  stars,
  url,
} from '../fakeData/fakeRepoData'
import { RepoCard, Props } from './RepoCard'

const data = fakeRepoData
let isFav = false
const onChange = jest.fn()
const fakeProps: Props = { data, isFav, onChange }

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
    it('displays the full name of the repo as a link', async () => {
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
    it('triggers the onChange prop if the toggle is clicked', async () => {
      const toggle = await favToggle()
      fireEvent.click(toggle)
      expect(onChange).toHaveBeenCalled()
    })
  })
  describe('Given a favourite repo', () => {
    beforeEach(() => {
      render(<RepoCard {...{ ...fakeProps, isFav: true }} />)
    })
    it('defaults the "Favourite" toggle to checked', async () => {
      expect((await favToggle()).checked).toBe(true)
    })
  })
})
