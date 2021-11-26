import { Fragment } from 'react'
import TopNavbar from './TopNavbar'
import Head from 'next/head'
import MainMenu from './MainMenu'

const Layout = ({ children, title, back, hideMainMenu, homePage, hideNavbar }) => {
  return (
    <Fragment>
      <Head>
        <title>
          {homePage
            ? 'Valpedia - ✨ Usefull and Easy to Use Valorant Wikipedia'
            : `${title || 'Untitled'} - Valpedia`}
        </title>
        <meta
          name='description'
          content='Valpedia is an unofficial valorant wikipedia that can help you to compete this game. Explore agents lineups and weapons stats with ability to like and save them into your custom playlist.'
        />
      </Head>
      {!hideNavbar && <TopNavbar back={back} />}
      {children}
      {!hideMainMenu && <MainMenu />}
    </Fragment>
  )
}

export default Layout
