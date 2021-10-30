import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const Alert = ({ open, onClose, className, children }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='fixed inset-0 z-50 overflow-y-auto' onClose={onClose}>
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-30' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='inline-block h-screen align-middle' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div
              className={`inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl ${className}`}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

const Title = ({ children, ...props }) => (
  <Dialog.Title {...props}>{children}</Dialog.Title>
)

const Description = ({ children, ...props }) => (
  <Dialog.Description {...props}>{children}</Dialog.Description>
)

Alert.Title = Title
Alert.Description = Description

export default Alert