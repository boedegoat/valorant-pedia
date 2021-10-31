import { HeartIcon } from '@heroicons/react/solid'
import Layout from '../../components/Layout'
import PlaylistLink from '../../components/playlist-page/PlaylistLink'
import Wrapper from '../../components/Wrapper'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../lib/firebase-client'
import { useSession } from 'next-auth/client'
import Unauthorize from '../../components/Unauthorize'

const Playlist = () => {
  const [session, sessionLoading] = useSession()
  if (sessionLoading) {
    return <Layout title='Playlist'></Layout>
  }
  if (!session && !sessionLoading) {
    return <Unauthorize pageName='playlist' />
  }

  const [userFavoriteLineup, userFavoriteLineupLoading] = useCollectionData(
    db.collection('lineups').where('favorites', 'array-contains', session.user.email)
  )

  return (
    <Layout title='Playlist'>
      <header>
        <Wrapper>
          <h1 className='page-main-header'>Playlist</h1>
        </Wrapper>
      </header>
      {/* // TODO
          // setTimeout misal 1 detik
          // kalo 1 detik masih loading, baru munculin skeleton loadingnya
          // biar user yg internetnya kenceng gk ngeliat skeleton loading yg tiba2 nongol dan menghilang 
      */}
      {userFavoriteLineupLoading ? (
        ''
      ) : (
        <main className='mt-4'>
          <Wrapper className='space-y-4'>
            <PlaylistLink
              title='Your Favorites'
              length={userFavoriteLineup?.length}
              href='/playlist/your-favorites'
              thumbnailClassName='bg-gradient-to-br from-heart to-fuchsia-500'
              thumbnailChildren={<HeartIcon className='w-6 h-6 text-white' />}
            />
          </Wrapper>
        </main>
      )}
    </Layout>
  )
}

export default Playlist
