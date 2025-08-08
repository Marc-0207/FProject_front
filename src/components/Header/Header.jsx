import Sidebar from "../Sidebar/Sidebar"
import { useState } from "react";
import logo from "../../assets/logo.png";
import "./Header.css"
import { Link } from "react-router-dom";

export default function Header(){
const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <header>
        <div className="menu-logo">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <img src={logo} alt="" srcset="" />
        </div>

        <div className="perfil">
          {/** Espacio donde irá el perfil, habrá que hacer petición para recuperar los datos que se necesiten para poder linkarlo */}
          <Link to={"/editarperfil"}>Perfil</Link>
        </div>
      </header>
    </>
  );
}