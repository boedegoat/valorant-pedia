import { useEffect, useState } from 'react'
import { db } from '../lib/firebase-client'
import { compareSearch, isObjectNotEmpty } from '../lib/utils'

export default function useCollection(path, queryOptions = {}) {
  const [docs, setDocs] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ref = db.collection(path)
    const { filter } = queryOptions
    let searchQueries = {}

    if (isObjectNotEmpty(filter)) {
      Object.entries(filter).forEach(([field, match]) => {
        if (typeof match === 'string') {
          if (match === '') return
          ref = ref.where(field, '==', match)
        }
        if (typeof match === 'object') {
          if (!isObjectNotEmpty(match)) return
          const { $search } = match
          searchQueries[field] = $search
        }
      })
    }

    // setiap ada dokumen yg berubah dalam collection, jalankan function ini
    const unsubscribe = ref.onSnapshot((snapshots) => {
      let snapshotsDocs = snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      // handle search queries
      if (isObjectNotEmpty(searchQueries)) {
        Object.entries(searchQueries).forEach(([field, search]) => {
          snapshotsDocs = snapshotsDocs.filter((doc) => compareSearch(doc[field], search))
        })
      }

      setDocs(snapshotsDocs)
      setLoading(false)
    })
    return unsubscribe
  }, [path, ...Object.values(queryOptions)])

  return [docs, loading]
}
