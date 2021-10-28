import { HeartIcon } from '@heroicons/react/solid'
import Layout from '../../components/Layout'
import PlaylistLink from '../../components/playlist-page/PlaylistLink'
import Wrapper from '../../components/Wrapper'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../lib/firebase-client'
import { useSession } from 'next-auth/client'
import PlaylistLoading from '../../components/playlist-page/PlaylistLoading'
import useToggle from '../../hooks/useToggle'
import { useEffect } from 'react'
import SignInAlert from '../../components/SignInAlert'

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

      <SignInAlert
        description='Get your account now to access the playlist page'
        callbackUrl='/playlist'
        open={signInAlert}
        onClose={() => {}}
      />
    </Layout>
  )
}

export default Playlist
