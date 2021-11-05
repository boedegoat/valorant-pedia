import { signIn } from 'next-auth/client'
import Alert from './Alert'

const SignInAlert = ({ description, callbackUrl, open, onClose }) => {
  const options = {}
  if (callbackUrl) {
    options.callbackUrl = callbackUrl
  }

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
          onClick={() => signIn('google', options)}
        >
          Sign In with Google
        </button>
      </div>
    </Alert>
  )
}

export default SignInAlert
