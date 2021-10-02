import { useRouter } from 'next/router'
import { Dialog } from '@headlessui/react'
import { MapIcon } from '@heroicons/react/solid'
import { HeartIcon, SaveIcon, ShareIcon } from '@heroicons/react/outline'
import {
  HeartIcon as HeartIconSolid,
  SaveIcon as SaveIconSolid,
} from '@heroicons/react/solid'
import { capitalize, toTitleCase } from '../../lib/utils'
import { useEffect, useLayoutEffect, useState } from 'react'
import { agentToURL } from '../../lib/agents'
import Link from '../Link'
import { db } from '../../lib/firebase-client'
import { doc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import useCollection from '../../hooks/useCollection'
import useUser from '../../hooks/useUser'

const LineupsVideoModal = ({ lineups, agentName }) => {
  const router = useRouter()
  const [user] = useUser()
  const [video, setVideo] = useState(null)
  const [isLike, setIsLike] = useState(false)
  const [usersDocs] = useCollection(`users`)

  function like() {
    if (!user) {
      if (confirm('You need to Sign In first to like this video. Sign In now ?')) {
        router.push('/signin')
      }
      return
    }
    const docID = user.email
    setDoc(
      doc(db, 'users', docID),
      {
        likes: isLike ? arrayRemove(video.id) : arrayUnion(video.id),
      },
      { merge: true }
    )

    // TODO :
    // 1. change alert to custom toast alert
    // 2. show like videos before showing all lineups videos (horizontal scroll)
    // 3. make the like playlist in playlist page
    if (isLike) {
      alert('removed this video from your `like` playlist')
    } else {
      alert('added this video to your `like` playlist')
    }
  }

  function handleLike(user) {
    if (!user.likes) return
    const _isLike = user.likes.some((id) => id === video.id)
    setIsLike(_isLike)
  }

  function onClose() {
    router.push(`/${agentToURL(agentName)}?tab=lineups`, undefined, {
      shallow: true,
      scroll: false,
    })
  }

  useEffect(() => {
    if (!user) return

    // get match user
    const matchUser = usersDocs.find(({ email }) => email === user.email)
    if (!matchUser) return

    // check if user like this video or not
    // handleLike(matchUser)
  }, [usersDocs, user, video])

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
          <p className='text-sm text-gray-400 rounded-md flex items-center max-w-max mt-2'>
            <span className='flex items-center font-semibold bg-green-400 text-white px-1 rounded-md mr-2'>
              <MapIcon className='w-3 h-3 mr-1' />
              {capitalize(video?.map)}
            </span>
            {capitalize(video?.type)}&nbsp;&bull;&nbsp;
            {video?.site.toUpperCase()}
          </p>
        </Dialog.Title>

        {/* video container */}
        <div className='border-b-8 border-fuchsia-400'>
          <video src={video?.url} autoPlay muted loop controls></video>
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
