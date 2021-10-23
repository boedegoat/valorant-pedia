import { useCollection } from 'react-firebase-hooks/firestore'

export default function useCollectionDataWithId(query, options) {
  const [data, loading, error] = useCollection(query, options)

  return [
    data?.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
    loading,
    error,
  ]
}
