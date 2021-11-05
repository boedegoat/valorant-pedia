import Footer from '../Footer'
import Wrapper from '../Wrapper'
import { useAgentPageContext } from './AgentPageLayout'

export default function AbilitiesPage() {
  const { agent } = useAgentPageContext()
  console.log(agent)
  return (
    <Wrapper className='space-y-6'>
      {agent.abilities.map((ability) => (
        <div className='p-4 space-y-2 divide-y rounded-md shadow-md'>
          <div className='flex items-center space-x-3'>
            {ability.displayIcon && (
              <img
                src={ability.displayIcon}
                className='block rounded-full bg-gray-800 w-9 h-9 p-1'
              />
            )}
            <div>
              <p className='uppercase font-bold text-xs tracking-wider text-fuchsia-500'>
                {ability.slot}
              </p>
              <h2 className='text-xl font-bold'>{ability.displayName}</h2>
            </div>
          </div>
          <p className='text-gray-500 pt-4'>{ability.description}</p>
        </div>
      ))}
      <Footer className='pt-20' />
    </Wrapper>
  )
}
