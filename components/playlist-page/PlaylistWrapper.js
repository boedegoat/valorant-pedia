import Layout from 'components/global/Layout'
import Wrapper from 'components/global/Wrapper'
import { PencilIcon } from '@heroicons/react/outline'
import useToggle from 'hooks/useToggle'
import { usePlaylistContext } from 'pages/playlist/[playlistId]'
import PlaylistEditModal from './PlaylistEditModal'

const PlaylistWrapper = ({ children }) => {
  const { playlistLoading, playlist } = usePlaylistContext()
  const [openEdit, toggleOpenEdit] = useToggle()

  return (
    <Layout
      title={`${playlistLoading ? '...' : playlist?.title || 'Untitled'} | Playlist`}
      back='/playlist'
    >
      <Wrapper>
        {playlistLoading ? (
          'loading...'
        ) : (
          <>
            <header className='mb-4'>
              <h1 className='page-main-header'>
                <span>{playlistLoading ? '' : playlist.title || 'Untitled'}</span>
                <button onClick={toggleOpenEdit}>
                  <PencilIcon className='w-4 h-4 ml-4 text-gray-400 hover:text-gray-600' />
                  <PlaylistEditModal openEdit={openEdit} onClose={toggleOpenEdit} />
                </button>
              </h1>
              <p className='font-medium text-gray-500'>
                {playlistLoading
                  ? ''
                  : playlist.description || 'This playlist has no description yet'}
              </p>
            </header>
            {children}
          </>
        )}
      </Wrapper>
    </Layout>
  )
}

export default PlaylistWrapper
