import { createContext, useReducer } from 'react'
import { globalState, globalReducer } from './globalReducer'

export const Context = createContext({})

const GlobalProvider = ({ children }) => {
  return (
    <Context.Provider value={useReducer(globalReducer, globalState)}>
      {children}
    </Context.Provider>
  )
}

export default GlobalProvider
