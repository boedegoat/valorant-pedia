import { usePlaylistContext } from '../../pages/playlist/[playlistId]'
import PlaylistWrapper from './PlaylistWrapper'

const UserPlaylistPage = () => {
  const { playlist } = usePlaylistContext()
  console.log(playlist)
  return (
    <PlaylistWrapper
      title={playlist.title}
      description={playlist.description}
    ></PlaylistWrapper>
  )
}

export default UserPlaylistPage
