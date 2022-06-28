import { MouseEventHandler } from 'react'

import styles from './Button.module.css'
interface Props {
  name: string
  onClick: MouseEventHandler<HTMLButtonElement>
  selected?: boolean
}

export const Button = ({ name, onClick, selected }: Props) => {
  let className = `${styles.button}`
  if (selected) className += ` ${styles.selected}`
  return (
    <button className={className} role="button" onClick={onClick}>
      {name}
    </button>
  )
}
