import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Wrapper from '../Wrapper'
import SearchBar from '../SearchBar'
import useFilter from '../../hooks/useFilter'
import { getSearchResults } from '../../lib/maps'
import { capitalize } from '../../lib/utils'
import { MapIcon } from '@heroicons/react/solid'
import LineupsFilterList from './LineupsFilterList'

const LineupsFilterModal = ({
  show,
  onClose,
  maps: mapsData,
  filterLineups,
  setFilterLineups,
}) => {
  const [maps, [searchMaps, setSearchMaps]] = useFilter({
    initData: mapsData,
    initFilter: '',
    onFilter: (currentMaps) => getSearchResults(currentMaps, searchMaps),
  })

  function updateFilter(property, value) {
    setFilterLineups((currentFilter) => ({ ...currentFilter, [property]: value }))
  }

  function resetFilter() {
    setFilterLineups((currentFilter) => ({
      ...currentFilter,
      map: '',
      type: '',
      site: '',
    }))
  }

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
            <LineupsFilterList filterLineups={filterLineups} text='base' />
          </Dialog.Title>

          {/* content */}
          <div className='overflow-y-auto space-y-4 divide-y divide-gray-200 scrollbar-hide pb-6 py-4'>
            {/* filter by type and site */}
            <div>
              <div className='flex items-center justify-between py-4'>
                <h3 className='font-bold text-lg text-gray-800'>Play on</h3>
                <select
                  className='w-1/2 text-base mr-1 border-gray-300 rounded-md focus:border-fuchsia-500 focus:ring-fuchsia-500'
                  value={filterLineups.type}
                  onChange={(e) => updateFilter('type', e.target.value)}
                >
                  <option value=''>All</option>
                  <option value='attacking'>Attacking</option>
                  <option value='defending'>Defending</option>
                </select>
              </div>
              <div className='flex items-center justify-between py-4'>
                <h3 className='font-bold text-lg text-gray-800'>Position</h3>
                <select
                  className='w-1/2 text-base mr-1 border-gray-300 rounded-md focus:border-fuchsia-500 focus:ring-fuchsia-500'
                  value={filterLineups.site}
                  onChange={(e) => updateFilter('site', e.target.value)}
                >
                  <option value=''>All</option>
                  <option value='a'>A</option>
                  <option value='b'>B</option>
                  <option value='mid'>Mid</option>
                </select>
              </div>
            </div>

            {/* filter by map */}
            <div className='space-y-4 pt-4 pb-20'>
              <SearchBar
                placeholder='Search map'
                value={searchMaps}
                onChange={(e) => setSearchMaps(e.target.value)}
              />

              {/* map list */}
              <ul className='grid grid-cols-2 gap-4'>
                {maps.length ? (
                  <li
                    className={`rounded-md overflow-hidden border-2 shadow-sm ${
                      filterLineups.map === '' ? 'border-fuchsia-400' : 'border-gray-200'
                    }`}
                  >
                    <button
                      className='w-full h-full font-semibold'
                      onClick={() => updateFilter('map', '')}
                    >
                      All Maps
                    </button>
                  </li>
                ) : (
                  <li className='col-span-2'>
                    <h3 className='text-xl text-center mt-4'>
                      Map '<strong>{searchMaps}</strong>' Not Found
                    </h3>
                  </li>
                )}

                {maps.map((map) => (
                  <li
                    key={map.uuid}
                    className={`rounded-md overflow-hidden border-2 shadow-sm
                        ${
                          filterLineups.map === map.displayName.toLowerCase()
                            ? 'border-fuchsia-400'
                            : 'border-gray-200'
                        }
                        `}
                  >
                    <button
                      className='w-full'
                      onClick={() => updateFilter('map', map.displayName.toLowerCase())}
                    >
                      <Image
                        src={map.splash}
                        width={30}
                        height={35}
                        layout='responsive'
                        objectFit='cover'
                      />
                      <p className='py-2 font-semibold'>{map.displayName}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Wrapper>
        <div className='fixed left-0 bottom-0 bg-white w-full py-2 border-t'>
          <Wrapper className='flex space-x-2'>
            <button
              onClick={resetFilter}
              className='flex-grow border-2 border-gray-700 text-gray-700 text-base font-semibold rounded-md px-2 py-3'
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className='flex-grow bg-gray-700 text-white text-base font-semibold rounded-md px-2 py-3'
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
