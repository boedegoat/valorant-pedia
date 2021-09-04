import NextLink from 'next/link'

const Wrapper = ({ children, className }) => {
  return (
    <div className={`px-5 max-w-7xl mx-auto ${className ? className : ''}`}>
      {children}
    </div>
  )
}

const Link = ({ href, children }) => {
  return (
    <NextLink href={href}>
      <a>{children}</a>
    </NextLink>
  )
}

Wrapper.Link = Link

export default Wrapper
