import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../constants';
import './ListaEventos.css';
import { useCookies } from "react-cookie";
import VoteElection from './VoteElection';

function ListaEventos() {
    const [myevents, setMyEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cookies] = useCookies(["JWT"]);
    const [imageUrls, setImageUrls] = useState([]);

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
            .then(async (data) => {
                setSelectedEvent(data);
                console.log(data)

                if (data.images && data.images.length > 0) {
                    const imagePromises = data.images.map(async (image) => {
                        const res = await fetch(url + "/image/" + image.name, {
                            headers: {
                                'JWT': jwTCookie,
                            }
                        });
                        if (!res.ok) throw new Error("Error al obtener imagen: " + image.name);
                        const blob = await res.blob();
                        return URL.createObjectURL(blob); 
                    });

                    const urls = await Promise.all(imagePromises);
                    setImageUrls(urls); 
                } else {
                    setImageUrls([]); 
                }
            })
            .catch((err) => {
                setError(err.message);
            });
    }
    return (
      <>
        <div className="ListaEventos">
          <div className="EventosPersonales">
            <div className="CJB">
              <h1>Eventos creados por ti</h1>
              <button onClick={() => navigate("/crearevento")}>
                Crear evento
              </button>
            </div>
            <ul className="NS">
              {myevents.map((event) => (
                <li
                  key={event.name}
                  onClick={() => showEvent(event.id)}
                  style={{ cursor: "pointer" }}
                >
                  {event.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="EventosParticipas">
            <div className="CJB">
              <h1 className="NS">Eventos en los que participas</h1>
              <button onClick={() => navigate("/joinevent")}>
                Unirse a evento
              </button>
            </div>
            <ul className="NS">
              {events.map((event) => (
                <li
                  key={event.name}
                  onClick={() => showEvent(event.id)}
                  style={{ cursor: "pointer" }}
                >
                  {event.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {selectedEvent && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h2>{selectedEvent.name}</h2>
              <p>
                <strong>Descripción:</strong> {selectedEvent.description}
              </p>
              <div>
                <strong>Fotos:</strong>
                {imageUrls.length > 0 ? (
                  <ul className='popup-images-list'>
                    {imageUrls.map((src, idx) => (
                      <li key={idx} className="popup-images">
                        <img
                          src={src}
                          width={100}
                          height={100}
                          loading="eager"
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay imágenes</p>
                )}
              </div>

              <div>
                <strong>Votos:</strong>
                {selectedEvent.elections &&
                selectedEvent.elections.length > 0 ? (
                  <ul className="Voto">
                    {selectedEvent.elections.map((election) => (
                      <VoteElection election={election}/>
                    ))}
                  </ul>
                ) : (
                  <p>No hay elecciones</p>
                )}
              </div>

              <p>
                <strong>Invitados:</strong>{" "}
                {selectedEvent.members ? selectedEvent.members.length : 0}
              </p>
              {selectedEvent.shareCode && (
                <p>
                  Código evento:{" "}
                  <strong className="SS">{selectedEvent.shareCode}</strong>
                </p>
              )}
              <button onClick={() => setSelectedEvent(null)}>Cerrar</button>
            </div>
          </div>
        )}
      </>
    );
}

export default ListaEventos;
