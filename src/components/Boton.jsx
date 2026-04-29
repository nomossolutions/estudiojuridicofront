import { Button } from 'react-bootstrap';
import {
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaPaperPlane,
  FaDownload,
  FaSearch,
  FaUserPlus
} from 'react-icons/fa';

const actionMap = {
  ver: { icon: <FaEye />, variant: 'info' },
  editar: { icon: <FaEdit />, variant: 'warning'},
  eliminar: { icon: <FaTrash />, variant: 'danger'},
  agregar: { icon: <FaPlus />, variant: 'success', label: 'Agregar' },
  enviar: { icon: <FaPaperPlane />, variant: 'primary', label: 'Enviar' },
  cerrar: { icon: <FaSignOutAlt />, variant: 'danger', label: 'Cerrar sesión' },
  iniciar: { icon: <FaSignOutAlt />, variant: 'success', label: 'Iniciar sesión' },
  descargar: { icon: <FaDownload />, variant: 'success' },
  buscar: { icon: <FaSearch />, variant: 'info', label: 'Buscar' },
  registrarse: { icon: <FaUserPlus />, variant: 'success', label: 'Registrarse' },
  descargarPdf: {icon: <FaDownload />, variant: 'success', label:'Descargar Pdf' },
};

const Boton = ({
  action,
  onClick,
  type = 'button'
}) => {
  const config = actionMap[action];

  return (
    <Button
      variant={config.variant}
      onClick={onClick}
      type={type}
      className="d-flex align-items-center gap-2 ms-1"
    >
      <span>{config.icon}</span>
      {config.label}
    </Button>
  );
};

export default Boton;
