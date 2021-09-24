import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'

export default function useCollection(path) {
  const [docs, setDocs] = useState({
    loading: true,
    items: [],
  })

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, path), (snapshots) => {
      const _docs = snapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setDocs({ loading: false, items: _docs })
    })

    // cleanup
    return () => {
      unsubscribe()
    }
  }, [])

  return [docs.items, docs.loading]
}
