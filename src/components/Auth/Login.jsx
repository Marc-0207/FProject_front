import { useState, useEffect } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
function Login(){

    const naviget = useNavigate();
    const [email, setUser] = useState("");
    const [password, setPass] = useState("")
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    useEffect(() => {
        setTimeout(function(){
            setMsg("");
        }, 5000)
    })

    const handleInputChange = (e, type) => {
        switch(type){
            case "email":
                setError("")
                setUser(e.target.value);
                if(e.target.value === ""){
                    setError("Email vacío")
                }
            break;
            case "password":
                setError("")
                setPass(e.target.value);
                if(e.target.value === ""){
                    setError("Contraseña vacía")
                }
            break;
            default:    
        }
    }
    function loginSubmit(){
        if(email !== "" && password != ""){
            let url = "http://localhost:8080/api/auth/login"
            let headers = {
                "Accept": "application/json",
                "Content-type": "application/json"
            };
            let Data = {
                email: email,
                password: password
            };
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(Data)
            })
            .then(async (response) =>{
                if (!response.ok) throw new Error(await response.text())
                    console.log(await response.text()) 
                    setTimeout(function(){
                        naviget("/");
                    }, 500)
            }).catch(async (err) => {
                setError(err.message);
                
            })
        }
    }
    return(
        <>
            <h1>Login</h1>
            <div className="Credenciales">
                <p>
                    {
                        error !== "" ?
                        <span className="error">{error}</span> :
                        <span className="success">{msg}</span>
                    }
                </p>
                <input className="Email" placeholder="Email" value={email} onChange={(e) => handleInputChange(e, "email")}></input>
                <input className="Password" placeholder="Password" value={password} onChange={(e) => handleInputChange(e, "password")}></input>
                <button className="Login" onClick={loginSubmit}>Login</button>
                <p className='forgot'>Forgot password?</p>
            </div>
        </>
    )
}
export default Login;