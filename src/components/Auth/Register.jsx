import './Register.css'
function Register(){
    return(
        <>
            <h1>Register</h1>
            <div className="Credenciales">
                <input className="Name" placeholder="Name"></input>
                <input className="Email" placeholder="Email"></input>
                <input className="Password" placeholder="Password"></input>
                <button className="Register">Register</button>
            </div>
        </>
    )
}
export default Register;