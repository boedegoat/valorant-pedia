import '../style.css'
import { Provider } from 'next-auth/client'
import GlobalProvider from '../store/GlobalProvider'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </Provider>
  )
}

export default MyApp
