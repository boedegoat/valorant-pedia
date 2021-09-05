import { Fragment } from 'react'
import TopNavbar from './TopNavbar'
import NextHead from 'next/head'

const Layout = ({ children }) => {
  return (
    <Fragment>
      <TopNavbar />
      {children}
    </Fragment>
  )
}

const Head = ({ children }) => <NextHead>{children}</NextHead>

Layout.Head = Head

export default Layout
