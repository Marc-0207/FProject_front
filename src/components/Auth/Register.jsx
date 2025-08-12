import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const [registroActivar, setRegistroActivar] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const forbiddenSymbols = [";", "?", "\\", " or ", " and "];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const timer = setTimeout(() => setMsg(""), 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    setError("");

    switch (type) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "password2":
        setPassword2(value);
        break;
      default:
        break;
    }
  };

  function handleSubmit() {
    let valid = true;

    if (!name || !email || !password || !password2) {
      setError("Algún campo está vacío");
      setRegistroActivar(true);
      return;
    }

    if (!emailRegex.test(email)) {
      setError("El email no es válido");
      valid = false;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      valid = false;
    }

    for (let simbolo of forbiddenSymbols) {
      if (password.includes(simbolo)) {
        setError("La contraseña no puede contener: ; ? \\ or and");
        valid = false;
        break;
      }
    }

    if (password !== password2) {
      setError("Las contraseñas no coinciden");
      valid = false;
    }

    if (!valid) {
      setRegistroActivar(true);
      return;
    }

    setError("");
    setRegistroActivar(false);

    const url = "https://localhost:8080/api/auth/register";
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    };
    const data = {
      name,
      email,
      password,
    };
    /* console.log(data) */
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(await response.text());
        setMsg("¡Registro exitoso!");
        setTimeout(() => {
          navigate("/welcome");
        }, 500);
      })
      .catch(async () => {
        setError("El email ya existe!!!");
      });

    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
  }

  return (
    <>
      <h1>Register</h1>
      <div className="Credenciales">
        <p>
          {msg !== "" ? (
            <span className="success">{msg}</span>
          ) : (
            <span className="error">{error}</span>
          )}
        </p>
        <input
          className="Name"
          placeholder="Nombre"
          value={name}
          onChange={(e) => handleInputChange(e, "name")}
        />
        <input
          className="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleInputChange(e, "email")}
        />
        <input
          className="Password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => handleInputChange(e, "password")}
        />
        <input
          className="Password2"
          type="password"
          placeholder="Repetir contraseña"
          value={password2}
          onChange={(e) => handleInputChange(e, "password2")}
        />
        <button className="Register" onClick={handleSubmit}>
          Register
        </button>
      </div>
    </>
  );
}

export default Register;
