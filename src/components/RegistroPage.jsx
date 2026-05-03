import { Form, Button, Card, Spinner } from "react-bootstrap";
import "../styles/RegistroPage.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import { login } from "../helper/login.Api";

// Constantes de roles
const ROLES = {
  ADMIN: "admin",
  ABOGADO: "abog",
  SECRETARIO: "secre",
};

// Rutas de navegación por rol
const getRoleRoute = (role) => {
  const routes = {
    [ROLES.ADMIN]: "/app/inicioadmi",
    [ROLES.SECRETARIO]: "/app/iniciosecre",
    [ROLES.ABOGADO]: "/app/inicioabog",
  };
  return routes[role?.toLowerCase()] || "/app/inicio";
};

export function RegistroPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const loginUser = async (formData) => {
    setIsLoading(true);

    // Verificar credenciales de admin hardcoded
    if (
      formData.email === import.meta.env.VITE_ADMIN_EMAIL &&
      formData.password === import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      const adminUser = {
        email: formData.email,
        password: formData.password,
        role: "admin",
      };
      localStorage.setItem("user", JSON.stringify(adminUser));
      
      await Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Has iniciado sesión correctamente.",
        timer: 1500,
        showConfirmButton: false,
      });
      
      setIsLoading(false);
      navigate("/app/inicioadmi");
      return;
    }

    try {
      const response = await login({
        email: formData.email,
        formBasicPassword: formData.password,
      });

      // Verificar si la respuesta es exitosa
      if (!response || !response.ok) {
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas",
          text: "El correo o la contraseña son incorrectos. Por favor, verifica tus datos.",
          confirmButtonColor: "#3085d6",
        });
        reset({ email: formData.email, password: "" });
        return;
      }

      // Obtener datos del usuario
      const data = await response.json();
      
      // Guardar token y datos del usuario
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      
      localStorage.setItem("user", JSON.stringify(data));

      // Mostrar mensaje de éxito
      await Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Has iniciado sesión correctamente.",
        timer: 1500,
        showConfirmButton: false,
      });

      // Navegar según el rol
      const route = getRoleRoute(data.role);
      navigate(route);
      
    } catch (error) {
      console.error("Error en login:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor. Por favor, intenta nuevamente.",
        confirmButtonColor: "#d33",
      });
      reset({ email: formData.email, password: "" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="FormRegistro shadow-lg">
      <Card.Body className="p-4">
        <div className="text-center mb-4">
          <div className="mb-3">
            <div 
              className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
              style={{ width: "60px", height: "60px" }}
            >
              <FaUser size={28} />
            </div>
          </div>
          <h3 className="fw-bold mb-2">Iniciar Sesión</h3>
          <p className="text-muted mb-0">Ingresa tus credenciales para continuar</p>
        </div>

        <Form onSubmit={handleSubmit(loginUser)}>
          <Form.Group className="mb-4" controlId="email">
            <Form.Label className="fw-semibold">
              <FaUser className="me-2" />
              Correo Electrónico
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@correo.com"
              size="lg"
              {...register("email", {
                required: "El correo electrónico es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Formato de correo inválido",
                },
              })}
              isInvalid={!!errors.email}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="password">
            <Form.Label className="fw-semibold">
              <FaLock className="me-2" />
              Contraseña
            </Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                size="lg"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 3,
                    message: "La contraseña debe tener al menos 3 caracteres",
                  },
                })}
                isInvalid={!!errors.password}
                disabled={isLoading}
                style={{ paddingRight: "45px" }}
              />
              <Button
                variant="link"
                type="button"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="position-absolute top-50 end-0 translate-middle-y text-muted"
                style={{ 
                  border: "none", 
                  background: "transparent",
                  zIndex: 10 
                }}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <div className="d-grid gap-2 mt-4">
            <Button 
              variant="primary" 
              type="submit" 
              size="lg"
              disabled={isLoading}
              className="fw-semibold"
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
