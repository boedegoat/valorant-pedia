import { ArrowNarrowLeftIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { db } from '../../lib/firebase-client'
import { toTitleCase } from '../../lib/utils'

const WatchLineup = ({ lineup }) => {
  const router = useRouter()
  console.log(lineup)
  if (!lineup) return <div>404 not found</div>

  return (
    <div className=''>
      <video src={lineup.videoURL} controls autoPlay loop className='w-full max-w-sm' />
      <div className='p-4 space-y-2 flex flex-col'>
        <h1 className='font-bold text-2xl'>{toTitleCase(lineup.title)}</h1>
        <button onClick={router.back} className='flex items-center font-bold'>
          <ArrowNarrowLeftIcon className='h-5 w-5 text-gray-800 mr-1' /> Back
        </button>
        <button>share</button>
        <button>add to favorites</button>
        <button>add to playlist</button>
      </div>
    </div>
  )
}

export default WatchLineup

export async function getServerSideProps(context) {
  const lineupId = context.query.id
  const lineupSnapshot = await db.collection('lineups').doc(lineupId).get()
  const lineup = lineupSnapshot.data()

  return {
    props: {
      lineup,
    },
  }
}
