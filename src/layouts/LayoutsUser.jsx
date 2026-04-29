import { Container, Row, Col } from "react-bootstrap";
import Menu from "../components/Menu";
import Footer from "../shared/Footer";
import NavBarHeaderLogin from "../components/NavBarHeaderLogin";
import { Outlet } from "react-router-dom";
import "../styles/layoutsAdmi.css";

const LayoutsAdmi = () => {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("user"));
  const role = usuarioLogueado?.role.toLowerCase();
  return (
    <div className="app-layout">
      <NavBarHeaderLogin></NavBarHeaderLogin>
      <main className="d-flex flex-column">
        <Container  className="my-4 flex-grow-1">
          <Row className="h-100">
            <Col md={3} lg={3} className="d-flex" >
              <div className="menu">
                <Menu role={role} />
              </div>
            </Col>
            <Col md={9} lg={9}>
              <Outlet></Outlet>
            </Col>
            {/*  Este componente lo vamos a utilizar para la 3era entrega 
            <Col md={3} lg={3}>
              <ChatInterno></ChatInterno>
            </Col>*/}
          </Row>
        </Container>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default LayoutsAdmi;
