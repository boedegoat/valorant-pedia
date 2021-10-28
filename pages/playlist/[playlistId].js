import Layout from '../../components/Layout'
import Wrapper from '../../components/Wrapper'

const PlaylistSection = () => {
  return (
    <Layout back='/playlist'>
      <header>
        <Wrapper>
          <h1 className='page-main-header'>Your Favorites</h1>
        </Wrapper>
      </header>
    </Layout>
  )
}

export default PlaylistSection
