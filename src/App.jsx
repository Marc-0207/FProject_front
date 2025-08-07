import Sidebar from './components/Sidebar/Sidebar'
import { Outlet } from "react-router-dom";
import { useState } from 'react'
import './App.css'

function App() {
   const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Outlet />
      </div>
    </>
  );
}

export default App
