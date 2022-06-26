import { Dispatch, SetStateAction } from 'react'
import { View } from './ShowResults'

interface Props {
  view: View
  setView: Dispatch<SetStateAction<View>>
}

export const PickView = ({ view, setView }: Props) => (
  <div>
    <h1>{view}</h1>
    <button role="button" onClick={() => setView('Trending')}>
      Trending
    </button>
    <button role="button" onClick={() => setView('Favourites')}>
      Favourites
    </button>
  </div>
)
