import { createContext, useEffect, useState, FC, useCallback } from 'react'

interface ErrorContextI {
  error: string | null
  toastError: Function
}

export const ErrorContext = createContext<ErrorContextI>({ error: null, toastError: () => {} })

export const ErrorProvider: FC<React.ReactNode> = ({ children }) => {
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (error) {
      timeout = setTimeout(() => {
        setError(null)
      }, 1700)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [error, setError])

  const toastError = useCallback((message = 'Uh oh, something went wrong. Please try again.') => {
    setError(message)
  }, [])

  return <ErrorContext.Provider value={{ error, toastError }}>{children}</ErrorContext.Provider>
}
