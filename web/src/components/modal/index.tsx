import { ChangeEvent, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import CardI from '../../types/card'
import SectionI from '../../types/section'
import { ModalBackground, ModalBody } from './styled-components'

interface UpdateCardState {
  title: string
  description: string
  sectionId: number | undefined
  id: number | undefined
}

const Modal = ({
  card,
  sections,
  closeModal,
  onSubmit
}: {
  card: CardI | null
  sections: SectionI[] | null
  closeModal: Function
  onSubmit: Function
}) => {
  const [cardData, setCardData] = useState<UpdateCardState>({
    title: '',
    description: '',
    sectionId: undefined,
    id: undefined
  })

  useEffect(() => {
    if (card) {
      setCardData({
        title: card.title || '',
        description: card.description || '',
        sectionId: card.section_id || undefined,
        id: card.id || undefined
      })
    }
  }, [card])

  const handleChange = ({
    target
  }: {
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  }) => {
    const { value, name } = target
    setCardData((prevData) => ({ ...prevData, [name]: name === 'sectionId' ? +value : value }))
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { files } = event.target as HTMLInputElement
    console.log('🚀 ~ file: index.tsx ~ line 55 ~ handleImageChange ~ files', files)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onSubmit(cardData)
    closeModal()
  }

  let modalDiv = document.getElementById('modal')

  if (!modalDiv) {
    modalDiv = document.createElement('div')
    modalDiv.setAttribute('id', 'modal')
    document.body.appendChild(modalDiv)
  }

  return ReactDOM.createPortal(
    card ? (
      <>
        <ModalBackground data-testid='modal-background' onClick={() => closeModal()} />
        <ModalBody>
          <form name='update card' onSubmit={handleSubmit}>
            <label htmlFor='title'>
              Title
              <input
                type='text'
                id='title'
                name='title'
                value={cardData.title}
                onChange={handleChange}
              />
            </label>
            <label htmlFor='description'>
              Description
              <textarea
                id='description'
                name='description'
                value={cardData.description}
                onChange={handleChange}
              />
            </label>
            <label htmlFor='sectionId'>
              Section
              <select
                id='sectionId'
                name='sectionId'
                defaultValue={cardData.sectionId}
                onChange={handleChange}
              >
                {sections &&
                  sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.title}
                    </option>
                  ))}
              </select>
            </label>
            <label htmlFor='images'>
              Images
              <input type='file' accept='image/*' onChange={handleImageChange} multiple />
            </label>
            <input type='submit' />
          </form>
        </ModalBody>
      </>
    ) : null,
    modalDiv
  )
}

export default Modal
