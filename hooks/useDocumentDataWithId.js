import { useDocument } from 'react-firebase-hooks/firestore'

export default function useCollectionDataWithId(query, options) {
  const [data, loading, error] = useDocument(query, options)

  return [
    data
      ? {
          id: data.id,
          ...data.data(),
        }
      : undefined,
    loading,
    error,
  ]
}
