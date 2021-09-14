import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import CardI from '../../types/card'
import SectionI from '../../types/section'
import { ModalBackground, ModalBody } from './styled-components'

interface UpdateCardState {
  title: string
  description: string
  section_id: number | null
  id: number | null
}

const Modal = ({
  card,
  sections,
  closeModal,
  onSubmit
}: {
  card: CardI | null
  sections: SectionI[] | null
  closeModal: React.MouseEventHandler<HTMLInputElement>
  onSubmit: Function
}) => {
  const [cardData, setCardData] = useState<UpdateCardState>({
    title: '',
    description: '',
    section_id: null,
    id: null
  })

  useEffect(() => {
    if (card) {
      setCardData({
        title: card.title || '',
        description: card.description || '',
        section_id: card.section_id || null,
        id: card.id || null
      })
    }
  }, [card])

  const handleChange = ({
    target
  }: {
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  }) => {
    const { value, name } = target
    setCardData((prevData) => ({ ...prevData, [name]: name === 'section_id' ? +value : value }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onSubmit(cardData)
    console.log(cardData)
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
        <ModalBackground data-testid='modal-background' onClick={closeModal} />
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
            <label htmlFor='section_id'>
              Section
              <select id='section_id' name='section_id' onChange={handleChange}>
                {sections &&
                  sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.title}
                    </option>
                  ))}
              </select>
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
