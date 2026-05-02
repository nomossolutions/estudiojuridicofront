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
    reset();
    onHide();
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
              placeholder="Ej: Juan Perez"
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
              isInvalid={!!errors.nombreCliente}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombreCliente?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="tipodearchivo">
            <Form.Label>Tipo de documento legal</Form.Label>
            <Form.Select
              {...register("tipodearchivo", {
                required: "El tipo de documento es obligatorio",
              })}
              isInvalid={!!errors.tipodearchivo}
            >
              <option value="">Seleccioná una opción</option>
              <option value="demanda">Demanda</option>
              <option value="contrato">Contrato</option>
              <option value="escrito">Escrito</option>
              <option value="poder">Poder</option>
              <option value="notificacion">Notificación</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.tipodearchivo?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="fecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              {...register("fecha", {
                required: "La fecha es obligatoria",
              })}
              isInvalid={!!errors.fecha}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fecha?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="seleccionarArchivo">
            <Form.Label>Archivo</Form.Label>
            {itemEditar && itemEditar.seleccionarArchivo && (
              <div className="mb-2">
                <small className="text-muted">Archivo actual: </small>
                <a
                  href={itemEditar.seleccionarArchivo?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  {itemEditar.seleccionarArchivo?.nombre || "Ver archivo"}
                </a>
              </div>
            )}
            <Form.Control 
              type="file" 
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              {...register("seleccionarArchivo", {
                required: !itemEditar ? "Debe seleccionar un archivo" : false,
                validate: (value) => {
                  if (!value || value.length === 0) return true;
                  const file = value[0];
                  const maxSize = 10 * 1024 * 1024; // 10MB
                  if (file.size > maxSize) {
                    return "El archivo no debe superar los 10MB";
                  }
                  const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
                  if (!validTypes.includes(file.type)) {
                    return "Formato no válido. Use PDF, DOC, DOCX, JPG o PNG";
                  }
                  return true;
                }
              })}
              isInvalid={!!errors.seleccionarArchivo}
            />
            <Form.Text className="text-muted">
              Formatos: PDF, DOC, DOCX, JPG, PNG (máx. 10MB)
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.seleccionarArchivo?.message}
            </Form.Control.Feedback>
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
