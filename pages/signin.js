import { useRouter } from 'next/router'
import Wrapper from '../components/global/Wrapper'
import Layout from '../components/global/Layout'
import Image from 'next/image'
import { signIn, getProviders } from 'next-auth/client'

const SignIn = ({ providers }) => {
  const router = useRouter()

  return (
    <Layout back={() => router.back()} title='Sign In'>
      <Wrapper>
        <Image
          src='/sign-in.svg'
          alt='sign in illustration'
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
          {Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              className='text-xl w-full ring-2 ring-black rounded-sm py-2 font-semibold hover:bg-fuchsia-500 hover:text-white'
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: router.back,
                })
              }
            >
              Sign in with {provider.name}
            </button>
          ))}
        </div>
      </Wrapper>
    </Layout>
  )
}

export default SignIn

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
