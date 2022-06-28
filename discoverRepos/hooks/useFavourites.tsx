import { useEffect, useState } from 'react'
import { RepoData } from '../model/RepoData'
import { useLocalStorageAvailable } from './useLocalStorageAvailable'

export const useFavourites = (trendingRepos: RepoData[]) => {
  const [favs, setFavs] = useState<string[]>([])
  const localStorageAvailable = useLocalStorageAvailable()

  useEffect(() => {
    if (localStorageAvailable) {
      const locals = JSON.parse(
        window.localStorage.getItem('DiscoverReposFavs') || '[]'
      )
      const trendingLocals = locals.filter((localName: string) =>
        trendingRepos.map(({ full_name }) => full_name).includes(localName)
      )
      setFavs(trendingLocals)
    }
  }, [])

  const toggleFav = (name: string) => {
    let newFavs: string[]
    if (favs.includes(name)) {
      newFavs = favs.filter((n) => n !== name)
    } else {
      newFavs = [...favs, name]
    }
    setFavs(newFavs)
    if (localStorageAvailable) {
      window.localStorage.setItem('DiscoverReposFavs', JSON.stringify(newFavs))
    }
  }

  const isFav = (name: string) => favs.includes(name)

  return { favs, isFav, toggleFav }
}
