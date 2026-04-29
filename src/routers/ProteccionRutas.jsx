import { Navigate, Outlet } from "react-router-dom";

const ProteccionRutas = ({ roleUsuario }) => {
  const token = localStorage.getItem("token");
  const usuarioParseado = JSON.parse(localStorage.getItem("user"));

  if (!usuarioParseado || !token) {
    return <Navigate to="/" />;
  }
  if (usuarioParseado?.role?.toLowerCase() === roleUsuario.toLowerCase()) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

export default ProteccionRutas;
