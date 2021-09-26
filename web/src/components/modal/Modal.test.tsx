import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'

import Modal from './'
import SectionI from '../../types/section'
import useData from '../../hooks/useData'

jest.mock('../../hooks/useData')

describe('<Modal />', () => {
  let mockedCard = {
    id: 1,
    title: 'Test 1',
    section_id: 1
  }
  let mockedSections: SectionI[] = [
    { id: 1, title: 'section 1', cards: [] },
    { id: 2, title: 'section 2', cards: [] },
    { id: 3, title: 'section 3', cards: [] }
  ]
  let mockedUseData = useData as jest.Mock
  let mockOnCardUpdate = jest.fn()
  let mockCloseModal = jest.fn()

  beforeEach(() => {
    mockedUseData.mockReturnValue({
      selectedCard: mockedCard,
      sections: mockedSections,
      onCardUpdate: mockOnCardUpdate,
      closeModal: mockCloseModal
    })
  })

  afterEach(() => {
    cleanup()
    jest.resetAllMocks()
  })

  it('does not render the modal if no card is present', async () => {
    mockedUseData.mockReturnValue({
      selectedCard: null,
      sections: mockedSections,
      onCardUpdate: mockOnCardUpdate,
      closeModal: mockCloseModal
    })
    render(<Modal />)

    const modal = screen.queryByRole('form')

    expect(modal).not.toBeInTheDocument()
  })

  it('does render the modal if a card is present', async () => {
    render(<Modal />)

    const modal = screen.queryByRole('form')

    expect(modal).toBeInTheDocument()
  })

  it('renders a select input if sections are present', async () => {
    render(<Modal />)

    const combobox = screen.queryByRole('combobox')
    const options = screen.queryAllByRole('option')

    expect(combobox).toBeInTheDocument()
    expect(options).toHaveLength(mockedSections.length)
  })

  it('calls closeModal when the background is clicked', async () => {
    render(<Modal />)

    const background = screen.getByTestId('modal-background')

    fireEvent.click(background)

    expect(mockCloseModal).toHaveBeenCalledTimes(1)
  })

  it('calls onCardUpdate when the form is submitted', async () => {
    render(<Modal />)

    const submitButton = screen.getByRole('button')

    fireEvent.click(submitButton)

    expect(mockOnCardUpdate).toHaveBeenCalledTimes(1)
  })
})
