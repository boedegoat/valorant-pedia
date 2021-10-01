import { useContext } from 'react'
import { AuthContext } from '../store/AuthProvider'

export default function useUser() {
  const { user, loading } = useContext(AuthContext)
  return [user, loading]
}
