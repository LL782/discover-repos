import { ChangeEventHandler } from 'react'

interface Props {
  checked: boolean
  id: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const CheckFavourite = ({ checked, id, onChange }: Props) => (
  <div>
    <label htmlFor={id}>Favourite</label>
    <input
      checked={checked}
      type="checkbox"
      onChange={onChange}
      id={id}
      name={id}
    />
  </div>
)
