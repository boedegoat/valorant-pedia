import Link from '../Link'

const PlaylistLink = ({ title, href, thumbnailChildren, thumbnailClassName, length }) => {
  return (
    <Link href={href} className='flex border rounded-md overflow-hidden'>
      {thumbnailChildren && (
        <div
          className={`flex items-center justify-center px-5 ${thumbnailClassName ?? ''}`}
        >
          {thumbnailChildren}
        </div>
      )}
      <div className='flex-grow py-2 ml-3'>
        <h2 className='font-bold text-xl text-gray-900'>{title}</h2>
        <p className='font-semibold text-gray-500'>{length} lineups</p>
      </div>
    </Link>
  )
}

export default PlaylistLink
