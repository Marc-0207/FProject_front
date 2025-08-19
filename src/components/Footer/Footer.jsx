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
          <img src={logo} alt="" srcSet="" className="logo-footer" />
        </div>
        {location.pathname == "/welcome" ||
        location.pathname == "/login" ||
        location.pathname == "/register" ? (
          <div className="footer-links-container hide">
            <div className="footer-links">
              <Link to={"/"}>Mis eventos</Link>
              <Link to={"/crearevento"}>Crear evento</Link>
              <Link to={"/joinevent"}>Unirse a un evento</Link>
            </div>
          </div>
        ) : (
          <div className="footer-links-container">
            <div className="footer-links">
              <Link to={"/"}>Mis eventos</Link>
              <Link to={"/crearevento"}>Crear evento</Link>
              <Link to={"/joinevent"}>Unirse a un evento</Link>
            </div>
          </div>
        )}
      </footer>
    </>
  );
}