import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Auth/Welcome";
import Calendario from "./components/Calendario/Calendario";
import Home from "./components/Home/ListaEventos";
import Notificaciones from "./components/Notificaciones/Notificaciones";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import CrearEvento from "./components/CrearEvento/CrearEvento.jsx"
import EditarPerfil from "./components/EditarPerfil/EditarPerfil.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/crearevento" element={<CrearEvento />} />
          <Route path="/editarperfil" element={<EditarPerfil />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
