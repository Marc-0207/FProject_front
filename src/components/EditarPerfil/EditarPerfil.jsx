import { useEffect, useState } from "react";
import './EditarPerfil.css';
import { editar } from "../SVG";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

function EditarPerfil() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [error, setError] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [cookies] = useCookies(["JWT"]);
  const naviget = useNavigate();
  const jwTCookie = cookies.JWT;
  const url = window.url;

  useEffect(() => {
    const event = `${url}/profile`;
    fetch(event, {
      method: 'GET',
      headers: { 'JWT': jwTCookie }
    })
      .then(res => {
        if (!res.ok) throw new Error('Error en el fetch');
        return res.json();
      })
      .then(data => {
        console.log(data)
        setName(data.name);
        setEmail(data.email);
      })
      .catch(err => setError(err.message));
  }, [url, jwTCookie]);


  const handleInputChange = (e, type) => {
    const value = e.target.value;
    setError("");

    switch (type) {
      case "name": setName(value); break;
      default: break;
    }
  };

  function save() {
    if (!name) {
      setError("Nombre vacío");
      return;
    }

    const profile = url + "/profile";
    const headers = {
      'JWT': jwTCookie,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = new URLSearchParams();
    body.append("newName", name.trim());

    fetch(profile, {
      method: "PUT",
      headers,
      body: body.toString()
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(await response.text());
        setError("¡Perfil editado!");
        setTimeout(() =>{
          naviget("/");
        }, 1000)
      })
      .catch(err => setError("No has cambiado tu nombre"));
  }

  return (
    <div className="EditarPerfil">
      <div className="PerfilFormContainer">
        {error && <p className="PerfilError">{error}</p>}
        <p>Nombre de usuario</p>
        <div className="NombreEditable">
          {isEditingName ? (
            <input
              className="PerfilNombreInput"
              value={name}
              onChange={(e) => handleInputChange(e, "name")}
              onBlur={() => setIsEditingName(false)}
              autoFocus
            />
          ) : (
            <div className="NombreDisplay">
              <span>{name || "Sin nombre"}</span>
              <button onClick={() => setIsEditingName(true)}>
                {editar}
              </button>
            </div>
          )}
        </div>
        <p>Correo electrónico</p>
          <p>{email}</p>
      </div>

      <button className="Guardar" onClick={save}>Guardar</button>
    </div>
  );
}

export default EditarPerfil;
