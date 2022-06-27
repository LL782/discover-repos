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
      it('returns no favourites if none have been selected', () => {
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
      window.localStorage.setItem('DiscoverReposFavs', JSON.stringify([name]))
    })

    describe('When the hook renders', () => {
      beforeEach(() => {
        hook = renderHook(() => useFavourites([fakeRepoData]))
        result = hook.result
      })
      it('includes the locally stored favourites in what it returns', () => {
        expect(hook.result.current.isFav(name)).toBe(true)
        expect(hook.result.current.favs).toEqual([name])
      })
    })
  })
})
