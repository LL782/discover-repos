import '@/styles/global.css'
import App from 'next/app'

import mocks from '../mocks/'

if (process.env.NODE_ENV === 'development') {
  mocks.enable()
}

export default App
