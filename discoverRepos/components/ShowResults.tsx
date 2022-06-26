import { useState } from 'react'

import { RepoData } from '../model/RepoData'
import { RepoCard } from './RepoCard'

interface Props {
  repos: RepoData[]
}

export type View = 'Trending' | 'Favourites'

export const ShowResults = ({ repos }: Props) => {
  const [view, setView] = useState<View>('Trending')
  const [favourites, setFavourites] = useState(new Map<string, boolean>())
  const addToFavs = (n: string) => setFavourites(favourites.set(n, true))
  const subFromFavs = (n: string) => setFavourites(favourites.set(n, false))

  const reposToShow =
    view === 'Trending'
      ? repos
      : repos.filter(({ full_name }) => favourites.get(full_name))

  const isFav = (name: string) => favourites.get(name) || false

  const ListResults = reposToShow.map((r) => (
    <RepoCard
      data={r}
      isFav={() => isFav(r.full_name)}
      key={r.html_url}
      addToFavs={() => addToFavs(r.full_name)}
      subFromFavs={() => subFromFavs(r.full_name)}
    />
  ))

  const handleClick = (view: View) => {
    setView(view)
  }

  return (
    <>
      <h1>{view}</h1>
      <button role="button" onClick={() => handleClick('All')}>
        All
      </button>
      <button role="button" onClick={() => handleClick('Favourites')}>
        Favourites
      </button>

      {ListResults}
    </>
  )
}
