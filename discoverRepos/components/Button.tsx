import { MouseEventHandler } from 'react'

interface Props {
  name: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ name, onClick }: Props) => (
  <button role="button" onClick={onClick}>
    {name}
  </button>
)
