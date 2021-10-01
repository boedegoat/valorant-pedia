import '../style.css'
import AuthProvider from '../store/AuthProvider'
import GlobalProvider from '../store/GlobalProvider'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </GlobalProvider>
  )
}

export default MyApp
