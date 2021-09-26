import { ChangeEvent, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import useData from '../../hooks/useData'
import ImageI from '../../types/image'
import {
  ModalBackground,
  ModalBody,
  Image,
  ImageContainer,
  ErrorMessage
} from './styled-components'

interface UpdateCardState {
  title: string
  description: string
  sectionId: number | undefined
  id: number | undefined
}

const Modal = () => {
  const [cardData, setCardData] = useState<UpdateCardState>({
    title: '',
    description: '',
    sectionId: undefined,
    id: undefined
  })

  const [uploadedImages, setUploadedImages] = useState<FileList | null>(null)
  const [existingImages, setExistingImages] = useState<ImageI[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  const { selectedCard: card, onCardUpdate: onSubmit, sections, closeModal } = useData()

  useEffect(() => {
    if (card) {
      setCardData({
        title: card.title || '',
        description: card.description || '',
        sectionId: card.section_id,
        id: card.id
      })
      setExistingImages(card.images || [])
    } else {
      setCardData({
        title: '',
        description: '',
        sectionId: undefined,
        id: undefined
      })
      setExistingImages([])
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
    if (existingImages.length + (files?.length || 0) > 3) {
      setErrorMessage('Maximum of three total images')
    } else {
      setErrorMessage('')
      setUploadedImages(files)
    }
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onSubmit(cardData, uploadedImages)
    setUploadedImages(null)
    setExistingImages([])
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
                defaultValue={card?.section_id}
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
            <label>Existing Images</label>
            <ImageContainer>
              {existingImages.map((image) => (
                <Image key={image.id} style={{ backgroundImage: `url(${image.url})` }} />
              ))}
            </ImageContainer>
            <label htmlFor='images'>
              Upload New Images
              <input type='file' accept='image/*' onChange={handleImageChange} multiple />
            </label>
            <input type='submit' disabled={Boolean(errorMessage)} />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </form>
        </ModalBody>
      </>
    ) : null,
    modalDiv
  )
}

export default Modal
