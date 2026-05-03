import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const FormNuevoJuicio = ({ show, onHide, onGuardar, itemEditar = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      nombreDeJuicio: "",
      numeroExpediente: "",
      nombreCliente: "",
      juzgado: "",
      fecha: "",
      seleccionarArchivo: "",
    },
  });

  useEffect(() => {
    if (itemEditar) {
      setValue("nombreDeJuicio", itemEditar.nombreDeJuicio || "");
      setValue("numeroExpediente", itemEditar.numeroExpediente || "");
      setValue("nombreCliente", itemEditar.nombreCliente || "");
      setValue("juzgado", itemEditar.juzgado || "");
      setValue("fecha", itemEditar.fecha ? itemEditar.fecha.split("T")[0] : "");
    } else {
      reset();
    }
  }, [itemEditar, setValue, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("nombreDeJuicio", data.nombreDeJuicio);
    formData.append("numeroExpediente", data.numeroExpediente);
    formData.append("nombreCliente", data.nombreCliente);
    formData.append("juzgado", data.juzgado);
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

  const modalTitle = itemEditar ? "Editar juicio" : "Nuevo juicio";
  const submitButtonText = itemEditar ? "Actualizar" : "Guardar";
  const juzgadosTucuman = [
    "Juzgado en lo Civil y Comercial Común I",
    "Juzgado en lo Civil y Comercial Común II",
    "Juzgado en lo Civil y Comercial Común III",
    "Juzgado en lo Civil y Comercial Común IV",
    "Juzgado en lo Civil y Comercial Común V",
    "Juzgado en lo Civil y Comercial Común VI",
    "Juzgado en lo Civil y Comercial Común VII",
    "Juzgado en lo Civil y Comercial Común VIII",
    "Juzgado en lo Civil y Comercial Común IX",
    "Juzgado en lo Civil y Comercial Común X",
    "Juzgado de Familia y Sucesiones I",
    "Juzgado de Familia y Sucesiones II",
    "Juzgado de Familia y Sucesiones III",
    "Juzgado de Familia y Sucesiones IV",
    "Juzgado de Familia y Sucesiones V",
    "Juzgado de Familia y Sucesiones VI",
    "Juzgado de Familia y Sucesiones VII",
    "Juzgado de Familia y Sucesiones VIII",
    "Juzgado de Familia y Sucesiones IX",
    "Juzgado de Familia y Sucesiones X",
    "Juzgado en lo Penal de Instrucción I",
    "Juzgado en lo Penal de Instrucción II",
    "Juzgado en lo Penal de Instrucción III",
    "Juzgado en lo Penal de Instrucción IV",
    "Juzgado en lo Penal de Instrucción V",
  ];

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="nombreDeJuicio">
            <Form.Label>Nombre de Juicio:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Demanda por accidente de tránsito..."
              {...register("nombreDeJuicio", {
                required: "El nombre del juicio es obligatorio",
                minLength: {
                  value: 10,
                  message:
                    "El nombre del juicio debe tener como mínimo 10 caracteres",
                },
                maxLength: {
                  value: 100,
                  message:
                    "El nombre del juicio debe tener como máximo 100 caracteres",
                },
              })}
              isInvalid={!!errors.nombreDeJuicio}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombreDeJuicio?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="numeroExpediente">
            <Form.Label>Número de expediente:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: EXP-2024-123456"
              {...register("numeroExpediente", {
                required: "El nº de expediente es obligatorio",
                pattern: {
                  value: /^[A-Z0-9-/]+$/i,
                  message: "Formato inválido. Use letras, números, - o /",
                },
              })}
              isInvalid={!!errors.numeroExpediente}
            />
            <Form.Control.Feedback type="invalid">
              {errors.numeroExpediente?.message}
            </Form.Control.Feedback>
          </Form.Group>
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
                  value: 40,
                  message:
                    "El nombre del cliente debe tener como máximo 40 caracteres",
                },
              })}
              isInvalid={!!errors.nombreCliente}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombreCliente?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="juzgado">
            <Form.Label>Juzgado</Form.Label>
            <Form.Select
              {...register("juzgado", {
                required: "El juzgado es obligatorio",
              })}
              isInvalid={!!errors.juzgado}
            >
              <option value="">Seleccionar juzgado...</option>
              {juzgadosTucuman.map((juzgado, index) => (
                <option key={index} value={juzgado}>
                  {juzgado}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.juzgado?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="fecha">
            <Form.Label>Fecha:</Form.Label>
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
            <Form.Label>Archivo del expediente</Form.Label>
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
              accept=".pdf,.doc,.docx"
              {...register("seleccionarArchivo", {
                required: !itemEditar ? "Debe seleccionar un archivo" : false,
                validate: (value) => {
                  if (!value || value.length === 0) return true;
                  const file = value[0];
                  const maxSize = 20 * 1024 * 1024; // 20MB
                  if (file.size > maxSize) {
                    return "El archivo no debe superar los 20MB";
                  }
                  const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                  if (!validTypes.includes(file.type)) {
                    return "Formato no válido. Use PDF, DOC o DOCX";
                  }
                  return true;
                }
              })}
              isInvalid={!!errors.seleccionarArchivo}
            />
            <Form.Text className="text-muted">
              Formatos: PDF, DOC, DOCX (máx. 20MB)
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.seleccionarArchivo?.message}
            </Form.Control.Feedback>
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

export default FormNuevoJuicio;
