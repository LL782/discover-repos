import { fireEvent, getByRole, render, screen } from '@testing-library/react'

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

    beforeEach(async () => {
      const { props } = await DiscoverRepos.getServerSideProps()
      render(<DiscoverRepos.default {...props} />)
    })

    it('displays the first ten repos only', () => {
      expect(allRepos.length).toBeGreaterThan(10)

      let name = allRepos[9].full_name
      const linkToRepo10 = screen.queryByRole('link', { name })
      expect(linkToRepo10).toBeInTheDocument()

      name = allRepos[10].full_name
      const linkToRepo11 = screen.queryByRole('link', { name })
      expect(linkToRepo11).not.toBeInTheDocument()

      name = allRepos[29].full_name
      const linkToRepo30 = screen.queryByRole('link', { name })
      expect(linkToRepo30).not.toBeInTheDocument()
    })

    describe.each(allRepos.slice(0, 10))(
      'For the top ten repos',
      ({ full_name, html_url, description, stargazers_count }) => {
        it('displays the name as a link', async () => {
          const link: HTMLAnchorElement = await screen.findByRole('link', {
            name: full_name,
          })
          expect(link).toBeInTheDocument()
          expect(link.href).toBe(html_url)
        })
        it('displays the description when it is available', async () => {
          if (description) {
            expect(await screen.findByText(description)).toBeInTheDocument()
          }
        })
        it('displays the star gazer count', async () => {
          expect(await screen.findByText(stargazers_count)).toBeInTheDocument()
        })
      }
    )

    it('Each of the repos shown has a "favourite" toggle', async () => {
      expect(
        await (
          await screen.findAllByRole('checkbox', { name: 'Favourite' })
        ).length
      ).toBe(10)
    })

    it('The favourite view only shows repo that have been added to the favourite list', async () => {
      const { findByRole, findAllByRole } = screen
      const favsButton = await findByRole('button', { name: 'Favourites' })
      const repo0 = await findByRole('link', { name: allRepos[0].full_name })
      const repo1 = await findByRole('link', { name: allRepos[1].full_name })
      const favToggles = await findAllByRole('checkbox', { name: 'Favourite' })

      expect(repo0).toBeInTheDocument()
      expect(repo1).toBeInTheDocument()

      fireEvent.click(favToggles[0])
      fireEvent.click(favsButton)

      expect(repo0).toBeInTheDocument()
      expect(repo1).not.toBeInTheDocument()
    })
  })
})
