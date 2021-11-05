import Layout from '../Layout'
import Wrapper from '../Wrapper'

const PlaylistWrapper = ({ title, children, description, playlistLoading }) => {
  return (
    <Layout title={`${title || 'Untitled'} | Playlist`} back='/playlist'>
      <header className='mb-4'>
        <Wrapper>
          <h1 className='page-main-header'>
            {playlistLoading ? '' : title || 'Untitled'}
          </h1>
          <p className='font-medium text-gray-500'>
            {playlistLoading ? '' : description || 'This playlist has no description yet'}
          </p>
        </Wrapper>
      </header>
      <Wrapper>{children}</Wrapper>
    </Layout>
  )
}

export default PlaylistWrapper
