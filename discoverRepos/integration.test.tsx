import { fireEvent, render, screen } from '@testing-library/react'

import * as DiscoverRepos from '@/pages/index'
import { reposResponse } from '../mocks/responses/gitHubSearchRepos'
import { fakeRepoData } from './fakeData/fakeRepoData'
import { RepoData } from './model/RepoData'

const allRepos = reposResponse.items
const { findByRole, findAllByRole, queryByRole } = screen
const repo = (i: number) => queryByRole('link', { name: allRepos[i].full_name })
const repoByName = (name: string) => queryByRole('link', { name })

describe('DiscoverRepos', () => {
  describe("Given favourites from a previous session (inc. one that's no longer in the GitHub response)", () => {
    const previous: RepoData[] = [allRepos[3], fakeRepoData]

    beforeEach(() => {
      window.localStorage.setItem('DiscoverReposFavs', JSON.stringify(previous))
    })

    describe('When the page loads with props from the server', () => {
      beforeEach(async () => {
        const { props } = await DiscoverRepos.getServerSideProps()
        render(<DiscoverRepos.default {...props} />)
      })

      it('displays the first ten repos returned by GitHub', () => {
        expect(allRepos.length).toBeGreaterThan(10)
        expect(repo(0)).toBeInTheDocument()
        expect(repo(9)).toBeInTheDocument()
        expect(repo(10)).not.toBeInTheDocument()
      })

      describe(`When a new repos's "Favourite" toggle is clicked`, () => {
        beforeEach(async () => {
          const toggles = await findAllByRole('checkbox', { name: 'Favourite' })
          fireEvent.click(toggles[1])
        })

        describe('And we switch to the "Favourites" view', () => {
          beforeEach(async () => {
            fireEvent.click(
              await findByRole('button', {
                name: 'Favourites',
              })
            )
          })
          it('displays the newly favourited repo', async () => {
            expect(repo(1)).toBeInTheDocument()
          })
          it('displays the previously stored repos', async () => {
            previous.forEach(({ full_name }) => {
              expect(repoByName(full_name)).toBeInTheDocument()
            })
          })
          it('does NOT display other repos', () => {
            expect(repo(0)).not.toBeInTheDocument()
            expect(repo(9)).not.toBeInTheDocument()
          })
        })
      })
    })
  })
})
