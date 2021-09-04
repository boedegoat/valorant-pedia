import '../style.css'
import TopNavbar from '../components/TopNavbar'
import { Fragment } from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <TopNavbar />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
