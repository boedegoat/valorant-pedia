import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Wrapper from '../Wrapper'
import SearchBar from '../SearchBar'
import useSearch from '../../hooks/useSearch'
import { getSearchResults } from '../../lib/maps'
import useObserver from '../../hooks/useObserver'

const LineupsFilterModal = ({ show, onClose, maps }) => {
  const [searchMaps, setSearchMaps] = useSearch(maps, getSearchResults)
  const [lockScroll, setLockScroll] = useState(true)

  return (
    <Transition show={show} as={Fragment}>
      <Dialog as='div' onClose={onClose} className='fixed z-50 inset-0 overflow-y-auto'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 translate-y-10'
          enterTo='opacity-100 translate-y-0'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-10'
        >
          <div className='absolute w-full left-0 -bottom-32 bg-white rounded-t-2xl h-[550px]'>
            <Wrapper className='max-h-full flex flex-col space-y-4 divide-y divide-gray-200'>
              <Dialog.Title className='font-bold text-2xl text-gray-900 pt-6 flex items-center justify-between'>
                Filter
                <button
                  onClick={onClose}
                  className='bg-fuchsia-500 text-white text-base font-semibold rounded-md px-2 py-1'
                >
                  Done
                </button>
              </Dialog.Title>

              {/* body */}
              <div
                className={`
                  ${lockScroll ? 'overflow-hidden' : 'overflow-y-auto'}
                  space-y-4 divide-y divide-gray-200 scrollbar-hide pb-6 py-4
               `}
              >
                {/* filter by type and site */}
                <div>
                  <div className='flex items-center justify-between py-4'>
                    <h3 className='font-bold text-lg text-gray-800'>Play as</h3>
                    <select className='w-1/2 text-base mr-1 border-gray-300 rounded-md focus:border-fuchsia-500 focus:ring-fuchsia-500'>
                      <option>All</option>
                      <option>Attacking</option>
                      <option>Defending</option>
                    </select>
                  </div>
                  <div className='flex items-center justify-between py-4'>
                    <h3 className='font-bold text-lg text-gray-800'>Position</h3>
                    <select className='w-1/2 text-base mr-1 border-gray-300 rounded-md focus:border-fuchsia-500 focus:ring-fuchsia-500'>
                      <option>All</option>
                      <option>A</option>
                      <option>B</option>
                      <option>Mid</option>
                    </select>
                  </div>
                </div>

                {/* filter by map */}
                <div className='space-y-4 pt-4'>
                  <SearchBar
                    placeholder='Search map'
                    onChange={(e) => setSearchMaps(e.target.value)}
                  />
                  <ul className='grid grid-cols-2 gap-4'>
                    {searchMaps.map((map) => (
                      <li
                        key={map.uuid}
                        className='rounded-md overflow-hidden border shadow-sm'
                      >
                        <button className='w-full'>
                          <Image
                            src={map.splash}
                            width={30}
                            height={35}
                            layout='responsive'
                            objectFit='cover'
                          />
                          <p className='py-2 font-semibold'>{map.displayName}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* end body */}
            </Wrapper>
            <BottomObserver setLockScroll={setLockScroll} />
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default LineupsFilterModal

const BottomObserver = ({ setLockScroll }) => {
  const [bottomRef, bottomVisible] = useObserver({ initVisible: false })

  useEffect(() => {
    setLockScroll(!bottomVisible)
  }, [bottomVisible])

  return <div ref={bottomRef} className={`${bottomVisible ? 'h-0' : 'h-[1px] '}`}></div>
}
