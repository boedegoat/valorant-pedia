import { createContext, useContext, useReducer } from 'react'
import initState from './appContext.state'
import reducer from './appContext.reducer'

const AppContext = createContext({})

export function useAppContext() {
  return useContext(AppContext)
}

const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={useReducer(reducer, initState)}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
