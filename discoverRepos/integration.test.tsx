import { render, screen } from '@testing-library/react'

import Home, { getServerSideProps } from '@/pages/index'
import { reposResponse } from '../mocks/responses/gitHubSearchRepos'

const TODAY = '2020-01-30'
const SEVEN_DAYS_AGO = '2020-01-23'
jest.useFakeTimers().setSystemTime(new Date(TODAY))

const unmockedFetch = global.fetch
const fakeResponse = { json: () => Promise.resolve({ items: [] }) }

describe('Discover Repos', () => {
  describe('Gets server-side props', () => {
    beforeAll(async () => {
      global.fetch = jest.fn().mockResolvedValue(fakeResponse)
      await getServerSideProps()
    })
    afterAll(() => {
      global.fetch = unmockedFetch
    })
    it('Calls GitHub for the most starred, recently created repos ', () => {
      const searchApi = 'https://api.github.com/search/'
      const createdQuery = `q=created:%3E${SEVEN_DAYS_AGO}`
      const highestStarsFirst = 'stars&order=desc'
      const expectedUrl = `${searchApi}repositories?${createdQuery}&sort=${highestStarsFirst}`
      expect(fetch).toHaveBeenCalledWith(expectedUrl)
    })
  })
  describe('Given repos', () => {
    it('displays links to the top ten', async () => {
      const { props } = await getServerSideProps()
      render(<Home {...props} />)

      const repoTitles = await screen.findAllByRole('link')
      expect(repoTitles.length).toBe(10)
      expect(reposResponse.items.length).toBeGreaterThan(10)
    })
  })
})
