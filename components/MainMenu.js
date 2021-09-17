import { ViewGridIcon, HomeIcon } from '@heroicons/react/outline'
import {
  ViewGridIcon as ViewGridIconSolid,
  HomeIcon as HomeIconSolid,
} from '@heroicons/react/solid'
import { Fragment } from 'react'
import Link from '../components/Link'

const MainMenu = () => {
  return (
    <Fragment>
      <div className='pb-20'></div>
      <nav className='fixed z-50 bottom-0 left-0 w-full h-[60px] bg-black rounded-t-xl'>
        <div className='h-full px-2 flex justify-between items-center'>
          <Link className='flex-grow flex justify-center py-2 rounded-xl' href='/'>
            <HomeIconSolid className='text-white h-7 w-7' />
          </Link>
          <button className='flex-grow flex justify-center py-1 rounded-xl'>
            <ViewGridIcon className='text-white h-7 w-7' />
          </button>
        </div>
      </nav>
    </Fragment>
  )
}

export default MainMenu
