import { HomeIcon, ViewGridIcon, SparklesIcon } from '@heroicons/react/outline'
import {
  HomeIcon as HomeIconSolid,
  ViewGridIcon as ViewGridIconSolid,
  SparklesIcon as SparklesIconSolid,
} from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react'
import Link from '../components/Link'
import Wrapper from './Wrapper'
import { useRouter } from 'next/router'
import useToggle from '../hooks/useToggle'
import { useSession } from 'next-auth/client'
import SignInAlert from './SignInAlert'

const MainMenu = () => {
  const [signInAlert, toggleSignInAlert] = useToggle(false)

  return (
    <Fragment>
      <div className='pb-20'></div>
      <nav className='fixed z-40 bottom-0 left-0 right-0 h-[58px] bg-gray-50 border-t-2'>
        <Wrapper className='flex h-full items-center'>
          <MenuLink Icon={HomeIcon} ActiveIcon={HomeIconSolid} href='/'>
            Agents
          </MenuLink>
          <MenuLink Icon={SparklesIcon} ActiveIcon={SparklesIconSolid} href='/skins'>
            Skins
          </MenuLink>
          <MenuLink
            Icon={ViewGridIcon}
            ActiveIcon={ViewGridIconSolid}
            href='/playlist'
            authRequired
            onClick={toggleSignInAlert}
          >
            Playlist
          </MenuLink>
        </Wrapper>
      </nav>

      <SignInAlert
        description='Get your account now to access the playlist page'
        callbackUrl='/playlist'
        open={signInAlert}
        onClose={toggleSignInAlert}
      />
    </Fragment>
  )
}

export default MainMenu

const MenuLink = ({ href, Icon, ActiveIcon, children, authRequired, onClick }) => {
  const router = useRouter()
  const [active, setActive] = useState(false)
  const [session] = useSession()

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
      <button className={className} onClick={onClick}>
        <ViewGridIcon className='h-7 w-7' />
        <p className='text-[11px] font-semibold text-current'>{children}</p>
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
