import { useEffect, useState } from 'react'

export default function useSearch(initialData, callback) {
  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState('')

  useEffect(() => {
    search ? setData((oldData) => callback(oldData, search)) : setData(initialData)
  }, [search])

  return [data, setSearch]
}
