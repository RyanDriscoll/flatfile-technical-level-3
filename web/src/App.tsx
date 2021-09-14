import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Section from './components/section'
import SectionI from './types/section'

import './App.css'

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

  useEffect(() => {
    axios.get('http://localhost:3001/sections').then((response) => {
      // Section order is determined by ID so sort by ID
      const sortedSections = response.data.sort((a: SectionI, b: SectionI) => a.id - b.id)
      setSections(sortedSections)
    })
  })

  const onCardSubmit = (sectionId: number, title: string) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/cards',
      data: { sectionId, title }
    }).then((response) => {
      setSections((prevSections) => {
        const sectionsClone: SectionI[] = [...prevSections]
        const foundSection: SectionI | undefined = sectionsClone.find((section) => section.id === sectionId)
        if (foundSection) {
          foundSection.cards.push({
            id: response.data.id,
            title: response.data.title,
            section_id: sectionId
          })
        }
        return sectionsClone
      })
    })
  }

  return (
    <BoardContainer>
      {sections.map((section: SectionI) => {
        return <Section key={section.id} section={section} onCardSubmit={onCardSubmit}></Section>
      })}
    </BoardContainer>
  )
}

export default App
