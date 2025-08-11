import { useEffect, useRef, useState } from "react";
import './EditarPerfil.css';

function EditarPerfil() {
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef(null); // 

  useEffect(() => {
    if (!files || files.length === 0) return;

    const objectUrl = URL.createObjectURL(files[0]);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [files]);

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
        <p>Contraseña</p>
        <input></input>
      </div>
      <p>Guardar</p>
    </div>
  );
}

export default EditarPerfil;
