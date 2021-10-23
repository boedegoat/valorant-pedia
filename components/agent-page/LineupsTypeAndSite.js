const LineupsTypeAndSite = ({ type, site }) => {
  return (
    <div className='flex items-center space-x-1 bg-black bg-opacity-40 w-max py-1 px-2 rounded-md'>
      <LineupTypeIcon type={type} />
      <p className='font-black text-white text-sm'>{site.toUpperCase()}</p>
    </div>
  )
}

export default LineupsTypeAndSite

const LineupTypeIcon = ({ type }) => {
  const className = 'text-white w-4 h-4'
  if (type === 'attacking') return <SwordIcon className={className} />
  if (type === 'defending') return <ShieldIcon className={className} />
}

const SwordIcon = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
    role='img'
    width='1em'
    height='1em'
    preserveAspectRatio='xMidYMid meet'
    viewBox='0 0 24 24'
    className={className}
  >
    <path
      d='M6.2 2.44l11.9 11.9l2.12-2.12l1.41 1.41l-2.47 2.47l3.18 3.18c.39.39.39 1.02 0 1.41l-.71.71a.996.996 0 0 1-1.41 0L17 18.23l-2.44 2.47l-1.41-1.41l2.12-2.12l-11.9-11.9V2.44H6.2M15.89 10l4.74-4.74V2.44H17.8l-4.74 4.74L15.89 10m-4.95 5l-2.83-2.87l-2.21 2.21l-2.12-2.12l-1.41 1.41l2.47 2.47l-3.18 3.19a.996.996 0 0 0 0 1.41l.71.71c.39.39 1.02.39 1.41 0L7 18.23l2.44 2.47l1.41-1.41l-2.12-2.12L10.94 15z'
      fill='currentColor'
    />
  </svg>
)

const ShieldIcon = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
    role='img'
    width='1em'
    height='1em'
    preserveAspectRatio='xMidYMid meet'
    viewBox='0 0 24 24'
    className={className}
  >
    <path
      d='M21 11c0 5.55-3.84 10.74-9 12c-5.16-1.26-9-6.45-9-12V5l9-4l9 4v6m-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12V21z'
      fill='currentColor'
    />
  </svg>
)
