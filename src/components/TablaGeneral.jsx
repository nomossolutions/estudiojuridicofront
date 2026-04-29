import { Table } from "react-bootstrap";


const Tablageneral = ({ columnas, claves, filas, acciones }) => {

  return (
    <>
      <Table striped bordered hover responsive>
        <thead className="text-center">
          <tr>
            {columnas.map((columna, indicecolumna) => (
              <th key={indicecolumna}>{columna}</th>
            ))}
            {acciones && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody className="text-center">
          {filas.length === 0 ? (
            <tr>
              <td className="p-0">
                <div className="w-100 text-center text-muted py-2">
                  No se encontraron resultados
                </div>
              </td>
            </tr>
          ) : (
            filas.map((fila, indicefila) => (
               <tr key={`${fila.id}-${indicefila}`}>
                <td className="text-center align-middle">{indicefila + 1}</td>
                {claves.map((clave, indicecelda) => (
                  <td className="text-center align-middle" key={indicecelda}>
                    {fila[clave]}
                  </td>
                ))}
                {acciones && (
                  <td className="text-center align-middle">{acciones(fila)}</td>
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
