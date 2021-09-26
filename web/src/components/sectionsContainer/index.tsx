import styled from 'styled-components'
import useData from '../../hooks/useData'
import SectionI from '../../types/section'
import Section from '../section'

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

const SectionsContainer = () => {
  const { sections, onCardSubmit, onCardSelect } = useData()
  return (
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
  )
}

export default SectionsContainer
