import Image from 'next/image'
import { useAgentPageContext } from './AgentPageLayout'
import { useSession } from 'next-auth/client'
import SelectLineup from './SelectLineup'
import { useAppContext } from '../../context/appContext'

const LineupsList = ({ lineups, lineupsLoading }) => {
  const { maps } = useAgentPageContext()
  const [session] = useSession()

  if (lineupsLoading) {
    return new Array(6).fill(0).map((_, index) => <LoadingComponent key={index} />)
  }

  // if lineups not available
  if (!lineups.length && !lineupsLoading) {
    return <NotAvailableComponent />
  }

  return (
    !lineupsLoading &&
    lineups.map((lineup) => (
      <SelectLineup
        lineup={lineup}
        maps={maps}
        user={session?.user}
        key={lineup.id}
        back={`${lineup.agent}?tab=lineups`}
      />
    ))
  )
}

export default LineupsList

const LoadingComponent = () => {
  return (
    <div
      className='relative bg-gray-300 animate-pulse rounded-md overflow-hidden '
      style={{
        // make 9/16 aspect ratio
        paddingBottom: 'calc((16/9) * 100%)',
      }}
    >
      <div className='absolute p-3 space-y-2 inset-0'>
        <div className='h-5 bg-gray-400 bg-opacity-50 w-1/4 rounded-md'></div>
        <div className='h-8 bg-gray-400 bg-opacity-90 w-3/4 rounded-md'></div>
        <div className='flex space-x-2'>
          <div className='h-2 bg-gray-400 bg-opacity-50 w-1/4 rounded-md'></div>
          <div className='h-2 bg-gray-400 bg-opacity-25 w-1/12 rounded-md'></div>
        </div>
      </div>
    </div>
  )
}

const NotAvailableComponent = () => {
  const [_, dispatch] = useAppContext()

  return (
    <div className='space-y-4 pb-10 col-span-2'>
      <div className='relative h-[19rem]'>
        <Image src='/video-not-exist.svg' layout='fill' objectFit='contain' />
      </div>
      <h1 className='font-bold text-2xl text-gray-900'>
        Seems like there are no lineups with this filter
      </h1>
      <button
        className='bg-fuchsia-500 text-white font-semibold px-3 py-2 rounded-md'
        onClick={() => dispatch({ type: 'RESET_FILTER_LINEUPS' })}
      >
        Reset Filter
      </button>
    </div>
  )
}
