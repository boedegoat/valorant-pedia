import NextLink from 'next/link'

const Link = ({ href, children, scroll, shallow, ...props }) => {
  return (
    <NextLink href={href} scroll={scroll} shallow={shallow}>
      <a {...props}>{children}</a>
    </NextLink>
  )
}

export default Link
