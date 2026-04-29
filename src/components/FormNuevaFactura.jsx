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
    try {
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
      Swal.fire({
        icon: "success",
        title: itemEditar ? "¡Factura actualizada!" : "¡Factura agregada!",
        text: itemEditar
          ? "La factura fue actualizada exitosamente."
          : "La factura fue agregada exitosamente.",
        timer: 2000,
        showConfirmButton: false,
      });
      reset();
      onHide();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar la factura",
        text: "No se pudo guardar la factura. Inténtalo de nuevo.",
      });
    }
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
          <Form.Group className="mb-3" controlId="nombreCliente">
            <Form.Label>Nombre del cliente</Form.Label>
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
                  value: 30,
                  message:
                    "El nombre del cliente debe tener como máximo 30 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.nombreCliente?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="concepto">
            <Form.Label>Concepto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Concepto de la factura..."
              {...register("concepto", {
                required: "El concepto de la factura es obligatorio",
                minLength: {
                  value: 15,
                  message:
                    "El concepto de la factura debe tener como mínimo 10 caracteres",
                },
                maxLength: {
                  value: 50,
                  message:
                    "El concepto de la factura debe tener como máximo 50 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.concepto?.message}
            </Form.Text>
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
          <Form.Group className="mb-3" controlId="monto">
            <Form.Label>Monto</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                step="0.01"
                {...register("monto", {
                  required: "El monto es obligatorio",
                  min: {
                    value: 1,
                    message: "El monto debe ser mayor a 0",
                  },
                })}
              />
            </InputGroup>
            {errors.monto && (
              <small className="text-danger">{errors.monto.message}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="estado">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              {...register("estado", {
                required: "El estado es obligatorio",
              })}
            >
              <option value="">Seleccionar estado...</option>
              <option value="Pagada">Pagada</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Anulada">Anulada</option>
            </Form.Select>
            {errors.estado && (
              <small className="text-danger">{errors.estado.message}</small>
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

export default FormNuevaFactura;
