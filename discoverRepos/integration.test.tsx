import { fireEvent, getByRole, render, screen } from '@testing-library/react'

import * as DiscoverRepos from '@/pages/index'
import { reposResponse } from '../mocks/responses/gitHubSearchRepos'

describe('DiscoverRepos', () => {
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
      'For each of the first ten repos',
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

    it('Each of the repos shown has a "Favourite" toggle', async () => {
      expect(
        await (
          await screen.findAllByRole('checkbox', { name: 'Favourite' })
        ).length
      ).toBe(10)
    })

    it('When the "Favourite" toggle is clicked the repo is added to the "Favourites" view', async () => {
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
