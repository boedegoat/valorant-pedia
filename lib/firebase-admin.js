import serviceAccount from '../serviceAccount.json'
import * as admin from 'firebase-admin'
import nookies from 'nookies'

export async function getUser(context) {
  // get token from cookies
  const { token } = nookies.get(context)
  if (!token) {
    return null
  }

  // init firebase admin
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }

  try {
    // return auth object by given token
    const user = await admin.auth().verifyIdToken(token)
    return {
      name: user.name,
      email: user.email,
      emailVerified: user.email_verified,
      image: user.picture,
      uid: user.uid,
    }
  } catch (error) {
    throw error
  }
}
