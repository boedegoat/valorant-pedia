import { ArrowNarrowLeftIcon } from '@heroicons/react/outline'
import { HeartIcon, ShareIcon, ViewGridAddIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import LineupsTypeAndSite from '../../components/agent-page/LineupsTypeAndSite'
import { appendArray, db, popArray } from '../../lib/firebase-client'
import { toTitleCase } from '../../lib/utils'
import { getSession } from 'next-auth/client'
import useDocumentDataWithId from '../../hooks/useDocumentDataWithId'
import SignInAlert from '../../components/SignInAlert'
import useToggle from '../../hooks/useToggle'
import Link from '../../components/Link'

const WatchLineup = ({ lineup: lineupServer, user }) => {
  const router = useRouter()
  const [signInAlert, toggleSignInAlert] = useToggle(false)

  // prettier-ignore
  const [lineupClient, loading] = useDocumentDataWithId(
    db
      .collection('lineups')
      .doc(router.query.lineupId)
  )

  const lineup = lineupClient || lineupServer

  if (!lineup && !loading) return <div>404 not found</div>

  const isUserFavorite = lineup.favorites.includes(user?.email)

  async function addToFavorites() {
    if (!user) return toggleSignInAlert(true)

    const lineupDocRef = db.collection('lineups').doc(lineup.id)

    if (isUserFavorite) {
      await lineupDocRef.set({ favorites: popArray(user.email) }, { merge: true })
      return
    }

    await lineupDocRef.set({ favorites: appendArray(user.email) }, { merge: true })
  }

  function copyURLToClipboard() {
    navigator.clipboard.writeText(`https://valpedia.vercel.app/watch/${lineup.id}`)
    alert('link coppied to your clipboard')
  }

  return (
    <>
      {/* top */}
      <div className='fixed z-10 top-2 left-2 w-max flex items-center bg-black bg-opacity-70 backdrop-blur-sm rounded-md'>
        <Link
          href={`/${router.query.back || ''}`}
          className='flex items-center font-bold text-white px-3 py-2'
        >
          <ArrowNarrowLeftIcon className='watchLineup-icon mr-1 -ml-1' /> Back
        </Link>
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

        <SignInAlert
          open={signInAlert}
          onClose={toggleSignInAlert}
          description={`Get your account now to favorite ${toTitleCase(
            lineup.title
          )} lineup`}
        />
      </div>
    </>
  )
}

export default WatchLineup

export async function getServerSideProps(context) {
  const lineupId = context.query.lineupId
  const lineupSnapshot = await db.collection('lineups').doc(lineupId).get()
  const lineup = lineupSnapshot.data()

  if (!lineup) {
    return {
      notFound: true,
    }
  }

  const session = await getSession(context)

  return {
    props: {
      lineup,
      user: session?.user || null,
    },
  }
}
