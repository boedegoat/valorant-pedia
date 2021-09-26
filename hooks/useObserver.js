import { useEffect, useRef, useState } from 'react'

export default function useObserver({ initVisible, ...options }) {
  const element = useRef()
  const [visible, setVisible] = useState(initVisible)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setVisible(entry.isIntersecting)
      })
    }, options)

    observer.observe(element.current)

    return function cleanup() {
      observer.disconnect()
    }
  }, [])

  return [element, visible]
}
