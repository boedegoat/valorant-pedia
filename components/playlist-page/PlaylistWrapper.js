import Layout from '../Layout'
import Wrapper from '../Wrapper'

const PlaylistWrapper = ({ title, children, description }) => {
  return (
    <Layout title={title} back='/playlist'>
      <header className='mb-4'>
        <Wrapper>
          <h1 className='page-main-header'>{title}</h1>
          <p className='font-medium text-gray-500'>{description}</p>
        </Wrapper>
      </header>
      <Wrapper>{children}</Wrapper>
    </Layout>
  )
}

export default PlaylistWrapper
