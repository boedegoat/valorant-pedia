import { useState } from 'react'
import Wrapper from '../components/global/Wrapper'
import Layout from '../components/global/Layout'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { getSession, signOut } from 'next-auth/client'

const Profile = ({ session }) => {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  return (
    <Layout back={() => router.back()} title={`${session.user.name}'s Profile`}>
      <Wrapper>
        <Image src={session.user.image} width={80} height={80} className='rounded-full' />
        <h1 className='font-roboto font-bold text-2xl mt-4'>{session.user.name}</h1>
        <p>{session.user.email}</p>
        <button
          className={`ring-2 ring-red-500 hover:bg-red-500 hover:text-white font-bold px-3 py-1 rounded-md mt-8 flex items-center ${
            isSigningOut
              ? 'pointer-events-none ring-red-400 bg-red-400 text-white'
              : 'pointer-events-auto'
          }`}
          onClick={() => {
            setIsSigningOut(true)
            signOut({ callbackUrl: '/' })
          }}
          disabled={isSigningOut}
        >
          {isSigningOut && <div className='spinner h-5 w-5 mr-2' />}
          Sign Out
        </button>
      </Wrapper>
    </Layout>
  )
}

export default Profile

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return { props: { session } }
}
