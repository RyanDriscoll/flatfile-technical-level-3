import './App.css'
import { ErrorProvider } from './context/ErrorContext'
import { DataProvider } from './context/DataContext'
import SectionsContainer from './components/sectionsContainer'
import Modal from './components/modal'
import ToastError from './components/toastError'

function App() {
  return (
    <ErrorProvider>
      <DataProvider>
        <SectionsContainer />
        <Modal />
        <ToastError />
      </DataProvider>
    </ErrorProvider>
  )
}

export default App
