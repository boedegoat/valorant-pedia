import { useEffect, useState, useRef } from 'react'

export default function useObserver(refElement, options = {}) {
  const [entry, setEntry] = useState({})
  const loading = useRef(true)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((_entry) => {
        setEntry(_entry)
      })
    }, options)
    observer.observe(refElement.current)
    loading.current = false
  }, [])

  return [entry, loading.current]
}
