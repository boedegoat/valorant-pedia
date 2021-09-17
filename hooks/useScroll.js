import { useRef, useLayoutEffect } from 'react'

const isBrowser = typeof window !== `undefined`

function getScrollPosition() {
  if (!isBrowser) return { x: 0, y: 0 }
  return { x: window.scrollX, y: window.scrollY }
}

export default function useScroll(effect, deps) {
  const position = useRef(getScrollPosition())

  useLayoutEffect(() => {
    function handleScroll() {
      const currentPosition = getScrollPosition()
      effect({ previousPosition: position.current, currentPosition })
      position.current = currentPosition
    }

    window.addEventListener('scroll', handleScroll)
    return function cleanup() {
      window.removeEventListener('scroll', handleScroll)
    }
  }, deps)
}
