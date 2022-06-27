import { act, renderHook, RenderHookResult } from '@testing-library/react'
import { fakeRepoData, name } from '../fakeData/fakeRepoData'
import { RepoData } from '../model/RepoData'
import { useFavourites } from './useFavourites'

type Result = {
  favs: string[]
  toggleFav: (arg0: string) => void
}

let hook: RenderHookResult<Result, RepoData[]>
let result: { current: Result }

describe('useFavourites [hook]', () => {
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
})
