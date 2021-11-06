import Wrapper from '../global/Wrapper'

export default function SearchResultsLabel({ weapons, searchWeapons }) {
  return (
    <Wrapper className='mb-4'>
      <h2 className='font-bold text-xs flex items-center uppercase tracking-wider text-fuchsia-500'>
        Search Results{' '}
        <span className='bg-fuchsia-500 text-white rounded-md px-1 ring ml-2 ring-fuchsia-200'>
          {weapons.length}
        </span>
      </h2>
      <h1 className='text-3xl font-bold mt-2'>
        {weapons.length ? searchWeapons : `${searchWeapons} Not Found 😢`}
      </h1>
    </Wrapper>
  )
}
