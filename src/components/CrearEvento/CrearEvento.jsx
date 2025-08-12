import { useEffect, useState } from "react";
import './CrearEvento.css';

function CrearEvento() {
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState();
  const [dates, setDates] = useState([""]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!files || files.length === 0) return;

    const objectUrl = URL.createObjectURL(files[0]);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [files]);

  function AñadirFecha(){
    if(dates.length===16){
      setError("No puedes añadir más de 16 dates")
      return;
    }
    else{
      setError("");
      setDates([...dates, ""]);
      return(
        <input className="Calendario" type="date"/>
      )
    }
  }
  const handleInputChange = (e, type) => {
      const value = e.target.value;
      setError("");

      switch (type) {
          case "name": setName(value); break;
          case "description": setDescription(value); break;
          case "fecha": setDates(value); break;
          default: break;
      }
  };
  function newEvent(){
    if(!name || !description || dates[0] === ""){
      setError("Algún campo está vacío")
    }
    else{
        const url = "https://localhost:8080/api/event";
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        const data = {
            name,
            dates,
            description
        };

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        })
            .then(async (response) => {
                if (!response.ok) throw new Error(await response.text());
                setMsg("¡Evento creado!");
                setTimeout(() => {
                }, 500);
            })
            .catch(async () => {  
              setError("A")              
            });

        setName("");
        setDescription("");
        setDates([""]);
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
          {error && <p className="error">{error}</p>}
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
                {dates.map((fecha, i) => (
                <input key={i} className="Calendario"type="date"value={fecha}onChange={(e) => {
                  const nuevasFechas = [...dates];
                  nuevasFechas[i] = e.target.value;
                  setDates(nuevasFechas);
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
