import Layout from '../Layout'
import AgentHeader from './AgentHeader'
import Wrapper from '../Wrapper'
import ChangeTab from './ChangeTab'

const AgentPageLayout = ({ children, agent }) => {
  return (
    <Layout title={`${agent.displayName}'s Homepage`} back='/'>
      <AgentHeader agent={agent} />

      {/* select tab */}
      <Wrapper className='mt-2 py-5 flex space-x-4 overflow-x-auto scrollbar-hide sticky top-0 z-50 bg-white bg-opacity-70 backdrop-blur-sm'>
        <ChangeTab agentName={agent.displayName} to='lineups' />
        <ChangeTab agentName={agent.displayName} to='abilities' />
        <ChangeTab agentName={agent.displayName} to='more' />
      </Wrapper>
      {children}
    </Layout>
  )
}

export default AgentPageLayout
