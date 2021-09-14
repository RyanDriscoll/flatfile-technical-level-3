import { useState } from 'react'
import ReactDOM from 'react-dom'
import CardI from '../../types/card'
import { ModalBackground, ModalBody } from './styled-components'

const Modal = ({
  card,
  closeModal
}: {
  card: CardI
  closeModal: React.MouseEventHandler<HTMLInputElement>
}) => {
  const [title, setTitle] = useState<string>(card.title)
  const [description, setDescription] = useState<string>(card.description || '')

  const handleTitleChange = ({ target }: { target: HTMLInputElement }) => {
    const { value } = target
    setTitle(value)
  }

  const handleDescriptionChange = ({ target }: { target: HTMLTextAreaElement }) => {
    const { value } = target
    setDescription(value)
  }

  const modalDiv = document.getElementById('modal')
  if (!modalDiv) {
    return null
  }

  return ReactDOM.createPortal(
    <>
      <ModalBackground onClick={closeModal}></ModalBackground>
      <ModalBody>
        <form>
          <label htmlFor='title'>
            Title
            <input
              type='text'
              id='title'
              name='title'
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          <label htmlFor='description'>
            Description
            <textarea
              id='description'
              name='description'
              value={description}
              onChange={handleDescriptionChange}
            />
          </label>
        </form>
      </ModalBody>
    </>,
    modalDiv
  )
}

export default Modal
