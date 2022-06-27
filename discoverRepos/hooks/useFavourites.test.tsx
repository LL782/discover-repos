import { act, renderHook, RenderHookResult } from '@testing-library/react'
import { fakeRepoData, name } from '../fakeData/fakeRepoData'
import { RepoData } from '../model/RepoData'
import { useFavourites } from './useFavourites'

type Result = {
  favs: string[]
  isFav: (arg0: string) => boolean
  toggleFav: (arg0: string) => void
}

let hook: RenderHookResult<Result, RepoData[]>
let result: { current: Result }

const getLocal = () =>
  JSON.parse(window.localStorage.getItem('DiscoverReposFavs') || '[]')

describe('useFavourites [hook]', () => {
  describe('Given nothing from local storage', () => {
    describe('When the hook renders', () => {
      beforeEach(() => {
        hook = renderHook(() => useFavourites([fakeRepoData]))
        result = hook.result
      })
      it('returns nothing if no favourites have been selected', () => {
        expect(result.current.favs).toEqual([])
      })
      it('returns a toggle for adding and subtracting favourites', () => {
        act(() => result.current.toggleFav(name))
        expect(result.current.favs).toEqual([name])
        act(() => result.current.toggleFav(name))
        expect(result.current.favs).toEqual([])
      })
      it('returns a way to check if a repo is in the list of favourites', () => {
        expect(result.current.isFav(name)).toBe(false)
        act(() => result.current.toggleFav(name))
        expect(result.current.isFav(name)).toBe(true)
      })
      it('keeps local storage in sync with the favourites', () => {
        expect(result.current.isFav(name)).toBe(true)
        act(() => result.current.toggleFav(name))
        expect(getLocal()).toEqual([])

        act(() => result.current.toggleFav(name))
        expect(getLocal()).toEqual([name])
      })
    })
  })
  describe('Given a trending repo from local storage', () => {
    beforeEach(() => {
      const local = JSON.stringify([fakeRepoData.full_name])
      window.localStorage.setItem('DiscoverReposFavs', local)
    })

    describe('When the hook renders', () => {
      beforeEach(() => {
        hook = renderHook(() => useFavourites([fakeRepoData]))
        result = hook.result
      })
      it('includes the locally stored favourites in what it returns', () => {
        expect(hook.result.current.isFav(fakeRepoData.full_name)).toBe(true)
        expect(hook.result.current.favs).toEqual([fakeRepoData.full_name])
      })
    })
  })
  describe('Given one trending and one unknown repo from local storage', () => {
    const trending = [fakeRepoData]

    beforeEach(() => {
      const locals = [fakeRepoData.full_name, 'unknown_repo']
      window.localStorage.setItem('DiscoverReposFavs', JSON.stringify(locals))
    })

    describe('When the hook renders', () => {
      beforeEach(() => {
        hook = renderHook(() => useFavourites(trending))
        result = hook.result
      })
      it('only the trending repo has been added to the favourites', () => {
        expect(hook.result.current.isFav(fakeRepoData.full_name)).toBe(true)
        expect(hook.result.current.isFav('unknown_repo')).toBe(false)
      })
    })
  })
})
