import Wrapper from '../Wrapper'
import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import Image from 'next/image'
import Tooltip from '../../components/Tooltip'
import { useSession } from 'next-auth/client'
import { agentToURL } from '../../lib/agents'
import { appendArray, db, popArray } from '../../lib/firebase-client'
import SignInAlert from '../SignInAlert'
import useToggle from '../../hooks/useToggle'

const AgentHeader = ({ agent, headerRef, agentDoc }) => {
  const [session] = useSession()
  const [signInAlert, toggleSignInAlert] = useToggle(false)

  const isUserFavorite = agentDoc?.favorites.includes(session?.user.email)

  async function addToFavorite() {
    if (!session) return toggleSignInAlert(true)

    const agentDocRef = db.collection('agents').doc(agentToURL(agent.displayName))

    if (isUserFavorite) {
      await agentDocRef.set({ favorites: popArray(session?.user.email) }, { merge: true })
      return
    }

    await agentDocRef.set(
      { favorites: appendArray(session?.user.email) },
      { merge: true }
    )
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
              <div className='flex'>
                {/* add to favorite button */}

                <Tooltip content='favorite this'>
                  <button
                    className='flex items-center space-x-1 text-heart py-1'
                    onClick={addToFavorite}
                  >
                    {isUserFavorite ? (
                      <HeartIconSolid className='w-6 h-6' />
                    ) : (
                      <HeartIcon className='w-6 h-6' />
                    )}
                    <span className='text-xs font-medium text-gray-500'>
                      {agentDoc?.favorites.length}
                    </span>
                  </button>
                </Tooltip>

                <SignInAlert
                  open={signInAlert}
                  onClose={toggleSignInAlert}
                  description={`Get your account now to favorite ${agent.displayName}`}
                />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </header>
  )
}

export default AgentHeader
