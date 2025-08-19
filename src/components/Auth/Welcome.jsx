import { Link } from "react-router-dom";
import image1 from "../../assets/capture-welcome-1.png";
import image2 from "../../assets/capture-welcome-2.png";
import video1 from "../../assets/video.mp4";
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
          <h1>
            Crea un evento <br/> o únete a uno
          </h1>
          <video src={video1} autoPlay loop muted/>
        </div>
        <div>
          <h1>
            Añade fácilmente a tus invitados
            con el link de invitación
          </h1>
          <img src={image2} alt="" srcSet="" />
        </div>
        <div>
          <h1>
            Vota por el día <br /> que te vaya mejor
          </h1>
          <img src={image1} alt="" srcSet="" />
        </div>
      </section>
    </div>
  );
}
export default Welcome;
