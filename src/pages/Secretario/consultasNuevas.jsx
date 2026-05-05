import Tablageneral from "../../components/TablaGeneral";
import { useState, useEffect } from "react";
import BarraBusquedaFecha from "../../components/BarraBusquedaFecha";
import { listarConsultas } from "../../helper/consulta.Api";

const ConsultasNuevas = () => {
  const columnas = ["Nº", "Nombre", "Correo", "Mensaje", "Fecha"];
  const claves = [
    "nombreConsulta",
    "correoConsulta",
    "mensajeConsulta",
    "fechaConsulta",
  ];
  const [filasFiltradas, setFilasFiltradas] = useState([]);
  const [busquedaFecha, setFecha] = useState("");

  const obtenerFilasFiltradas = async () => {
    const data = await listarConsultas(busquedaFecha);
    if (data) {
      setFilasFiltradas(data);
    } else {
    }
  };

  useEffect(() => {
    obtenerFilasFiltradas();
  }, [busquedaFecha]);

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <BarraBusquedaFecha onDateChange={setFecha} />
      </div>
      <Tablageneral
        columnas={columnas}
        claves={claves}
        filas={filasFiltradas}
      />
    </>
  );
};

export default ConsultasNuevas;
