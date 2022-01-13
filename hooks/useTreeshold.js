import { useEffect } from 'react'

export default function useTreeshold(input, callback, options = null) {
  useEffect(() => {
    const textInputTimeout = setTimeout(callback, options?.delay || 300)
    return () => clearTimeout(textInputTimeout)
  }, [input])
}
