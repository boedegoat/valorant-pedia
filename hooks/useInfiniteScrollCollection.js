import { useState, useEffect, useRef } from 'react'

function parseDataFromDocs(docs) {
  return docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export default function useInfiniteScrollCollection(query) {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [end, setEnd] = useState(false)
  const lastDocRef = useRef(null)
  const infiniteScrollEl = useRef(null)
  const [infiniteScrollElVisible, setInfiniteScrollElVisible] = useState(false)
  const firstRender = useRef(true)

  useEffect(() => {
    // make sure loading is false to prevent bugs
    // where infiniteScrollEl immediately being visible because docs is still empty array
    // that cause same data fetched 2 times
    if (!infiniteScrollEl.current || loading) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!lastDocRef.current) return observer.disconnect(infiniteScrollEl.current)
        if (entry.isIntersecting) setInfiniteScrollElVisible(true)
        else setInfiniteScrollElVisible(false)
      })
    })
    observer.observe(infiniteScrollEl.current)

    return () => {
      observer.disconnect(infiniteScrollEl.current)
    }
  }, [loading])

  useEffect(async () => {
    if (end || (!firstRender.current && !infiniteScrollElVisible)) return

    let newQuery = query
    if (lastDocRef.current) {
      newQuery = newQuery.startAfter(lastDocRef.current)
    }

    setLoading(true)

    const { docs } = await newQuery.get()
    if (!docs.length) {
      setEnd(true)
      setLoading(false)
      return
    }

    setDocs((currentDocs) => [...currentDocs, ...parseDataFromDocs(docs)])
    lastDocRef.current = docs[docs.length - 1]

    if (firstRender.current) firstRender.current = false
    setLoading(false)
  }, [infiniteScrollElVisible])
  return [docs, loading, infiniteScrollEl, end]
}
