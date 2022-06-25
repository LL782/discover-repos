import { RepoData } from '../model/RepoData'

export const RepoCard = ({ data }: { data: RepoData }) => {
  const { html_url, full_name } = data

  return <a href={html_url}>{full_name}</a>
}
