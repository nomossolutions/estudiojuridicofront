import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import Swal from "sweetalert2";
import FormNuevaTarea from "../../components/FormNuevaTarea";
import { useState, useEffect } from "react";
import BarraBusqueda from "../../components/BarraBusqueda";
import BarraBusquedaFecha from "../../components/BarraBusquedaFecha";
import "../../styles/estados.css";
import {
  listarTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from "../../helper/tarea.api";
import { listarAbogados } from "../../helper/usuario.Api";

const TareasAbog = () => {
   const columnas = [
    "Nº",
    "Descripcion",
    "Responsable",
    "Fecha limite",
    "Prioridad",
    "Estado",
  ];
  const claves = [
    "descripcion",
    "abogadoNombre",
    "fecha",
    "prioridad",
    "estado",
  ];

  const [filasFiltradas, setFilasFiltradas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaEstado, setbusquedaEstado] = useState("");
  const [busquedaFecha, setbusquedaFecha] = useState("");

  const obtenerFilasFiltradas = async () => {
    try {
      const data = await listarTareas(busquedaEstado, busquedaFecha);
      const tareaTransformada = data.map((tarea) => ({
        ...tarea,
        abogadoNombre:
          tarea.abogado && typeof tarea.abogado === "object"
            ? `${tarea.abogado.nombre} ${tarea.abogado.apellido}`
            : tarea.abogado,
      }));
      setFilasFiltradas(tareaTransformada);
    } catch (error) {
      console.error("Error al obtener la tarea:", error);
    }
  };

  useEffect(() => {
    obtenerFilasFiltradas();
  }, [busquedaEstado, busquedaFecha]);

  const abrirModal = () => {
    setItemEditar(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setItemEditar(null);
    setMostrarModal(false);
  };

  const editar = (id) => {
    const tarea = filasFiltradas.find((item) => item._id === id);
    setItemEditar(tarea);
    setMostrarModal(true);
  };

  const [abogados, setAbogados] = useState([]);
  useEffect(() => {
    const cargarAbogados = async () => {
      const data = await listarAbogados();
      setAbogados(data);
    };
    cargarAbogados();
  }, []);

  const agregarTarea = async (tarea) => {
    let nuevaTarea;
    if (itemEditar) {
      nuevaTarea = await actualizarTarea({ ...tarea, _id: itemEditar._id });
    } else {
      nuevaTarea = await crearTarea(tarea);
    }

    if (nuevaTarea) {
      await obtenerFilasFiltradas();
      cerrarModal();
    }
  };

  const eliminar = async (id) => {
    const tarea = filasFiltradas.find((item) => item._id === id);
    const confirmado = await Swal.fire({
      title: `¿Eliminar la tarea: ${tarea.descripcion}?`,
      text: "Este cambio no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmado.isConfirmed) {
      const ok = await eliminarTarea(tarea._id);
      if (ok) {
        Swal.fire({
          title: "Eliminado",
          text: "La tarea fue eliminada correctamente.",
          icon: "success",
        });
        await obtenerFilasFiltradas();
      }
    }
  };
  

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <BarraBusqueda
          onSearch={setbusquedaEstado}
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
          </div>
        )}
      />
      <div className="d-flex justify-content-end mt-3">
        <Boton action="agregar" onClick={abrirModal} />
      </div>
      <FormNuevaTarea
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarTarea}
        itemEditar={itemEditar}
        abogados={abogados}
      />
    </>
  );
};

export default TareasAbog;