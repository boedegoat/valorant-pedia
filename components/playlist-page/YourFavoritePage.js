import useCollectionDataWithId from '../../hooks/useCollectionDataWithId'
import { db } from '../../lib/firebase-client'
import { usePlaylistContext } from '../../pages/playlist/[playlistId]'
import SelectLineup from '../agent-page/SelectLineup'
import PlaylistWrapper from './PlaylistWrapper'

const YourFavoritePage = () => {
  const { user, maps } = usePlaylistContext()

  const [lineups, lineupsLoading] = useCollectionDataWithId(
    db.collection('lineups').where('favorites', 'array-contains', user.email)
  )

  return (
    <PlaylistWrapper
      title='Your Favorites'
      description='A collection of your favorites lineups'
    >
      <div className='mt-8 grid grid-cols-2 gap-2'>
        {lineups?.map((lineup) => (
          <SelectLineup lineup={lineup} maps={maps} user={user} key={lineup.id} />
        ))}
      </div>
    </PlaylistWrapper>
  )
}

export default YourFavoritePage
