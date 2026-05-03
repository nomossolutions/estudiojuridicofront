import { Table } from "react-bootstrap";


const Tablageneral = ({ columnas, claves, filas, acciones, caption = "Tabla de datos" }) => {
  const totalColumnas = columnas.length + (acciones ? 1 : 0);

  return (
    <>
      <Table striped bordered hover responsive className="tabla-general">
        <caption className="visually-hidden">{caption}</caption>
        <thead className="text-center table-light" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
          <tr>
            {columnas.map((columna, indicecolumna) => (
              <th key={indicecolumna} scope="col">{columna}</th>
            ))}
            {acciones && <th scope="col">Acciones</th>}
          </tr>
        </thead>
        <tbody className="text-center">
          {filas.length === 0 ? (
            <tr>
              <td 
                colSpan={totalColumnas} 
                className="py-5 text-muted"
                style={{ fontSize: '1.1rem' }}
              >
                <div className="d-flex flex-column align-items-center gap-2">
                  <svg width="48" height="48" fill="currentColor" className="opacity-50" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                  <span>No se encontraron resultados</span>
                </div>
              </td>
            </tr>
          ) : (
            filas.map((fila, indicefila) => (
              <tr key={fila.id || `fila-${indicefila}`}>
                <td className="text-center align-middle ">{indicefila + 1}</td>
                {claves.map((clave, indicecelda) => (
                  <td className="text-center align-middle" key={indicecelda}>
                    {fila[clave] ?? '-'}
                  </td>
                ))}
                {acciones && (
                  <td className="text-center align-middle ">{acciones(fila)}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Tablageneral;
