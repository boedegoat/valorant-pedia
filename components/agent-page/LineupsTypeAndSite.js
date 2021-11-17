import ShieldIcon from 'components/icon/ShieldIcon'
import SwordIcon from 'components/icon/SwordIcon'

const LineupsTypeAndSite = ({ type, site, black }) => {
  if (!type && !site) return null

  return (
    <div
      className={`flex items-center space-x-1 bg-black ${
        black ? '' : 'bg-opacity-40'
      } w-max py-1 px-2 rounded-md`}
    >
      {type && <LineupTypeIcon type={type} />}
      {site && <p className='font-black text-white text-sm'>{site.toUpperCase()}</p>}
    </div>
  )
}

export default LineupsTypeAndSite

const LineupTypeIcon = ({ type }) => {
  const className = 'text-white w-4 h-4'
  if (type === 'attacking') return <SwordIcon className={className} />
  if (type === 'defending') return <ShieldIcon className={className} />
}
