import { agentToURL } from '../../lib/agents'
import Wrapper from '../global/Wrapper'
import SelectAgent from './SelectAgent'

const SelectAgentSection = ({ roles, agents, agentsDoc }) => {
  return roles.map(({ name }) => (
    <section key={name}>
      <Wrapper>
        <h2 className='font-roboto font-bold text-2xl text-gray-700'>{name}</h2>
      </Wrapper>
      <Wrapper className='py-5 flex space-x-4 overflow-x-auto scrollbar-hide'>
        {agents
          .filter(({ role }) => role.displayName === name)
          .map((agent) => (
            <SelectAgent
              key={agent.uuid}
              src={agent.bustPortrait}
              agentName={agent.displayName}
              roleName={agent.role.displayName}
              roleIcon={agent.role.displayIcon}
              agentDoc={agentsDoc?.find((d) => d.name === agentToURL(agent.displayName))}
            />
          ))}
      </Wrapper>
    </section>
  ))
}

export default SelectAgentSection
