import { renderHook, RenderHookResult } from '@testing-library/react'
import { fakeRepoData } from '../fakeData/fakeRepoData'
import { RepoData } from '../model/RepoData'
import { useFavourites } from './useFavourites'

let hook: RenderHookResult<{ favs: string[] }, RepoData[]>
let result: { current: { favs: string[] } }

describe('useFavourites [hook]', () => {
  beforeEach(() => {
    hook = renderHook(() => useFavourites([fakeRepoData]))
    result = hook.result
  })
  it('returns no favourites if none have been selected', () => {
    expect(result.current.favs).toEqual([])
  })
})
