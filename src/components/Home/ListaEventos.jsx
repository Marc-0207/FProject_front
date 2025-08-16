import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../constants';
import './ListaEventos.css';
import { useCookies } from "react-cookie";

function ListaEventos() {
    const [myevents, setMyEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cookies] = useCookies(["JWT"]);
    const navigate = useNavigate();
    const jwTCookie = cookies.JWT;
    const url = window.url;

    useEffect(() => {
        const event = url + "/event/oun-events";
        fetch(event, {
            method: 'GET',
            headers: {
                'JWT': jwTCookie,
            }
        })
        .then((response) => {
            if (!response.ok) throw new Error("Error en la respuesta");
            return response.json();
        })
        .then((data) => {
            setMyEvents(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        const event = url + "/event/member-events";
        fetch(event, {
            method: 'GET',
            headers: {
                'JWT': jwTCookie,
            }
        })
        .then((response) => {
            if (!response.ok) throw new Error("Error en la respuesta");
            return response.json();
        })
        .then((data) => {
            setEvents(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    function showEvent(eventName) {
        const eventUrl = url + "/event/" + eventName;
        fetch(eventUrl, {
            method: 'GET',
            headers: {
                'JWT': jwTCookie,
            }
        })
        .then((response) => {
            if (!response.ok) throw new Error("Error en la respuesta");
            return response.json();
        })
        .then((data) => {
            setSelectedEvent(data);
        })
        .catch((err) => {
            setError(err.message);
        });
    }

    return (
        <>
        <div className="ListaEventos">
            <div className="EventosPersonales">
                <h1>Eventos creados por ti</h1>
                <ul>
                    {myevents.map((event) => (
                        <li
                            key={event.name}
                            onClick={() => showEvent(event.name)}
                            style={{ cursor: 'pointer' }}
                        >
                            {event.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="EventosParticipas">
                <h1>Eventos en los que participas</h1>
                <ul>
                    {events.map((event) => (
                        <li
                            key={event.name}
                            onClick={() => showEvent(event.name)}
                            style={{ cursor: 'pointer' }}
                        >
                            {event.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="Calendario">
                <button onClick={() => navigate('/calendario')}>Ver calendario</button>
            </div>
        </div>

{selectedEvent && (
  <div className="popup-overlay">
    <div className="popup-box">
      <h2>{selectedEvent.name}</h2>
      <p><strong>Descripción:</strong> {selectedEvent.description}</p>

      <div>
        <strong>Fotos:</strong>
        {selectedEvent.images && selectedEvent.images.length > 0 ? (
          <ul>
            {selectedEvent.images.map((img, idx) => (
              <li key={idx}>{img.name}</li> // o <img src={urlBase + img.name} alt={img.name} /> si tienes URL base
            ))}
          </ul>
        ) : (
          <p>No hay imágenes</p>
        )}
      </div>

      <div>
        <strong>Votos:</strong>
        {selectedEvent.elections && selectedEvent.elections.length > 0 ? (
          <ul>
            {selectedEvent.elections.map((election) => (
              <li key={election.id}>
                Fecha: {election.date}, Votos: {election.count}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay elecciones</p>
        )}
      </div>

      <p><strong>Invitados:</strong> {selectedEvent.members ? selectedEvent.members.length : 0}</p>

      <button onClick={() => setSelectedEvent(null)}>Cerrar</button>
    </div>
  </div>
)}
        </>
    );
}

export default ListaEventos;
