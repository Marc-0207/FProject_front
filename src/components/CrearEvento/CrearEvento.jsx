import { useEffect, useState } from "react";
import './CrearEvento.css';
import '../../constants';
import Compressor from 'compressorjs';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

function CrearEvento() {
  const [preview, setPreview] = useState();
  const [date, setDate] = useState([""]);
  const [error, setError] = useState("");
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgFile, setImgFile] = useState([null]);
  const [cookies] = useCookies(["JWT"]);
  const [msg, setMsg] = useState("");
  const [popup, setPopup] = useState(false);
  const [link, setLink] = useState("");popup
  const naviget = useNavigate();
  const jwTCookie = cookies.JWT;
  const url = window.url;

  useEffect(() => {
    if (!imgFile || !imgFile[0]) return;
    const objectUrl = URL.createObjectURL(imgFile[0]);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imgFile]);

  function AñadirFecha() {
    if (date.length === 16) {
      setError("No puedes añadir más de 16 fechas");
    } else {
      setError("");
      setDate([...date, ""]);
    }
  }

  function añadirImagen() {
    if (imgFile.length >= 3) {
      setError("Solo puedes seleccionar un máximo de 3 imágenes");
      return;
    }
    setError("");
    setImgFile([...imgFile, null]);
  }

  function convertToWebp(img) {
    return new Promise((resolve) => {
      if (!img) return resolve(null);
      new Compressor(img, {
        quality: 0.85,
        convertSize: 0,
        mimeType: 'image/webp',
        success(result) {
          resolve(result);
        },
        error(err) {
          console.error('Compression error: ', err.message);
          resolve(null);
        }
      });
    });
  }

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    setError("");
    switch (type) {
      case "name": setName(value); break;
      case "description": setDescription(value); break;
      case "fecha": setDate(value); break;
      case "image": setImgFile(value); break;
      default: break;
    }
  };

  function newEvent() {
    if (!name || !description || date[0] === "") {
      setError("Algún campo está vacío");
      return;
    }
    const event = url + "/event/create";
    const headers = {
      'JWT': jwTCookie,
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
    const data = { name, date, description };
    fetch(event, {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    })
      .then(async (response) => {
        console.log("Informacion: "+ await response.text());
        if (!response.ok) throw new Error(await response.text());        
        setId(response.json().id);
        await sendImage();
        if (!popup) setPopup(true);
      })
      .catch(err => setError(err.message));
  }

  async function sendImage() {
    const secondEndpoint = url + "/image/" + name;
    const secondHeaders = { 'JWT': jwTCookie };

    for (let file of imgFile) {
      let imgWebp = await convertToWebp(file);
      if (!imgWebp) continue;

      let formData = new FormData();
      formData.append(`imgFile`, imgWebp);
      fetch(secondEndpoint, {
        method: "POST",
        headers: secondHeaders,
        body: formData,
      })
        .then(async (response) => {
          if (!response.ok) throw new Error(await response.text());
        })
        .catch((err) => setError(err.message));
    }
  }

  function getcode() {
    const thirdEndpoint = url + "/event/" + id;
    const thirdHeader = { 'JWT': jwTCookie };

    fetch(thirdEndpoint, {
      method: "GET",
      headers: thirdHeader,
    })
      .then((response) => {
        
        if (!response.ok) throw new Error("Error en la respuesta");
        let info = response.json();
        setId(info.id)
        return response.json();
      })
      .then((data) => setLink(data.shareCode))
      .catch((err) => setError(err.message));
  }

  useEffect(() => {
    if (popup) getcode();
  }, [popup]);

  function goback() {
    setPopup(false);
    naviget("/");
  }

  function copiar() {
    navigator.clipboard.writeText(link)
      .then(() => {
        setMsg("Link copiado");
        setTimeout(() => setMsg(""), 2000);
      })
      .catch(() => setMsg("Error al copiar"));
  }

  return (
    <>
      <div>
        <h1 className="NS">NUEVO EVENTO</h1>
        <div className="EventoImagenRow">
          {imgFile.map((file, index) => {
            const previewUrl = file ? URL.createObjectURL(file) : null;
            return (
              <div
                key={index}
                className="EventoImagenContainer"
                onClick={() => document.getElementById(`fileInput-${index}`).click()}
              >
                {previewUrl ? (
                  <img src={previewUrl} className="EventoPreviewImage" alt={`Preview ${index}`} />
                ) : (
                  <div className="EventoPlaceholder"></div>
                )}
                <input
                  id={`fileInput-${index}`}
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const updated = [...imgFile];
                      updated[index] = e.target.files[0];
                      setImgFile(updated);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
        <button className="btn-centro" onClick={añadirImagen}>Añadir Imagen</button>

<div className="EventoFormContainer">
  {
    error !== "" ?
    <span className="error">{error}</span> :
    <span className="success">{msg}</span>
  }
  <div className="column column-single">
    <p className="NS">Nombre del evento</p>
    <input
      className="EventoNombre"
      value={name}
      onChange={(e) => handleInputChange(e, "name")}
      placeholder="Nombre del evento"
    />

    <div className="Fechas" style={{ marginTop: '1.5rem' }}>
      <div className="FechasHeader">
        <p  className="NS">Fecha/s</p>
        <button className="NS" onClick={AñadirFecha}>Añadir Fecha</button>
      </div>
      <div className="FechasGrid">
        {date.map((fecha, i) => (
          <input
            key={i}
            className="Calendario"
            type="date"
            value={fecha}
            onChange={(e) => {
              const nuevasFechas = [...date];
              nuevasFechas[i] = e.target.value;
              setDate(nuevasFechas);
            }}
          />
        ))}
      </div>
    </div>

    <p   className="NS" style={{ marginTop: '1.5rem' }}>Descripción</p>
    <textarea
      value={description}
      onChange={(e) => handleInputChange(e, "description")}
      placeholder="Descripción del evento"
    />
  </div>
</div>

        <button className="CrearEvento" onClick={newEvent}>Crear Evento</button>
      </div>

      {popup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>{msg}</p>
            <p>Evento Creado!!</p>
            <p>Link: {link}</p>
            <button onClick={copiar}>Copiar</button>
            <button onClick={goback}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default CrearEvento;
