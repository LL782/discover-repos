import { Dispatch, SetStateAction } from 'react'

import { View } from '../model/View'
import { Button } from './Button'
import styles from './PickView.module.css'

interface Props {
  view: View
  setView: Dispatch<SetStateAction<View>>
}

export const PickView = ({ view, setView }: Props) => (
  <header className={styles.container}>
    <h1>{view}</h1>
    <Button
      name="Trending"
      onClick={() => setView(View.Trending)}
      selected={view === 'Trending'}
    />
    <Button
      name="Favourites"
      onClick={() => setView(View.Favourites)}
      selected={view === 'Favourites'}
    />
  </header>
)
