const SelectSection = ({ section, value, children, updater }) => {
  return (
    <button
      className={`
      font-roboto text-2xl border-b-2 
      ${
        value === section
          ? 'text-gray-700 border-fuchsia-400'
          : 'text-gray-300 border-transparent'
      }
    `}
      onClick={() => updater(value)}
    >
      {children}
    </button>
  )
}

export default SelectSection
