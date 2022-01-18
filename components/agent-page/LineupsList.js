import Image from 'next/image'
import { useAgentPageContext } from './AgentPageLayout'
import { useSession } from 'next-auth/client'
import SelectLineup from './SelectLineup'
import { useAppContext } from 'context/appContext'
import LazyList from 'components/global/LazyList'
import { getCollection, parseCollectionWithId } from 'lib/utils'
import Spinner from 'components/global/Spinner'
import { useEffect, useRef } from 'react'

const LineupsList = ({ lineups, lineupsLoading }) => {
  const { maps } = useAgentPageContext()
  const [session] = useSession()
  const [
    {
      lineupsState: { filter },
    },
  ] = useAppContext()
  let lastLineup = useRef(null)

  useEffect(() => {
    if (!lineupsLoading) {
      lastLineup.current = lineups.docs[lineups.docs.length - 1]
    }
  }, [lineupsLoading])

  if (lineupsLoading) return <LoadingComponent />

  const lineupsData = parseCollectionWithId(lineups)

  // if lineups not available
  if (!lineupsData.length && !lineupsLoading) {
    return <NotAvailableComponent />
  }

  return (
    <LazyList
      className='grid grid-cols-2 gap-2 scrollbar-hide'
      data={lineupsData.filter(lineup => lineup.videoURL && lineup.thumbnailURL)}
      loader={<LoadingComponent />}
      onLoadMore={async (setCurrentLineups, setHasMore) => {
        const nextLineups = await getCollection(filter.query?.startAfter(lastLineup.current))
        if (nextLineups.empty) {
          setHasMore(false)
          return
        }

        const nextLastLineup = nextLineups.docs[nextLineups.docs.length - 1]

        lastLineup.current = nextLastLineup
        setCurrentLineups(cl => [...cl, ...parseCollectionWithId(nextLineups)])
      }}
      item={lineup => (
        <SelectLineup
          lineup={lineup}
          maps={maps}
          user={session?.user}
          key={lineup.id}
          back={`${lineup.agent}?tab=lineups`}
        />
      )}
    />
  )
}

export default LineupsList

const LoadingComponent = () => {
  return (
    <div className='flex items-center justify-center space-x-2 mt-4 overflow-hidden'>
      <Spinner /> <span className='font-medium text-gray-400'>Loading...</span>
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
