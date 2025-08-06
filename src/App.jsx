import Welcome from './components/Auth/Welcome'
import Calendario from './components/Calendario/Calendario'
import Home from './components/Home/ListaEventos'
import Notificaiones from './components/Notificaciones/Notificaciones'
import Sidebar from './components/Sidebar/Sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import './App.css'

function App() {
   const [isOpen, setIsOpen] = useState(true);
  return ( 
    <>
      <Router>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Routes>
          <Route path='/' element={<Welcome />}></Route>
          <Route path='/listaeventos'element={<Home />}></Route>
          <Route path='/calendario' element={<Calendario />}></Route>
          <Route path='/notificaciones' element={<Notificaiones />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
