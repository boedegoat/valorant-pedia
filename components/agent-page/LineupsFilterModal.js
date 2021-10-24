import Image from 'next/image'
import { Dialog } from '@headlessui/react'
import Wrapper from '../Wrapper'
import SearchBar from '../SearchBar'
import useQuery from '../../hooks/useQuery'
import SwordIcon from '../icon/SwordIcon'
import ShieldIcon from '../icon/ShieldIcon'

const LineupsFilterModal = ({
  show,
  onClose,
  maps: mapsData,
  filters: { lineupsType, lineupsSite, lineupsMap },
  setFilters: { setLineupsType, setLineupsSite, setLineupsMap },
  resetLineupsQuery,
}) => {
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
                <FilterTypeButton
                  lineupsType={lineupsType}
                  setLineupsType={setLineupsType}
                  value='attacking'
                  Icon={SwordIcon}
                />
                <FilterTypeButton
                  lineupsType={lineupsType}
                  setLineupsType={setLineupsType}
                  value='defending'
                  Icon={ShieldIcon}
                />
              </div>

              {/* filter site */}
              <div className='flex space-x-2 mt-4'>
                <FilterSiteButton
                  lineupsSite={lineupsSite}
                  setLineupsSite={setLineupsSite}
                  value='a'
                />
                <FilterSiteButton
                  lineupsSite={lineupsSite}
                  setLineupsSite={setLineupsSite}
                  value='b'
                />
                <FilterSiteButton
                  lineupsSite={lineupsSite}
                  setLineupsSite={setLineupsSite}
                  value='c'
                />
                <FilterSiteButton
                  lineupsSite={lineupsSite}
                  setLineupsSite={setLineupsSite}
                  value='mid'
                />
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
                    lineupsMap={lineupsMap}
                    setLineupsMap={setLineupsMap}
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
              onClick={resetLineupsQuery}
              className='bottom-filter-btn border border-gray-400 text-gray-500'
            >
              Reset
            </button>
            <button
              onClick={onClose}
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

const FilterTypeButton = ({ lineupsType, setLineupsType, value, Icon }) => (
  <button
    className={`filter-btn ${lineupsType === value ? 'bg-fuchsia-500' : ''}`}
    onClick={() => setLineupsType(lineupsType !== value ? value : '')}
  >
    <Icon className='filter-icon' />
    <p className='filter-label'>{value}</p>
  </button>
)

const FilterSiteButton = ({ lineupsSite, setLineupsSite, value }) => (
  <button
    className={`filter-btn uppercase font-bold ${
      lineupsSite === value ? 'bg-fuchsia-500' : ''
    }`}
    onClick={() => setLineupsSite(lineupsSite !== value ? value : '')}
  >
    {value}
  </button>
)

const FilterMapButton = ({ lineupsMap, setLineupsMap, mapName, mapImage }) => (
  <button
    className={`rounded-md overflow-hidden border-2 shadow-sm
                ${lineupsMap === mapName ? 'border-fuchsia-400' : 'border-gray-200'}
    `}
    onClick={() => setLineupsMap(lineupsMap !== mapName ? mapName : '')}
  >
    <Image src={mapImage} width={30} height={35} layout='responsive' objectFit='cover' />
    <p className='py-2 font-black uppercase'>{mapName}</p>
  </button>
)
