import { HeartIcon } from '@heroicons/react/solid'
import Layout from '../../components/Layout'
import PlaylistLink from '../../components/playlist-page/PlaylistLink'
import Wrapper from '../../components/Wrapper'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../lib/firebase-client'
import { useSession } from 'next-auth/client'
import PlaylistLoading from '../../components/playlist-page/PlaylistLoading'

const Playlist = () => {
  const [lineups, lineupsLoading] = useCollectionData(db.collection('lineups'))
  const [session, sessionLoading] = useSession()

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
    </Layout>
  )
}

export default Playlist
