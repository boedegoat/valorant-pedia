import { useEffect, useState } from 'react'
import { db } from '../lib/firebase-client'

export default function useCollection(path) {
  const [docs, setDocs] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // setiap ada dokumen yg berubah, jalankan function ini
    const unsubscribe = db.collection(path).onSnapshot((snapshots) => {
      setDocs(snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return [docs, loading]
}
