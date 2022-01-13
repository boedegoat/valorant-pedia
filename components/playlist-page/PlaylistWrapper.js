import Layout from 'components/global/Layout'
import Wrapper from 'components/global/Wrapper'
import { PencilIcon } from '@heroicons/react/outline'
import useToggle from 'hooks/useToggle'
import Modal from 'components/global/Modal'

const PlaylistWrapper = ({ title, children, description, playlistLoading }) => {
  const [openEdit, toggleOpenEdit] = useToggle()

  return (
    <Layout title={`${title || 'Untitled'} | Playlist`} back='/playlist'>
      <header className='mb-4'>
        <Wrapper>
          <h1 className='page-main-header'>
            <span>{playlistLoading ? '' : title || 'Untitled'}</span>
            <button onClick={toggleOpenEdit}>
              <PencilIcon className='w-4 h-4 ml-4 text-gray-400 hover:text-gray-600' />
            </button>
          </h1>
          <Modal title='Edit' open={openEdit} onClose={toggleOpenEdit} includeCloseButton>
            modal ni bos
            {/* <div className='h-[1000px] bg-gray-100'></div> */}
          </Modal>
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
