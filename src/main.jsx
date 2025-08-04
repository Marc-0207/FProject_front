import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import Welcome from './components/Auth/Welcome.jsx'
import Calendario from './components/Calendario/Calendario.jsx'
import CrearEvento from './components/CrearEvento/CrearEvento.jsx'
import EditarPerfil from './components/EditarPerfil/EditarPerfil.jsx'
import ListaEventos from './components/Home/ListaEventos.jsx'
import Notificaciones from './components/Notificaciones/Notificaciones.jsx'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
<StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} >
        <Route index element={<ListaEventos />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/calendario' element={<Calendario />} />
        <Route path='/crearevento' element={<CrearEvento />} />
        <Route path='/editarperfil' element={<EditarPerfil />} />
        <Route path='/notificaciones' element={<Notificaciones />} />
      </Route>
    </Routes>
  </BrowserRouter>
</StrictMode>,
)
