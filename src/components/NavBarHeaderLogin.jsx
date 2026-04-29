import { Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import "../styles/navBarHeader.css";
import { useNavigate } from "react-router-dom";

const NavBarHeaderLogin = () => {
  const navigate = useNavigate();
  const cerrarSesion = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Navbar className="styloHeader">
      <Container
        fluid
        className="d-flex justify-content-start align-items-center"
      >
        <Navbar.Brand className="ms-3">
          <a to="/" onClick={cerrarSesion}>
            <img
              src={logo}
              alt="Logo estudio jurídico"
              className="logo-header"
              loading="lazy"
            />
          </a>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBarHeaderLogin;
