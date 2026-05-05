import { Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { listarUsuarios } from "../../helper/usuario.Api";
import { FaUsers, FaUserShield, FaUserTie, FaUserEdit } from "react-icons/fa";
import "../../styles/InicioAdmi.css";

const InicioAdmi = () => {
  const [usuariosGuardadas, setUsuariosGuardadas] = useState([]);

  useEffect(() => {
   const obtenerUsuarios = async () => {
      try{
        const usuarios = await listarUsuarios();
      setUsuariosGuardadas(usuarios);
    }catch(error){
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
    <div className="inicio-admin-container">
      <Row className="mb-4">
        <Col md={12}>
          <Card className="card-principal text-light text-center">
            <Card.Body>
              <div className="card-icon">
                <FaUsers />
              </div>
              <Card.Title>Total de Usuarios</Card.Title>
              <Card.Text className="total-usuarios">{usuariosTotales}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="g-3">
        <Col md={4} sm={12}>
          <Card className="card-secundaria card-admin text-light">
            <Card.Body>
              <div className="card-icon">
                <FaUserShield />
              </div>
              <Card.Title>Administradores</Card.Title>
              <Card.Text className="numero-usuarios">{admin}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Card className="card-secundaria card-abogados text-light">
            <Card.Body>
              <div className="card-icon">
                <FaUserTie />
              </div>
              <Card.Title>Abogados</Card.Title>
              <Card.Text className="numero-usuarios">{abogados}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Card className="card-secundaria card-secretaria text-light">
            <Card.Body>
              <div className="card-icon">
                <FaUserEdit />
              </div>
              <Card.Title>Secretarios/as</Card.Title>
              <Card.Text className="numero-usuarios">{secretaria}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InicioAdmi;
