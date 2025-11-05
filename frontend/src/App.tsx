import './App.css'
import ClientForm from './components/ClientForm';
import { ClientProvider } from './context/ClientsContext';

function AppContent() {
  return (
    <>
      <h1>Comment Lottery</h1>
      <ClientForm />
    </>
  )
}

function App() {
  return (
    <ClientProvider>
      <AppContent />
    </ClientProvider>
  )
}


export default App;
