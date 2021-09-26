import { createContext, useEffect, useState, FC, useCallback } from 'react'
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

  const fetchSections = useCallback(() => {
    try {
      axios.get('http://localhost:3001/sections').then((response) => {
        // Section order is determined by ID so sort by ID
        const sortedSections = response.data.sort((a: SectionI, b: SectionI) => a.id - b.id)
        setSections(sortedSections)
      })
    } catch (error) {
      toastError()
    }
  }, [toastError])

  useEffect(() => {
    fetchSections()
  }, [fetchSections])

  const onCardSubmit = async (sectionId: number, title: string) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/cards',
        data: { sectionId, title }
      })
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
      const response = axios({
        method: 'put',
        url: 'http://localhost:3001/cards',
        headers: { 'content-type': 'multipart/form-data' },
        data: formData
      })
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
