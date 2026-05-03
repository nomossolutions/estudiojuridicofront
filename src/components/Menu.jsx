import { Navbar, Nav, Card, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Menu.css";
import "../styles/navBarHeader.css";
import { useState, useEffect, useCallback } from "react";
import {
  contarConsultasNoLeidas,
  marcarConsultasLeidas,
} from "../helper/consulta.Api";
import { FaSignOutAlt } from "react-icons/fa";
import { getMenuByRole, ROLES } from "../config/menuConfig";

// Intervalo de polling en milisegundos (30 segundos)
const POLLING_INTERVAL = 30000;

const Menu = () => {
  const navigate = useNavigate();
  const [cantidadConsultas, setCantidadConsultas] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Obtener usuario de manera segura
  const getUser = useCallback(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (error) {
      console.error("Error al parsear usuario del localStorage:", error);
      return null;
    }
  }, []);

  const usuario = getUser();
  const role = usuario?.role;

  // Obtener cantidad de consultas con manejo de errores
  const obtenerCantidadConsultas = useCallback(async () => {
    if (role !== ROLES.SECRETARIO) return;
    
    try {
      setIsLoading(true);
      const cantidad = await contarConsultasNoLeidas();
      setCantidadConsultas(cantidad || 0);
    } catch (error) {
      console.error("Error al obtener consultas no leídas:", error);
      setCantidadConsultas(0);
    } finally {
      setIsLoading(false);
    }
  }, [role]);

  // Efecto para polling de consultas
  useEffect(() => {
    obtenerCantidadConsultas();
    
    const interval = setInterval(obtenerCantidadConsultas, POLLING_INTERVAL);
    
    return () => clearInterval(interval);
  }, [obtenerCantidadConsultas]);

  const cerrarSesion = () => {
    const confirmToast = toast.warning(
      ({ closeToast }) => (
        <div>
          <p>¿Estás seguro?</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => {
                closeToast();
                localStorage.removeItem("user");
                navigate("/");
              }}
              style={{
                padding: "5px 15px",
                backgroundColor: "#3085d6",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Sí, cerrar sesión
            </button>
            <button
              onClick={closeToast}
              style={{
                padding: "5px 15px",
                backgroundColor: "#d33",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleClickConsultas = async () => {
    try {
      await marcarConsultasLeidas();
      await obtenerCantidadConsultas();
    } catch (error) {
      console.error("Error al marcar consultas como leídas:", error);
    }
  };

  // Obtener items del menú según el rol
  const menuItems = getMenuByRole(role);

  // Si no hay usuario o rol válido, no mostrar menú
  if (!usuario || !role || menuItems.length === 0) {
    return null;
  }

  return (
    <Navbar expand="lg" className="h-100 flex-column" aria-label="Menú de navegación principal">
      <Container className="mb-3">
        <Navbar.Toggle 
          aria-controls="menu-collapse" 
          aria-label="Alternar menú de navegación"
          className="my-2" 
        />
        <Navbar.Collapse id="menu-collapse">
          <Card className=" shadow w-100">
            <Card.Header className="text-center bg-oxford-navy text-white">
              <h3 className="fw-bold h4 mb-0">Menú</h3>
            </Card.Header>
            <Card.Body className="p-0">
              <Nav className="flex-column p-0 m-0 w-100" as="ul">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  const showBadge = item.hasBadge && cantidadConsultas > 0;
                  
                  return (
                    <Nav.Item as="li" key={item.to}>
                      <NavLink
                        to={item.to}
                        onClick={item.hasBadge ? handleClickConsultas : undefined}
                        className={({ isActive }) =>
                          `align-items-center py-3 px-4 border-bottom text-decoration-none navhover d-flex w-100 ${
                            isActive ? "active" : ""
                          }`
                        }
                        aria-label={item.ariaLabel}
                      >
                        <span className="me-3" aria-hidden="true">
                          <IconComponent style={{ color: item.color }} />
                        </span>
                        <span className="flex-grow-1">{item.label}</span>
                        {showBadge && (
                          <span 
                            className="badge bg-danger rounded-pill ms-2" 
                            aria-live="polite"
                            aria-label={`${cantidadConsultas} consultas no leídas`}
                          >
                            {cantidadConsultas}
                          </span>
                        )}
                      </NavLink>
                    </Nav.Item>
                  );
                })}
                
                <Nav.Item as="li">
                  <button
                    type="button"
                    className="align-items-center py-3 px-4 border-bottom text-decoration-none navhover d-flex w-100 botonCerrarSesion bg-transparent border-0 text-start"
                    onClick={cerrarSesion}
                    aria-label="Cerrar sesión"
                  >
                    <span className="me-3" aria-hidden="true">
                      <FaSignOutAlt />
                    </span>
                    <span className="flex-grow-1">Cerrar sesión</span>
                  </button>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
