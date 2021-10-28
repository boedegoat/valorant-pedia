import { HeartIcon } from '@heroicons/react/solid'
import Layout from '../../components/Layout'
import PlaylistLink from '../../components/playlist-page/PlaylistLink'
import Wrapper from '../../components/Wrapper'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../lib/firebase-client'
import { signIn, useSession } from 'next-auth/client'
import PlaylistLoading from '../../components/playlist-page/PlaylistLoading'
import useToggle from '../../hooks/useToggle'
import Alert from '../../components/Alert'
import { useEffect } from 'react'

const Playlist = () => {
  const [lineups, lineupsLoading] = useCollectionData(db.collection('lineups'))
  const [session, sessionLoading] = useSession()
  const [signInAlert, toggleSignInAlert] = useToggle(false)

  useEffect(() => {
    if (!session && !sessionLoading) {
      toggleSignInAlert(true)
    }
  }, [session, sessionLoading])

  const userFavorites = lineups?.filter((l) => l.favorites.includes(session?.user.email))

  return (
    <Layout title='Playlist'>
      <header>
        <Wrapper>
          <h1 className='page-main-header'>Playlist</h1>
        </Wrapper>
      </header>
      <main className='mt-4'>
        <Wrapper className='space-y-4'>
          {lineupsLoading || sessionLoading ? (
            // TODO
            // setTimeout misal 1 detik
            // kalo 1 detik masih loading, baru munculin skeleton loadingnya
            // biar user yg internetnya kenceng gk ngeliat skeleton loading yg tiba2 nongol dan menghilang
            <PlaylistLoading count={5} />
          ) : (
            <PlaylistLink
              title='Your Favorites'
              length={userFavorites?.length}
              href='/playlist/your-favorites'
              thumbnailClassName='bg-gradient-to-br from-heart to-fuchsia-500'
              thumbnailChildren={<HeartIcon className='w-6 h-6 text-white' />}
            />
          )}
        </Wrapper>
      </main>

      <Alert open={signInAlert} onClose={() => {}}>
        <Alert.Title as='h3' className='text-xl font-bold leading-6 text-gray-900'>
          Sign In
        </Alert.Title>
        <Alert.Description className='mt-2 text-sm'>
          Get your account now to access the playlist page
        </Alert.Description>

        <div className='mt-4'>
          <button
            type='button'
            className='inline-flex justify-center px-4 py-2 text-sm font-medium text-fuchsia-900 bg-fuchsia-100 border border-transparent rounded-md hover:bg-fuchsia-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500'
            onClick={() => signIn('google', { callbackUrl: '/playlist' })}
          >
            Sign In with Google
          </button>
        </div>
      </Alert>
    </Layout>
  )
}

export default Playlist
