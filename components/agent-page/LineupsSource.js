import Modal from 'components/global/Modal'
import useCollectionDataWithId from 'hooks/useCollectionDataWithId'
import useToggle from 'hooks/useToggle'
import { db } from 'lib/firebase-client'

export default function LineupsSources() {
  const [openModal, toggleOpenModal] = useToggle()
  const [sources] = useCollectionDataWithId(db.collection('lineups-sources'))

  const platformIcons = {
    youtube:
      'https://img.icons8.com/external-prettycons-lineal-color-prettycons/49/000000/external-youtube-multimedia-prettycons-lineal-color-prettycons.png',
  }

  return (
    <>
      <button
        onClick={toggleOpenModal}
        className='w-full text-left bg-green-200 text-green-600 font-medium border-2 border-green-300 rounded-md px-3 py-2 mb-4'
      >
        Lineups sources &rarr;
      </button>
      <Modal
        open={openModal}
        onClose={() => toggleOpenModal(false)}
        title='Lineups Sources'
        includeCloseButton
      >
        <ul className='space-y-4'>
          {sources?.map(source => (
            <li key={source.id}>
              <a
                href={source.link}
                target='_blank'
                className='px-4 py-3 rounded-md border border-gray-200 font-semibold flex items-center space-x-2'
              >
                <img src={platformIcons[source.platform]} className='w-4 h-4' />
                <p>{source.name}</p>
              </a>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  )
}
