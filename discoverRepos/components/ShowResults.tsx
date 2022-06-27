import { useState } from 'react'

import { ListResults } from './ListResults'
import { PickView } from './PickView'
import { RepoData } from '../model/RepoData'
import { View } from '../model/View'

interface Props {
  repos: RepoData[]
}

export const ShowResults = ({ repos }: Props) => {
  const [view, setView] = useState<View>(View.Trending)
  const [favourites, setFavourites] = useState(new Map<string, boolean>())

  const reposToShow =
    view === View.Trending
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
