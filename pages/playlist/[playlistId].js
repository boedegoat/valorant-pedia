import { useSession } from 'next-auth/client'
import { createContext, useContext } from 'react'
import UserPlaylistPage from '../../components/playlist-page/UserPlaylistPage'
import YourFavoritePage from '../../components/playlist-page/YourFavoritePage'
import { db } from '../../lib/firebase-client'
import { getMaps } from '../../lib/maps'
import Unauthorize from '../../components/global/Unauthorize'
import useDocumentDataWithId from '../../hooks/useDocumentDataWithId'

const PlaylistContext = createContext({})
export function usePlaylistContext() {
  return useContext(PlaylistContext)
}

const PlaylistId = ({ yourFavorites, maps, playlistId }) => {
  const [session, sessionLoading] = useSession()
  const user = session?.user
  const [playlist, playlistLoading] = useDocumentDataWithId(
    !yourFavorites ? db.collection('playlists').doc(playlistId) : null
  )

  if (!sessionLoading && !user) {
    return <Unauthorize pageName='your-favorites' />
  }

  return (
    <PlaylistContext.Provider
      value={{ user, sessionLoading, maps, playlist, playlistLoading }}
    >
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
      props: { yourFavorites: true, maps, playlistId },
      revalidate: 60,
    }
  }

  const playlistSnapshot = await db.collection('playlists').doc(playlistId).get()

  if (!playlistSnapshot.exists) {
    return { notFound: true }
  }

  console.log(`generating page /playlist/${playlistId}`)

  return {
    props: { yourFavorites: false, maps, playlistId },
    revalidate: 60,
  }
}
