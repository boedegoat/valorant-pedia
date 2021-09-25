import Wrapper from '../Wrapper'
import { HeartIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Tooltip from '../../components/Tooltip'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const AgentHeader = ({ agent, headerRef }) => {
  const [session] = useSession()
  const router = useRouter()

  function addToFavorite() {
    if (!session) {
      const signInConfirmation = confirm(
        'You need to Sign In first in order to favorite this agent. Would you like to Sign In now ?'
      )
      if (signInConfirmation) router.push('/signin')
      return
    }

    // TODO :
    // 1. update agent docs to store favorited user by email, e.g [a@b.com, c@d.com,...]
    // 2. check if user already favorite, then remove from list
    // 3. get favorite array length to make realtime favorite count
    // 4. change alert to custom toast alert
    alert(`added ${agent.displayName} to your favorite (tapi boong..., belom jadi bro)`)
  }

  return (
    <header ref={headerRef}>
      <Wrapper className='relative'>
        {/* agent image */}
        <div className='relative h-[343px]'>
          <Image src={agent.bustPortrait} layout='fill' objectFit='cover' />
        </div>

        {/* agent name description */}
        <div className='relative -mt-40'>
          {/* shadow */}
          <div className='absolute inset-0 bg-gray-300 filter blur-sm rounded-lg'></div>

          {/* content */}
          <div className='relative bg-white p-4 rounded-lg'>
            {/* agent role label */}
            <div className='bg-black max-w-max px-2 py-1 rounded-md absolute -translate-y-12'>
              <h3 className='text-white text-xs font-bold'>{agent.role.displayName}</h3>
            </div>

            <div className='space-y-2'>
              {/* agent name and role icon */}
              <div className='flex items-center justify-between'>
                <h1 className='font-roboto font-black text-4xl'>{agent.displayName}</h1>
                <Image
                  src={agent.role.displayIcon}
                  width={27}
                  height={27}
                  layout='fixed'
                  className='filter invert brightness-50'
                />
              </div>

              <p className='text-xs'>{agent.description}</p>

              {/* bottom menu */}
              <div className='flex justify-end'>
                {/* add to favorite button */}

                <Tooltip content='favorite this'>
                  <button
                    className='flex items-center space-x-1 text-gray-400 px-2 py-1'
                    onClick={addToFavorite}
                  >
                    <HeartIcon className='w-6 h-6' />
                    <span className='text-xs font-medium text-fuchsia-400'>180</span>
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </header>
  )
}

export default AgentHeader
