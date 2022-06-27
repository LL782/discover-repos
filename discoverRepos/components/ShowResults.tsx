import { useState } from 'react'

import { ListResults } from './ListResults'
import { PickView } from './PickView'
import { RepoData } from '../model/RepoData'
import { View } from '../model/View'
import { useFavourites } from '../hooks/useFavourites'

interface Props {
  trendingRepos: RepoData[]
}

export const ShowResults = ({ trendingRepos: trendingRepos }: Props) => {
  const [view, setView] = useState<View>(View.Trending)
  const { favs, isFav, toggleFav } = useFavourites(trendingRepos)

  const reposToShow =
    view === View.Trending
      ? trendingRepos
      : trendingRepos.filter(({ full_name }) => favs.includes(full_name))

  return (
    <>
      <PickView setView={setView} view={view} />
      <ListResults isFav={isFav} results={reposToShow} toggleFav={toggleFav} />
    </>
  )
}
