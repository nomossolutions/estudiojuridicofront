import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect } from "react";

const FormSubirArchivo = ({ show, onHide, onGuardar, itemEditar = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombreCliente: "",
      tipodearchivo: "",
      fecha: "",
      seleccionarArchivo: "",
    },
  });

  useEffect(() => {
    if (itemEditar) {
      setValue("nombreCliente", itemEditar.nombreCliente || "");
      setValue("tipodearchivo", itemEditar.tipodearchivo || "");
      setValue("fecha", itemEditar.fecha ? itemEditar.fecha.split("T")[0] : "");
    } else {
      reset();
    }
  }, [itemEditar, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("nombreCliente", data.nombreCliente);
      formData.append("tipodearchivo", data.tipodearchivo);
      formData.append(
        "fecha",
        new Date(`${data.fecha}T00:00:00`).toISOString()
      );
      if (data.seleccionarArchivo && data.seleccionarArchivo[0]) {
        formData.append("seleccionarArchivo", data.seleccionarArchivo[0]);
      }
      await onGuardar(formData, itemEditar?._id);
      Swal.fire({
        icon: "success",
        title: itemEditar ? "¡Documento actualizado!" : "¡Documento agregado!",
        text: itemEditar
          ? "El documento fue actualizado exitosamente."
          : "El documento fue agregado exitosamente.",
      });
      reset();
      onHide();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar el documento",
        text: "Hubo un problema al guardar el documento. Por favor, intenta nuevamente.",
      });
    }
  };
  const handleCancel = () => {
    reset();
    onHide();
  };

  const modalTitle = itemEditar ? "Editar documento" : "Nuevo documento";
  const submitButtonText = itemEditar ? "Actualizar" : "Guardar";

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="nombreCliente">
            <Form.Label>Cliente:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Juan Perez"
              {...register("nombreCliente", {
                required: "El nombre del cliente es obligatorio",
                minLength: {
                  value: 10,
                  message:
                    "El nombre del cliente debe tener como mínimo 10 caracteres",
                },
                maxLength: {
                  value: 50,
                  message:
                    "El nombre del cliente debe tener como máximo 50 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.nombreCliente?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="tipodearchivo">
            <Form.Label>Tipo de documento legal</Form.Label>
            <Form.Select
              {...register("tipodearchivo", {
                required: "El tipo de documento es obligatorio",
              })}
            >
              <option value="">Seleccioná una opcion</option>
              <option value="demanda"> Demanda </option>
              <option value="contrato"> Contrato</option>
              <option value="escrito"> Escrito</option>
              <option value="poder"> Poder</option>
              <option value="notificacion"> Notificación</option>
            </Form.Select>
            {errors.tipodearchivo && (
              <small className="text-danger">
                {errors.tipodearchivo.message}
              </small>
            )}
          </Form.Group>
          <Form.Group controlId="fecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              {...register("fecha", {
                required: "La fecha es obligatoria",
              })}
            />
            {errors.fecha && (
              <small className="text-danger">{errors.fecha.message}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="seleccionarArchivo">
            <Form.Label className="mt-2 m-2">Archivo</Form.Label>
            {itemEditar && (
              <a
                href={itemEditar.seleccionarArchivo?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {itemEditar.seleccionarArchivo?.nombre || "Ver archivo"}
              </a>
            )}
            <Form.Control type="file" {...register("seleccionarArchivo")} />
            {errors.seleccionarArchivo && (
              <small className="text-danger">
                {errors.seleccionarArchivo.message}
              </small>
            )}
          </Form.Group>
          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={handleCancel} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {submitButtonText}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormSubirArchivo;
