import { providers, signIn } from 'next-auth/client'
import Wrapper from '../components/Wrapper'

const SignIn = ({ providers }) => {
  return (
    <Wrapper className='mt-8 min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-roboto font-bold'>Sign In</h1>
      <div className='mt-4'>
        {Object.values(providers).map((provider) => (
          <button
            className='ring-2 ring-black rounded-sm px-3 py-1 font-bold hover:bg-fuchsia-500 hover:text-white'
            key={provider.name}
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: window.location.origin,
              })
            }
          >
            Sign in with {provider.name}
          </button>
        ))}
      </div>
    </Wrapper>
  )
}

export default SignIn

export async function getServerSideProps() {
  return { props: { providers: await providers() } }
}
