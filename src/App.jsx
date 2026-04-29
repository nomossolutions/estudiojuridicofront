import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginPages } from "./pages/LoginPages";
import LayoutsUser from "./layouts/LayoutsUser";
import ErrorPages from "./pages/ErrorPages";
import InicioAdmi from "./pages/Administrador/InicioAdmi";
import InicioAbog from "./pages/Abogado/InicioAbog";
import InicioSecre from "./pages/Secretario/InicioSecre";
import UsuariosAdmi from "./pages/Administrador/UsuariosAdmi";
import DocumentosAdmi from "./pages/Administrador/DocumentosAdmi";
import ReportesAdmi from "./pages/Administrador/ReportesAdmi";
import AgendaAbog from "./pages/Abogado/AgendaAbog";
import ClienteAbog from "./pages/Abogado/ClientesAbog";
import DocumentoAbog from "./pages/Abogado/DocumentosAbog";
import TareasAbog from "./pages/Abogado/TareasAbog";
import FacturacionAbog from "./pages/Abogado/FacturacionAbog";
import JuiciosAbog from "./pages/Abogado/JuiciosAbog";
import AgendaSecre from "./pages/Secretario/AgendaSecre";
import ClienteSecre from "./pages/Secretario/ClientesSecre";
import DocumentosSecre from "./pages/Secretario/DocumentosSecre";
import TareasSecre from "./pages/Secretario/TareasSecre";
import FacturacionSecre from "./pages/Secretario/FacturacionSecre";
import ProteccionRutas from "./routers/ProteccionRutas";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import ConsultasNuevas from "./pages/Secretario/consultasNuevas";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPages />} />
        <Route path="app" element={<LayoutsUser />}>
          <Route element={<ProteccionRutas roleUsuario="admin" />}>
            <Route path="inicioadmi" element={<InicioAdmi />} />
            <Route path="usuariosadmi" element={<UsuariosAdmi />} />
            <Route path="documentosadmi" element={<DocumentosAdmi />} />
            <Route path="reportesadmi" element={<ReportesAdmi />} />
          </Route>

          <Route element={<ProteccionRutas roleUsuario="secre" />}>
            <Route path="iniciosecre" element={<InicioSecre />} />
            <Route path="agendasecre" element={<AgendaSecre />} />
            <Route path="clientesecre" element={<ClienteSecre />} />
            <Route path="documentossecre" element={<DocumentosSecre />} />
            <Route path="tareassecre" element={<TareasSecre />} />
            <Route path="facturacionsecre" element={<FacturacionSecre />} />
            <Route path="consultasnuevas" element={<ConsultasNuevas />} />
          </Route>

          <Route element={<ProteccionRutas roleUsuario="abog" />}>
            <Route path="inicioabog" element={<InicioAbog />} />
            <Route path="agendaabog" element={<AgendaAbog />} />
            <Route path="clienteabog" element={<ClienteAbog />} />
            <Route path="documentoabog" element={<DocumentoAbog />} />
            <Route path="tareasabog" element={<TareasAbog />} />
            <Route path="facturacionabog" element={<FacturacionAbog />} />
            <Route path="juiciosabog" element={<JuiciosAbog />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPages />} />
          <Route path="nosotros" element={<Nosotros />} />  
            <Route path="contacto" element={<Contacto/>} />

      </Routes>  
    </BrowserRouter>
  );
}

export default App;
