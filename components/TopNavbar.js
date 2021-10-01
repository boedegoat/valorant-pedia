import { ArrowNarrowLeftIcon, MoonIcon } from '@heroicons/react/outline'
import Wrapper from '../components/Wrapper'
import UserAvatar from './UserAvatar'
import Link from './Link'
import { Fragment } from 'react'
import useUser from '../hooks/useUser'

const TopNavbar = ({ back }) => {
  const [user, loading] = useUser()

  const BackComponent = () => {
    switch (typeof back) {
      case 'string':
        return (
          <Link href={back} className='flex items-center font-bold'>
            <ArrowNarrowLeftIcon className='h-5 w-5 text-gray-800 mr-1' /> Back
          </Link>
        )
      case 'function':
        return (
          <button onClick={back} className='flex items-center font-bold'>
            <ArrowNarrowLeftIcon className='h-5 w-5 text-gray-800 mr-1' /> Back
          </button>
        )
      default:
        return null
    }
  }

  return (
    <nav className='py-5'>
      <Wrapper className='flex justify-between'>
        <BackComponent />
        {!back && (
          <Fragment>
            {loading ? (
              <div className='w-[30px] h-[30px] rounded-full bg-gray-200 animate-pulse'></div>
            ) : (
              <Fragment>
                {user && (
                  <Link href='/profile'>
                    <UserAvatar src={user.image} />
                  </Link>
                )}
                {!user && (
                  <Link
                    href='/signin'
                    className='bg-fuchsia-500 px-3 py-1 text-white rounded-md font-bold'
                  >
                    Sign In
                  </Link>
                )}
              </Fragment>
            )}
          </Fragment>
        )}

        <button>
          <MoonIcon className='w-6 h-6 text-gray-500' />
        </button>
      </Wrapper>
    </nav>
  )
}

export default TopNavbar
