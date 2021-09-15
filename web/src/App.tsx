import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Section from './components/section'
import SectionI from './types/section'

import './App.css'
import Modal from './components/modal'
import CardI from './types/card'

export const BoardContainer = styled.div`
  background-color: rgb(49, 121, 186);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  color: #393939;
  overflow-y: hidden;
  overflow-x: auto;
  position: absolute;
  padding: 5px;
  align-items: flex-start;
`

function App() {
  const [sections, setSections] = useState<SectionI[]>([])
  const [selectedCard, setSelectedCard] = useState<CardI | null>(null)

  const fetchSections = () => {
    axios.get('http://localhost:3001/sections').then((response) => {
      // Section order is determined by ID so sort by ID
      const sortedSections = response.data.sort((a: SectionI, b: SectionI) => a.id - b.id)
      setSections(sortedSections)
    })
  }

  useEffect(() => {
    fetchSections()
  }, [])

  const onCardSubmit = (sectionId: number, title: string) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/cards',
      data: { sectionId, title }
    }).then((response) => {
      return fetchSections()
    })
  }

  const onCardUpdate = (card: CardI, files: FileList) => {
    const formData = new FormData()
    Object.entries(card).forEach(([key, value]) => {
      formData.append(key, value)
    })
    if (files) {
      Array.from(files).forEach((file) => {
        formData.append('file', file)
      })
    }
    axios({
      method: 'put',
      url: 'http://localhost:3001/cards',
      headers: { 'content-type': 'multipart/form-data' },
      data: formData
    }).then((response) => {
      return fetchSections()
    })
  }

  const onCardSelect = (card: CardI) => {
    setSelectedCard(card)
  }

  const closeModal = () => {
    setSelectedCard(null)
  }

  return (
    <>
      <BoardContainer>
        {sections.map((section: SectionI) => {
          return (
            <Section
              key={section.id}
              section={section}
              onCardSubmit={onCardSubmit}
              onCardSelect={onCardSelect}
            ></Section>
          )
        })}
      </BoardContainer>
      <Modal
        card={selectedCard}
        sections={sections}
        closeModal={closeModal}
        onSubmit={onCardUpdate}
      />
    </>
  )
}

export default App
