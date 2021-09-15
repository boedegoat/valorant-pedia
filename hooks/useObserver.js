import { useEffect, useState, useRef } from 'react'

export default function useObserver(refElement, options = {}) {
  const [entry, setEntry] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((_entry) => {
        setEntry(_entry)
        if (loading) setLoading(false)
      })
    }, options)
    observer.observe(refElement.current)

    return function cleanup() {
      observer.disconnect()
    }
  }, [])

  return [entry, loading]
}
