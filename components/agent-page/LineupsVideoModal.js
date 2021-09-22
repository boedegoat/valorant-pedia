import { useRouter } from 'next/router'
import { Dialog } from '@headlessui/react'
import { MapIcon } from '@heroicons/react/solid'
import { HeartIcon, SaveIcon, ShareIcon, XIcon } from '@heroicons/react/outline'
import { capitalize } from '../../lib/utils'

const LineupsVideoModal = ({ video }) => {
  const router = useRouter()

  console.log(video)

  function onClose() {
    router.push('/viper?tab=lineups', undefined, {
      shallow: true,
      scroll: false,
    })
  }

  return (
    <Dialog as='div' className='fixed z-50 inset-0' open={video.show} onClose={onClose}>
      <div className='relative min-h-screen top-0 bottom-0 left-0 w-full p-6 bg-white text-left overflow-y-auto space-y-6'>
        <Dialog.Title as='header'>
          <p className='flex items-center font-semibold text-green-400 text-base'>
            <MapIcon className='w-3 h-3 mr-1' />
            {capitalize(video.item.map)}
          </p>
          <h1 className='font-bold text-2xl flex items-center'>{video.item.title}</h1>
          <p className='text-sm text-gray-400 rounded-md flex items-center max-w-max'>
            {capitalize(video.item.type)}&nbsp;&bull;&nbsp;
            {video.item.site.toUpperCase()}
          </p>
        </Dialog.Title>
        <div className='border-b-8 border-fuchsia-400'>
          <video src={video.item.url} autoPlay muted loop controls></video>
        </div>
        <div className='space-y-3'>
          <div className='flex space-x-2'>
            <button className='w-full py-2 bg-black text-gray-200 rounded-md font-semibold flex justify-center items-center'>
              <SaveIcon className='w-6 h-6' />
            </button>
            <button className='w-full py-2 bg-black text-gray-200 rounded-md font-semibold flex justify-center items-center'>
              <ShareIcon className='w-6 h-6' />
            </button>
            <button className='w-full py-2 bg-black text-gray-200 rounded-md font-semibold flex justify-center items-center'>
              <HeartIcon className='w-6 h-6' />
            </button>
          </div>
          <button
            className='w-full py-2 bg-gray-300 font-semibold rounded-md'
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  )
}

export default LineupsVideoModal
