import Image from 'next/image'
import { useAgentPageContext } from './AgentPageLayout'
import { useSession } from 'next-auth/client'
import SelectLineup from './SelectLineup'
import { useAppContext } from 'context/appContext'

const LineupsList = ({ lineups, lineupsLoading }) => {
  const { maps } = useAgentPageContext()
  const [session] = useSession()

  if (lineupsLoading) {
    return new Array(10).fill().map((_, index) => <LoadingComponent key={index} />)
  }

  // if lineups not available
  if (!lineups.length && !lineupsLoading) {
    return <NotAvailableComponent />
  }

  return lineups?.map((lineup) => (
    <SelectLineup
      lineup={lineup}
      maps={maps}
      user={session?.user}
      key={lineup.id}
      back={`${lineup.agent}?tab=lineups`}
    />
  ))
}

export default LineupsList

const LoadingComponent = () => {
  return (
    <div
      className='group animate-pulse relative bg-gray-200 drop-shadow-md hover:drop-shadow-lg rounded-md border-2'
      style={{
        // make 9/16 aspect ratio
        paddingBottom: 'calc((16/9) * 100%)',
      }}
    >
      <div className='absolute inset-0 p-3 flex flex-col'>
        <div className='h-[12%] bg-gray-300 rounded-sm' />
        <div className='mt-auto h-[50%] space-y-2'>
          <div className='h-[23%] w-[30%] bg-gray-300 rounded-sm'></div>
          <div className='h-[23%] w-[80%] bg-gray-300 rounded-sm'></div>
          <div className='h-[18%] w-[70%] bg-gray-300 rounded-sm'></div>
          <div className='h-[14%] w-[60%] bg-gray-300 rounded-sm'></div>
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
