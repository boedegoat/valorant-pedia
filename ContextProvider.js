import { createContext, useReducer } from 'react'

export const Context = createContext({})

const ContextProvider = ({ children, initValue, reducer }) => {
  return (
    <Context.Provider value={useReducer(reducer, initValue)}>{children}</Context.Provider>
  )
}

export default ContextProvider
