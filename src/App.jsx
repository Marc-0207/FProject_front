import  Welcome  from './components/Auth/Welcome'
import Sidebar from './components/Sidebar/Sidebar'
import { useState } from 'react'
import './App.css'

function App() {
   const [isOpen, setIsOpen] = useState(true);
  return ( 
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Welcome />
    </>
  )
}

export default App
