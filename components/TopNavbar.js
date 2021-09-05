import { MoonIcon } from '@heroicons/react/outline'
import Wrapper from '../components/Wrapper'
import UserAvatar from './UserAvatar'
import { useSession } from 'next-auth/client'

const TopNavbar = () => {
  const [session] = useSession()

  return (
    <nav className='py-5'>
      <Wrapper className='flex justify-between'>
        <Wrapper.Link href='/profile'>
          <UserAvatar src={session?.user.image} />
        </Wrapper.Link>
        <button>
          <MoonIcon className='w-6 h-6 text-gray-500' />
        </button>
      </Wrapper>
    </nav>
  )
}

export default TopNavbar
