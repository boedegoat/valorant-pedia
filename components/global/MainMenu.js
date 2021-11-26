import { HomeIcon, ViewGridIcon, SparklesIcon } from '@heroicons/react/outline'
import {
  HomeIcon as HomeIconSolid,
  ViewGridIcon as ViewGridIconSolid,
  SparklesIcon as SparklesIconSolid,
} from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react'
import Link from './Link'
import Wrapper from './Wrapper'
import { useRouter } from 'next/router'
import useToggle from 'hooks/useToggle'
import { useSession } from 'next-auth/client'
import SignInAlert from './SignInAlert'

const MainMenu = () => {
  return (
    <Fragment>
      <div className='pb-20'></div>
      <nav className='fixed z-40 bottom-0 left-0 right-0 h-[58px] bg-gray-50 border-t-2'>
        <Wrapper className='flex h-full items-center'>
          <MenuLink Icon={HomeIcon} ActiveIcon={HomeIconSolid} href='/'>
            Agents
          </MenuLink>
          <MenuLink Icon={SparklesIcon} ActiveIcon={SparklesIconSolid} href='/weapons'>
            Weapons
          </MenuLink>
          <MenuLink
            Icon={ViewGridIcon}
            ActiveIcon={ViewGridIconSolid}
            href='/playlist'
            authRequired
          >
            Playlist
          </MenuLink>
        </Wrapper>
      </nav>
    </Fragment>
  )
}

export default MainMenu

const MenuLink = ({ href, Icon, ActiveIcon, children, authRequired }) => {
  const router = useRouter()
  const [active, setActive] = useState(false)
  const [session] = useSession()
  const [signInAlert, toggleSignInAlert] = useToggle(false)

  const className = `flex-grow flex flex-col items-center justify-center ${
    active ? 'text-gray-900' : 'text-gray-400'
  }`

  const LinkComponent =
    !authRequired || session ? (
      <Link className={className} href={href}>
        {active ? <ActiveIcon className='h-7 w-7' /> : <Icon className='h-7 w-7' />}
        <p className='text-[11px] font-semibold text-current'>{children}</p>
      </Link>
    ) : (
      <button className={className} onClick={toggleSignInAlert}>
        <ViewGridIcon className='h-7 w-7' />
        <p className='text-[11px] font-semibold text-current'>{children}</p>

        <SignInAlert
          description={`Get your account now to access ${children} page`}
          open={signInAlert}
          onClose={toggleSignInAlert}
        />
      </button>
    )

  useEffect(() => {
    if (router.pathname === href) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [router.pathname])

  return LinkComponent
}
