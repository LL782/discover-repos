import { useState } from 'react'

import { ListResults } from './ListResults'
import { PickView } from './PickView'
import { RepoData } from '../model/RepoData'
import { View } from '../model/View'
import { useFavourites } from '../hooks/useFavourites'
import { NoFavouritesCard } from './NoFavouritesCard'
interface Props {
  trendingRepos: RepoData[]
}

export const ShowResults = ({ trendingRepos }: Props) => {
  const [view, setView] = useState<View>(View.Trending)
  const { favs, isFav, toggleFav } = useFavourites(trendingRepos)

  const reposToShow =
    view === View.Trending
      ? trendingRepos
      : trendingRepos.filter(({ full_name }) => favs.includes(full_name))

  const Results = () =>
    reposToShow.length > 0 ? (
      <ListResults isFav={isFav} results={reposToShow} toggleFav={toggleFav} />
    ) : view === 'Favourites' ? (
      <NoFavouritesCard />
    ) : null

  return (
    <>
      <PickView setView={setView} view={view} />
      <Results />
    </>
  )
}
