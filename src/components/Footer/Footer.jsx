import { Link } from "react-router-dom";
import "./Footer.css"
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <h4>
          QuedApp ©2025 <br /> Todos los derechos reservados.
        </h4>
        <div>
          <img src={logo} alt="" srcset="" className="logo-footer" />
        </div>
        <div className="footer-links-container">
          <div className="footer-links">
            <Link to={"/"}>Mis eventos</Link>
            <Link to={"/calendario"}>Calendario</Link>
            <Link to={"/notificaciones"}>Notificaciones</Link>
          </div>
        </div>
      </footer>
    </>
  );
}