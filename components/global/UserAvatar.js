import Image from 'next/image'

const UserAvatar = ({ src }) => {
  return (
    <div className={`relative w-[30px] h-[30px] rounded-full bg-gray-200`}>
      {src && <Image src={src} layout='fill' className='rounded-full' />}
    </div>
  )
}

export default UserAvatar
