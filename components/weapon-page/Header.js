import Image from 'next/image'

export default function Header({ weapon }) {
  const penetrationLv = weapon.weaponStats?.wallPenetration.replace(
    'EWallPenetrationDisplayType::',
    ''
  )

  return (
    <header>
      <div className='relative h-[200px]'>
        {/* weapon image */}
        <Image src={weapon.displayIcon} layout='fill' objectFit='contain' />
        <span className='bg-green-400 text-white font-bold px-2 py-1 rounded-md shadow-md absolute bottom-4 left-0 uppercase'>
          $ {weapon.shopData?.cost ?? 'free'}
        </span>
      </div>

      {/* weapon category */}
      <h3 className='text-fuchsia-500 text-xs font-extrabold uppercase tracking-wider'>
        {weapon.shopData?.category ?? 'Melee'}
      </h3>

      {/* weapon main info */}
      <div className='flex items-center space-x-4'>
        {/* weapon name */}
        <h1 className='font-extrabold text-4xl'>{weapon.displayName}</h1>
        {/* magazine size */}
        <span className='border px-2 py-1 font-bold text-gray-600 text-sm rounded-md'>
          ⚡ {weapon.weaponStats?.magazineSize ?? 'N/A'}
        </span>
        {/* penetration level */}
        <span className='border px-2 py-1 font-bold text-gray-600 text-sm rounded-md'>
          🔪 {penetrationLv ?? 'N/A'}
        </span>
      </div>
    </header>
  )
}
