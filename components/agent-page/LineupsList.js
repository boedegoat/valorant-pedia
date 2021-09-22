import { MapIcon, ExternalLinkIcon } from '@heroicons/react/solid'
import { agentToURL } from '../../lib/agents'
import { capitalize } from '../../lib/utils'
import Link from '../Link'

const LineupsList = ({ agentName, lineupsVideos }) => {
  const { loading, exist, items } = lineupsVideos

  if (loading) {
    return new Array(6).fill(0).map((_, index) => <LoadingComponent key={index} />)
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
      className='max-h-60 bg-white drop-shadow-md hover:drop-shadow-lg rounded-md p-3'
    >
      <p className='flex items-center font-semibold text-green-400 text-base'>
        <MapIcon className='w-3 h-3 mr-1 -ml-1' />
        {capitalize(item.map)}
      </p>
      <h2 className='font-bold text-xl flex items-center'>
        {item.title}
        <ExternalLinkIcon className='w-5 h-5 ml-2' />
      </h2>
      <p className='text-sm text-gray-400 rounded-md flex items-center max-w-max'>
        {capitalize(item.type)}&nbsp;&bull;&nbsp;
        {item.site.toUpperCase()}
      </p>
    </Link>
  ))
}

export default LineupsList

const LoadingComponent = () => {
  return (
    <div className='bg-gray-300 animate-pulse rounded-md overflow-hidden p-3 space-y-2'>
      <div className='h-5 bg-gray-400 bg-opacity-50 w-1/4 rounded-md'></div>
      <div className='h-8 bg-gray-400 bg-opacity-90 w-3/4 rounded-md'></div>
      <div className='flex space-x-2'>
        <div className='h-2 bg-gray-400 bg-opacity-50 w-1/4 rounded-md'></div>
        <div className='h-2 bg-gray-400 bg-opacity-25 w-1/12 rounded-md'></div>
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
