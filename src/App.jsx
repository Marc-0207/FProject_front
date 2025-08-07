import Sidebar from './components/Sidebar/Sidebar'
import { Outlet } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
   
  return (
    <>
      <Header/>
      {//<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      }
      <div>
        <Outlet />
      </div>
      <Footer/>
    </>
  );
}

export default App
