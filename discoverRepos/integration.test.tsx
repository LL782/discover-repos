import { fireEvent, render, screen } from '@testing-library/react'

import * as DiscoverRepos from '@/pages/index'
import { reposResponse } from '../mocks/responses/gitHubSearchRepos'
import { View } from './model/View'
import { LOCAL_STORAGE_KEY } from './hooks/useFavourites'

const allRepos = reposResponse.items
const { findByRole, findAllByRole, queryByRole } = screen
const repo = (i: number) => queryByRole('link', { name: allRepos[i].full_name })

const favToggle = async (i: number) =>
  (await findAllByRole('checkbox', { name: 'Favourite' }))[i]

const view = async (view: View) =>
  fireEvent.click(await findByRole('button', { name: view }))

describe('DiscoverRepos', () => {
  describe('Given a favourite from a previous session', () => {
    beforeEach(() => {
      window.localStorage.setItem(
        'DiscoverReposFavs',
        JSON.stringify([allRepos[3].full_name])
      )
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
            await view(View.Favourites)
          })

          it('displays the newly favourited repo', async () => {
            expect(repo(1)).toBeInTheDocument()
          })
          it('displays the previously stored favourite', async () => {
            expect(repo(3)).toBeInTheDocument()
          })
          it('does NOT display other repos', () => {
            expect(repo(0)).not.toBeInTheDocument()
            expect(repo(9)).not.toBeInTheDocument()
          })
        })
      })

      describe(`When the previously stored repo's "Favourite" toggle is clicked`, () => {
        beforeEach(async () => {
          fireEvent.click(await favToggle(3))
        })

        it('removes it from the browser storage', async () => {
          expect(
            JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '')
          ).toEqual([])
        })

        describe('And when we switch to the "Favourites" view', () => {
          beforeEach(async () => {
            await view(View.Favourites)
          })
          it('does NOT display that repo', () => {
            expect(repo(3)).not.toBeInTheDocument()
          })
        })
      })
    })
  })
})
