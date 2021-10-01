import { useRouter } from 'next/router'
import Wrapper from '../components/Wrapper'
import { auth } from '../lib/firebase-client'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Layout from '../components/Layout'
import Image from 'next/image'

const SignIn = () => {
  const router = useRouter()

  async function signIn() {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      router.back()
    } catch (error) {
      throw error.code
    }
  }

  return (
    <Layout back={() => router.back()} title='Sign In'>
      <Wrapper>
        <Image
          src='/sign-in.svg'
          width={20}
          height={20}
          objectFit='contain'
          layout='responsive'
        />
        <h1 className='text-3xl font-roboto font-bold'>Sign In</h1>
        <p className='mt-3'>
          Unlock additional features including save to playlist and many more.{' '}
          <a className='font-semibold text-fuchsia-500'>Learn more</a>
        </p>
        <div className='mt-6'>
          <button
            className='text-xl w-full ring-2 ring-black rounded-sm py-2 font-semibold hover:bg-fuchsia-500 hover:text-white'
            onClick={signIn}
          >
            Sign in with Google
          </button>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default SignIn
