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

const MainMenu = () => {
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
          <MenuLink Icon={ViewGridIcon} ActiveIcon={ViewGridIconSolid} href='/playlist'>
            Playlist
          </MenuLink>
        </Wrapper>
      </nav>
    </Fragment>
  )
}

export default MainMenu

const MenuLink = ({ href, Icon, ActiveIcon, children }) => {
  const router = useRouter()
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (router.pathname === href) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [router.pathname])

  return (
    <Link
      className={`flex-grow flex flex-col items-center justify-center ${
        active ? 'text-gray-900' : 'text-gray-400'
      }`}
      href={href}
    >
      {active ? <ActiveIcon className='h-7 w-7' /> : <Icon className='h-7 w-7' />}
      <p className='text-[11px] font-semibold text-current'>{children}</p>
    </Link>
  )
}
