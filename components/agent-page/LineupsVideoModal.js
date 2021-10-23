import { useRouter } from 'next/router'
import { Dialog } from '@headlessui/react'
import { MapIcon } from '@heroicons/react/solid'
import { HeartIcon, SaveIcon, ShareIcon } from '@heroicons/react/outline'
import {
  HeartIcon as HeartIconSolid,
  SaveIcon as SaveIconSolid,
} from '@heroicons/react/solid'
import { capitalize, toTitleCase } from '../../lib/utils'
import { useEffect, useState } from 'react'
import { agentToURL } from '../../lib/agents'
import { useSession } from 'next-auth/client'

const LineupsVideoModal = ({ lineups, agentName }) => {
  const router = useRouter()
  const [session] = useSession()
  const [video, setVideo] = useState(null)

  function onClose() {
    router.push(`/${agentToURL(agentName)}?tab=lineups`, undefined, {
      shallow: true,
      scroll: false,
    })
  }

  useEffect(() => {
    if (!router.query.watch) return setVideo(null)
    const matchLineups = lineups?.find(({ id }) => id === router.query.watch)
    if (!matchLineups) return setVideo(null)
    setVideo(matchLineups)
  }, [router.query.watch, lineups])

  // if (!video) return null

  return (
    <Dialog
      as='div'
      className='fixed z-50 inset-0'
      open={Boolean(video)}
      onClose={onClose}
    >
      <div className='absolute min-h-screen inset-0 p-6 bg-white text-left space-y-6 overflow-y-auto'>
        <Dialog.Title as='header'>
          <h2 className='font-bold text-2xl'>{toTitleCase(video?.title)}</h2>
        </Dialog.Title>

        {/* video container */}
        <div className='border-b-8 border-fuchsia-400'>
          <video src={video?.videoURL} autoPlay muted loop controls></video>
        </div>

        {/* buttons */}
        <div className='space-y-3'>
          <div className='flex space-x-2'>
            <BottomButton Icon={SaveIcon} ActiveIcon={SaveIconSolid} />
            <BottomButton Icon={ShareIcon} />
            <BottomButton Icon={HeartIcon} ActiveIcon={HeartIconSolid} />
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

const BottomButton = ({ Icon, disabled, onClick, active, ActiveIcon }) => {
  return (
    <button
      className={`w-full py-2 
      ${disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-black'}
    text-gray-200 rounded-md font-semibold flex justify-center items-center`}
      disabled={disabled}
      onClick={onClick}
    >
      {active ? <ActiveIcon className='w-6 h-6' /> : <Icon className='w-6 h-6' />}
    </button>
  )
}
