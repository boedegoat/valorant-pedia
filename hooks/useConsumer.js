import { useContext } from 'react'
import { Context } from '../ContextProvider'

export default function useConsumer() {
  return useContext(Context)
}
