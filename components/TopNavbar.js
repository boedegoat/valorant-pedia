import { ArrowNarrowLeftIcon, MoonIcon } from '@heroicons/react/outline'
import Wrapper from '../components/Wrapper'
import UserAvatar from './UserAvatar'
import { useSession } from 'next-auth/client'
import Link from './Link'
import { Fragment } from 'react'

const TopNavbar = ({ back }) => {
  const [session, sessionLoading] = useSession()

  return (
    <nav className='py-5'>
      <Wrapper className='flex justify-between'>
        {back && (
          <Link href={back} className='flex items-center font-bold'>
            <ArrowNarrowLeftIcon className='h-5 w-5 text-gray-800 mr-1' /> Back
          </Link>
        )}
        {!back && (
          <Fragment>
            {sessionLoading ? (
              <div className='w-[30px] h-[30px] rounded-full bg-gray-200 animate-pulse'></div>
            ) : (
              <Fragment>
                {session && (
                  <Link href='/profile'>
                    <UserAvatar src={session.user.image} />
                  </Link>
                )}
                {!session && (
                  <Link
                    href='/signin'
                    className='bg-fuchsia-500 px-3 py-1 text-white rounded-md font-bold'
                  >
                    Signin
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
