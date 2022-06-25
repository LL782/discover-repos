import { RepoData } from './model/RepoData'

interface Props {
  repos: RepoData[]
}

export const ShowResults = ({ repos }: Props) => {
  const results = repos.map((r) => (
    <a href={r.html_url} key={r.html_url}>
      {r.full_name}
    </a>
  ))
  return <>{results}</>
}
