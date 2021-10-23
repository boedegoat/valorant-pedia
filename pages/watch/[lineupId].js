import { ArrowNarrowLeftIcon } from '@heroicons/react/outline'
import { HeartIcon, ShareIcon, ViewGridAddIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import LineupsTypeAndSite from '../../components/agent-page/LineupsTypeAndSite'
import { appendArray, db, popArray } from '../../lib/firebase-client'
import { toTitleCase } from '../../lib/utils'
import { getSession } from 'next-auth/client'
import useDocumentDataWithId from '../../hooks/useDocumentDataWithId'

const WatchLineup = ({ lineup: lineupServer, user }) => {
  const router = useRouter()

  // prettier-ignore
  const [lineupClient, loading] = useDocumentDataWithId(
    db
      .collection('lineups')
      .doc(router.query.lineupId)
  )

  const lineup = lineupClient || lineupServer

  if (!lineup && !loading) return <div>404 not found</div>

  const isUserFavorite = lineup.favorites.includes(user?.email)
  console.log(lineup, user)

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

  function copyURLToClipboard() {
    navigator.clipboard.writeText(`https://valpedia.vercel.app${router.asPath}`)
    alert('link coppied to your clipboard')
  }

  return (
    <>
      {/* top */}
      <div className='fixed z-10 top-0 h-14 left-0 w-full flex items-center bg-black bg-opacity-90 p-2'>
        <button onClick={router.back} className='flex items-center font-bold text-white'>
          <ArrowNarrowLeftIcon className='watchLineup-icon mr-1' /> Back
        </button>
      </div>

      <video src={lineup.videoURL} controls autoPlay loop className='w-full max-w-sm' />

      <div className='p-4 flex flex-col'>
        <LineupsTypeAndSite type={lineup.type} site={lineup.site} black />
        <h1 className='font-bold text-2xl mt-2'>{toTitleCase(lineup.title)}</h1>

        {/* bottom menus */}
        <div className='flex space-x-4 mt-5'>
          <button className='flex items-center text-heart' onClick={addToFavorites}>
            {isUserFavorite ? (
              <HeartIconSolid className='watchLineup-icon' />
            ) : (
              <HeartIcon className='watchLineup-icon' />
            )}
            <span className='font-bold ml-1'>{lineup.favorites.length}</span>
          </button>
          <button className='text-gray-500' onClick={copyURLToClipboard}>
            <ShareIcon className='watchLineup-icon' />
          </button>
          <button className='text-gray-500'>
            <ViewGridAddIcon className='watchLineup-icon' />
          </button>
        </div>
      </div>
    </>
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
