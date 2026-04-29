import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import Adrian from '../assets/adrian.jpg';
import Agustina from '../assets/agustina.jpg';
import Daiana from '../assets/daiana.jpg';
import "../styles/Nosotros.css";
const teamMembers = [
    {
        name: "Daiana Varela",
        role: "Fullstack Developer",
        img: Daiana,
        linkedin: "https://www.linkedin.com/in/daianavarela/",
        github: "https://github.com/DaianaVarela01",
    },
    {
        name: "Adrian Coronel",
        role: "Fullstack Developer",
        img: Adrian,
        linkedin: "*",
        github: "https://github.com/CoronelAdrianNicolas",
    },
    {
        name: "Agustina Bulacio",
        role: "Fullstack Developer",
        img: Agustina,
        linkedin: "https://www.linkedin.com/in/agustina-bulacio-76b0361b9/",
        github: "https://github.com/Agustina1803",
    },
];

const AboutUs = () => {
    return (
        <Container className="mt-4">
            <div className="text-center">
                <div>
                    <h1>Sobre Nosotros</h1>
                    <p>
                        Somos un equipo apasionado por el desarrollo web, combinando diseño,
                        funcionalidad y experiencia de usuario.
                    </p>
                </div>
                <div>
                    <Row>
                        {teamMembers.map((member, index) => (
                            <Col
                                key={index}
                                md={4}
                                className="mb-4 d-flex justify-content-center"
                            >
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src={member.img}
                                        alt={`Foto de ${member.name}`}
                                        className="card-img-fixed"
                                    />
                                    <Card.Body>
                                        <Card.Title>{member.name}</Card.Title>
                                        <Card.Subtitle className="mb-2">
                                            {member.role}
                                        </Card.Subtitle>
                                        <div className="d-flex gap-2 mb-3 justify-content-center">
                                            <a
                                                href={member.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary btn-sm"
                                            >
                                                🔗 LinkedIn
                                            </a>
                                            <a
                                                href={member.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-dark btn-sm"
                                            >
                                                🐙 GitHub
                                            </a>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
                <div className="text-center mt-4">
                    <Link to="/">
                        <Button variant="secondary"> Volver al inicio</Button>
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default AboutUs;