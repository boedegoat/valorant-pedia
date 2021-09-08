import '../style.css'
import { Provider } from 'next-auth/client'
import GlobalContextProvider from '../ContextProvider'
import { globalState, globalReducer } from '../store/global'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <GlobalContextProvider initValue={globalState} reducer={globalReducer}>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </Provider>
  )
}

export default MyApp
