import { useState } from 'react'

import { ListResults } from './ListResults'
import { PickView } from './PickView'
import { RepoData } from '../model/RepoData'
import { View } from '../model/View'
import { __depreciated__useFavourites } from '../hooks/useFavourites'

interface Props {
  trendingRepos: RepoData[]
}

export const ShowResults = ({ trendingRepos: trendingRepos }: Props) => {
  const [view, setView] = useState<View>(View.Trending)
  const [favourites, setFavourites] = useState(new Map<string, boolean>())

  const reposToShow =
    view === View.Trending
      ? trendingRepos
      : __depreciated__useFavourites(trendingRepos, favourites)

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
