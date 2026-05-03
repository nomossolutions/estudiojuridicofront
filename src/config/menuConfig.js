import {
  FaHome,
  FaUser,
  FaUsers,
  FaChartBar,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaFolder,
  FaEnvelope,
  FaTasks,
  FaGavel,
  FaFileAlt,
} from "react-icons/fa";

// Constantes de roles
export const ROLES = {
  ADMIN: "admin",
  ABOGADO: "abog",
  SECRETARIO: "secre",
};

// Configuración de menús por rol
export const menuConfig = {
  [ROLES.ADMIN]: [
    { to: "inicioadmi", label: "Inicio", icon: FaHome, ariaLabel: "Ir a Inicio", color: "#17a2b8" },
    { to: "usuariosadmi", label: "Usuarios", icon: FaUsers, ariaLabel: "Gestionar Usuarios", color: "#17a2b8" },
    { to: "documentosadmi", label: "Documentos", icon: FaFolder, ariaLabel: "Ver Documentos", color: "#17a2b8" },
    { to: "reportesadmi", label: "Reportes", icon: FaChartBar, ariaLabel: "Ver Reportes", color: "#17a2b8" },
  ],
  [ROLES.ABOGADO]: [
    { to: "inicioabog", label: "Inicio", icon: FaHome, ariaLabel: "Ir a Inicio", color: "#28a745" },
    { to: "agendaabog", label: "Agenda", icon: FaCalendarAlt, ariaLabel: "Ver Agenda", color: "#28a745" },
    { to: "clienteabog", label: "Clientes", icon: FaUsers, ariaLabel: "Gestionar Clientes", color: "#28a745" },
    { to: "documentoabog", label: "Documentos", icon: FaFileAlt, ariaLabel: "Ver Documentos", color: "#28a745" },
    { to: "tareasabog", label: "Tareas", icon: FaTasks, ariaLabel: "Gestionar Tareas", color: "#28a745" },
    { to: "facturacionabog", label: "Facturación", icon: FaMoneyBillWave, ariaLabel: "Ver Facturación", color: "#28a745" },
    { to: "juiciosabog", label: "Juicios", icon: FaGavel, ariaLabel: "Ver Juicios", color: "#28a745" },
  ],
  [ROLES.SECRETARIO]: [
    { to: "iniciosecre", label: "Inicio", icon: FaHome, ariaLabel: "Ir a Inicio", color: "#17a2b8" },
    { to: "agendasecre", label: "Agenda", icon: FaCalendarAlt, ariaLabel: "Ver Agenda", color: "#17a2b8" },
    { to: "clientesecre", label: "Clientes", icon: FaUser, ariaLabel: "Gestionar Clientes", color: "#17a2b8" },
    { to: "documentossecre", label: "Documentos", icon: FaFileAlt, ariaLabel: "Ver Documentos", color: "#17a2b8" },
    { to: "tareassecre", label: "Tareas", icon: FaTasks, ariaLabel: "Gestionar Tareas", color: "#17a2b8" },
    { to: "facturacionsecre", label: "Facturación", icon: FaMoneyBillWave, ariaLabel: "Ver Facturación", color: "#28a745" },
    { 
      to: "consultasnuevas", 
      label: "Consultas Nuevas", 
      icon: FaEnvelope, 
      ariaLabel: "Ver Consultas Nuevas",
      hasBadge: true,
      color: "#007bff"
    },
  ],
};

// Obtener menú según rol
export const getMenuByRole = (role) => {
  return menuConfig[role] || [];
};
