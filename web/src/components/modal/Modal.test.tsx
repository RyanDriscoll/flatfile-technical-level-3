import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Modal from './'
import SectionI from '../../types/section'

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

  it('does not render the modal if no card is present', async () => {
    render(<Modal card={null} sections={null} closeModal={() => {}} onSubmit={() => {}} />)

    const modal = screen.queryByRole('form')

    expect(modal).not.toBeInTheDocument()
  })

  it('does render the modal if a card is present', async () => {
    render(<Modal card={mockedCard} sections={null} closeModal={() => {}} onSubmit={() => {}} />)

    const modal = screen.queryByRole('form')

    expect(modal).toBeInTheDocument()
  })

  it('renders a select input if sections are present', async () => {
    render(
      <Modal
        card={mockedCard}
        sections={mockedSections}
        closeModal={() => {}}
        onSubmit={() => {}}
      />
    )

    const combobox = screen.queryByRole('combobox')
    const options = screen.queryAllByRole('option')

    expect(combobox).toBeInTheDocument()
    expect(options).toHaveLength(mockedSections.length)
  })

  it('calls closeModal when the background is clicked', async () => {
    const mockCloseModal = jest.fn()
    render(
      <Modal card={mockedCard} sections={null} closeModal={mockCloseModal} onSubmit={() => {}} />
    )

    const background = screen.getByTestId('modal-background')

    fireEvent.click(background)

    expect(mockCloseModal).toHaveBeenCalledTimes(1)
  })

  it('calls onSubmit when the form is submitted', async () => {
    const mockOnSubmit = jest.fn()
    render(
      <Modal card={mockedCard} sections={null} closeModal={() => {}} onSubmit={mockOnSubmit} />
    )

    const submitButton = screen.getByRole('button')

    fireEvent.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  })
})
