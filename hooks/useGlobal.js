import { useContext } from 'react'
import { Context } from '../store/GlobalProvider'

export default function useGlobal() {
  return useContext(Context)
}
