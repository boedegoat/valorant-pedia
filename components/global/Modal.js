import { Dialog } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import Wrapper from './Wrapper'

function Modal({ open, onClose, title, includeCloseButton, children }) {
  return (
    <Dialog as='div' open={open} onClose={onClose} className='fixed z-50 inset-0 overflow-y-auto'>
      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />

      {/* body */}
      <Wrapper className='absolute flex flex-col w-full inset-0 bg-white rounded-t-2xl'>
        <Dialog.Title className='font-bold text-2xl text-gray-900 pt-6 pb-4 flex items-center justify-between'>
          {title}{' '}
          {includeCloseButton && (
            <button onClick={onClose}>
              <XIcon className='w-8 h-8 text-gray-400' />
            </button>
          )}
        </Dialog.Title>

        <div className='overflow-y-auto space-y-4 scrollbar-hide pb-6'>{children}</div>
      </Wrapper>
    </Dialog>
  )
}

function Title({ children, ...props }) {
  return (
    <Dialog.Title
      className='font-bold text-2xl text-gray-900 pt-6 flex items-center justify-between'
      {...props}
    >
      {children}
    </Dialog.Title>
  )
}

function Description({ children, ...props }) {
  return <Dialog.Description {...props}>{children}</Dialog.Description>
}

Modal.Title = Title
Modal.Description = Description

export default Modal
