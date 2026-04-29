import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import FormNuevoJuicio from "../../components/FormNuevoJuicio";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BarraBusqueda from "../../components/BarraBusqueda";
import {
  listarJuicios,
  crearJuicios,
  actualizarJuicios,
  eliminarJuicios,
  descargarJuicio,
} from "../../helper/juicios.Api";
import {
  exitoAlert,
  errorAlert,
  mostrarConfirmacion,
  cargando,
  cerrarCargando,
} from "../../helper/alert.Api";


const JuiciosAbog = () => {
  const columnas = [
    "Nº",
    "Nombre de juicio",
    "Numero de expediente",
    "Cliente",
    "Juzgado",
    "Fecha",
    "Archivo",
  ];
  const claves = [
    "nombreDeJuicio",
    "numeroExpediente",
    "nombreCliente",
    "juzgado",
    "fecha",
    "archivoNombre",
  ];

  const [filasFiltradas, setFilasFiltradas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaNumeroExpediente, setBusquedaNumeroExpediente] = useState("");

  const obtenerFilasFiltradas = async () => {
    try {
      const data = await listarJuicios(busquedaNumeroExpediente);
      const juiciosTransformados = data.map((juicios) => ({
        ...juicios,
        archivoNombre: (
          <a
            href={juicios.seleccionarArchivo?.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {juicios.seleccionarArchivo?.nombre || "archivo"}
          </a>
        ),
      }));
      setFilasFiltradas(juiciosTransformados);
    } catch (error) {
      errorAlert("Error al obtener los expedientes");
    }
  };

  useEffect(() => {
    obtenerFilasFiltradas();
  }, [busquedaNumeroExpediente]);

  const abrirModal = () => {
    setItemEditar(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setItemEditar(null);
    setMostrarModal(false);
  };

  const editar = (id) => {
    const juicios = filasFiltradas.find((item) => item._id === id);
    setItemEditar(juicios);
    setMostrarModal(true);
  };

  const agregarJuicios = async (formData, id) => {
    cargando(
      itemEditar ? "Actualizando expediente..." : "Subiendo expediente..."
    );
    let nuevoJuicio;
    if (itemEditar) {
      nuevoJuicio = await actualizarJuicios(formData, id);
    } else {
      nuevoJuicio = await crearJuicios(formData);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    cerrarCargando();
    if (nuevoJuicio) {
      exitoAlert(nuevoJuicio.mensaje || "Operación realizada con éxito");
      await obtenerFilasFiltradas();
      cerrarModal();
    } else {
      errorAlert("Error al guardar el documento");
    }
  };

  const eliminar = async (id) => {
    const juicios = filasFiltradas.find((item) => item._id === id);
    const confirmada = await mostrarConfirmacion(
      `¿Deseas eliminar el archivo "${juicios.archivoNombre.props.children}"? Esta acción no se puede deshacer.`
    );
    if (confirmada) {
      const respuesta = await eliminarJuicios(juicios._id);
      if (respuesta) {
        exitoAlert("Expediente eliminado correctamente");
        await obtenerFilasFiltradas();
      }
    else{
       errorAlert("No se pudo eliminar el documento");
    }
  }
  };

  const descargar = async (id) => {
     cargando("Descargando expediente...");
    const respuesta = await descargarJuicio(id);
    cerrarCargando();
 if (respuesta) {
      exitoAlert("¡Expediente descargado!");
    } else {
      errorAlert("Error al descargar el expediente");
    }
  };

  return (
    <>
      <BarraBusqueda
        onSearch={setBusquedaNumeroExpediente}
        placeholder="Buscar por  juicio o expediente..."
      />

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

      <FormNuevoJuicio
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarJuicios}
        itemEditar={itemEditar}
      />
    </>
  );
};
export default JuiciosAbog;
