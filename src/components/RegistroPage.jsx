import { Form, Button, Card, Spinner } from "react-bootstrap";
import "../styles/RegistroPage.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
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

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      // Verificar si la respuesta es exitosa
      if (!response || !response.ok) {
        // Intentar obtener el mensaje de error del backend
        let errorData = {};
        try {
          errorData = await response?.json();
        } catch (e) {
          // Error al parsear respuesta
        }
        
        setIsLoading(false);
        
        // Mostrar el error del backend si existe
        const errorMsg = errorData.message || "El correo o la contraseña son incorrectos. Por favor, verifica tus datos.";
        
        toast.error(errorMsg, {
          position: "top-right",
          autoClose: 5000,
        });
        
        reset({ email: formData.email, password: "" });
        return;
      }

      // Obtener datos del usuario
      const data = await response.json();
      
      // Guardar token y datos del usuario
      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        setIsLoading(false);
        toast.error("Error: El servidor no devolvió un token", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      
      localStorage.setItem("user", JSON.stringify(data));

      // Mostrar mensaje de éxito
      toast.success("¡Bienvenido! Has iniciado sesión correctamente.", {
        position: "top-right",
        autoClose: 1500,
      });

      // Navegar según el rol después de un breve delay
      const route = getRoleRoute(data.role);
      
      setTimeout(() => {
        navigate(route);
      }, 1600);
      
    } catch (error) {
      setIsLoading(false);
      toast.error("No se pudo conectar con el servidor. Por favor, intenta nuevamente.", {
        position: "top-right",
        autoClose: 3000,
      });
      reset({ email: formData.email, password: "" });
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
