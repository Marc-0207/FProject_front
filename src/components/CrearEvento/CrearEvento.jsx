import { useEffect, useState } from "react";
import './CrearEvento.css';

function CrearEvento() {
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState();
  const [fechas, setFechas] = useState(1);
  const [error, setError] = useState("");
  const [nombre, setnombre] = useState();
  const [descripcion, setDescripcion] = useState();

  useEffect(() => {
    if (!files || files.length === 0) return;

    const objectUrl = URL.createObjectURL(files[0]);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [files]);

  function AñadirFecha(){
    if(fechas===16){
      setError("No puedes añadir más de 16 fechas")
      return;
    }
    else{
      setError("");
      setFechas(fechas + 1);
      return(
        <input classnombre="Calendario" type="date"/>
      )
    }
  }
  const handleInputChange = (e, type) => {
      const value = e.target.value;
      setError("");

      switch (type) {
          case "nombre": setnombre(value); break;
          case "Descripción": setDescripcion(value); break;
          case "fecha": setFechas(value); break;
          default: break;
      }
  };
  function newEvent(){
    if(!nombre || !Descripción || !fechas){
      setError("Algún campo está vacío")
    }
  }

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
        <div classnombre="ImagenRow">
          <div classnombre="ImagenContainer">
            {preview ? (
              <img src={preview} classnombre="PreviewImage" alt="Preview" />
            ) : (
              <div classnombre="PlaceholderCircle"></div>
            )}
          </div>
        </div>

        <div classnombre="FormContainer">
          <div classnombre="column">
            <p>Nombre del evento</p>
            <input classnombre="Nombre" placeholder="Nombre" value={nombre} onChange={(e) => handleInputChange(e, "nombre")} /> 
          </div>
          <div classnombre="column">
            <div classnombre="Fechas">
              <div classnombre="FechasHeader">
                <p>Fecha/s</p>
                <button onClick={AñadirFecha}>Añadir Fecha</button>
              </div>
              {error && <p classnombre="error">{error}</p>}
              <div classnombre="FechasGrid">
                {Array.from({ length: fechas }, (_, i) => (
                  <input key={i} classnombre="Calendario" type="date" value={fechas} onChange={(e) => handleInputChange(e, "fecha")} />
                ))}
              </div>


            </div>
            <p>Descripción</p>
            <textarea value={descripcion} onChange={(e) => handleInputChange(e, "descripcion")}></textarea>
          </div>
        </div>

        <button classnombre="CrearEvento" onClick={newEvent}>Crear Evento</button>
      </div>
    </>
  );
}

export default CrearEvento;
