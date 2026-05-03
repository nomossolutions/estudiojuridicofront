import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import BarraBusqueda from "../../components/BarraBusqueda";
import BarraBusquedaFecha from "../../components/BarraBusquedaFecha";
import {
  listarArchivos,
  descargarDocumento,
} from "../../helper/subirArchivo.Api";

const DocumentosAdmi = () => {
  const columnas = [
    "Nº",
    "Nombre de documento",
    "Cliente",
    "Tipo de documento",
    "Fecha de subida",
  ];
  const claves = ["archivoNombre", "nombreCliente", "tipodearchivo", "fecha"];

  const [filasFiltradas, setFilasFiltradas] = useState([]);
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [busquedaFecha, setbusquedaFecha] = useState("");

  const obtenerFilasFiltradas = async () => {
    try {
      const data = await listarArchivos(busquedaCliente, busquedaFecha);
      const ArchivoTransformado = data.map((archivo) => ({
        ...archivo,
        archivoNombre: (
          <a
            href={archivo.seleccionarArchivo?.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {archivo.seleccionarArchivo?.nombre || "archivo"}
          </a>
        ),
      }));
      setFilasFiltradas(ArchivoTransformado);
    } catch (error) {
      console.error("Error al obtener el archivo:", error);
    }
  };

  useEffect(() => {
    obtenerFilasFiltradas();
  }, [busquedaCliente, busquedaFecha]);

  const descargar = async (id) => {
    const respuesta = await descargarDocumento(id);
    if (respuesta) {
      toast.success("¡Documento descargado!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error("Error al descargar el documento", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <BarraBusqueda
          onSearch={setBusquedaCliente}
          placeholder="Buscar por cliente..."
        />
        <BarraBusquedaFecha onDateChange={setbusquedaFecha} />
      </div>
      <Tablageneral
        columnas={columnas}
        filas={filasFiltradas}
        claves={claves}
        acciones={(fila) => (
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <Boton action="descargar" onClick={() => descargar(fila._id)} />
          </div>
        )}
      />
    </>
  );
};
export default DocumentosAdmi;
