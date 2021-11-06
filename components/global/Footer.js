export default function Footer({ className }) {
  return (
    <footer className={`text-center text-gray-400 ${className || ''}`}>
      <p className='px-3'>
        API used :{' '}
        <a
          href='https://valorant-api.com/'
          target='_blank'
          className='text-fuchsia-400 hover:text-fuchsia-500 font-semibold'
        >
          valorant-api.com
        </a>
      </p>
      <p>
        Made with ❤ by{' '}
        <a
          target='blank'
          className='font-semibold text-gray-900'
          href='https://github.com/boedegoat'
        >
          boedegoat
        </a>
      </p>
    </footer>
  )
}
