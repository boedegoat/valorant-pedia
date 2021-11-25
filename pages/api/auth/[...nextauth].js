import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { FirebaseAdapter } from '@next-auth/firebase-adapter'
import { db as firestore } from 'lib/firebase-client'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  // to make callbackURL work
  callbacks: {
    redirect: async (url, baseUrl) => {
      return Promise.resolve(url)
    },
  },
  adapter: FirebaseAdapter(firestore),
})
