import { Navigate, Outlet } from "react-router-dom";

const ProteccionRutas = ({ roleUsuario }) => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  if (!userString || !token) {
    return <Navigate to="/" />;
  }

  const usuarioParseado = JSON.parse(userString);

  if (usuarioParseado?.role?.toLowerCase() === roleUsuario.toLowerCase()) {
    return <Outlet />;
  }
  
  return <Navigate to="/" />;
};

export default ProteccionRutas;
