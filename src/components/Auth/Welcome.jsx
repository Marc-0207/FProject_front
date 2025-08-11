import { Link } from "react-router-dom";
import "./Welcome.css";
function Welcome() {
  return (
    <div id="welcome-container">
      <div>
        <h1 id="welcome-title">
          Organiza eventos grupales <br /> fácilmente con QuedApp
        </h1>
        <div className="auth-buttons">
          <Link to={"/login"}>Iniciar Sesión</Link>
          <Link to={"/register"}>Registrarse</Link>
        </div>
      </div>
      <section className="features">
        <div>
          <h2>
            jaksjkklnxlznxcnscnzlkxncls <br /> asjasajskjaskbdhsa
          </h2>
          <img src="" alt="" srcset="" />
        </div>
        <div>
          <h2>
            jaksjkklnxlznxcnscnzlkxncls <br /> asjasajskjaskbdhsa
          </h2>
          <img src="" alt="" srcset="" />
        </div>
        <div>
          <h2>
            jaksjkklnxlznxcnscnzlkxncls <br /> asjasajskjaskbdhsa
          </h2>
          <img src="" alt="" srcset="" />
        </div>
      </section>
    </div>
  );
}
export default Welcome;
