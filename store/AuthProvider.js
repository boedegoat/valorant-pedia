import { onIdTokenChanged, getIdToken } from 'firebase/auth'
import { auth } from '../lib/firebase-client'
import { createContext, useState, useEffect } from 'react'
import nookies from 'nookies'

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function storeUserDataToFirestore(userData) {
    await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
  }

  useEffect(() => {
    const unsub = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null)
        // empty token cookie
        nookies.set(undefined, 'token', '')
        setLoading(false)
        return
      }

      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.photoURL,
      }

      setUser(userData)
      await storeUserDataToFirestore(userData)

      // get token from user
      const token = await getIdToken(user)

      // store token to cookies
      nookies.set(undefined, 'token', token)
      setLoading(false)
    })

    return unsub
  }, [])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

export default AuthProvider
