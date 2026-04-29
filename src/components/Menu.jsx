import { Navbar, Nav, Card, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Menu.css";
import "../styles/navBarHeader.css";
import { useState, useEffect } from "react";
import {
  contarConsultasNoLeidas,
  marcarConsultasLeidas,
} from "../helper/consulta.Api";

import {
  FaHome,
  FaUser,
  FaBalanceScale,
  FaUsers,
  FaChartBar,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaFolder,
  FaSignOutAlt,
  FaEnvelope,
} from "react-icons/fa";

const Menu = () => {
  const navigate = useNavigate();
  const [cantidadConsultas, setCantidadConsultas] = useState(0);

  const cerrarSesion = () => {
    Swal.fire({
      title: `Cerrar sesión`,
      text: "¿Estás seguro de esto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        navigate("/");
      }
    });
  };

  useEffect(() => {
    const obtenerCantidad = async () => {
      const cantidad = await contarConsultasNoLeidas();
      setCantidadConsultas(cantidad);
    };
    obtenerCantidad();
    const interval = setInterval(obtenerCantidad, 15000);
    return () => clearInterval(interval);
  }, []);

  const usuario = JSON.parse(localStorage.getItem("user"));
  const role = usuario?.role;

  const handleClickConsultas = async () => {
    await marcarConsultasLeidas();
    const cantidad = await contarConsultasNoLeidas();
    setCantidadConsultas(cantidad);
  };

  const menus = () => {
    switch (role) {
      case "admin":
        return [
          { to: "inicioadmi", label: "Inicio", icon: <FaHome /> },
          { to: "usuariosadmi", label: "Usuarios", icon: <FaUsers /> },
          { to: "documentosadmi", label: "Documentos", icon: <FaFolder /> },
          { to: "reportesadmi", label: "Reportes", icon: <FaChartBar /> },
        ];
      case "abog":
        return [
          { to: "inicioabog", label: "Inicio", icon: <FaHome /> },
          { to: "agendaabog", label: "Agenda", icon: <FaCalendarAlt /> },
          { to: "clienteabog", label: "Cliente", icon: <FaUsers /> },
          { to: "documentoabog", label: "Documento", icon: <FaFolder /> },
          { to: "tareasabog", label: "Tareas", icon: <FaFolder /> },
          {
            to: "facturacionabog",
            label: "Facturación",
            icon: <FaMoneyBillWave />,
          },
          { to: "juiciosabog", label: "Juicios", icon: <FaBalanceScale /> },
        ];
      case "secre":
        return [
          { to: "iniciosecre", label: "Inicio", icon: <FaHome /> },
          { to: "agendasecre", label: "Agenda", icon: <FaCalendarAlt /> },
          { to: "clientesecre", label: "Cliente", icon: <FaUser /> },
          { to: "documentossecre", label: "Documentos", icon: <FaFolder /> },
          { to: "tareassecre", label: "Tareas", icon: <FaFolder /> },
          {
            to: "facturacionsecre",
            label: "Facturación",
            icon: <FaMoneyBillWave />,
          },
          {
            to: "consultasnuevas",
            label: "Consultas Nuevas",
            icon: <FaEnvelope />,
            badge: cantidadConsultas,
            onClick: handleClickConsultas,
          },
        ];
      default:
        return [];
    }
  };

  const menuItems = menus();

  return (
    <Navbar expand="lg" className="h-100 flex-column">
      <Container className="mb-3">
        <Navbar.Toggle aria-controls="menu-collapse" className="my-2" />
        <Navbar.Collapse id="menu-collapse">
          <Card className="border-primary shadow w-100">
            <Card.Header className="text-center">
              <h3 className="fw-bold h4">Menu</h3>
            </Card.Header>
            <Card.Body className="p-0">
              <Nav className="flex-column p-0 m-0 w-100">
                {menuItems.map((item) => (
                  <NavLink
                    to={item.to}
                    key={item.to}
                    onClick={item.onClick}
                    className="align-items-center py-3 px-4 border-bottom text-decoration-none navhover d-flex w-100"
                  >
                    <span className="me-3">{item.icon}</span>
                    {item.label}
                    {item.badge > 0 && (
                      <span className="badge bg-danger ms-2">{item.badge}</span>
                    )}
                  </NavLink>
                ))}
                <Button
                  variant="link"
                  className="align-items-center py-3 px-4 border-bottom text-decoration-none navhover d-flex w-100 botonCerrarSesion"
                  onClick={cerrarSesion}
                >
                  <span className="me-3">
                    <FaSignOutAlt />
                  </span>
                  Cerrar sesión
                </Button>
              </Nav>
            </Card.Body>
          </Card>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
