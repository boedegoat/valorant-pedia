export default function Stat({ stat, value }) {
  return (
    <li className='overflow-y-auto scrollbar-hide'>
      <p className='uppercase font-bold text-xs tracking-wider text-gray-600'>{stat}</p>
      <h2 className='font-bold'>{value || 'N/A'}</h2>
    </li>
  )
}
