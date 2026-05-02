import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const FormAgregarCita = ({
  show,
  onHide,
  onGuardar,
  itemEditar = null,
  abogados = [],
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      fecha: "",
      hora: "",
      cliente: "",
      abogado: "",
      tipoEvento: "",
      notas: "",
    },
  });

  useEffect(() => {
    if (itemEditar) {
      setValue("fecha", itemEditar.fecha ? itemEditar.fecha.split("T")[0] : "");
      setValue("hora", itemEditar.hora || "");
      setValue("cliente", itemEditar.cliente || "");
      setValue("tipoEvento", itemEditar.tipoEvento || "");
      setValue("notas", itemEditar.notas || "");
      if (itemEditar.abogado) {
        const abogadoId =
          typeof itemEditar.abogado === "object"
            ? itemEditar.abogado._id
            : itemEditar.abogado;
        setValue("abogado", abogadoId || "");
      }
    } else {
      reset();
    }
  }, [itemEditar, setValue, reset]);

  const onSubmit = async (data) => {
    if (itemEditar && itemEditar._id) {
      data._id = itemEditar._id;
    }
    data.fecha = new Date(`${data.fecha}T${data.hora}:00`).toISOString();
    await onGuardar(data);
    reset();
    onHide();
  };
  const handleCancel = () => {
    reset();
    onHide();
  };

  const modalTitle = itemEditar ? "Editar Cita" : "Nueva Cita";
  const submitButtonText = itemEditar ? "Actualizar" : "Guardar";

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="fecha" className="mb-3">
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
          <Form.Group controlId="hora" className="mb-3">
            <Form.Label>Hora</Form.Label>
            <Form.Select
              {...register("hora", { required: "La hora es obligatoria" })}
              isInvalid={!!errors.hora}
            >
              <option value="">Seleccioná una hora</option>
              <option value="08:00">08:00</option>
              <option value="08:30">08:30</option>
              <option value="09:00">09:00</option>
              <option value="09:30">09:30</option>
              <option value="10:00">10:00</option>
              <option value="10:30">10:30</option>
              <option value="11:00">11:00</option>
              <option value="11:30">11:30</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
              <option value="16:00">16:00</option>
              <option value="16:30">16:30</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
              <option value="18:00">18:00</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.hora?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="cliente" className="mb-3">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Juan Perez"
              {...register("cliente", {
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
              isInvalid={!!errors.cliente}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cliente?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="abogado" className="mb-3">
            <Form.Label>Abogado asignado</Form.Label>
            <Form.Select 
              {...register("abogado", { 
                required: "Debe seleccionar un abogado" 
              })}
              isInvalid={!!errors.abogado}
            >
              <option value="">Seleccione un abogado</option>
              {abogados.map((abog) => (
                <option key={abog._id} value={abog._id}>
                  {abog.nombre} {abog.apellido}
                </option>
              ))}
            </Form.Select>
            {errors.abogado && (
              <Form.Control.Feedback type="invalid">
                {errors.abogado.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="tipoEvento" className="mb-3">
            <Form.Label>Tipo de evento</Form.Label>
            <Form.Select
              {...register("tipoEvento", {
                required: "El tipo de evento es obligatorio",
              })}
              isInvalid={!!errors.tipoEvento}
            >
              <option value="">Seleccionar tipo de evento...</option>
              <option value="Audiencia">Audiencia</option>
              <option value="Consulta">Consulta</option>
              <option value="Reunion">Reunión</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.tipoEvento?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="notas" className="mb-3">
            <Form.Label>Notas</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Consulta por..."
              {...register("notas", {
                required: "Las notas son obligatorias",
                minLength: {
                  value: 10,
                  message: "Las notas deben tener al menos 10 caracteres",
                },
                maxLength: {
                  value: 300,
                  message: "Las notas no pueden superar los 300 caracteres",
                },
              })}
              isInvalid={!!errors.notas}
            />
            <Form.Control.Feedback type="invalid">
              {errors.notas?.message}
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
export default FormAgregarCita;
