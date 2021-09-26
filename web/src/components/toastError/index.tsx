import useError from '../../hooks/useError'
import { ToastErrorContent } from './styled-components'

const ToastError = () => {
  const { error } = useError()

  return (
    <>
      {error && (
        <ToastErrorContent data-testid='error'>
          <p>{error}</p>
        </ToastErrorContent>
      )}
    </>
  )
}

export default ToastError
