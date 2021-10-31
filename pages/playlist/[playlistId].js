import { useSession } from 'next-auth/client'
import { createContext, useContext } from 'react'
import UserPlaylistPage from '../../components/playlist-page/UserPlaylistPage'
import YourFavoritePage from '../../components/playlist-page/YourFavoritePage'
import { db } from '../../lib/firebase-client'
import { getMaps } from '../../lib/maps'
import Unauthorize from '../../components/Unauthorize'

const PlaylistContext = createContext({})
export function usePlaylistContext() {
  return useContext(PlaylistContext)
}

const PlaylistId = ({ yourFavorites, playlist, maps }) => {
  const [session, loading] = useSession()
  const user = session?.user

  if (loading) {
    return null
  }

  if (!loading && !user) {
    return <Unauthorize pageName='your-favorites' />
  }

  return (
    <PlaylistContext.Provider value={{ user, maps, playlist }}>
      {yourFavorites ? <YourFavoritePage /> : <UserPlaylistPage />}
    </PlaylistContext.Provider>
  )
}

export default PlaylistId

export async function getStaticPaths() {
  const playlistsSnapshot = await db.collection('playlists').get()
  const playlistsId = playlistsSnapshot.docs.map((playlist) => ({
    params: { playlistId: playlist.id },
  }))

  const paths = [{ params: { playlistId: 'your-favorites' } }, ...playlistsId]

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const { playlistId } = context.params
  const maps = await getMaps()

  if (playlistId === 'your-favorites') {
    return {
      props: { yourFavorites: true, maps },
      revalidate: 60,
    }
  }

  const playlistSnapshot = await db.collection('playlists').doc(playlistId).get()

  if (!playlistSnapshot.exists) {
    return { notFound: true }
  }

  console.log(`generating page /playlist/${playlistId}`)

  const playlist = {
    id: playlistSnapshot.id,
    ...playlistSnapshot.data(),
    createdAt: playlistSnapshot.data().createdAt?.toDate().toString(),
  }

  return {
    props: { yourFavorites: false, playlist, maps },
    revalidate: 60,
  }
}
