import { RepoData } from '../model/RepoData'

export const RepoCard = ({ data }: { data: RepoData }) => {
  const { description, full_name, html_url, stargazers_count } = data

  return (
    <div>
      <h2>
        <a href={html_url}>{full_name}</a>
      </h2>
      <p>{description}</p>
      <p>
        Starred <strong>{stargazers_count}</strong> times
      </p>
      <button role="button">Favourite</button>
    </div>
  )
}
