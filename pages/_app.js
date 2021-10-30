import '../style.css'
import { Provider as NextAuthProvider } from 'next-auth/client'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import AppProvider from '../context/appContext'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    nProgress.configure({ showSpinner: false })

    function handleStart() {
      nProgress.start()
    }

    function handleStop() {
      nProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <NextAuthProvider session={pageProps.session}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </NextAuthProvider>
  )
}

export default MyApp
