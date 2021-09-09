import Image from 'next/image'
import AgentPageLayout from '../../components/agent-page/AgentPageLayout'
import { getStaticAgentPaths, getStaticAgent } from '../../lib/agents'
import SearchBar from '../../components/SearchBar'
import Wrapper from '../../components/Wrapper'

const Lineups = ({ agent }) => {
  return (
    <AgentPageLayout agent={agent}>
      <Wrapper>
        <SearchBar placeholder='search lineups' />
        <div className='mt-8 min-h-[500px]'></div>
      </Wrapper>
    </AgentPageLayout>
  )
}

export default Lineups

export async function getStaticPaths() {
  return await getStaticAgentPaths()
}

export async function getStaticProps(context) {
  return await getStaticAgent(context)
}
