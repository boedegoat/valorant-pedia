import { useRouter } from 'next/router'
import Link from '../global/Link'
import Image from 'next/image'

export default function Skin({ weaponSkin }) {
  const router = useRouter()
  return (
    <Link
      href={`${router.asPath}/${weaponSkin.uuid}`}
      className='relative rounded-[10px] shadow-lg border overflow-hidden'
      style={{
        // make 9/16 aspect ratio
        paddingBottom: 'calc((16/9) * 100%)',
      }}
    >
      {/* skin image */}
      {weaponSkin.displayIcon && (
        <Image
          src={weaponSkin.displayIcon}
          layout='fill'
          objectFit='contain'
          className='rotate-45 scale-110'
        />
      )}

      <div className='absolute left-0 right-0 bottom-0 top-1/2 p-3 bg-opacity- flex flex-col'>
        {/* skin name */}
        <div className='mt-auto'>
          <h1 className='font-bold text-base'>{weaponSkin.displayName}</h1>
        </div>
      </div>
    </Link>
  )
}
