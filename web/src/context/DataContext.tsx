import { createContext, useEffect, useState, FC } from 'react'
import axios from 'axios'
import SectionI from '../types/section'
import CardI from '../types/card'
import useError from '../hooks/useError'

interface DataContextI {
  selectedCard: CardI | null
  sections: SectionI[]
  onCardSubmit: Function
  onCardUpdate: Function
  onCardSelect: Function
  closeModal: Function
}

export const DataContext = createContext<DataContextI>({
  sections: [],
  selectedCard: null,
  onCardSubmit: () => {},
  onCardUpdate: () => {},
  onCardSelect: () => {},
  closeModal: () => {}
})

export const DataProvider: FC<React.ReactNode> = ({ children }) => {
  const [sections, setSections] = useState<SectionI[]>([])
  const [selectedCard, setSelectedCard] = useState<CardI | null>(null)
  const { toastError } = useError()

  const fetchSections = async () => {
    axios.get('http://localhost:3001/sections').then((response) => {
      // Section order is determined by ID so sort by ID
      const sortedSections = response.data.sort((a: SectionI, b: SectionI) => a.id - b.id)
      setSections(sortedSections)
    })
  }

  useEffect(() => {
    fetchSections()
  }, [])

  const onCardSubmit = async (sectionId: number, title: string) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/cards',
        data: { sectionId, title }
      })
      if (response && response.data) {
        const newCard = response.data
        setSections((prevSections) => {
          const sectionsClone = [...prevSections]
          const foundSection = sectionsClone.find((s) => s.id === newCard.section_id)
          if (foundSection) {
            foundSection.cards = [...foundSection.cards, newCard]
          }
          return sectionsClone
        })
      }
    } catch (error) {
      toastError()
    }
  }

  const onCardUpdate = async (card: CardI, files: FileList) => {
    try {
      const formData = new FormData()
      Object.entries(card).forEach(([key, value]) => {
        formData.append(key, value)
      })
      if (files) {
        Array.from(files).forEach((file) => {
          formData.append('file', file)
        })
      }
      const response = await axios({
        method: 'put',
        url: 'http://localhost:3001/cards',
        headers: { 'content-type': 'multipart/form-data' },
        data: formData
      })
      if (response && response.data) {
        const newCard = response.data
        setSections((prevSections) => {
          const sectionsClone = [...prevSections]
          const foundSection = sectionsClone.find((s) => s.id === newCard.section_id)
          if (foundSection) {
            const foundCardIndex = foundSection.cards.findIndex((c) => c.id === newCard.id)
            if (foundCardIndex > -1) {
              foundSection.cards = [
                ...foundSection.cards.slice(0, foundCardIndex),
                { ...foundSection.cards[foundCardIndex], ...newCard },
                ...foundSection.cards.slice(foundCardIndex + 1)
              ]
            } else {
              // card section changed
              const formerSection = sectionsClone.find((s) =>
                s.cards.find((c) => c.id === newCard.id)
              )
              if (formerSection) {
                formerSection.cards = formerSection.cards.filter((c) => c.id !== newCard.id)
              }
              foundSection.cards = [...foundSection.cards, newCard]
            }
          }
          return sectionsClone
        })
      }
    } catch (error) {
      toastError()
    }
  }

  const onCardSelect = (card: CardI) => {
    setSelectedCard(card)
  }

  const closeModal = () => {
    setSelectedCard(null)
  }

  return (
    <DataContext.Provider
      value={{ sections, selectedCard, onCardSubmit, onCardUpdate, onCardSelect, closeModal }}
    >
      {children}
    </DataContext.Provider>
  )
}
