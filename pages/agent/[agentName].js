import Wrapper from '../../components/Wrapper'
import Layout from '../../components/Layout'
import { getAgentsByName } from '../../lib/agents'

const Agent = ({ agent }) => {
  console.log(agent)

  return (
    <Layout title={`${agent.displayName}'s Homepage`}>
      <Wrapper>
        <h1>{agent.displayName}</h1>
      </Wrapper>
    </Layout>
  )
}

export default Agent

export async function getServerSideProps(context) {
  const agentName = context.params.agentName.replace(/-/g, '/')
  const agent = await getAgentsByName(agentName)

  return {
    props: {
      agent,
    },
  }
}
