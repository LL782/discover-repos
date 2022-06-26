import { fireEvent, render, screen } from '@testing-library/react'

import * as DiscoverRepos from '@/pages/index'
import { reposResponse } from '../mocks/responses/gitHubSearchRepos'
import { fakeRepoData } from './fakeData/fakeRepoData'
import { RepoData } from './model/RepoData'

const allRepos = reposResponse.items
const { findByRole, findAllByRole, queryByRole } = screen
const repo = (i: number) => queryByRole('link', { name: allRepos[i].full_name })
const repoByName = (name: string) => queryByRole('link', { name })

const favToggle = async (i: number) =>
  (await findAllByRole('checkbox', { name: 'Favourite' }))[i]

const viewFavourites = async () =>
  fireEvent.click(await findByRole('button', { name: 'Favourites' }))

describe('DiscoverRepos', () => {
  describe("Given favourites from a previous session (including one that's no longer in the GitHub response)", () => {
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

      describe(`When a new repo's "Favourite" toggle is clicked`, () => {
        beforeEach(async () => {
          fireEvent.click(await favToggle(1))
        })

        describe('And we switch to the "Favourites" view', () => {
          beforeEach(async () => {
            await viewFavourites()
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
      describe(`When one of the previously stored repos repo's "Favourite" toggle is clicked`, () => {
        beforeEach(async () => {
          fireEvent.click(await favToggle(3))
        })

        it('removes it from the browser storage', async () => {
          expect(
            JSON.parse(window.localStorage.getItem('DiscoverReposFavs') || '')
          ).toEqual([previous[1]])
        })

        describe('And when we switch to the "Favourites" view', () => {
          beforeEach(async () => {
            await viewFavourites()
          })
          it('does NOT display that repo', () => {
            expect(repo(3)).not.toBeInTheDocument()
          })
        })
      })
    })
  })
})
