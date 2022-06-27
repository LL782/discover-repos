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
    let newFavs: string[]

    if (favs.includes(name)) {
      newFavs = favs.filter((n) => n !== name)
    } else {
      newFavs = [...favs, name]
    }

    setFavs(newFavs)
    window.localStorage.setItem('DiscoverReposFavs', JSON.stringify(newFavs))
  }

  const isFav = (name: string) => favs.includes(name)

  return { favs, isFav, toggleFav }
}
