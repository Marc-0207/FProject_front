import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Auth/Welcome";
import Calendario from "./components/Calendario/Calendario";
import Home from "./components/Home/ListaEventos";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import CrearEvento from "./components/CrearEvento/CrearEvento.jsx"
import EditarPerfil from "./components/EditarPerfil/EditarPerfil.jsx";
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import JoinEvent from "./components/JoinEvent/JoinEvent.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route index element={<Home />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="/crearevento" element={<CrearEvento />} />
              <Route path="/editarperfil" element={<EditarPerfil />} />
              <Route path="/joinevent" element={<JoinEvent />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </CookiesProvider>
  </StrictMode>
);
