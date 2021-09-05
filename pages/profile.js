import { signOut, getSession } from 'next-auth/client'
import Wrapper from '../components/Wrapper'
import Layout from '../components/Layout'

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

const Profile = ({ session }) => {
  return (
    <Layout>
      <Layout.Head>
        <title>{session.user.name}'s Profile</title>
      </Layout.Head>
      <Wrapper>
        <Wrapper.Link href='/'>Back to Home</Wrapper.Link>
        <h1 className='font-roboto font-bold text-2xl mt-5'>{session.user.name}</h1>
        <p>{session.user.email}</p>
        <button
          className='ring-2 ring-red-500 hover:bg-red-500 hover:text-white font-bold px-3 py-1 rounded-md mt-8'
          onClick={() =>
            signOut({
              callbackUrl: window.location.origin,
            })
          }
        >
          Sign Out
        </button>
      </Wrapper>
    </Layout>
  )
}

export default Profile
