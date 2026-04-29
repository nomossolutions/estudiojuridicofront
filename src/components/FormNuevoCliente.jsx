import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const FormNuevoCliente = ({ show, onHide, onGuardar, itemEditar = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      nombre: "",
      identificador: "",
      email: "",
      telefono: "",
      estadoCliente: "",
    },
  });

  useEffect(() => {
    if (itemEditar) {
      setValue("nombre", itemEditar.nombre || "");
      setValue("identificador", itemEditar.identificador || "");
      setValue("email", itemEditar.email || "");
      setValue("telefono", itemEditar.telefono || "");
      setValue("estadoCliente", itemEditar.estadoCliente || "");
    } else {
      reset();
    }
  }, [itemEditar, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (itemEditar && itemEditar._id) {
        data._id = itemEditar._id;
      }

      await onGuardar(data);
      Swal.fire({
        icon: "success",
        title: itemEditar
          ? `¡Cliente ${data.nombre} fue actualizado!`
          : "¡Cliente agregado!",
        text: itemEditar
          ? `El cliente fue actualizado exitosamente.`
          : "El cliente fue agregado exitosamente.",
    
      });

      reset();
      onHide();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar cliente. Intenta nuevamente.",
      });
    }
  };

  const handleCancel = () => {
    reset();
    onHide();
  };

  const modalTitle = itemEditar ? "Editar Cliente" : "Nuevo Cliente";
  const submitButtonText = itemEditar ? "Actualizar" : "Guardar";

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre Completo:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Juan Perez"
              {...register("nombre", {
                required: "El nombre del cliente es obligatorio",
                minLength: {
                  value: 4,
                  message:
                    "El nombre del cliente debe tener como mínimo 4 caracteres",
                },
                maxLength: {
                  value: 30,
                  message:
                    "El nombre del cliente debe tener como máximo 30 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.nombre?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="identificador">
            <Form.Label>DNI / CUIT :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: 20301234567"
              {...register("identificador", {
                required: "Este campo es obligatorio",
              })}
            />
            <Form.Text className="text-danger">
              {errors.identificador?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ej: juanperez@gmail.com"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value:
                    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                  message: "El formato del email es incorrecto",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="telefono">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              type="tel"
              inputMode="numeric"
              placeholder="3813005896"
              {...register("telefono", {
                required: "El teléfono es obligatorio",
                pattern: {
                  value: /^\d+$/,
                  message: "Solo se permiten números",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.telefono?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="estadoCliente">
            <Form.Label>Estado del Cliente</Form.Label>
            <Form.Select
              {...register("estadoCliente", {
                required: "El estado del cliente es obligatorio",
              })}
            >
              <option value="">Seleccionar estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </Form.Select>
            {errors.estadoCliente && (
              <small className="text-danger">
                {errors.estadoCliente.message}
              </small>
            )}
          </Form.Group>

          <div className="justify-content-end d-flex">
            <Button variant="success" type="submit" className="me-2">
              {submitButtonText}
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormNuevoCliente;
