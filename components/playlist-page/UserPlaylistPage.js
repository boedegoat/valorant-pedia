import useCollectionDataWithId from '../../hooks/useCollectionDataWithId'
import { usePlaylistContext } from '../../pages/playlist/[playlistId]'
import PlaylistWrapper from './PlaylistWrapper'
import { db } from '../../lib/firebase-client'
import SelectLineup from '../agent-page/SelectLineup'

const UserPlaylistPage = () => {
  const { playlist, playlistLoading, maps, user } = usePlaylistContext()

  console.log(playlist)

  const [lineups, lineupsLoading] = useCollectionDataWithId(
    db.collection('lineups').where('playlists', 'array-contains', playlist?.id ?? null)
  )

  return (
    <PlaylistWrapper
      playlistLoading={playlistLoading}
      title={playlist?.title}
      description={playlist?.description}
    >
      <div className='mt-8 grid grid-cols-2 gap-2'>
        {lineups?.map((lineup) => (
          <SelectLineup
            lineup={lineup}
            maps={maps}
            user={user}
            key={lineup.id}
            back={`playlist/${playlist.id}`}
          />
        ))}
      </div>
    </PlaylistWrapper>
  )
}

export default UserPlaylistPage
