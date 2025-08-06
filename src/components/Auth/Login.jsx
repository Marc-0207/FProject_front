import './Login.css'
function Login(){
    return(
        <>
            <h1>Login</h1>
            <div className="Credenciales">
                <input className="Email" placeholder="Email"></input>
                <input className="Password" placeholder="Password"></input>
                <button className="Login">Login</button>
                <p className='forgot'>Forgot password?</p>
            </div>
        </>
    )
}
export default Login;