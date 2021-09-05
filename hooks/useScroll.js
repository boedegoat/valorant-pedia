import { useState, useEffect } from 'react'

export default function useScroll(offset) {
  const [show, setShow] = useState(true)
  const [scroll, setScroll] = useState({
    newY: 0,
    prevY: 0,
  })

  useEffect(() => {
    function handleScroll() {
      setScroll((prev) => ({
        newY: window.scrollY,
        prevY: prev.newY,
      }))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    // if user scroll from bottom (scrollY biger) to top (scrollY lower)
    if (scroll.newY > offset && scroll.prevY > scroll.newY) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [scroll.newY, scroll.prevY])

  return show
}
