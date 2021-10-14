import { useEffect, useState } from 'react'
import Wrapper from '../Wrapper'
import { SearchIcon, AdjustmentsIcon } from '@heroicons/react/outline'
import LineupsList from './LineupsList'
import LineupsVideoModal from './LineupsVideoModal'
import { agentToURL } from '../../lib/agents'
import useCollection from '../../hooks/useCollection'
import useToggle from '../../hooks/useToggle'
import LineupsFilterModal from './LineupsFilterModal'
import useFilter from '../../hooks/useFilter'
import useObserver from '../../hooks/useObserver'
import LineupsMoreButton from './LineupsMoreButton'
import LineupsFilterList from './LineupsFilterList'
import { useAgentPageContext } from './AgentPageLayout'

const Lineups = () => {
  const { agent, maps } = useAgentPageContext()

  const [showFilterModal, toggleShowFilterModal] = useToggle()
  const [showMoreButton, toggleShowMoreButton] = useToggle()

  const [navRef, navVisible] = useObserver({ initVisible: true })

  const [lineupsFilter, setLineupsFilter] = useState({
    map: '',
    type: '',
    site: '',
    title: {
      $search: '',
    },
  })
  const lineupsRef = `agents/${agentToURL(agent.displayName)}/lineups`
  const [lineupsDocs, lineupsLoading] = useCollection(lineupsRef, {
    filter: lineupsFilter,
  })

  const [lineups, [filterLineups, setFilterLineups]] = useFilter({
    initData: lineupsDocs,
    initFilter: { map: '', type: '', site: '', title: '' },
    onFilter: (currentLineups) => handleFilterLineups(currentLineups, filterLineups),
  })

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
    setLineupsFilter((filter) => ({
      ...filter,
      title: {
        $search: e.target.value,
      },
    }))
  }

  return (
    <Wrapper>
      <nav
        ref={navRef}
        className={`bg-white justify-between items-center shadow-md rounded-md divide-y`}
      >
        <div className='px-3 flex items-center space-x-2'>
          <SearchIcon className='w-5 h-5 text-gray-400 flex-shrink-0' />
          <input
            className='flex-grow border-0 py-4 bg-transparent focus:outline-none focus:ring-0 placeholder-gray-400 text-lg'
            placeholder='Search lineups'
            value={lineupsFilter.title.$search}
            onChange={handleSearch}
          />
          <button
            className='text-sm font-semibold text-gray-400'
            onClick={toggleShowFilterModal}
          >
            <AdjustmentsIcon className='w-6 h-6 rotate-90' />
          </button>
        </div>
        <LineupsFilterList filterLineups={filterLineups} />
      </nav>

      <div className='mt-8 flex flex-col space-y-4'>
        <LineupsList
          agentName={agent.displayName}
          lineups={lineups}
          lineupsLoading={lineupsLoading}
        />
        <LineupsVideoModal agentName={agent.displayName} lineups={lineups} />
      </div>

      <LineupsFilterModal
        show={showFilterModal}
        onClose={toggleShowFilterModal}
        maps={maps}
        filterLineups={filterLineups}
        setFilterLineups={setFilterLineups}
      />

      <LineupsMoreButton
        showMoreButton={showMoreButton}
        toggleShowMoreButton={toggleShowMoreButton}
        toggleShowFilterModal={toggleShowFilterModal}
        navVisible={navVisible}
        navRef={navRef}
      />
    </Wrapper>
  )
}

export default Lineups
