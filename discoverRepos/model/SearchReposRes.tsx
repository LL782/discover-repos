import { RepoData } from './RepoData'

export type SearchReposRes = {
  total_count: number
  incomplete_results: boolean
  items: RepoData[]
}
