import { Dispatch, SetStateAction } from 'react'

import { View } from 'DiscoverRepos/model/View'
import { Button } from './Button'

interface Props {
  view: View
  setView: Dispatch<SetStateAction<View>>
}

export const PickView = ({ view, setView }: Props) => (
  <div>
    <h1>{view}</h1>
    <Button name="Trending" onClick={() => setView('Trending')} />
    <Button name="Favourites" onClick={() => setView('Favourites')} />
  </div>
)