import { signIn } from 'next-auth/client'
import Alert from './Alert'

const SignInAlert = ({ description, open, onClose }) => {
  return (
    <Alert open={open} onClose={onClose}>
      <Alert.Title as='h3' className='text-xl font-bold leading-6 text-gray-900'>
        Sign In
      </Alert.Title>
      <Alert.Description className='mt-2 text-sm'>{description}</Alert.Description>
      <div className='mt-4'>
        <button
          type='button'
          className='alert-main-button'
          onClick={() => signIn('google')}
        >
          Sign In with Google
        </button>
      </div>
    </Alert>
  )
}

export default SignInAlert
