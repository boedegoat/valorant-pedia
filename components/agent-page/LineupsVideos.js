import { MapIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import { agentToURL, getLineupsVideos } from '../../lib/agents'
import { capitalize } from '../../lib/utils'
import { useRouter } from 'next/router'
import Link from '../Link'

const LineupsVideos = ({ agentName }) => {
  const router = useRouter()

  const [lineupsVideos, setLineupsVideos] = useState({
    loading: true,
    exist: null,
    items: [],
  })

  useEffect(async () => {
    const _lineupsVideos = await getLineupsVideos(agentName)
    setLineupsVideos({
      loading: false,
      exist: Boolean(_lineupsVideos.length),
      items: _lineupsVideos,
    })
  }, [])

  useEffect(() => {
    console.log(router.query.watch)
  }, [router.query.watch])

  const { loading, exist, items } = lineupsVideos

  if (loading) {
    return new Array(8).fill(0).map((_, index) => <LoadingComponent key={index} />)
  }
  if (!exist) return <NotExistYetComponent />

  return items.map((item, index) => (
    <Link
      href={{
        pathname: `/${agentToURL(agentName)}`,
        query: { tab: 'lineups', watch: item.name },
      }}
      shallow={true}
      scroll={false}
      key={index}
      className='max-h-60 bg-white drop-shadow-md rounded-md'
    >
      <div className='p-3'>
        <p className='text-sm px-1 text-fuchsia-400 font-semibold rounded-md flex items-center max-w-max'>
          <MapIcon className='w-3 h-3 mr-1 -ml-1' />
          {capitalize(item.map)}
        </p>
        <h2 className='font-bold text-xl'>{item.title}</h2>
        <div className='flex space-x-1 mt-3'>
          <p className='text-sm px-1 bg-gray-800 text-white font-semibold rounded-md flex items-center'>
            {capitalize(item.type)}
          </p>
          <p className='text-sm px-1 bg-green-400 text-white font-semibold rounded-md flex items-center'>
            {item.site.toUpperCase()}
          </p>
        </div>
      </div>
    </Link>
  ))
}

export default LineupsVideos

const LoadingComponent = () => {
  return (
    <div className='h-60 bg-gray-300 animate-pulse rounded-md overflow-hidden'>
      {/* image placeholder */}
      <div className='h-2/3 bg-gray-400 bg-opacity-20 p-2'>
        <div className='h-5 bg-gray-200 bg-opacity-20 w-1/2 rounded-md'></div>
      </div>
      {/* body */}
      <div className='p-2 flex flex-col space-y-3'>
        {/* title placeholder */}
        <div className='h-8 bg-gray-400 bg-opacity-90 w-3/4 rounded-md'></div>
        {/* label placeholder */}
        <div className='flex space-x-2'>
          <div className='h-2 bg-gray-400 bg-opacity-50 w-1/2 rounded-md'></div>
          <div className='h-2 bg-gray-400 bg-opacity-25 w-1/4 rounded-md'></div>
        </div>
      </div>
    </div>
  )
}

const NotExistYetComponent = () => (
  <div className='col-span-2 space-y-4 pb-32'>
    <video
      src='https://media.giphy.com/media/vXJLWypoYt0wE/giphy.mp4'
      className='rounded-md shadow-md'
      autoPlay
      loop
    />
    <h1 className='font-roboto font-bold text-2xl text-gray-900'>
      Waduh, videonya masih di goreng bro
    </h1>
    <p className='text-gray-600 text-lg'>
      sambil menunggu mending{' '}
      <a
        href='https://cdn.kincir.com/2/oJLwUjXw21_TSOXcvcpDmyrxoszGFmP3xTef-4akw-Y/transform/rs:fill:764:400/src/production/2019-08/1daa05998ab997d0a35171829c678b776ed5740d.jpg'
        target='_blank'
        className='text-fuchsia-500'
      >
        klik ini
      </a>
    </p>
  </div>
)
