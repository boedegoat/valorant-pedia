import { agentToURL } from '../../lib/agents'
import { toTitleCase } from '../../lib/utils'
import Link from '../Link'
import Image from 'next/image'
import LineupsTypeAndSite from './LineupsTypeAndSite'
import { HeartIcon } from '@heroicons/react/solid'

const LineupsList = ({ agentName, lineups, lineupsLoading, maps }) => {
  function isNotExist() {
    return !lineups.length && !lineupsLoading
  }

  if (lineupsLoading) {
    return new Array(6).fill(0).map((_, index) => <LoadingComponent key={index} />)
  }

  if (isNotExist()) return <NotExistYetComponent />

  console.log(lineups)

  return lineups.map(({ id, map, site, title, type, thumbnailURL }) => (
    <Link
      href={`/watch/${id}`}
      shallow={true}
      scroll={false}
      key={id}
      className={`group relative bg-white drop-shadow-md hover:drop-shadow-lg rounded-md p-3 pr-10 overflow-hidden border-2`}
      style={{
        // make 9/16 aspect ratio
        paddingBottom: 'calc((16/9) * 100%)',
      }}
    >
      {/* bg */}
      <Image src={thumbnailURL} layout='fill' />

      {/* top */}
      <div className='absolute left-0 right-0 top-0 bg-white p-2 flex border-b-2'>
        {/* map */}
        <div className='flex items-center space-x-2 '>
          <Image
            src={maps.find((m) => m.displayName.toLowerCase() === map).splash}
            width={19}
            height={19}
            layout='fixed'
            className='rounded-full'
          />
          <h2 className='font-black text-base uppercase'>{map}</h2>
        </div>
        {/* favorite count */}
        <div className='ml-auto flex items-center space-x-1'>
          <HeartIcon className='w-3 h-3 text-heart' />
          <p className='text-[10px]'>{Math.floor(Math.random() * 101)}</p>
        </div>
      </div>

      {/* bottom */}
      <div className='absolute left-0 right-0 bottom-0 top-1/2 bg-gradient-to-t from-black to-transparent p-3 flex flex-col'>
        <div className='mt-auto'>
          <LineupsTypeAndSite type={type} site={site} />
          <h1 className='text-white font-bold text-lg'>{toTitleCase(title)}</h1>
        </div>
      </div>
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
