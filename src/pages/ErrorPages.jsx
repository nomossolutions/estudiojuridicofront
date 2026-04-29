import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ErrorPages = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-1 text-danger">404</h1>
          <h2 className="mb-4">Página no encontrada</h2>
          <p className="text-muted">
            Lo sentimos, la página que estás buscando está en proceso de construcción.
          </p>
          <Button variant="primary" onClick={goHome}>
            Volver al Inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPages;