import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import { useState, useEffect } from "react";
import FormSubirArchivo from "../../components/FormSubirArchivo";
import BarraBusqueda from "../../components/BarraBusqueda";
import BarraBusquedaFecha from "../../components/BarraBusquedaFecha";
import {
  listarArchivos,
  crearArchivos,
  actualizarDocumentos,
  eliminarDocumento,
  descargarDocumento,
} from "../../helper/subirArchivo.Api";
import {
  exitoAlert,
  errorAlert,
  mostrarConfirmacion,
  cargando,
  cerrarCargando,
} from "../../helper/alert.Api";

const DocumentosSecre = () => {
  const columnas = [
    "Nº",
    "Nombre de documento",
    "Cliente",
    "Tipo de Evento",
    "Fecha",
  ];
  const claves = ["archivoNombre", "nombreCliente", "tipodearchivo", "fecha"];

  const [filasFiltradas, setFilasFiltradas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [busquedaFecha, setbusquedaFecha] = useState("");

  const obtenerFilasFiltradas = async () => {
    const data = await listarArchivos(busquedaCliente, busquedaFecha);
    if (data) {
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
    } else {
      errorAlert("Error al obtener los documentos");
    }
  };

  useEffect(() => {
    obtenerFilasFiltradas();
  }, [busquedaCliente, busquedaFecha]);

  const abrirModal = () => {
    setItemEditar(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setItemEditar(null);
    setMostrarModal(false);
  };

  const editar = (id) => {
    const archivos = filasFiltradas.find((item) => item._id === id);
    setItemEditar(archivos);
    setMostrarModal(true);
  };

  const eliminar = async (id) => {
    const archivos = filasFiltradas.find((item) => item._id === id);
    const resultado = await mostrarConfirmacion(
      `¿Deseas eliminar el archivo "${archivos.archivoNombre.props.children}"? Esta acción no se puede deshacer.`
    );
    if (resultado) {
      const respuesta = await eliminarDocumento(archivos._id);
      if (respuesta) {
        exitoAlert("Documento eliminado correctamente");
        obtenerFilasFiltradas();
      }
    } else {
      errorAlert("No se pudo eliminar el documento");
    }
  };

  const agregarDocumento = async (formData, id) => {
    cargando(
      itemEditar ? "Actualizando documento..." : "Subiendo documento..."
    );
    let nuevoDocumento;
    if (itemEditar) {
      nuevoDocumento = await actualizarDocumentos(formData, id);
    } else {
      nuevoDocumento = await crearArchivos(formData);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    cerrarCargando();
    if (nuevoDocumento) {
      exitoAlert(nuevoDocumento.mensaje || "Operación realizada con éxito");
      obtenerFilasFiltradas();
      cerrarModal();
    } else {
      errorAlert("Error al guardar el documento");
    }
  };

  const descargar = async (id) => {
    cargando("Descargando documento...");
    const respuesta = await descargarDocumento(id);
    cerrarCargando();
    if (respuesta) {
      exitoAlert("¡Documento descargado!");
    } else {
      errorAlert("Error al descargar el documento");
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
            <Boton action="editar" onClick={() => editar(fila._id)} />
            <Boton action="eliminar" onClick={() => eliminar(fila._id)} />
            <Boton action="descargar" onClick={() => descargar(fila._id)} />
          </div>
        )}
      />
      <div className="d-flex justify-content-end mt-3">
        <Boton action="agregar" onClick={abrirModal} />
      </div>
      <FormSubirArchivo
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarDocumento}
        itemEditar={itemEditar}
      />
    </>
  );
};

export default DocumentosSecre;
