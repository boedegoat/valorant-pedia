import { ArrowNarrowLeftIcon } from '@heroicons/react/outline'
import { HeartIcon, ShareIcon, ViewGridIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import LineupsTypeAndSite from '../../components/agent-page/LineupsTypeAndSite'
import { appendArray, db, popArray } from '../../lib/firebase-client'
import { toTitleCase } from '../../lib/utils'
import { getSession } from 'next-auth/client'
import useDocumentDataWithId from '../../hooks/useDocumentDataWithId'

const WatchLineup = ({ lineup: lineupServer, user }) => {
  const router = useRouter()

  const [lineupClient, loading] = useDocumentDataWithId(
    db.collection('lineups').doc(router.query.lineupId)
  )

  const lineup = lineupClient || lineupServer
  console.log(lineup, user)

  if (!lineup && !loading) return <div>404 not found</div>

  const isUserFavorite = lineup.favorites.includes(user?.email)

  async function addToFavorites() {
    if (!user) return alert('you are not logged in yet')

    if (isUserFavorite) {
      await db
        .collection('lineups')
        .doc(lineup.id)
        .set({ favorites: popArray(user.email) }, { merge: true })
      return
    }

    await db
      .collection('lineups')
      .doc(lineup.id)
      .set({ favorites: appendArray(user.email) }, { merge: true })
  }

  return (
    <div className=''>
      {/* top */}
      <div className='fixed z-10 top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-900 to-transparent  p-2'>
        <button onClick={router.back} className='flex items-center font-bold text-white'>
          <ArrowNarrowLeftIcon className='watchLineup-icon mr-1' /> Back
        </button>
      </div>

      <video src={lineup.videoURL} controls autoPlay loop className='w-full max-w-sm' />
      <div className='p-4 space-y-2 flex flex-col'>
        <LineupsTypeAndSite type={lineup.type} site={lineup.site} black />
        <h1 className='font-bold text-2xl'>{toTitleCase(lineup.title)}</h1>
        <hr />
        <div className='flex space-x-2'>
          <button className='flex items-center text-heart' onClick={addToFavorites}>
            {isUserFavorite ? (
              <HeartIconSolid className='watchLineup-icon' />
            ) : (
              <HeartIcon className='watchLineup-icon' />
            )}
            <span className='text-current font-medium ml-1'>
              {lineup.favorites.length}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WatchLineup

export async function getServerSideProps(context) {
  const lineupId = context.query.lineupId
  const lineupSnapshot = await db.collection('lineups').doc(lineupId).get()
  const lineup = lineupSnapshot.data()

  const session = await getSession(context)

  return {
    props: {
      lineup,
      user: session?.user || null,
    },
  }
}
