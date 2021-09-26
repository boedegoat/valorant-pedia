import { useEffect, useState } from 'react'

export default function useFilter({ initData, initFilter, onFilter }) {
  const [data, setData] = useState(initData)
  const [filter, setFilter] = useState(initFilter)

  useEffect(() => {
    function isFilterNotEmpty() {
      switch (typeof filter) {
        case 'string':
          return Boolean(filter)
        case 'object':
          return Object.values(filter).some((value) => Boolean(value))
      }
    }

    if (isFilterNotEmpty()) {
      setData((currentData) => onFilter(currentData))
    } else {
      setData(initData)
    }

    return () => setData(initData)
  }, [filter, initData])

  return [data, [filter, setFilter]]
}
