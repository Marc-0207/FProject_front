import { useNavigate, } from 'react-router-dom';
import { useEffect, useState} from 'react';
import '../../constants'
import { Cookies, useCookies } from "react-cookie";

function ListaEventos(){
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cookies, setCookies] = useCookies(["JWT"]);
    const navigate = useNavigate();
    const jwTCookie = cookies.JWT;
    const url = window.url;

    useEffect(() => {
        const event = url+"/event"  
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

    return(
        <>
        <div className="ListaEventos">
            <div className="EventosPersonales">
                <h1>Eventos creados por ti</h1>
                {/*Recibir eventos que has creado */}
            </div>
            <div className="EventosParticipas">
                <h1>Eventos en los que participas</h1>
                <ul>
                    {events.map((event) =>(
                        <li key={event.name}>{event.name}</li>
                    ))}
                </ul>
            </div>
            <div className="Calendario">
                <button onClick={() => navigate('/calendario')}>Ver calendario</button>
            </div>
        </div>
        </>
    )
}
export default ListaEventos;