import { RepoData } from '../model/RepoData'

export const __depreciated__useFavourites = (
  allRepos: RepoData[],
  favourites: Map<string, boolean>
) => allRepos.filter(({ full_name }) => favourites.get(full_name))

export const useFavourites = (allRepos: RepoData[]) => {
  return { favs: [] }
}
