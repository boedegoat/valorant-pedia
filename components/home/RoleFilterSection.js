import { agentToURL } from '../../lib/agents'
import Wrapper from '../global/Wrapper'
import SelectAgent from './SelectAgent'

const RoleFilterSection = ({ roleFilter, agents, agentsDoc }) => {
  return (
    <section>
      <Wrapper>
        <h2 className='font-roboto font-bold text-2xl text-gray-700'>
          Agents as{' '}
          <span className='inline-block bg-fuchsia-500 text-white text-base px-2 py-1 rounded-md -translate-y-1 leading-none ml-1 ring ring-fuchsia-200'>
            {roleFilter}
          </span>
        </h2>
      </Wrapper>
      <Wrapper className='py-5 flex space-x-4 overflow-x-auto scrollbar-hide'>
        {agents
          .filter(({ role }) => role.displayName === roleFilter)
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
  )
}

export default RoleFilterSection
