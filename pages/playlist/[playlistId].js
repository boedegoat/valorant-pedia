import { getSession } from 'next-auth/client'
import { createContext, useContext } from 'react'
import UserPlaylistPage from '../../components/playlist-page/UserPlaylistPage'
import YourFavoritePage from '../../components/playlist-page/YourFavoritePage'
import { getMaps } from '../../lib/maps'

const PlaylistContext = createContext({})
export function usePlaylistContext() {
  return useContext(PlaylistContext)
}

const PlaylistId = ({ user, param, maps }) => {
  return (
    <PlaylistContext.Provider value={{ user, maps }}>
      {param === 'your-favorites' ? <YourFavoritePage /> : <UserPlaylistPage />}
    </PlaylistContext.Provider>
  )
}

export default PlaylistId

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const param = context.params.playlistId
  const maps = await getMaps()

  return {
    props: {
      user: session.user || null,
      param,
      maps,
    },
  }
}
