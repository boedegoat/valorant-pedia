import Link from 'components/global/Link'
import Image from 'next/image'

export default function SelectWeapon({ weapon }) {
  return (
    <Link
      href={`/weapons/${weapon.displayName.toLowerCase()}`}
      className='relative rounded-[10px] shadow-lg border overflow-hidden'
      style={{
        // make 9/16 aspect ratio
        paddingBottom: 'calc((16/9) * 100%)',
      }}
    >
      <Image
        src={weapon.displayIcon}
        layout='fill'
        objectFit='contain'
        className='rotate-45 -translate-y-3'
      />

      {/* bottom part */}
      <div className='absolute bottom-0 w-full h-[75px] px-2 flex flex-col justify-center'>
        {/* weapon category label */}
        <div className='bg-black max-w-max px-2 py-1 rounded-md'>
          <h3 className='text-white text-xs font-bold'>
            {weapon.shopData?.category ?? 'Melee'}
          </h3>
        </div>

        {/* weapon name */}
        <div className='bg-white max-w-max rounded-[10px] py-1'>
          <h2 className='font-roboto font-bold text-2xl'>{weapon.displayName}</h2>
        </div>
      </div>
    </Link>
  )
}
