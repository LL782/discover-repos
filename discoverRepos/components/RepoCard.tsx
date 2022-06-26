import { ChangeEventHandler } from 'react'
import { RepoData } from '../model/RepoData'

export interface Props {
  addToFavs: () => void
  data: RepoData
  isFav: (arg0: string) => boolean
  subFromFavs: () => void
}
type OnChange = ChangeEventHandler<HTMLInputElement>

export const RepoCard = ({ data, addToFavs, subFromFavs, isFav }: Props) => {
  const { description, full_name, html_url, stargazers_count } = data
  const checked = isFav(full_name)

  const onChange: OnChange = ({ currentTarget: { checked } }) => {
    if (checked) {
      addToFavs()
    } else {
      subFromFavs()
    }
  }

  return (
    <div>
      <h2>
        <a href={html_url}>{full_name}</a>
      </h2>
      <p>{description}</p>
      <p>
        Starred <strong>{stargazers_count}</strong> times
      </p>
      <label htmlFor={full_name}>Favourite</label>
      <input
        defaultChecked={checked}
        type="checkbox"
        onChange={onChange}
        id={full_name}
        name={full_name}
      />
    </div>
  )
}
