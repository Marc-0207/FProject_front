import Sidebar from './components/Sidebar/Sidebar'
import { Outlet } from "react-router-dom";
import { useState } from 'react'
import './App.css'

function App() {
   const [isOpen, setIsOpen] = useState(true);
   // <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App
