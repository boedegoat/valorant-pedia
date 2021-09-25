import { providers, signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Wrapper from '../components/Wrapper'
import { db } from '../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'

const SignIn = ({ providers }) => {
  const router = useRouter()
  const [session, loading] = useSession()

  function backToLastPage() {
    router.back()
    router.back()
  }

  useEffect(() => {
    if (session) {
      backToLastPage()
      // send user information to firestore
      const docID = session.user.email
      setDoc(doc(db, 'users', docID), session.user, { merge: true })
    }
  }, [session])

  return (
    <Wrapper className='mt-8 min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-roboto font-bold'>
        {!loading && !session ? 'Sign In' : 'Sign In Success'}
      </h1>
      {!loading && !session ? (
        <div className='mt-4'>
          {Object.values(providers).map((provider) => (
            <button
              className='ring-2 ring-black rounded-sm px-3 py-1 font-bold hover:bg-fuchsia-500 hover:text-white'
              key={provider.name}
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          ))}
        </div>
      ) : (
        <p className='text-center mt-4 text-lg'>
          You will be redirected to your last page in a second
        </p>
      )}
    </Wrapper>
  )
}

export default SignIn

export async function getServerSideProps() {
  return { props: { providers: await providers() } }
}
