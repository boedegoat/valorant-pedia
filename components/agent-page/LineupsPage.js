import Wrapper from '../Wrapper'
import { SearchIcon, AdjustmentsIcon } from '@heroicons/react/outline'
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
    initFilter: { map: '', type: '', site: '', title: '' },
    onFilter: (currentLineups) => handleFilterLineups(currentLineups, filterLineups),
  })

  console.log(lineups)

  function handleFilterLineups(currentLineups, filterLineups) {
    let newLineups = [...currentLineups]
    Object.entries(filterLineups).forEach(([filterProperty, filterValue]) => {
      if (!filterValue) return
      if (filterProperty === 'title') {
        newLineups = newLineups.filter((lineup) =>
          filterValue
            .split(' ')
            .every((search) => lineup.title.includes(search.toLowerCase()))
        )
      } else {
        newLineups = newLineups.filter((lineup) => lineup[filterProperty] === filterValue)
      }
    })
    return newLineups
  }

  function handleSearch(e) {
    setFilterLineups((currentLineups) => ({
      ...currentLineups,
      title: e.target.value,
    }))
  }

  return (
    <Wrapper>
      <nav
        className={`bg-white justify-between items-center shadow-md rounded-md divide-y`}
      >
        <div className='px-3 flex items-center space-x-2'>
          <SearchIcon className='w-5 h-5 text-gray-400 flex-shrink-0' />
          <input
            className='flex-grow border-0 py-4 bg-transparent focus:outline-none focus:ring-0 placeholder-gray-400 text-lg'
            placeholder='Search lineups'
            value={filterLineups.title}
            onChange={handleSearch}
          />
          <button
            className='text-sm font-semibold text-gray-400'
            onClick={toggleShowFilterModal}
          >
            <AdjustmentsIcon className='w-6 h-6 rotate-90' />
          </button>
        </div>

        <div className='px-3 py-2 flex items-center space-x-1 text-sm overflow-y-auto'>
          {Object.entries(filterLineups).every(([filterProperty, filterValue]) => {
            if (filterProperty === 'title') return true
            return !filterValue
          }) && <p className='text-gray-300'>No filters applied</p>}
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

        <LineupsFilterModal
          show={showFilterModal}
          onClose={toggleShowFilterModal}
          maps={maps}
          filterLineups={filterLineups}
          setFilterLineups={setFilterLineups}
        />
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
