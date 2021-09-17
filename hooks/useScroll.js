import { useRef, useLayoutEffect, useState } from 'react'

// prevent unnecessary bugs
const isBrowser = typeof window !== `undefined`

function getScrollPosition() {
  if (!isBrowser) return { x: 0, y: 0 }
  return { x: window.scrollX, y: window.scrollY }
}

export default function useScroll({ direction, offset }) {
  const position = useRef(getScrollPosition())
  const [show, setShow] = useState(false)

  useLayoutEffect(() => {
    function handleScroll() {
      const previousPosition = position.current
      const currentPosition = getScrollPosition()

      let isShow
      if (direction === 'up') {
        isShow = previousPosition.y > currentPosition.y && currentPosition.y > offset
      }
      if (direction === 'down') {
        isShow = previousPosition.y < currentPosition.y && currentPosition.y > offset
      }

      if (isShow !== show) setShow(isShow)

      // update position to latest
      position.current = currentPosition
    }

    window.addEventListener('scroll', handleScroll)
    return function cleanup() {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [show])

  return show
}
