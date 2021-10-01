import Wrapper from '../components/Wrapper'
import Layout from '../components/Layout'
import { auth } from '../lib/firebase-client'
import { signOut as firebaseSignOut } from 'firebase/auth'
import { getUser } from '../lib/firebase-admin'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'

const Profile = ({ user }) => {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function signOut() {
    setIsSigningOut(true)
    await firebaseSignOut(auth)
    router.push('/')
  }

  return (
    user && (
      <Layout back={() => router.back()} title={`${user.name}'s Profile`}>
        <Wrapper>
          <Image src={user.image} width={80} height={80} className='rounded-full' />
          <h1 className='font-roboto font-bold text-2xl mt-4'>{user.name}</h1>
          <p>{user.email}</p>
          <button
            className={`ring-2 ring-red-500 hover:bg-red-500 hover:text-white font-bold px-3 py-1 rounded-md mt-8 flex items-center ${
              isSigningOut
                ? 'pointer-events-none ring-red-400 bg-red-400 text-white'
                : 'pointer-events-auto'
            }`}
            onClick={signOut}
            disabled={isSigningOut}
          >
            {isSigningOut && <div className='spinner h-5 w-5 mr-2' />}
            Sign Out
          </button>
        </Wrapper>
      </Layout>
    )
  )
}

export default Profile

export async function getServerSideProps(context) {
  const user = await getUser(context)
  if (!user) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return { props: { user } }
}
