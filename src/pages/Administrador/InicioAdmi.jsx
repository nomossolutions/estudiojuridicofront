import { Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import  {listarUsuarios} from "../../helper/usuario.Api";

const InicioAdmi = () => {
  const [usuariosGuardadas, setUsuariosGuardadas] = useState([]);

  useEffect(() => {
   const obtenerUsuarios = async () => {
      try{
        const usuarios = await listarUsuarios();
      setUsuariosGuardadas(usuarios);
    }catch(error){
        console.error("Error al obtener usuarios:", error);
      }
  };
  obtenerUsuarios();
 }, []);

  const contarUusuario = () => {
    let abogados = 0;
    let secretaria = 0;
    let admin = 0;
    let usuariosTotales = usuariosGuardadas.length;

    usuariosGuardadas.forEach((usuario) => {
      const rol = usuario.role?.toLowerCase();
      if (usuario.role === "abog") {
        abogados++;
      } else if (usuario.role === "secre") {
        secretaria++;
      } else if (usuario.role === "admin") {
        admin++;
      }
    });
    return { abogados, secretaria, admin, usuariosTotales };
  };

  const { abogados, secretaria, admin, usuariosTotales } = contarUusuario();
  return (
    <>
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="mt-3 text-center fs-1 bg-primary text-light">
            <Card.Body>
              <Card.Title>Usuarios totales:</Card.Title>
              <Card.Text>{usuariosTotales}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="mt-3 text-center fs-1 bg-secondary text-light">
            <Card.Body>
              <Card.Title>Administradores activos:</Card.Title>
              <Card.Text>{admin}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mt-3 text-center fs-1 bg-secondary text-light">
            <Card.Body>
              <Card.Title>Abogados activos:</Card.Title>
              <Card.Text>{abogados}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mt-3 text-center fs-1 bg-secondary text-light">
            <Card.Body>
              <Card.Title>Secretario/a activos/as:</Card.Title>
              <Card.Text>{secretaria}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default InicioAdmi;