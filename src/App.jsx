import Sidebar from './components/Sidebar/Sidebar'
import { Outlet, useLocation } from "react-router-dom";
import {useState } from 'react'
import './App.css'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import logo from "./assets/logo.png";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname == "/welcome" ||
      location.pathname == "/login" ||
      location.pathname == "/register" ? (
        <div>
          <img src={logo} alt="" className="logo-welcome" />
        </div>
      ) : (
        <Header />
      )}

      <div id="page-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App
