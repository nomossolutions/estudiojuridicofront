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
    try {
      let tareaData = { ...data };
      tareaData.fecha = new Date(`${data.fecha}T00:00:00`).toISOString();
      await onGuardar(tareaData, itemEditar?._id);
      Swal.fire({
        icon: "success",
        title: itemEditar ? "¡Tarea actualizada!" : "¡Tarea agregada!",
        text: itemEditar
          ? "La tarea fue actualizada exitosamente."
          : "La tarea fue agregada exitosamente.",
        timer: 2000,
        showConfirmButton: false,
      });
      reset();
      onHide();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar la tarea. Intenta nuevamente.",
      });
    }
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
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Ingrese descripcion..."
              {...register("descripcion", {
                required: "La descripcion es obligatoria",
                minLength: {
                  value: 10,
                  message: "La descripcion deber tener al menos 10 caracteres",
                },
                maxLength: {
                  value: 1000,
                  message:
                    "La descripcion no puede exceder los 1000 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.descripcion?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="abogado">
            <Form.Label>Responsable</Form.Label>
            <Form.Select {...register("abogado", { required: true })}>
              <option value="">Seleccione un abogado</option>
              {abogados.map((abog) => (
                <option key={abog._id} value={abog._id}>
                  {abog.nombre} {abog.apellido}
                </option>
              ))}
            </Form.Select>
            {errors.abogado && (
              <small className="text-danger">{errors.abogado.message}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="fecha">
            <Form.Label>Fecha:</Form.Label>
            <Form.Control
              type="date"
              {...register("fecha", { required: "La fecha es obligatoria" })}
            />
            {errors.fecha && (
              <small className="text-danger">{errors.fecha.message}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="prioridad">
            <Form.Label>Prioridad</Form.Label>
            <Form.Select
              {...register("prioridad", {
                required: "La prioridad es obligatoria",
              })}
            >
              <option value="">Seleccionar prioridad...</option>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </Form.Select>
            {errors.prioridad && (
              <small className="text-danger">{errors.prioridad.message}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="estado">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              {...register("estado", { required: "El estado es obligatorio" })}
            >
              <option value="">Seleccionar estado...</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Proceso">Proceso</option>
              <option value="Completada">Completada</option>
              <option value="Cancelada">Cancelada</option>
              <option value="Reprogramada">Reprogramada</option>
            </Form.Select>
            {errors.estado && (
              <small className="text-danger">{errors.estado.message}</small>
            )}
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
