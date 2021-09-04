import { MoonIcon } from '@heroicons/react/outline'
import Wrapper from '../components/Wrapper'
import UserAvatar from './UserAvatar'

const TopNavbar = () => {
  return (
    <nav className='py-5'>
      <Wrapper className='flex justify-between'>
        <Wrapper.Link href='/profile'>
          <UserAvatar />
        </Wrapper.Link>
        <button>
          <MoonIcon className='w-6 h-6 text-gray-500' />
        </button>
      </Wrapper>
    </nav>
  )
}

export default TopNavbar
