import { render, screen } from '@testing-library/react'

import * as DiscoverRepos from '@/pages/index'
import { reposResponse } from '../mocks/responses/gitHubSearchRepos'

const TODAY = '2020-01-30'
const SEVEN_DAYS_AGO = '2020-01-23'
jest.useFakeTimers().setSystemTime(new Date(TODAY))

const unmockedFetch = global.fetch
const fakeResponse = { json: () => Promise.resolve({ items: [] }) }

describe('DiscoverRepos', () => {
  it('Calls GitHub for the most starred repos created recently', async () => {
    global.fetch = jest.fn().mockResolvedValue(fakeResponse)
    await DiscoverRepos.getServerSideProps()

    const searchApi = 'https://api.github.com/search/'
    const createdQuery = `q=created:%3E${SEVEN_DAYS_AGO}`
    const highestStarsFirst = 'stars&order=desc'
    const expectedUrl = `${searchApi}repositories?${createdQuery}&sort=${highestStarsFirst}`
    expect(fetch).toHaveBeenCalledWith(expectedUrl)

    global.fetch = unmockedFetch
  })

  describe('Given a good response from GitHub', () => {
    const allRepos = reposResponse.items
    const topTenRepos = allRepos.slice(0, 10)

    beforeEach(async () => {
      const { props } = await DiscoverRepos.getServerSideProps()
      render(<DiscoverRepos.default {...props} />)
    })

    it.each(topTenRepos)(
      'displays a link, names and descriptions of the first ten repos',
      async ({ full_name, html_url, description }) => {
        const link: HTMLAnchorElement = await screen.findByRole('link', {
          name: full_name,
        })
        expect(link).toBeInTheDocument()
        expect(link.href).toBe(html_url)

        if (description) {
          expect(await screen.findByText(description)).toBeInTheDocument()
        }
      }
    )

    it("doesn't display the other repos", () => {
      expect(allRepos.length).toBeGreaterThan(10)

      let name = allRepos[10].full_name
      const linkToEleventhRepo = screen.queryByRole('link', { name })
      expect(linkToEleventhRepo).not.toBeInTheDocument()

      name = allRepos[29].full_name
      const linkToThirtyRepo = screen.queryByRole('link', { name })
      expect(linkToThirtyRepo).not.toBeInTheDocument()
    })
  })
})
