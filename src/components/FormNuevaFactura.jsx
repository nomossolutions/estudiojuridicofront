import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect } from "react";

const FormNuevaFactura = ({ show, onHide, onGuardar, itemEditar = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mode: "all",
      fecha: "",
      nombreCliente: "",
      concepto: "",
      monto: "",
      seleccionarArchivo: "",
      estado: "",
    },
  });

  useEffect(() => {
    if (itemEditar) {
      setValue("fecha", itemEditar.fecha ? itemEditar.fecha.split("T")[0] : "");
      setValue("nombreCliente", itemEditar.nombreCliente || "");
      setValue("concepto", itemEditar.concepto || "");
      setValue("monto", itemEditar.monto || "");
      setValue("estado", itemEditar.estado || "");
    } else {
      reset();
    }
  }, [itemEditar, setValue, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append(
      "fecha",
      new Date(`${data.fecha}T00:00:00`).toISOString()
    );
    formData.append("nombreCliente", data.nombreCliente);
    formData.append("concepto", data.concepto);
    formData.append("monto", data.monto);
    formData.append("estado", data.estado);
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

  const modalTitle = itemEditar ? "Editar factura" : "Nueva factura";
  const submitButtonText = itemEditar ? "Actualizar" : "Guardar";

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Form.Group className="mb-3" controlId="nombreCliente">
            <Form.Label>Nombre del cliente</Form.Label>
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
                  value: 30,
                  message:
                    "El nombre del cliente debe tener como máximo 30 caracteres",
                },
              })}
              isInvalid={!!errors.nombreCliente}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombreCliente?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="concepto">
            <Form.Label>Concepto</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Ej: Honorarios por asesoramiento legal..."
              {...register("concepto", {
                required: "El concepto de la factura es obligatorio",
                minLength: {
                  value: 15,
                  message:
                    "El concepto debe tener como mínimo 15 caracteres",
                },
                maxLength: {
                  value: 100,
                  message:
                    "El concepto debe tener como máximo 100 caracteres",
                },
              })}
              isInvalid={!!errors.concepto}
            />
            <Form.Control.Feedback type="invalid">
              {errors.concepto?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="seleccionarArchivo">
            <Form.Label>Archivo de factura</Form.Label>
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
              accept=".pdf,.jpg,.jpeg,.png"
              {...register("seleccionarArchivo", {
                required: !itemEditar ? "Debe seleccionar un archivo" : false,
                validate: (value) => {
                  if (!value || value.length === 0) return true;
                  const file = value[0];
                  const maxSize = 10 * 1024 * 1024; // 10MB
                  if (file.size > maxSize) {
                    return "El archivo no debe superar los 10MB";
                  }
                  const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
                  if (!validTypes.includes(file.type)) {
                    return "Formato no válido. Use PDF, JPG o PNG";
                  }
                  return true;
                }
              })}
              isInvalid={!!errors.seleccionarArchivo}
            />
            <Form.Text className="text-muted">
              Formatos: PDF, JPG, PNG (máx. 10MB)
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.seleccionarArchivo?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="monto">
            <Form.Label>Monto</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("monto", {
                  required: "El monto es obligatorio",
                  min: {
                    value: 1,
                    message: "El monto debe ser mayor a 0",
                  },
                })}
                isInvalid={!!errors.monto}
              />
              <Form.Control.Feedback type="invalid">
                {errors.monto?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="estado">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              {...register("estado", {
                required: "El estado es obligatorio",
              })}
              isInvalid={!!errors.estado}
            >
              <option value="">Seleccionar estado...</option>
              <option value="Pagada">Pagada</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Anulada">Anulada</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.estado?.message}
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

export default FormNuevaFactura;
