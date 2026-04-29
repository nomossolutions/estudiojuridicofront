import { Form } from 'react-bootstrap';

function BarraBusquedaEstado({ onEstadoChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    onEstadoChange(value);
  };

  return (
    <Form className="d-flex mb-2">
      <Form.Select onChange={handleChange}>
        <option value="">Todos los estados</option>
        <option value="pagada">Pagada</option>
        <option value="Pendiente">Pendiente</option>
        <option value="anulada">Anulada</option>
      </Form.Select>
    </Form>
  );
}

export default BarraBusquedaEstado;