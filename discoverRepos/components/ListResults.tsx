import { RepoData } from '../model/RepoData'
import { RepoCard } from './RepoCard'

interface Props {
  isFav: (arg0: string) => boolean
  results: RepoData[]
  toggleFav: (arg0: string) => void
}

export const ListResults = ({ isFav, results, toggleFav }: Props) => (
  <>
    {results.map((r) => (
      <RepoCard
        data={r}
        isFav={() => isFav(r.full_name)}
        key={r.html_url}
        onChange={() => toggleFav(r.full_name)}
      />
    ))}
  </>
)
