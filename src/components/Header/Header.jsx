import Sidebar from "../Sidebar/Sidebar"
import { useState } from "react";
import logo from "../../assets/logo.png";
import "./Header.css"

export default function Header(){
const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <header>
        <div>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <img src={logo} alt="" srcset="" />
        </div>

        <div className="perfil">
          {/** Espacio donde irá el perfil, habrá que hacer petición para recuperar los datos que se necesiten para poder linkarlo */}
          <h4>Perfil</h4>
        </div>
      </header>
    </>
  );
}