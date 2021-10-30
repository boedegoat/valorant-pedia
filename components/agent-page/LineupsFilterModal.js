import Image from 'next/image'
import { Dialog } from '@headlessui/react'
import Wrapper from '../Wrapper'
import SearchBar from '../SearchBar'
import useQuery from '../../hooks/useQuery'
import SwordIcon from '../icon/SwordIcon'
import ShieldIcon from '../icon/ShieldIcon'
import { useAppContext } from '../../context/appContext'

const LineupsFilterModal = ({ show, onClose, maps: mapsData, AgentLineups }) => {
  const [_, dispatch] = useAppContext()
  // prettier-ignore
  const [maps, {search: [searchMaps, setSearchMaps]}] = useQuery(mapsData, {
    search: {field: 'displayName'}
  })

  return (
    <Dialog
      as='div'
      open={show}
      onClose={onClose}
      className='fixed z-50 inset-0 overflow-y-auto'
    >
      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />

      {/* body */}
      <div className='absolute w-full left-0 bottom-0 bg-white rounded-t-2xl h-[600px]'>
        <Wrapper className='max-h-full flex flex-col space-y-4 divide-y divide-gray-200'>
          {/* title */}
          <Dialog.Title className='font-bold text-2xl text-gray-900 pt-6 flex items-center justify-between'>
            Filters
          </Dialog.Title>

          {/* content */}
          <div className='overflow-y-auto space-y-4 divide-y divide-gray-200 scrollbar-hide pb-6 py-4'>
            <div>
              {/* filter type */}
              <div className='flex space-x-2'>
                <FilterTypeButton value='attacking' Icon={SwordIcon} />
                <FilterTypeButton value='defending' Icon={ShieldIcon} />
              </div>

              {/* filter site */}
              <div className='flex space-x-2 mt-4'>
                <FilterSiteButton value='a' />
                <FilterSiteButton value='b' />
                <FilterSiteButton value='c' />
                <FilterSiteButton value='mid' />
              </div>
            </div>

            {/* filter map */}
            <div className='space-y-4 pt-4 pb-20'>
              <SearchBar
                placeholder='Search map'
                value={searchMaps}
                onChange={(e) => setSearchMaps(e.target.value)}
              />

              {/* map list */}
              <div className='grid grid-cols-2 gap-4'>
                {maps.map((map) => (
                  <FilterMapButton
                    key={map.uuid}
                    mapImage={map.splash}
                    mapName={map.displayName.toLowerCase()}
                  />
                ))}
                {!maps.length && (
                  <h2 className='col-span-2 text-center text-lg'>
                    🙈 map <strong>{searchMaps}</strong> not found
                  </h2>
                )}
              </div>
            </div>
          </div>
        </Wrapper>

        {/* bottom menu */}
        <div className='fixed left-0 bottom-0 bg-white w-full py-2 border-t'>
          <Wrapper className='flex space-x-2'>
            <button
              onClick={() => dispatch({ type: 'RESET_FILTER_LINEUPS' })}
              className='bottom-filter-btn border border-gray-400 text-gray-500'
            >
              Reset
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: 'UPDATE_FILTER_LINEUPS_QUERY',
                  pay: { query: AgentLineups },
                })
                onClose()
              }}
              className='bottom-filter-btn bg-fuchsia-500 text-white'
            >
              Done
            </button>
          </Wrapper>
        </div>
      </div>
    </Dialog>
  )
}

export default LineupsFilterModal

const FilterTypeButton = ({ Icon, value }) => {
  const [
    {
      lineupsState: { filter },
    },
    dispatch,
  ] = useAppContext()

  return (
    <button
      className={`filter-btn ${filter.type === value ? 'bg-fuchsia-500' : ''}`}
      onClick={() =>
        dispatch({
          type: 'FILTER_LINEUPS',
          pay: {
            type: value,
          },
        })
      }
    >
      <Icon className='filter-icon' />
      <p className='filter-label'>{value}</p>
    </button>
  )
}

const FilterSiteButton = ({ value }) => {
  const [
    {
      lineupsState: { filter },
    },
    dispatch,
  ] = useAppContext()

  return (
    <button
      className={`filter-btn uppercase font-bold ${
        filter.site === value ? 'bg-fuchsia-500' : ''
      }`}
      onClick={() =>
        dispatch({
          type: 'FILTER_LINEUPS',
          pay: {
            site: value,
          },
        })
      }
    >
      {value}
    </button>
  )
}

const FilterMapButton = ({ mapName, mapImage }) => {
  const [
    {
      lineupsState: { filter },
    },
    dispatch,
  ] = useAppContext()

  return (
    <button
      className={`rounded-md overflow-hidden border-2 shadow-sm
                ${filter.map === mapName ? 'border-fuchsia-400' : 'border-gray-200'}
    `}
      onClick={() =>
        dispatch({
          type: 'FILTER_LINEUPS',
          pay: {
            map: mapName,
          },
        })
      }
    >
      <Image
        src={mapImage}
        width={30}
        height={35}
        layout='responsive'
        objectFit='cover'
      />
      <p className='py-2 font-black uppercase'>{mapName}</p>
    </button>
  )
}
