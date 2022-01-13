import Modal from 'components/global/Modal'
import useTreeshold from 'hooks/useTreeshold'
import { db } from 'lib/firebase-client'
import { usePlaylistContext } from 'pages/playlist/[playlistId]'
import { useState } from 'react'

export default function PlaylistEditModal({ openEdit, onClose }) {
  const { playlist } = usePlaylistContext()

  const [newTitle, setNewTitle] = useState(null)
  const [newDescription, setNewDescription] = useState(null)

  const playlistDocRef = db.collection('playlists').doc(playlist?.id)

  useTreeshold(newTitle, () => {
    if (!newTitle) return
    playlistDocRef.set({ title: newTitle }, { merge: true })
  })
  useTreeshold(newDescription, () => {
    if (!newDescription) return
    playlistDocRef.set({ description: newDescription }, { merge: true })
  })

  return (
    <Modal title='Edit' open={openEdit} onClose={onClose} includeCloseButton>
      <div className='flex flex-col'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          className='text-input'
          value={typeof newTitle === 'string' ? newTitle : playlist?.title || ''}
          onChange={e => setNewTitle(e.target.value)}
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='description'>Description</label>
        <textarea
          type='text'
          id='description'
          className='text-input resize-none min-h-[100px]'
          value={typeof newDescription === 'string' ? newDescription : playlist?.description || ''}
          onChange={e => setNewDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <p className='mt-20 text-center text-gray-400 text-sm'>
          Press X button to save your changes
        </p>
      </div>
    </Modal>
  )
}
