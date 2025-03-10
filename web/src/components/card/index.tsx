import styled from 'styled-components'
import CardI from '../../types/card'

const CardContainer = styled.div`
  border-radius: 3px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  position: relative;
  padding: 10px;
  cursor: pointer;
  max-width: 250px;
  margin-bottom: 7px;
  min-width: 230px;
`

const CardTitle = styled.div``

const Card = ({ onCardSelect, card }: { card: CardI; onCardSelect: Function }) => (
  <CardContainer className='card' onClick={() => onCardSelect(card)}>
    <CardTitle>{card.title}</CardTitle>
  </CardContainer>
)

export default Card
