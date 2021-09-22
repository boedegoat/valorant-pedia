import { SearchIcon } from '@heroicons/react/outline'

const SearchBar = ({ className, ...props }) => {
  return (
    <div
      className={`flex items-center bg-white drop-shadow-md px-4 py-1 rounded-full ${className}`}
    >
      <SearchIcon className='w-6 h-6 text-gray-400 flex-shrink-0' />
      <input
        type='text'
        className='border-0 bg-transparent focus:ring-0 placeholder-gray-400 text-lg'
        {...props}
      />
    </div>
  )
}

export default SearchBar
