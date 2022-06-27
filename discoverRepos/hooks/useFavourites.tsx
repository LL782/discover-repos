import { useState } from 'react'
import { RepoData } from '../model/RepoData'

export const __depreciated__useFavourites = (
  allRepos: RepoData[],
  favourites: Map<string, boolean>
) => allRepos.filter(({ full_name }) => favourites.get(full_name))

export const useFavourites = (allRepos: RepoData[]) => {
  const local = JSON.parse(
    window.localStorage.getItem('DiscoverReposFavs') || '[]'
  )

  const [favs, setFavs] = useState<string[]>(local)

  const toggleFav = (name: string) => {
    if (favs.includes(name)) {
      setFavs(favs.filter((n) => n !== name))
    } else {
      setFavs([name])
    }
  }

  const isFav = (name: string) => favs.includes(name)

  return { favs, isFav, toggleFav }
}
