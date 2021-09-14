import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import CardI from '../../types/card'
import { ModalBackground, ModalBody } from './styled-components'

const Modal = ({
  card,
  closeModal
}: {
  card: CardI | null
  closeModal: React.MouseEventHandler<HTMLInputElement>
}) => {
  const [cardData, setCardData] = useState({ title: '', description: '' })

  useEffect(() => {
    if (card) {
      setCardData({
        title: card.title || '',
        description: card.description || ''
      })
    }
  }, [card])

  const handleChange = ({ target }: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    const { value, name } = target
    setCardData((prevData) => ({ ...prevData, [name]: value }))
  }

  const modalDiv = document.getElementById('modal')
  if (!modalDiv) {
    return null
  }

  return ReactDOM.createPortal(
    card ? (
      <>
        <ModalBackground onClick={closeModal}></ModalBackground>
        <ModalBody>
          <form name='update card'>
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
          </form>
        </ModalBody>
      </>
    ) : null,
    modalDiv
  )
}

export default Modal
