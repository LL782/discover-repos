import { ChangeEventHandler } from 'react'
import { RepoData } from '../model/RepoData'
import styles from './RepoCard.module.css'

export interface Props {
  data: RepoData
  isFav: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const RepoCard = ({
  data: {
    description = 'No description',
    full_name,
    html_url,
    stargazers_count,
  },
  onChange,
  isFav,
}: Props) => (
  <div className={styles.card}>
    <h2>
      <a href={html_url}>{full_name}</a>
    </h2>
    <p>{description}</p>
    <p>
      Starred <strong>{stargazers_count}</strong> times
    </p>
    <label htmlFor={full_name}>Favourite</label>
    <input
      checked={isFav}
      type="checkbox"
      onChange={onChange}
      id={full_name}
      name={full_name}
    />
  </div>
)
