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
          className='inline-flex justify-center px-4 py-2 text-sm font-medium text-fuchsia-900 bg-fuchsia-100 border border-transparent rounded-md hover:bg-fuchsia-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500'
          onClick={() => signIn('google', options)}
        >
          Sign In with Google
        </button>
      </div>
    </Alert>
  )
}

export default SignInAlert
