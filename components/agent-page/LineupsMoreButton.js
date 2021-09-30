import { Transition } from '@headlessui/react'
import {
  AdjustmentsIcon,
  SearchIcon,
  DotsVerticalIcon,
  XIcon,
} from '@heroicons/react/outline'
import { Fragment, useEffect } from 'react'

const LineupsMoreButton = ({
  showMoreButton,
  toggleShowMoreButton,
  navVisible,
  toggleShowFilterModal,
  navRef,
}) => {
  const moreButtonAnimation = {
    enter: 'transform transition ease-out duration-300',
    enterFrom: 'opacity-0 translate-y-2',
    enterTo: 'opacity-100 translate-y-0',
    leave: 'transform transition ease-in duration-200',
    leaveFrom: 'opacity-100 translate-y-0',
    leaveTo: 'opacity-0 translate-y-2',
  }

  useEffect(() => {
    if (navVisible) toggleShowMoreButton(false)
  }, [navVisible])

  return (
    <Fragment>
      {/* overlay */}
      {showMoreButton && !navVisible && (
        <div
          onClick={toggleShowMoreButton}
          className='fixed z-50 inset-0 bg-black bg-opacity-50'
        />
      )}

      {/* search and filter button */}
      <Transition
        show={showMoreButton && !navVisible}
        className='fixed z-50 bottom-44 right-8 flex flex-col space-y-4 text-gray-400'
        {...moreButtonAnimation}
      >
        <div className='flex justify-end items-center space-x-4'>
          <p className='bg-gray-700 text-gray-200 px-3 py-1 rounded-md'>Search</p>
          <button
            className='bg-white p-3 rounded-full shadow-lg border border-gray-50'
            onClick={() => {
              navRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              })
              toggleShowMoreButton(false)
            }}
          >
            <SearchIcon className='w-8 h-8' />
          </button>
        </div>
        <div className='flex justify-end items-center space-x-4'>
          <p className='bg-gray-700 text-gray-200 px-3 py-1 rounded-md'>Filters</p>
          <button
            onClick={() => {
              toggleShowFilterModal()
              toggleShowMoreButton(false)
            }}
            className='bg-white p-3 rounded-full shadow-lg border border-gray-50'
          >
            <AdjustmentsIcon className='w-8 h-8 rotate-90' />
          </button>
        </div>
      </Transition>

      {/* toggle button */}
      <div
        className={`fixed z-50 bottom-24 right-8 transition ${
          !navVisible
            ? 'duration-200 ease-out opacity-100 translate-y-0'
            : 'duration-300 ease-in opacity-0 translate-y-5'
        }`}
      >
        {!navVisible && (
          <button
            className={`
          ${showMoreButton ? 'bg-gray-600' : 'bg-fuchsia-500'}
          text-white p-3 rounded-full
          shadow-lg transition-colors
        `}
            onClick={toggleShowMoreButton}
          >
            {showMoreButton ? (
              <XIcon className='w-8 h-8' />
            ) : (
              <DotsVerticalIcon className='w-8 h-8' />
            )}
          </button>
        )}
      </div>
    </Fragment>
  )
}

export default LineupsMoreButton
