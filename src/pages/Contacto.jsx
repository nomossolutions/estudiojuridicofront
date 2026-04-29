import { crearConsulta } from "../helper/consulta.Api";
import { useState } from "react";
import { Container, Form, Button, Alert} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Contacto = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      nombreConsulta: "",
      correoConsulta: "",
      mensajeConsulta: "",
    },
  });
  const [showAlert, setShowAlert] = useState(false);
  const onSubmit = async (consulta) => {
    try {
      const nuevaConsulta = await crearConsulta(consulta);
      if (nuevaConsulta) {
        setShowAlert(true);
        reset();
      }
    } catch (error) {
      console.error("Error al enviar la consulta:", error);
    }
  };

  return (
    <>
      <Container className="mt-2">
        <h1>Contacto </h1>
        {showAlert && (
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            ¡Gracias por tu mensaje! Te responderemos pronto.
          </Alert>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="nombreConsulta" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              {...register("nombreConsulta", {
                required: "Tu nombre",
                minLength: { value: 5, message: "Mínimo 5 caracteres" },
                maxLength: { value: 40, message: "Máximo 40 caracteres" },
              })}
            />
            {errors.nombreConsulta && (
              <small className="text-danger">
                {errors.nombreConsulta.message}
              </small>
            )}
          </Form.Group>
          <Form.Group controlId="correoConsulta" className="mb-3">
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              type="email"
              placeholder="nombre@ejemaplo.com"
              {...register("correoConsulta", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Formato de email inválido",
                },
              })}
            />
            {errors.correoConsulta && (
              <small className="text-danger">
                {errors.correoConsulta.message}
              </small>
            )}
          </Form.Group>
          <Form.Group controlId="mensajeConsulta" className="mb-3">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Escribí tu mensaje aquí..."
              {...register("mensajeConsulta", {
                required: "El mensaje es obligatoria",
                minLength: {
                  value: 10,
                  message: "El mensaje deber tener al menos 10 caracteres",
                },
                maxLength: {
                  value: 500,
                  message: "El mensaje no puede exceder los 500 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.mensajeConsulta?.message}
            </Form.Text>
          </Form.Group>
          <div>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </div>
          <div className="text-center mt-4">
            <Link to="/">
              <Button variant="secondary"> Volver al inicio</Button>
            </Link>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Contacto;
