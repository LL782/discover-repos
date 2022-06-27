import { RepoData } from '../model/RepoData'

export const useFavourites = (
  allRepos: RepoData[],
  favourites: Map<string, boolean>
) => allRepos.filter(({ full_name }) => favourites.get(full_name))
