import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="backgraundFooter">
 <Row className="text-center justify-content-center">
        <Col xs={12} className="d-flex flex-column flex-lg-row align-items-center justify-content-center gap-lg-3">
          <div className="order-1 order-lg-1">
            <Link to="/contacto" className="footer-link">
              Contacto
            </Link>
          </div>
          <div className="order-2 order-lg-2">
            <Link to="/nosotros" className="footer-link">
              Sobre Nosotros
            </Link>
          </div>
        </Col>
        <Col>
        <div className="order-3 order-lg-3">
            <span className="footer-text">© Todos los derechos reservados</span>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
