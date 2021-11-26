import {
  ArrowNarrowLeftIcon,
  PlusSmIcon,
  HeartIcon,
  ShareIcon,
  ViewGridAddIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import LineupsTypeAndSite from 'components/agent-page/LineupsTypeAndSite'
import {
  appendArray,
  createTimestamp,
  db,
  increment,
  popArray,
} from 'lib/firebase-client'
import { delay, toTitleCase } from 'lib/utils'
import { useSession } from 'next-auth/client'
import SignInAlert from 'components/global/SignInAlert'
import useToggle from 'hooks/useToggle'
import Link from 'components/global/Link'
import Head from 'next/head'
import Alert from 'components/global/Alert'
import useDocumentDataWithId from 'hooks/useDocumentDataWithId'
import useCollectionDataWithId from 'hooks/useCollectionDataWithId'
import { useState } from 'react'
import Layout from 'components/global/Layout'

const WatchLineup = ({ lineup: lineupServer }) => {
  const router = useRouter()
  const [signInAlert, toggleSignInAlert] = useToggle(false)
  const [signInAlertDescription, setSignInAlertDescription] = useState('')
  const [showPlaylist, toggleShowPlaylist] = useToggle(false)
  const [showCreatePlaylist, toggleShowCreatePlaylist] = useToggle(false)
  const [playlistName, setPlaylistName] = useState('')
  const [session, sessionLoading] = useSession()

  const [lineupClient] = useDocumentDataWithId(
    db.collection('lineups').doc(router.query.lineupId)
  )
  const [playlists] = useCollectionDataWithId(
    sessionLoading || !session
      ? null
      : db.collection('playlists').where('createdBy', '==', session?.user.email)
  )

  const lineup = lineupClient || lineupServer

  const isUserFavorite = lineup.favorites.includes(session?.user.email)

  async function addToFavorites() {
    if (!session) {
      setSignInAlertDescription(
        `Get your free account now to favorite ${toTitleCase(lineup.title)} lineup`
      )
      return toggleSignInAlert(true)
    }

    const lineupDocRef = db.collection('lineups').doc(lineup.id)
    const userEmail = session.user.email

    if (isUserFavorite) {
      await lineupDocRef.set({ favorites: popArray(userEmail) }, { merge: true })
      return
    }

    await lineupDocRef.set({ favorites: appendArray(userEmail) }, { merge: true })
  }

  function copyURLToClipboard() {
    navigator.clipboard.writeText(`https://valpedia.vercel.app/watch/${lineup.id}`)
    alert('link coppied to your clipboard')
  }

  async function createPlaylist() {
    if (!playlistName) {
      return alert('playlist name can not be empty')
    }
    const playlistRef = db.collection('playlists')
    const lineupDocRef = db.collection('lineups').doc(lineup.id)

    // add new doc to playlists collection
    const playlistDoc = await playlistRef.add({
      createdAt: createTimestamp(),
      createdBy: session.user.email,
      title: playlistName,
      description: '',
      length: 1,
    })

    // add playlist id to lineup doc
    await lineupDocRef.set(
      {
        playlists: appendArray(playlistDoc.id),
      },
      { merge: true }
    )

    toggleShowCreatePlaylist(false)
    await delay(250)
    setPlaylistName('')
  }

  async function handleAddRemovePlaylist(e, playlistId) {
    const playlistDocRef = db.collection('playlists').doc(playlistId)
    const lineupDocRef = db.collection('lineups').doc(lineup.id)
    const lineupInPlaylist = (await lineupDocRef.get())
      .data()
      .playlists.includes(playlistId)
    if (lineupInPlaylist) {
      await lineupDocRef.set({ playlists: popArray(playlistId) }, { merge: true })
      await playlistDocRef.set({ length: increment(-1) }, { merge: true })
    } else {
      await lineupDocRef.set({ playlists: appendArray(playlistId) }, { merge: true })
      await playlistDocRef.set({ length: increment(1) }, { merge: true })
    }
  }

  return (
    <Layout hideNavbar hideMainMenu title={lineup.title}>
      {/* top */}
      <div className='fixed z-10 top-2 left-2 w-max flex items-center bg-black bg-opacity-70 backdrop-blur-sm rounded-md'>
        <Link
          href={`/${router.query.back || ''}`}
          className='flex items-center font-bold text-white px-3 py-2'
        >
          <ArrowNarrowLeftIcon className='watchLineup-icon mr-1 -ml-1' /> Back
        </Link>
      </div>

      <video
        src={lineup.videoURL}
        muted
        controls
        autoPlay
        loop
        className='w-full max-w-sm'
      />

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
          <button
            className='text-gray-500'
            onClick={() => {
              if (session) {
                return toggleShowPlaylist(true)
              }
              setSignInAlertDescription(
                `Get your free account to save ${toTitleCase(
                  lineup.title
                )} to your playlist`
              )
              toggleSignInAlert(true)
            }}
          >
            <ViewGridAddIcon className='watchLineup-icon' />
          </button>
        </div>

        {/* choose playlists */}
        <Alert
          open={showPlaylist}
          onClose={toggleShowPlaylist}
          className='space-y-2 divide-y'
        >
          <Alert.Title as='h3' className='text-xl font-bold leading-6 text-gray-900'>
            Save to...
          </Alert.Title>

          {/* playlists list */}
          <ul className='pt-2 space-y-1'>
            {playlists?.length ? (
              playlists?.map((playlist) => (
                <li
                  key={playlist.id}
                  className='flex items-center space-x-3 py-2 text-lg'
                >
                  <input
                    type='checkbox'
                    className='rounded-md text-fuchsia-500 focus:ring-2 focus:ring-fuchsia-300 border-gray-300'
                    checked={lineup.playlists.includes(playlist.id)}
                    onChange={(e) => handleAddRemovePlaylist(e, playlist.id)}
                  />
                  <p>{playlist.title}</p>
                </li>
              ))
            ) : (
              <li className='py-2'>
                <p>😢 You don't have any playlist yet</p>
              </li>
            )}
          </ul>

          <button
            type='button'
            className='alert-main-button'
            onClick={async () => {
              toggleShowPlaylist(false)
              await delay(250)
              toggleShowCreatePlaylist(true)
            }}
          >
            <PlusSmIcon className='w-5 h-5 mr-2' /> Create New Playlist
          </button>
        </Alert>

        {/* create new playlist */}
        <Alert
          open={showCreatePlaylist}
          onClose={toggleShowCreatePlaylist}
          className='space-y-4'
        >
          <input
            type='text'
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className='w-full rounded-md border-gray-300 focus:border-fuchsia-400 focus:ring-fuchsia-400'
            placeholder='playlist name'
          />
          <button type='button' className='alert-main-button' onClick={createPlaylist}>
            Create
          </button>
        </Alert>

        <SignInAlert
          open={signInAlert}
          onClose={toggleSignInAlert}
          description={signInAlertDescription}
        />
      </div>
    </Layout>
  )
}

export default WatchLineup

export async function getStaticPaths() {
  const lineupsSnapshot = await db.collection('lineups').get()
  const paths = lineupsSnapshot.docs.map((lineup) => ({
    params: { lineupId: lineup.id },
  }))

  return {
    paths,
    // getStaticPaths() dan property fallback: true or 'blocking'
    // dipake buat ngasih tau next js paths apa aja yang ada di page ini

    // Kenapa kita harus ngasih tau dulu ?

    // karena disini kita mau bikin Static Page, simplenya page yg html nya
    // akan digenerate duluan pada saat build time
    // yg kemudian html-html tersebut akan disimpen di server buat dipake ulang di productionnya
    // jadi di productionnya, user yg mengunjungi Static Page akan pindah halaman dengan instan
    // tanpa harus loading terlebih dahulu karena html nya udah dibikin duluan

    // Kalo begitu, fallback: true or 'blocking' buat apa ?

    // berbeda dengan fallback: false, dimana path baru akan mendarat di 404 page
    // jika kita pake fallback: true or 'blocking'
    // kedepannya, kalo ada path baru yg next js belom tau
    // next js gak langsung ngoper user ke 404 page
    // instead, dibelakang layar, next js bakal ngerun getStaticProps lagi
    // pada saat itulah, user yg mengunjungi path terbaru harus menunggu dulu
    // sampai getStaticPropsnya selesai dirun, sehingga page ini akan bersifat seperti SSR

    // nah setelah getStaticPropsnya udh selesai dirun,
    // JIKA SUKSES : page ini akan balik lagi ke Static Page, karena next js sudah generate html buat path terbaru ke dalam folder staticnya
    // JIKA GAGAL (path baru tidak ada dalam data, dll...) : anda bisa redirect user ke 404 page dengan cara `return { notFound: true }`

    // lalu apa bedanya fallback true dan 'blocking' ?

    // 'blocking' => user yg mengunjungi path baru belom bisa langsung pindah ke page barunya sampai getStaticPropsnya selesai dirun. Ini sangat mirip dengan SSR

    //  true => user yg mengunjungi path baru bisa langsung pindah ke page barunya tanpa harus menunggu getStaticProps selesai dirun, TETAPI page baru itu belom ada propsnya (karena getStaticPropsnya masih dirun), baru deh kalo udah selesai dirun pagenya akan diisi dengan propsnya.

    // nah, page yg belom ada propsnya itu sedang ada dalam mode 'fallback page'.Anda bisa akses property dari router.isFallback pake `useRouter()` hook buat ngecek apakah page anda sedang dalam mode 'fallback page'...

    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const { lineupId } = context.params
  const lineupSnapshot = await db.collection('lineups').doc(lineupId).get()

  if (!lineupSnapshot.exists) {
    return { notFound: true }
  }

  console.log(`generating page /watch/${lineupId}`)

  const lineup = { id: lineupSnapshot.id, ...lineupSnapshot.data() }

  return {
    props: { lineup },
    revalidate: 60,
  }
}
