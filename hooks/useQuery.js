import { useEffect, useState, useCallback, useRef } from 'react'

function handleInitQuery(initData, options) {
  const sort = options?.initQuery?.sort
  const limit = options?.initQuery?.limit

  const InitQueryExist = Boolean(sort || limit)
  if (InitQueryExist) {
    if (limit) {
      return initData.slice(0, limit)
    }
    if (sort) {
      return handleSort(sort, initData)
    }
  }
  return initData
}

function handleSort(fields, data) {
  let sortData = [...data]
  fields.forEach((field) => {
    const decending = field.startsWith('-')
    if (decending) {
      field = field.slice(1)
    }
    // @ts-ignore
    sortData = sortData.sort(({ [field]: a }, { [field]: b }) => {
      if (a > b) {
        return decending ? -1 : 1
      }
      if (a < b) {
        return decending ? 1 : -1
      }
      return 0
    })
  })

  return sortData
}

export default function useQuery(initData, options) {
  const dataRef = useRef(handleInitQuery(initData, options))

  const [queryResults, setQueryResults] = useState(null)
  const [searchState, setSearchState] = useState(options?.search?.init ?? '')

  const methods = {
    search: [searchState, setSearchState],
    sort(fields) {
      const sortData = handleSort(fields, dataRef.current)
      dataRef.current = sortData
      setQueryResults(sortData)
    },
  }

  // -------------
  // HANDLE SEARCH
  // -------------
  const handleSearch = useCallback((searchState) => {
    if (!searchState) return setQueryResults(null)

    function compareSearch(data, search) {
      return data.toString().toLowerCase().includes(search.toLowerCase())
    }
    const field = options?.search?.field
    const results = dataRef.current.filter((data) => {
      return searchState.split(' ').every((search) => {
        if (typeof data !== 'string' && typeof data !== 'object') {
          throw new Error('Plase pass either string or object')
        }
        if (typeof data === 'object') {
          if (!field) {
            throw new Error(
              'Detected an object. Make sure you pass second argument : `useSearch(initData, <target-property-here>:string)`'
            )
          }
          if (typeof field === 'string') {
            return compareSearch(data[field], search)
          }
          if (Array.isArray(field)) {
            return field.some((field) => compareSearch(data[field], search))
          }
        }
        // if data is string
        return compareSearch(data, search)
      })
    })
    setQueryResults(results)
  }, [])
  useEffect(() => handleSearch(searchState), [searchState])
  // -----------------
  // END HANDLE SEARCH
  // -----------------

  return [queryResults ?? dataRef.current, methods]
}
