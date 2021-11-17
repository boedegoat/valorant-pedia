import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { HeartIcon } from '@heroicons/react/outline'
import Link from 'components/global/Link'
import { toTitleCase } from 'lib/utils'
import LineupsTypeAndSite from './LineupsTypeAndSite'

const SelectLineup = ({ lineup, maps, user, back }) => {
  const { id, map, site, title, type, thumbnailURL, favorites } = lineup

  return (
    <Link
      href={`/watch/${id}?back=${back}`}
      shallow={true}
      scroll={false}
      key={id}
      className='group relative bg-white drop-shadow-md hover:drop-shadow-lg rounded-md p-3 pr-10 overflow-hidden border-2'
      style={{
        // make 9/16 aspect ratio
        paddingBottom: 'calc((16/9) * 100%)',
      }}
    >
      {/* bg */}
      <img src={thumbnailURL} className='absolute inset-0 h-full' />

      {/* top */}
      <div className='absolute left-0 right-0 top-0 bg-white p-2 flex border-b-2'>
        {/* map */}
        <div className='flex items-center space-x-2 '>
          <img
            src={maps.find((m) => m.displayName.toLowerCase() === map).splash}
            className='rounded-full w-5 h-5'
          />
          <h2 className='font-black text-base uppercase'>{map}</h2>
        </div>
        {/* favorite count */}
        <div className='ml-auto flex items-center space-x-1'>
          {favorites.includes(user?.email) ? (
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
  )
}

export default SelectLineup
