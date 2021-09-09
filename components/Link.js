import NextLink from 'next/link'

const Link = ({ href, children, scroll, ...props }) => {
  return (
    <NextLink href={href} scroll={scroll || true}>
      <a {...props}>{children}</a>
    </NextLink>
  )
}

export default Link
