import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Modal from './'

describe('<Modal />', () => {
  let mockedCard = {
    id: 1,
    title: 'Test 1',
    section_id: 1
  }

  it('does not render the modal if no card is present', async () => {
    render(<Modal card={null} closeModal={() => {}} />)

    const modal = screen.queryByRole('form')

    expect(modal).not.toBeInTheDocument()
  })

  it('does render the modal if a card is present', async () => {
    render(<Modal card={mockedCard} closeModal={() => {}} />)

    const modal = screen.queryByRole('form')

    expect(modal).toBeInTheDocument()
  })

  it('calls closeModal when the background is clicked', async () => {
    const mockCloseModal = jest.fn()
    render(<Modal card={mockedCard} closeModal={mockCloseModal} />)

    const background = screen.getByTestId('modal-background')

    fireEvent.click(background)

    expect(mockCloseModal).toHaveBeenCalledTimes(1)
  })
})
