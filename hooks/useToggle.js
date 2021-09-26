import { useCallback, useState } from 'react'

export default function useToggle(init = false) {
  const [toggle, setToggle] = useState(init)

  const callback = useCallback((value) => {
    setToggle((prevToggle) => (typeof value === 'boolean' ? value : !prevToggle))
  }, [])

  return [toggle, callback]
}
