import { RepoData } from '../model/RepoData'

interface Props {
  repos: RepoData[]
}

const RepoCard = ({ data }: { data: RepoData }) => {
  const { html_url, full_name } = data

  return <a href={html_url}>{full_name}</a>
}

export const ShowResults = ({ repos }: Props) => (
  <>
    {repos.map((r) => (
      <RepoCard data={r} key={r.html_url} />
    ))}
  </>
)
