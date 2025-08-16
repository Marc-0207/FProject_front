import '../../constants';
import './JoinEvent.css'; 
import { useCookies } from "react-cookie";
import { useState } from "react";

function JoinEvent() {
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [cookies] = useCookies(["JWT"]);
    const [code, setCode] = useState("");
    const jwTCookie = cookies.JWT;
    const url = window.url;

    function joinEvent(sharecode) {
        const event = url + "/event/join/" + sharecode;
        const headers = {
            'Content-Type': 'application/json',
            'JWT': jwTCookie,
        };
        const data = { sharecode };

        fetch(event, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(async (response) => {
            if (!response.ok) throw new Error(await response.text());
            setMsg("¡Te has unido al evento!");
            setError("");
        })
        .catch(async (err) => {
            setError(await err.message || "Error al unirse");
            setMsg("");
        });
    }

    const handleChange = (e) => {
        setCode(e.target.value);
    };

    return (
        <div className="join-event-container">
            <div className="join-event-box">
                <h2>Unirse a un evento</h2>

                {error && <div className="message error">{error}</div>}
                {msg && <div className="message success">{msg}</div>}

                <label htmlFor="sharecode">Introduce el código del evento:</label>
                <input
                    id="sharecode"
                    type="text"
                    value={code}
                    onChange={handleChange}
                    placeholder="Ej: ABC123"
                />

                <button onClick={() => joinEvent(code)}>Unirse al evento</button>
            </div>
        </div>
    );
}

export default JoinEvent;
