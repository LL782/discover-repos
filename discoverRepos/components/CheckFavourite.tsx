import { ChangeEventHandler } from 'react'

import styles from './CheckFavourite.module.css'

interface Props {
  checked: boolean
  id: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const CheckFavourite = ({ checked, id, onChange }: Props) => {
  let labelClassName = `${styles.label}`
  let inputClassName = `${styles.input}`
  if (checked) {
    labelClassName += ` ${styles.checked}`
    inputClassName += ` ${styles.checked}`
  }
  return (
    <div className={styles.container}>
      <label className={labelClassName} htmlFor={id}>
        Favourite
      </label>
      <input
        checked={checked}
        className={inputClassName}
        type="checkbox"
        onChange={onChange}
        id={id}
        name={id}
      />
    </div>
  )
}
