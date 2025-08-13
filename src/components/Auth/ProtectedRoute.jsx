import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../../constants";

export default function ProtectedRoute() {
  const [cookies] = useCookies(["JWT"]);
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);
  const url = window.url;

  useEffect(() => {
    if (!cookies.JWT) {
      setChecking(false);
      setValid(false);
      return;
    }
    setChecking(false);
    setValid(true);

    //PARA CUANDO HAGAMOS PETICION AL BACKEND PARA COMPROBAR EL TOKEN (SI LO LLEGAMOS A HACER XD)

    /*     // Petición al backend para validar token
    fetch(url + "/validate-token", {
      headers: { Authorization: `Bearer ${cookies.JWT}` },
    })
      .then((res) => {
        if (res.ok) setValid(true);
        else setValid(false);
      })
      .finally(() => setChecking(false));*/
  }, [cookies]); 

  if (checking) return <div>Cargando...</div>; // Mientras valida

  if (!valid) return <Navigate to="/welcome" replace />; // Token inválido

  return <Outlet />; // Token válido → renderiza página
}
