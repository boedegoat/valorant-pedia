import { Fragment } from 'react'
import TopNavbar from './TopNavbar'
import Head from 'next/head'

const Layout = ({ children, title, description }) => {
  return (
    <Fragment>
      <Head>
        <title>{title || window.location.href}</title>
        {description && <meta name='description' content={description} />}
      </Head>
      <TopNavbar />
      {children}
    </Fragment>
  )
}

export default Layout
