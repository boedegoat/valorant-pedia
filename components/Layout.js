import { Fragment } from 'react'
import TopNavbar from './TopNavbar'
import Head from 'next/head'
import MainMenu from './MainMenu'

const Layout = ({ children, title, description, back }) => {
  return (
    <Fragment>
      <Head>
        {title && <title>{title}</title>}
        {description && <meta name='description' content={description} />}
      </Head>
      <TopNavbar back={back} />
      {children}
      <MainMenu />
    </Fragment>
  )
}

export default Layout
