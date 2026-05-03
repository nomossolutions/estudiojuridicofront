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
    { to: "inicioadmi", label: "Inicio", icon: FaHome, ariaLabel: "Ir a Inicio" },
    { to: "usuariosadmi", label: "Usuarios", icon: FaUsers, ariaLabel: "Gestionar Usuarios" },
    { to: "documentosadmi", label: "Documentos", icon: FaFolder, ariaLabel: "Ver Documentos" },
    { to: "reportesadmi", label: "Reportes", icon: FaChartBar, ariaLabel: "Ver Reportes" },
  ],
  [ROLES.ABOGADO]: [
    { to: "inicioabog", label: "Inicio", icon: FaHome, ariaLabel: "Ir a Inicio" },
    { to: "agendaabog", label: "Agenda", icon: FaCalendarAlt, ariaLabel: "Ver Agenda" },
    { to: "clienteabog", label: "Clientes", icon: FaUsers, ariaLabel: "Gestionar Clientes" },
    { to: "documentoabog", label: "Documentos", icon: FaFileAlt, ariaLabel: "Ver Documentos" },
    { to: "tareasabog", label: "Tareas", icon: FaTasks, ariaLabel: "Gestionar Tareas" },
    { to: "facturacionabog", label: "Facturación", icon: FaMoneyBillWave, ariaLabel: "Ver Facturación" },
    { to: "juiciosabog", label: "Juicios", icon: FaGavel, ariaLabel: "Ver Juicios" },
  ],
  [ROLES.SECRETARIO]: [
    { to: "iniciosecre", label: "Inicio", icon: FaHome, ariaLabel: "Ir a Inicio" },
    { to: "agendasecre", label: "Agenda", icon: FaCalendarAlt, ariaLabel: "Ver Agenda" },
    { to: "clientesecre", label: "Clientes", icon: FaUser, ariaLabel: "Gestionar Clientes" },
    { to: "documentossecre", label: "Documentos", icon: FaFileAlt, ariaLabel: "Ver Documentos" },
    { to: "tareassecre", label: "Tareas", icon: FaTasks, ariaLabel: "Gestionar Tareas" },
    { to: "facturacionsecre", label: "Facturación", icon: FaMoneyBillWave, ariaLabel: "Ver Facturación" },
    { 
      to: "consultasnuevas", 
      label: "Consultas Nuevas", 
      icon: FaEnvelope, 
      ariaLabel: "Ver Consultas Nuevas",
      hasBadge: true 
    },
  ],
};

// Obtener menú según rol
export const getMenuByRole = (role) => {
  return menuConfig[role] || [];
};
