import Wrapper from '../Wrapper'
import { SearchIcon, FilterIcon } from '@heroicons/react/outline'
import LineupsList from './LineupsList'
import LineupsVideoModal from './LineupsVideoModal'
import { agentToURL } from '../../lib/agents'
import useCollection from '../../hooks/useCollection'
import useToggle from '../../hooks/useToggle'
import { useEffect } from 'react'
import LineupsFilterModal from './LineupsFilterModal'

const Lineups = ({ agent, maps }) => {
  const lineupsCollection = `agents/${agentToURL(agent.displayName)}/lineups`
  const [lineupsDocs, lineupsLoading] = useCollection(lineupsCollection)
  const [showFilterModal, toggleShowFilterModal] = useToggle()

  return (
    <Wrapper>
      <nav
        className={`bg-white flex justify-between items-center shadow-md rounded-md divide-x-2 `}
      >
        <div className='px-2 flex items-center space-x-1'>
          <p className='text-sm text-gray-400'>No filters applied</p>
        </div>

        <div className='space-x-1 px-1 flex items-center'>
          {/* filter button */}
          <button className='p-2' onClick={toggleShowFilterModal}>
            <FilterIcon className='w-6 h-6 text-gray-500' />
          </button>
          <LineupsFilterModal
            show={showFilterModal}
            onClose={toggleShowFilterModal}
            maps={maps}
          />
          {/* search button */}
          <button className='p-2'>
            <SearchIcon className='w-6 h-6 text-gray-500' />
          </button>
        </div>
      </nav>

      <div className='mt-8 flex flex-col space-y-4'>
        <LineupsList
          agentName={agent.displayName}
          lineupsDocs={lineupsDocs}
          lineupsLoading={lineupsLoading}
        />
        <LineupsVideoModal agentName={agent.displayName} lineupsDocs={lineupsDocs} />
      </div>
    </Wrapper>
  )
}

export default Lineups
