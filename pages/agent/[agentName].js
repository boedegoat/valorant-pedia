import Wrapper from '../../components/Wrapper'
import Layout from '../../components/Layout'

const Agent = ({ agentName }) => {
  return (
    <Layout>
      <Wrapper>
        <h1>{agentName}</h1>
      </Wrapper>
    </Layout>
  )
}

export default Agent

export async function getServerSideProps(context) {
  return {
    props: {
      agentName: context.params.agentName.replace(/-/g, '/'),
    },
  }
}
