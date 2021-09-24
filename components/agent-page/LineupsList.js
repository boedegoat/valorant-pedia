import { MapIcon, ExternalLinkIcon } from '@heroicons/react/solid'
import { agentToURL } from '../../lib/agents'
import { capitalize, toTitleCase } from '../../lib/utils'
import Link from '../Link'
import Image from 'next/image'

const LineupsList = ({ agentName, lineupsDocs, lineupsLoading }) => {
  function isNotExist() {
    return !lineupsDocs.length && !lineupsLoading
  }

  if (lineupsLoading) {
    return new Array(6).fill(0).map((_, index) => <LoadingComponent key={index} />)
  }

  if (isNotExist()) return <NotExistYetComponent />

  return lineupsDocs.map(({ id, map, site, title, type }) => (
    <Link
      href={{
        pathname: `/${agentToURL(agentName)}`,
        query: { tab: 'lineups', watch: id },
      }}
      shallow={true}
      scroll={false}
      key={id}
      className='group relative max-h-60 bg-white drop-shadow-md hover:drop-shadow-lg rounded-md p-3 pr-10'
    >
      <div className='absolute top-4 right-4'>
        <ExternalLinkIcon className='w-5 h-5 ml-2 transition-colors text-gray-400 group-hover:text-gray-700' />
      </div>

      <h2 className='font-bold text-xl'>{toTitleCase(title)}</h2>
      <p className='text-sm text-gray-400 rounded-md flex items-center max-w-max mt-2'>
        <span className='flex items-center font-semibold bg-green-400 text-white px-1 rounded-md mr-2'>
          <MapIcon className='w-3 h-3 mr-1' />
          {capitalize(map)}
        </span>
        {capitalize(type)}&nbsp;&bull;&nbsp;
        {site.toUpperCase()}
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
  <div className='space-y-4 pb-32'>
    <div className='relative h-[19rem]'>
      <Image src='/video-not-exist.svg' layout='fill' objectFit='cover' />
    </div>
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
