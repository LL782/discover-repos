import { Dispatch, SetStateAction } from 'react'

import { RepoData } from '../../model/RepoData'
import { RepoCard } from './RepoCard'

interface Props {
  results: RepoData[]
  favourites: Map<string, boolean>
  setFavourites: Dispatch<SetStateAction<Map<string, boolean>>>
}

export const ListResults = ({ favourites, results, setFavourites }: Props) => {
  const addToFavs = (n: string) => setFavourites(favourites.set(n, true))
  const subFromFavs = (n: string) => setFavourites(favourites.set(n, false))
  const isFav = (name: string) => favourites.get(name) || false

  return (
    <>
      {results.map((r) => (
        <RepoCard
          data={r}
          isFav={() => isFav(r.full_name)}
          key={r.html_url}
          addToFavs={() => addToFavs(r.full_name)}
          subFromFavs={() => subFromFavs(r.full_name)}
        />
      ))}
    </>
  )
}
