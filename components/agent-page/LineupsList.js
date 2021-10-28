import { toTitleCase } from '../../lib/utils'
import Link from '../Link'
import Image from 'next/image'
import LineupsTypeAndSite from './LineupsTypeAndSite'
import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { useAgentPageContext } from './AgentPageLayout'
import { useSession } from 'next-auth/client'

const LineupsList = ({ lineups, lineupsLoading, resetLineupsQuery }) => {
  const { maps } = useAgentPageContext()
  const [session] = useSession()

  if (lineupsLoading) {
    return new Array(6).fill(0).map((_, index) => <LoadingComponent key={index} />)
  }

  // if lineups not available
  if (!lineups.length && !lineupsLoading) {
    return <NotAvailableComponent resetLineupsQuery={resetLineupsQuery} />
  }

  console.log(lineups)

  return lineups.map(({ id, map, site, title, type, thumbnailURL, favorites }) => (
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
          {favorites.includes(session?.user.email) ? (
            <HeartIconSolid className='w-3 h-3 text-heart' />
          ) : (
            <HeartIcon className='w-3 h-3 text-heart' />
          )}
          <p className='text-[10px]'>{favorites.length}</p>
        </div>
      </div>

      {/* bottom */}
      <div className='absolute left-0 right-0 bottom-0 top-1/2 bg-gradient-to-t from-black to-transparent p-3 flex flex-col'>
        <div className='mt-auto'>
          <LineupsTypeAndSite type={type} site={site} />
          <h1 className='text-white font-bold text-base'>{toTitleCase(title)}</h1>
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

const NotAvailableComponent = ({ resetLineupsQuery }) => (
  <div className='space-y-4 pb-10 col-span-2'>
    <div className='relative h-[19rem]'>
      <Image src='/video-not-exist.svg' layout='fill' objectFit='contain' />
    </div>
    <h1 className='font-bold text-2xl text-gray-900'>
      Seems like there are no lineups with this filter
    </h1>
    <button
      className='bg-fuchsia-500 text-white font-semibold px-3 py-2 rounded-md'
      onClick={resetLineupsQuery}
    >
      Reset Filter
    </button>
  </div>
)
