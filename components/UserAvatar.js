import Image from 'next/image'

const defaultProfileImg =
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'

const UserAvatar = ({ src }) => {
  return (
    <Image
      src={src || defaultProfileImg}
      width={30}
      height={30}
      layout='fixed'
      className='rounded-full'
    />
  )
}

export default UserAvatar
