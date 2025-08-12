import { useEffect, useRef, useState } from "react";
import './EditarPerfil.css';
import { editar } from "../SVG";

function EditarPerfil() {
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState();
  const [name, setName] = useState("");
  const fileInputRef = useRef(null); // 

  useEffect(() => {
    if (!files || files.length === 0) return;

    const objectUrl = URL.createObjectURL(files[0]);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [files]);

  function save(){
    if(!name){

    }
    else{
      const profile = url+"/profile"
      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      };
      const data = {
          name,
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
        setError("A")              
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
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFiles([e.target.files[0]]);
          }
        }}
        style={{ display: "none" }}
      />
      <div className="FormContainer">
        <p>Nombre de usuario</p>
        <input></input>
      </div>
      <button className="Guardar" onClick={save}>Guardar</button>
    </div>
  );
}

export default EditarPerfil;
