import { Form, FormControl } from 'react-bootstrap';
import { useState } from 'react';

function BarraBusquedaFecha({ onDateChange }) {
  const [date, setDate] = useState('');

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
    onDateChange(value);
  };

  return (
    <Form className="d-flex mb-2">
      <FormControl
        type="date"
        className="me-2"
        aria-label="Fecha"
        value={date}
        onChange={handleDateChange}
      />
    </Form>
  );
}

export default BarraBusquedaFecha;