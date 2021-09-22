import Wrapper from '../Wrapper'
import { SearchIcon, FilterIcon } from '@heroicons/react/outline'
import useScroll from '../../hooks/useScroll'
import LineupsList from './LineupsList'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getLineupsVideos } from '../../lib/agents'
import LineupsVideoModal from './LineupsVideoModal'

const Lineups = ({ agent }) => {
  const [lineupsVideos, setLineupsVideos] = useState({
    loading: true,
    exist: null,
    items: [],
  })
  useEffect(async () => {
    const _lineupsVideos = await getLineupsVideos(agent.displayName)
    setLineupsVideos({
      loading: false,
      exist: Boolean(_lineupsVideos.length),
      items: _lineupsVideos,
    })

    return function cleanup() {
      setLineupsVideos({
        loading: true,
        exist: null,
        items: [],
      })
    }
  }, [])

  const router = useRouter()
  const [video, setVideo] = useState({
    show: false,
    item: {},
  })
  useEffect(() => {
    if (router.query.watch) {
      setVideo({
        show: true,
        item: lineupsVideos.items.find((item) => item.name === router.query.watch),
      })
    } else {
      setVideo({
        show: false,
        item: {},
      })
    }

    return function cleanup() {
      setVideo({
        show: false,
        item: {},
      })
    }
  }, [router.query.watch])

  const showNavOnScroll = useScroll({ direction: 'up', offset: 420 })

  return (
    <Wrapper>
      <nav
        className={`
           z-10 bg-white flex justify-between items-center shadow-md rounded-md divide-x-2 ${
             showNavOnScroll
               ? 'fixed top-12 left-0 w-full rounded-none py-1 px-3'
               : '-top-10 sticky'
           }`}
      >
        <div className='px-2 flex items-center space-x-1'>
          <p className='text-sm text-gray-400'>No filters applied</p>
          {/* <div className='text-sm px-1 bg-gray-700 text-white font-semibold rounded-md flex items-center'>
              <MapIcon className='w-3 h-3 mr-1' />
              Icebox
            </div>
            <div className='text-sm px-1 bg-green-400 text-white font-semibold rounded-md flex items-center'>
              Attacking
            </div>
            <div className='text-sm px-1 bg-green-400 text-white font-semibold rounded-md flex items-center'>
              A
            </div> */}
        </div>

        <div className='space-x-1 px-1 flex items-center'>
          <button className='p-2'>
            <FilterIcon className='w-6 h-6 text-gray-500' />
          </button>
          <button className='p-2'>
            <SearchIcon className='w-6 h-6 text-gray-500' />
          </button>
        </div>
      </nav>
      <div className='mt-8 flex flex-col space-y-4'>
        <LineupsList agentName={agent.displayName} lineupsVideos={lineupsVideos} />
        {video.show && <LineupsVideoModal video={video} />}
      </div>
    </Wrapper>
  )
}

export default Lineups
