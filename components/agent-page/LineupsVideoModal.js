import { useRouter } from 'next/router'
import { Dialog } from '@headlessui/react'
import { MapIcon } from '@heroicons/react/solid'
import { HeartIcon, SaveIcon, ShareIcon, XIcon } from '@heroicons/react/outline'
import { capitalize, toTitleCase } from '../../lib/utils'
import { useEffect, useState } from 'react'

const LineupsVideoModal = ({ lineupsDocs }) => {
  const router = useRouter()
  const [video, setVideo] = useState({})

  useEffect(() => {
    if (!router.query.watch) {
      return setVideo({})
    }
    setVideo(lineupsDocs.find(({ id }) => id === router.query.watch))
  }, [router.query.watch])

  function isVideoEmpty() {
    return !Object.values(video).length
  }

  function onClose() {
    router.push('/viper?tab=lineups', undefined, {
      shallow: true,
      scroll: false,
    })
  }

  if (isVideoEmpty()) return null

  const { map, site, title, type, url } = video

  return (
    <Dialog
      as='div'
      className='fixed z-50 inset-0'
      open={!isVideoEmpty()}
      onClose={onClose}
    >
      <div className='absolute min-h-screen inset-0 p-6 bg-white text-left space-y-6 overflow-y-auto'>
        <Dialog.Title as='header'>
          <h2 className='font-bold text-2xl'>{toTitleCase(title)}</h2>
          <p className='text-sm text-gray-400 rounded-md flex items-center max-w-max mt-2'>
            <span className='flex items-center font-semibold text-green-400 mr-2'>
              <MapIcon className='w-3 h-3 mr-1' />
              {capitalize(map)}
            </span>
            {capitalize(type)}&nbsp;&bull;&nbsp;
            {site.toUpperCase()}
          </p>
        </Dialog.Title>

        {/* video container */}
        <div className='border-b-8 border-fuchsia-400'>
          <video src={url} autoPlay muted loop controls></video>
        </div>

        {/* buttons */}
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
