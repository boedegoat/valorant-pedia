import SelectAgent from './SelectAgent'
import Wrapper from './Wrapper'

const SearchResultsSection = ({ searchResults }) => {
  return (
    <section>
      {/* search result display */}
      <Wrapper>
        <h2 className='font-roboto font-bold text-2xl text-gray-700'>
          Search Results{' '}
          <span className='inline-block bg-fuchsia-500 text-white text-base px-2 py-1 rounded-md -translate-y-1 leading-none ml-1 ring ring-fuchsia-200'>
            {searchResults.length}
          </span>
        </h2>
      </Wrapper>

      {/* loop search results */}
      <Wrapper className='py-5 flex space-x-4 overflow-x-auto scrollbar-hide'>
        {searchResults.map((agent) => (
          <SelectAgent
            key={agent.uuid}
            src={agent.bustPortrait}
            agentName={agent.displayName}
            roleName={agent.role.displayName}
            roleIcon={agent.role.displayIcon}
          />
        ))}
      </Wrapper>
    </section>
  )
}

export default SearchResultsSection
