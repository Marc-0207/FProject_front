import { useEffect, useState, useRef } from "react";
import './CrearEvento.css';
import '../../constants'
import Compressor from 'compressorjs';
import { Cookies, useCookies } from "react-cookie";

function CrearEvento() {
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState();
  const [date, setDate] = useState([""]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgFile, setImgFile] = useState([null]);
  const [cookies, setCookies] = useCookies(["JWT"]);
  const [msg, setMsg] = useState("");
  const [popup, setPopup] = useState(false);
  const [link, setLink] = useState("");
  const jwTCookie = cookies.JWT;
  const fileInputRef = useRef(null);
  const url = window.url;

  useEffect(() => {
    if (!imgFile || !imgFile[0]) return;

    const objectUrl = URL.createObjectURL(imgFile[0]);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [imgFile]);


  function AñadirFecha() {
    if (date.length === 16) {
      setError("No puedes añadir más de 16 fechas")
      return;
    }
    else {
      setError("");
      setDate([...date, ""]);
      return (
        <input className="Calendario" type="date" />
      )
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
  return new Promise((resolve, reject) => {
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
    if (!name || !description || date[0] === "" || imgFile.length === 0 || imgFile.every(f => !f)) {
      setError("Algún campo está vacío");
      return;
    }

    else {
      const event = url + "/event/create"
      const headers = {
        'JWT': jwTCookie,
        "Accept": "application/json",
        "Content-Type": "application/json"
      };
      const data = {
        name,
        date,
        description
      };
      fetch(event, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      })
        .then(async (response) => {
          if (!response.ok) throw new Error(await response.text());
          sendImage();
          setTimeout(() => {
          }, 500);
        })
        .catch(async (err) => {
          setError(err.message)
        });
    }
  }

  async function sendImage() {
    const secondEndpoint = url + "/image/" + name;
    const secondHeaders = { 'JWT': jwTCookie };

    for (let file of imgFile) {
      let imgWebp = await convertToWebp(file);
      if (imgWebp == null) {
        continue;
      }

      let formData = new FormData();
      formData.append(`imgFile`, imgWebp);
      fetch(secondEndpoint, {
        method: "POST",
        headers: secondHeaders,
        body: formData,
      })
        .then(async (response) => {
          if (!response.ok) throw new Error(await response.text());
          setPopup(true);
        })
        .catch((err) => setError(err.message));
    }
  }

  function getcode(){
    const thirdEndpoint = url + "/event/" + name;
    const thirdHeader = {
      'JWT' : jwTCookie
    }

    fetch(thirdEndpoint, {
      method: "GET",
      headers: thirdHeader,
    })
    .then((response) =>{
      if(!response.ok){
        throw new Error("Error en la respuesta");
      }
      return response.json();
    })
    .then((data) => {
        const code = data.shareCode; 
        setLink(code);
        })
      .catch((err) =>{
      setError(err.message);
  })
}

  useEffect(() => {
    if (popup) {
      getcode();
    }
  }, [popup]);

  return (
    <>
      <div>
        <div>
          <h1>NUEVO EVENTO</h1>
        </div>
        <div className="ImagenRow">
          {imgFile.map((file, index) => {
            const previewUrl = file ? URL.createObjectURL(file) : null;
            return (
              <div
                key={index}
                className="ImagenContainer"
                onClick={() => document.getElementById(`fileInput-${index}`).click()}
                style={{ cursor: "pointer" }}
              >
                {previewUrl ? (
                  <img src={previewUrl} className="PreviewImage" alt={`Preview ${index}`} />
                ) : (
                  <div className="PlaceholderCircle"></div>
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
        <button onClick={añadirImagen}>Añadir Imagen</button>
        <div className="FormContainer">
          {
            error !== "" ?
              <span className="error">{error}</span> :
              <span className="success">{msg}</span>
          }
          <div className="column">
            <p>Nombre del evento</p>
            <input className="Nombre" value={name} onChange={(e) => handleInputChange(e, "name")} />
          </div>
          <div className="column">
            <div className="Fechas">
              <div className="FechasHeader">
                <p>Fecha/s</p>
                <button onClick={AñadirFecha}>Añadir Fecha</button>
              </div>
              <div className="FechasGrid">
                {date.map((fecha, i) => (
                  <input key={i} className="Calendario" type="date" value={fecha} onChange={(e) => {
                    const nuevasFechas = [...date];
                    nuevasFechas[i] = e.target.value;
                    setDate(nuevasFechas);
                  }}
                  />
                ))}
              </div>
            </div>
            <p>Descripción</p>
            <input value={description} onChange={(e) => handleInputChange(e, "description")} />
          </div>
        </div>

        <button className="CrearEvento" onClick={newEvent}>Crear Evento</button>
      </div>
        {popup && (
            <div className="popup-overlay">
              <div className="popup">
                <p>Evento Creado!!</p>
                <p>Link: {link}</p> 
                <button onClick={() => setPopup(false)}>Cerrar</button>
              </div>
            </div>
        )}
    </>
  );
}

export default CrearEvento;