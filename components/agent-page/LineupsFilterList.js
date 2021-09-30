import { MapIcon } from '@heroicons/react/solid'
import { capitalize } from '../../lib/utils'

const LineupsFilterList = ({ filterLineups, text = 'sm' }) => {
  return (
    <div className={`px-3 py-2 flex items-center space-x-1 text-${text} overflow-y-auto`}>
      {Object.entries(filterLineups).every(([filterProperty, filterValue]) => {
        if (filterProperty === 'title') return true
        return !filterValue
      }) && <p className='text-gray-300'>No filters applied</p>}
      {filterLineups.map && (
        <span className='flex items-center font-semibold bg-green-400 text-white px-1 rounded-md flex-shrink-0'>
          <MapIcon className='w-3 h-3 mr-1' />
          {capitalize(filterLineups.map)}
        </span>
      )}
      {filterLineups.type && (
        <span className='flex items-center font-semibold bg-gray-600 text-white px-1 rounded-md flex-shrink-0'>
          {capitalize(filterLineups.type)}
        </span>
      )}
      {filterLineups.site && (
        <span className='flex items-center font-semibold bg-gray-600 text-white px-1 rounded-md flex-shrink-0'>
          {capitalize(filterLineups.site)}
        </span>
      )}
    </div>
  )
}

export default LineupsFilterList
