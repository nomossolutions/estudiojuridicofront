import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const FormNuevaTarea = ({
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
      descripcion: "",
      abogado: "",
      prioridad: "",
      fecha: "",
      estado: "",
    },
  });
  useEffect(() => {
    if (itemEditar) {
      setValue("descripcion", itemEditar.descripcion || "");
      setValue("prioridad", itemEditar.prioridad || "");
      setValue("fecha", itemEditar.fecha ? itemEditar.fecha.split("T")[0] : "");
      setValue("estado", itemEditar.estado || "");
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
    let tareaData = { ...data };
    tareaData.fecha = new Date(`${data.fecha}T00:00:00`).toISOString();
    await onGuardar(tareaData, itemEditar?._id);
    reset();
    onHide();
  };

  const handleCancel = () => {
    reset();
    onHide();
  };

  const modalTitle = itemEditar ? "Editar tarea" : "Nueva tarea";
  const submitButtonText = itemEditar ? "Actualizar" : "Guardar";
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese la descripción de la tarea..."
              {...register("descripcion", {
                required: "La descripción es obligatoria",
                minLength: {
                  value: 10,
                  message: "La descripción debe tener al menos 10 caracteres",
                },
                maxLength: {
                  value: 500,
                  message:
                    "La descripción no puede exceder los 500 caracteres",
                },
              })}
              isInvalid={!!errors.descripcion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.descripcion?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="abogado">
            <Form.Label>Responsable</Form.Label>
            <Form.Select 
              {...register("abogado", { 
                required: "Debe seleccionar un responsable" 
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
            <Form.Control.Feedback type="invalid">
              {errors.abogado?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="fecha">
            <Form.Label>Fecha límite:</Form.Label>
            <Form.Control
              type="date"
              {...register("fecha", { required: "La fecha es obligatoria" })}
              isInvalid={!!errors.fecha}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fecha?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="prioridad">
            <Form.Label>Prioridad</Form.Label>
            <Form.Select
              {...register("prioridad", {
                required: "La prioridad es obligatoria",
              })}
              isInvalid={!!errors.prioridad}
            >
              <option value="">Seleccionar prioridad...</option>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.prioridad?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="estado">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              {...register("estado", { required: "El estado es obligatorio" })}
              isInvalid={!!errors.estado}
            >
              <option value="">Seleccionar estado...</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Proceso">En Proceso</option>
              <option value="Completada">Completada</option>
              <option value="Cancelada">Cancelada</option>
              <option value="Reprogramada">Reprogramada</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.estado?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="justify-content-end d-flex">
            <Button variant="secondary" onClick={handleCancel} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {submitButtonText}
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
export default FormNuevaTarea;
