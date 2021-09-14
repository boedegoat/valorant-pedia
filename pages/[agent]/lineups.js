import AgentPageLayout from '../../components/agent-page/AgentPageLayout'
import { getStaticAgentPaths, getStaticAgent } from '../../lib/agents'
import SearchBar from '../../components/SearchBar'
import Wrapper from '../../components/Wrapper'
import { SearchIcon, FilterIcon } from '@heroicons/react/outline'
import { MapIcon } from '@heroicons/react/solid'
import useScroll from '../../hooks/useScroll'

const Lineups = ({ agent }) => {
  const showNav = useScroll(200)

  return (
    <AgentPageLayout agent={agent}>
      <Wrapper>
        <nav
          className={`
          sticky transition-all duration-200 ${showNav ? 'top-20' : '-top-10'}
          flex justify-between items-center shadow-md rounded-md divide-x-2`}
        >
          <div className='px-2 flex items-center space-x-1'>
            <p className='text-sm text-gray-400'>No filters applied</p>
            {/* <div className='text-sm px-1 bg-gray-700 text-white font-semibold rounded-md flex items-center'>
              <MapIcon className='w-3 h-3 mr-1' />
              Icebox
            </div>
            <div className='text-sm px-1 bg-green-400 text-white font-semibold rounded-md flex items-center'>
              Attacking
            </div>
            <div className='text-sm px-1 bg-green-400 text-white font-semibold rounded-md flex items-center'>
              A
            </div> */}
          </div>

          <div className='space-x-1 px-1 flex items-center'>
            <button className='p-1'>
              <FilterIcon className='w-6 h-6 text-gray-500' />
            </button>
            <button className='p-1'>
              <SearchIcon className='w-6 h-6 text-gray-500' />
            </button>
          </div>
        </nav>
        <div className='mt-8 min-h-[1000px]'></div>
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