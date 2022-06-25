import { RepoData } from '../model/RepoData'
import { RepoCard } from './RepoCard'

interface Props {
  repos: RepoData[]
}

export const ShowResults = ({ repos }: Props) => (
  <>
    {repos.map((r) => (
      <RepoCard data={r} key={r.html_url} />
    ))}
  </>
)
