import { useEffect, useRef, useState } from "react";
import './EditarPerfil.css';
import { editar } from "../SVG";
import Compressor from 'compressorjs';
import { Cookies, useCookies } from "react-cookie";

function EditarPerfil() {
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState();
  const [name, setName] = useState("");
  const [image, setimage] = useState(null);
  const [error, setError] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [cookies, setCookies] = useCookies(["JWT"]);
  const jwTCookie = cookies.JWT;
  const fileInputRef = useRef(null); 
  const url = window.url;


    useEffect(() => {
        const event = url+"/profile"  
        fetch(event,{
             method: 'GET', 
             headers: {
            'JWT': jwTCookie,
                }})
            .then((response) =>{
                if(!response.ok){
                    throw new Error("Error en la respuesta");
                }
                return response.json();
            })
            .then((data) => {
                setEvents(data);
                setLoading(false);
            })
            .catch((err) =>{
                setError(err.message);
                setLoading(false);
            })
    }, []);

  const handleImageChange = (e) =>{
    const file = e.target.files[0];
    if(!file) return;

    setimage(URL.createObjectURL(file));

    new Compressor(file, {
      quality: 0.85,
      convertSize: 0,
      mimeType: 'image/webp',
      success(result){
        const webpUrl = URL.createObjectURL(result);
        setimage(webpUrl);
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
        case "image": setimage(value); break;
        default: break;
    }
  };
  function save(){
    if(!name || image === null){
      setError("Algún campo está vacío")
    }
    else{
      const profile = url+"/profile"
      const headers = {
        'JWT': jwTCookie,
        "Accept": "application/json",
        "Content-Type": "application/json"
      };
      const data = {
          name
      };

      fetch(profile, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(data)
      })
      .then(async (response) => {
          if (!response.ok) throw new Error(await response.text());
          setMsg("¡Perfil editado!");
          setTimeout(() => {
          }, 500);
      })
      .catch(async () => {  
        setError("Error")              
      });
      }
    }
  return (
    <div>
      <div className="ImagenRow">
        <div
          className="ImagenContainer"
          onClick={() => fileInputRef.current.click()}
          style={{ cursor: "pointer" }}
        >
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
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFiles([e.target.files[0]]);
              handleImageChange(e);
            }
          }}
        />
        <div className="FormContainer">
          {error && <p className="error">{error}</p>}
          <p>Nombre de usuario</p>
          <div className="NombreEditable">
            {isEditingName ? (
              <input className="Nombre" value={name} onChange={(e) => handleInputChange(e, "name")} onBlur={() => setIsEditingName(false)} autoFocus/>
              ) : (
              <div className="NombreDisplay">
                <span>{name || "Sin nombre"}</span>
                <button onClick={() => setIsEditingName(true)}>
                  {editar}
                </button>
              </div>
            )}
          </div>
        </div>

      <button className="Guardar" onClick={save}>Guardar</button>
    </div>
  );
}

export default EditarPerfil;
