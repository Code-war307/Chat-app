'use client'

import { Provider } from 'react-redux'
import { store } from "./store.js" // wherever your store is

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>
}
