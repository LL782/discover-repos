import { useState } from 'react'

import { RepoData } from '../model/RepoData'
import { ListResults } from './ListResults'
import { PickView } from './PickView'

interface Props {
  repos: RepoData[]
}

export type View = 'Trending' | 'Favourites'

export const ShowResults = ({ repos }: Props) => {
  const [view, setView] = useState<View>('Trending')
  const [favourites, setFavourites] = useState(new Map<string, boolean>())

  const reposToShow =
    view === 'Trending'
      ? repos
      : repos.filter(({ full_name }) => favourites.get(full_name))

  return (
    <>
      <PickView setView={setView} view={view} />
      <ListResults
        favourites={favourites}
        setFavourites={setFavourites}
        results={reposToShow}
      />
    </>
  )
}
