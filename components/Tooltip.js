const Tooltip = ({ children, content }) => {
  return (
    <div className='group flex items-center'>
      <div
        className={`absolute transform -translate-x-1/4 -translate-y-10 invisible transition-all ease-out opacity-0 scale-90 lg:group-hover:scale-100 lg:group-hover:opacity-100 lg:group-hover:visible z-50 bg-gray-700 text-gray-100 text-sm px-2 py-1 rounded pointer-events-none whitespace-nowrap`}
      >
        {/* triangle */}
        <div className='absolute -bottom-2 left-1/2 transform -translate-x-1.5 w-8 overflow-hidden'>
          <div className='w-2 h-2 bg-gray-700 transform -rotate-45 origin-top-left rounded-sm'></div>
        </div>
        {content}
      </div>
      {children}
    </div>
  )
}

export default Tooltip
