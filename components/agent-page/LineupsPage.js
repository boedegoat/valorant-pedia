import Wrapper from '../Wrapper'
import { SearchIcon, FilterIcon } from '@heroicons/react/outline'
import { MapIcon } from '@heroicons/react/solid'
import LineupsList from './LineupsList'
import LineupsVideoModal from './LineupsVideoModal'
import { agentToURL } from '../../lib/agents'
import useCollection from '../../hooks/useCollection'
import useToggle from '../../hooks/useToggle'
import LineupsFilterModal from './LineupsFilterModal'
import useFilter from '../../hooks/useFilter'
import { capitalize } from '../../lib/utils'

const Lineups = ({ agent, maps }) => {
  const lineupsCollection = `agents/${agentToURL(agent.displayName)}/lineups`
  const [lineupsDocs, lineupsLoading] = useCollection(lineupsCollection)
  const [showFilterModal, toggleShowFilterModal] = useToggle()

  const [lineups, [filterLineups, setFilterLineups]] = useFilter({
    initData: lineupsDocs,
    initFilter: { map: '', type: '', site: '' },
    onFilter: (currentLineups) => handleFilterLineups(currentLineups, filterLineups),
  })

  function handleFilterLineups(currentLineups, filterLineups) {
    let newLineups = [...currentLineups]
    Object.entries(filterLineups).forEach(([filterProperty, filterValue]) => {
      if (!filterValue) return
      newLineups = newLineups.filter((lineup) => lineup[filterProperty] === filterValue)
    })
    return newLineups
  }

  return (
    <Wrapper>
      <nav
        className={`bg-white flex justify-between items-center shadow-md rounded-md divide-x-2 `}
      >
        <div className='px-2 flex items-center space-x-1 text-sm overflow-y-auto'>
          {Object.values(filterLineups).every((value) => !value) && (
            <p className='text-gray-300'>No filters applied</p>
          )}
          {filterLineups.map && (
            <span className='flex items-center font-semibold bg-green-400 text-white px-1 rounded-md flex-shrink-0'>
              <MapIcon className='w-3 h-3 mr-1' />
              {capitalize(filterLineups.map)}
            </span>
          )}
          {filterLineups.type && (
            <span className='flex items-center font-semibold bg-gray-600 text-white px-1 rounded-md flex-shrink-0'>
              {capitalize(filterLineups.type)}
            </span>
          )}
          {filterLineups.site && (
            <span className='flex items-center font-semibold bg-gray-600 text-white px-1 rounded-md flex-shrink-0'>
              {capitalize(filterLineups.site)}
            </span>
          )}
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
            filterLineups={filterLineups}
            setFilterLineups={setFilterLineups}
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
          lineups={lineups}
          lineupsLoading={lineupsLoading}
        />
        <LineupsVideoModal agentName={agent.displayName} lineups={lineups} />
      </div>
    </Wrapper>
  )
}

export default Lineups
