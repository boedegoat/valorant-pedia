import { SearchIcon } from '@heroicons/react/outline'

const SearchBar = ({ ...props }) => {
  return (
    <div className='flex items-center bg-white drop-shadow-md rounded-full px-4 py-1'>
      <SearchIcon className='w-6 h-6 text-gray-400' />
      <input
        type='text'
        className='border-0 focus:ring-0 placeholder-gray-400 text-lg'
        {...props}
      />
    </div>
  )
}

export default SearchBar
