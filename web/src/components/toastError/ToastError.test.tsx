import { render } from '@testing-library/react'
import ToastError from '.'
import useError from '../../hooks/useError'

jest.mock('../../hooks/useError')

describe('<ToastError />', () => {
  let mockUseError = useError as jest.Mock
  it('does not show if there is no error', () => {
    mockUseError.mockReturnValue({ error: null })
    const { queryByTestId } = render(<ToastError />)

    const errorMessge = queryByTestId('error')

    expect(errorMessge).not.toBeInTheDocument()
  })

  it('does show if there is an error', () => {
    const text = 'oopsie...'
    mockUseError.mockReturnValue({ error: text })
    const { queryByTestId, getByText } = render(<ToastError />)

    const errorMessge = queryByTestId('error')
    const renderedText = getByText(text)

    expect(errorMessge).toBeInTheDocument()
    expect(renderedText).toBeInTheDocument()
  })
})
