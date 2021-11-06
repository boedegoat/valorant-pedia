import Wrapper from './Wrapper'

export default function SearchResultsLabel({ data, searchInput }) {
  return (
    <Wrapper className='mb-4'>
      <h2 className='font-bold text-xs flex items-center uppercase tracking-wider text-fuchsia-500'>
        Search Results{' '}
        <span className='bg-fuchsia-500 text-white rounded-md px-1 ring ml-2 ring-fuchsia-200'>
          {data.length}
        </span>
      </h2>
      <h1 className='text-3xl font-bold mt-2'>
        {data.length ? searchInput : `${searchInput} Not Found 😢`}
      </h1>
    </Wrapper>
  )
}
