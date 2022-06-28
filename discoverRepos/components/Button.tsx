import { MouseEventHandler } from 'react'

import styles from './Button.module.css'
interface Props {
  name: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ name, onClick }: Props) => (
  <button className={styles.button} role="button" onClick={onClick}>
    {name}
  </button>
)
