import { ChangeEventHandler } from 'react'

import styles from './CheckFavourite.module.css'

interface Props {
  checked: boolean
  id: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const CheckFavourite = ({ checked, id, onChange }: Props) => {
  let className = `${styles.container}`
  if (checked) className += ` ${styles.checked}`
  return (
    <div className={className}>
      <label className={styles.label} htmlFor={id}>
        Favourite
      </label>
      <input
        checked={checked}
        className={styles.input}
        type="checkbox"
        onChange={onChange}
        id={id}
        name={id}
      />
    </div>
  )
}
