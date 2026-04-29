import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormAgregarUsuario = ({ show, onHide, onGuardar, itemEditar = null }) => {
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
      apellido: "",
      email: "",
      telefono: "",
      formBasicPassword: "",
      newPassword: "",
      role: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (itemEditar) {
      setValue("nombre", itemEditar.nombre || "");
      setValue("apellido", itemEditar.apellido || "");
      setValue("email", itemEditar.email || "");
      setValue("telefono", itemEditar.telefono || "");
      setValue("role", itemEditar.role || "");
      setValue("formBasicPassword", "");
      setValue("newPassword", "");
    } else {
      reset();
    }
  }, [itemEditar, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (itemEditar && itemEditar._id) {
        data._id = itemEditar._id;
        if (!data.newPassword) {
          delete data.formBasicPassword;
        } else {
          data.formBasicPassword = data.newPassword;
        }
        delete data.newPassword;
      }
      await onGuardar(data);
      Swal.fire({
        icon: "success",
        title: itemEditar ? "¡Usuario actualizado!" : "¡Usuario agregado!",
        text: itemEditar
          ? "El usuario fue actualizado exitosamente."
          : "El usuario fue agregado exitosamente.",
      });
      reset();
      onHide();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar el usuario. Intenta nuevamente.",
      });
    }
  };

  const handleCancel = () => {
    reset();
    onHide();
  };

  const modalTitle = itemEditar ? "Editar Usuario" : "Nuevo Usuario";
  const submitButtonText = itemEditar ? "Actualizar" : "Guardar";

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="nombre" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Juan"
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 4,
                  message: "Debe tener al menos 4 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "No puede superar los 30 caracteres",
                },
              })}
            />
            {errors.nombre && (
              <small className="text-danger">{errors.nombre.message}</small>
            )}
          </Form.Group>

          <Form.Group controlId="apellido" className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Pérez"
              {...register("apellido", {
                required: "El apellido es obligatorio",
                minLength: {
                  value: 4,
                  message: "Debe tener al menos 4 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "No puede superar los 30 caracteres",
                },
              })}
            />
            {errors.apellido && (
              <small className="text-danger">{errors.apellido.message}</small>
            )}
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ej: juanperez@gmail.com"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                  message: "Formato de email inválido",
                },
              })}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </Form.Group>

          <Form.Group controlId="telefono" className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="tel"
              placeholder="3813005896"
              {...register("telefono", {
                required: "El teléfono es obligatorio",
                pattern: {
                  value: /^\d+$/,
                  message: "Solo se permiten números",
                },
                minLength: {
                  value: 7,
                  message: "Debe tener al menos 7 dígitos",
                },
                maxLength: {
                  value: 15,
                  message: "No puede superar los 15 dígitos",
                },
              })}
            />
            {errors.telefono && (
              <small className="text-danger">{errors.telefono.message}</small>
            )}
          </Form.Group>

          {!itemEditar && (
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  {...register("formBasicPassword", {
                    required: "La contraseña es obligatoria",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                      message:
                        "Debe tener entre 8 y 16 caracteres, incluir mayúsculas, minúsculas, número y caracter especial",
                    },
                  })}
                />
                <Button
                  variant="outline-secondary"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
              {errors.formBasicPassword && (
                <small className="text-danger">
                  {errors.formBasicPassword.message}
                </small>
              )}
            </Form.Group>
          )}

          {itemEditar && (
            <Form.Group className="mb-3">
              <Form.Label>Nueva contraseña (opcional)</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword", {
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                      message:
                        "Debe tener entre 8 y 16 caracteres, incluir mayúsculas, minúsculas, número y caracter especial",
                    },
                  })}
                />
                <Button
                  variant="outline-secondary"
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
              {errors.newPassword && (
                <small className="text-danger">
                  {errors.newPassword.message}
                </small>
              )}
            </Form.Group>
          )}
          <Form.Group controlId="role" className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              {...register("role", { required: "El rol es obligatorio" })}
            >
              <option value="">Seleccionar rol...</option>
              <option value="admin">Administrador</option>
              <option value="secre">Secretario/a</option>
              <option value="abog">Abogado</option>
            </Form.Select>
            {errors.role && (
              <small className="text-danger">{errors.role.message}</small>
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

export default FormAgregarUsuario;
