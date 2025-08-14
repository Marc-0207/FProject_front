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
  const jwTCookie = cookies.JWT;
  const fileInputRef = useRef(null);
  const url = window.url;

  useEffect(() => {
    if (!files || files.length === 0) return;

    const objectUrl = URL.createObjectURL(files[0]);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [files]);

  function AñadirFecha(){
    if(date.length===16){
      setError("No puedes añadir más de 16 fechas")
      return;
    }
    else{
      setError("");
      setDate([...date, ""]);
      return(
        <input className="Calendario" type="date"/>
      )
    }
  }

  function añadirImagen(){
    console.log(imgFile.length)
    if(imgFile.length<<=3){
      setError("Solo puedes seleccionar un máximo de 3 imágenes")
      return;
    }
    else{
      setError("");
      setImgFile([...imgFile, ""]);
      return(
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          id="imgFile"
          className="imgFile"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFiles([e.target.files[0]]);
              handleInputChange(e, "image")
              {/*handleImageChange(e); */}
            }
          }}
        />
      )
    }
  }

  const handleImageChange = (e) =>{
    const file = e.target.files[0];
    if(!file) return;

    setImgFile(URL.createObjectURL(file));

    new Compressor(file, {
      quality: 0.85,
      convertSize: 0,
      mimeType: 'image/webp',
      success(result){
        const webpUrl = URL.createObjectURL(result);
        setImgFile(webpUrl);
      },
      error(err){
        console.error('Compression error: ', err.message);
      }
    })
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
  function newEvent(){
    if(!name || !description || date[0] === "" || imgFile===null ){
      setError("Algún campo está vacío")
    }
    else{
      const event = url+"/event/create"
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

      function sendImage(){
      const secondEndpoint = url + "/image/"+name;
      const formData = new FormData();
      const fileInput = document.getElementById('imgFile');
      const file = fileInput.files[0];

      formData.append('imgFile', file)

      const secondHeaders ={
        'JWT': jwTCookie,
      }

      fetch(secondEndpoint, {
        method: "POST",
        headers: secondHeaders,
        body: formData,
      })
        .then(async (response) => {
          if (!response.ok) throw new Error(await response.text());
          setMsg("Evento Creado!!");
        })
        .catch((err) => setError(err.message));
      }

  return (
    <>
      <div>
        <div>
          <h1>NUEVO EVENTO</h1>
        </div>
        <div className="ImagenRow">
          <div className="ImagenContainer"
          onClick={() => fileInputRef.current.click()}
          style={{ cursor: "pointer" }}>
            {preview ? (
              <img src={preview} className="PreviewImage" alt="Preview" />
            ) : (
              <div className="PlaceholderCircle"></div>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          id="imgFile"
          className="imgFile"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFiles([e.target.files[0]]);
              handleInputChange(e, "image")
              {/*handleImageChange(e); */}
            }
          }}
          
        />
        
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
                <input key={i} className="Calendario"type="date"value={fecha}onChange={(e) => {
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
    </>
  );
}

export default CrearEvento;
