import Layout from './Layout'
import Link from './Link'
import Wrapper from './Wrapper'

const Unauthorize = ({ pageName }) => {
  return (
    <Layout back='/playlist'>
      <Wrapper className='space-y-4'>
        <div className='text-gray-400'>
          <h1 className='text-6xl font-black'>401</h1>
          <p className='font-semibold text-sm'>UNAUTHORIZE</p>
        </div>
        <h2 className='font-extrabold text-2xl'>
          Looks like you are not logged in yet 👮‍♂️
        </h2>
        <p className='font-semibold text-gray-600 text-lg'>
          Consider to{' '}
          <Link href='/signin' className='text-fuchsia-500'>
            Sign In
          </Link>{' '}
          to access {pageName || 'this'} page
        </p>
      </Wrapper>
    </Layout>
  )
}

export default Unauthorize
