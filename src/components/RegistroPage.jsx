import { Form, Button, Card } from "react-bootstrap";
import "../styles/RegistroPage.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { login } from "../helper/login.Api";

export function RegistroPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navegacion = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const passwordVisibility = () => setShowPassword((prev) => !prev);

  const loginUser = async (user) => {
    const { formBasicEmail, formBasicPassword } = user;

    if (
      formBasicEmail === import.meta.env.VITE_ADMIN_EMAIL &&
      formBasicPassword === import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      user.role = "admin";
     localStorage.setItem("user", JSON.stringify(user));
      navegacion("/app/inicioadmi");
      return;
    }

    try {
      const respuesta = await login({
        email: formBasicEmail,
        formBasicPassword: formBasicPassword,
      });

      if (respuesta.status !== 200) {
        const errorText = await respuesta.text();
        console.error("Error del servidor:", errorText);
      }

      if (!respuesta || !respuesta.ok) {
        Swal.fire({
          icon: "error",
          title: "Usuario o contraseña incorrectas!",
          text: "Verifica tus datos e intenta nuevamente.",
        });
        reset();
        return;
      }

      const data = await respuesta.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      
      const rol = data.role ? data.role.toLowerCase() : "";
      if (rol === "admin") navegacion("/app/inicioadmi");
      else if (rol === "secre") navegacion("/app/iniciosecre");
      else if (rol === "abog") navegacion("/app/inicioabog");
      else navegacion("/app/inicio");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo contactar al servidor.",
      });
      reset();
    }
  };

  return (
    <Card className="FormRegistro">
      <div>
        <h3 className="text-center">Iniciar Sesión</h3>
      </div>
      <Form onSubmit={handleSubmit(loginUser)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresar email"
            {...register("formBasicEmail", {
              required: "El correo es obligatorio",
              pattern: {
                value:
                  /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                message: "El formato es inválido",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.formBasicEmail?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <div className="input-group">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              {...register("formBasicPassword", {
                required: "La contraseña es obligatoria",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                  message:
                    "Debe tener entre 8 y 16 caracteres, al menos un dígito, una minúscula, una mayúscula y un caracter especial.",
                },
              })}
            />
            <Button
              variant="outline-secondary"
              type="button"
              onClick={passwordVisibility}
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
          <Form.Text className="text-danger">
            {errors.formBasicPassword?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Recuérdame" />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="w-100">
            Iniciar Sesión
          </Button>
        </div>
      </Form>
      <a href="*" className="text-center m-2">
        Olvidé mi contraseña
      </a>
    </Card>
  );
}
