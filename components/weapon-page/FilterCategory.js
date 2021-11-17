import Wrapper from 'components/global/Wrapper'

export default function FilterCategory({
  categories,
  filterCategory,
  setFilterCategory,
}) {
  return (
    <Wrapper className='py-3 my-4 shadow-sm border-b flex space-x-4 overflow-x-auto scrollbar-hide sticky top-0 bg-white z-10'>
      {categories.map((category) => (
        <button
          key={category}
          className={`whitespace-nowrap border px-3 py-1 rounded-md font-bold
           ${
             filterCategory === category
               ? 'bg-fuchsia-500 text-white border-fuchsia-300 ring-2 ring-fuchsia-300'
               : ''
           }
          `}
          onClick={() => setFilterCategory(filterCategory === category ? '' : category)}
        >
          {category}
        </button>
      ))}
    </Wrapper>
  )
}
