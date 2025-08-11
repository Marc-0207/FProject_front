import { useEffect, useState } from "react";
import { calendario } from "../SVG";
import './CrearEvento.css';

function CrearEvento() {
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!files || files.length === 0) return;

    const objectUrl = URL.createObjectURL(files[0]);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [files]);

  return (
    <>
      <div>
        <div>
          <h1>NUEVO EVENTO</h1>
        </div>
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFiles([e.target.files[0]]);
            }
          }}
        />
        <div className="ImagenRow">
          <div className="ImagenContainer">
            {preview ? (
              <img src={preview} className="PreviewImage" alt="Preview" />
            ) : (
              <div className="PlaceholderCircle"></div>
            )}
          </div>
        </div>

        <div className="FormContainer">
          <div className="column">
            <p>Nombre del evento</p>
            <input className="Nombre" placeholder="Nombre" />
          </div>
          <div className="column">
            {/*Añadir opción para añadir fechas */}
            <p>Fecha inicio</p>
            <input className="Calendario" type="date" />
            <p>Descripción</p>
            <textarea></textarea>
          </div>
        </div>

        <button className="CrearEvento">Crear Evento</button>
      </div>
    </>
  );
}

export default CrearEvento;
