const PlaylistLoading = ({ count }) => {
  return new Array(count).fill().map((_, i) => <LoadingComponent key={i} />)
}

export default PlaylistLoading

const LoadingComponent = () => (
  <div className='h-16 rounded-md bg-gray-200 flex overflow-hidden animate-pulse'>
    <div className='px-8 bg-gray-300'></div>
    <div className='flex-grow p-2 space-y-2 flex flex-col justify-center'>
      <div className='h-5 bg-gray-300 rounded-sm w-3/4'></div>
      <div className='h-3 bg-gray-300 rounded-sm w-1/2'></div>
    </div>
  </div>
)
