import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import FormAgregarCita from "../../components/FormAgregarCita";
import { useState, useEffect } from "react";
import BarraBusqueda from "../../components/BarraBusqueda";
import BarraBusquedaFecha from "../../components/BarraBusquedaFecha";
import {
  listarCitas,
  crearCita,
  actualizarCita,
  eliminarCita,
} from "../../helper/cita.Api";
import { listarAbogados } from "../../helper/usuario.Api";
import {
  exitoAlert,
  errorAlert,
  mostrarConfirmacion,
  cargando,
  cerrarCargando,
} from "../../helper/alert.Api";

const AgendaAbog = () => {
  const columnas = [
    "Nº",
    "Fecha",
    "Hora",
    "Cliente",
    "Abogado",
    "Tipo de Evento",
    "Notas",
  ];
  const claves = [
    "fecha",
    "hora",
    "cliente",
    "abogadoNombre",
    "tipoEvento",
    "notas",
  ];
  const [filasFiltradas, setFilasFiltradas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaNombre, setNombre] = useState("");
  const [busquedaFecha, setFecha] = useState("");
  const [abogados, setAbogados] = useState([]);

  const obtenerFilasFiltradas = async () => {
    const data = await listarCitas(busquedaNombre, busquedaFecha);
    if (data) {
      const citasTransformadas = data.map((cita) => ({
        ...cita,
        abogadoNombre:
          cita.abogado && typeof cita.abogado === "object"
            ? `${cita.abogado.nombre} ${cita.abogado.apellido}`
            : cita.abogado,
      }));
      setFilasFiltradas(citasTransformadas);
    } else {
      errorAlert("Error al obtener citas");
    }
  };

  useEffect(() => {
    obtenerFilasFiltradas();
  }, [busquedaNombre, busquedaFecha]);

  const abrirModal = () => {
    setItemEditar(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setItemEditar(null);
    setMostrarModal(false);
  };

  const editar = (id) => {
    const cita = filasFiltradas.find((item) => item._id === id);
    setItemEditar(cita);
    setMostrarModal(true);
  };

  useEffect(() => {
    const cargarAbogados = async () => {
      const data = await listarAbogados();
      setAbogados(data);
    };
    cargarAbogados();
  }, []);

  const eliminar = async (id) => {
    const cita = filasFiltradas.find((item) => item._id === id);
    const confirmado = await mostrarConfirmacion(
      `¿Eliminar la ${cita.tipoEvento} del cliente ${cita.cliente}?`
    );
    if (confirmado) {
      cargando("Eliminando cita...");
      const ok = await eliminarCita(cita._id);
      cerrarCargando();
      if (ok) {
        exitoAlert("La cita fue eliminada correctamente");
        await obtenerFilasFiltradas();
      } else {
        errorAlert("No se pudo eliminar la cita");
      }
    }
  };

  const agregarCita = async (cita) => {
    cargando(itemEditar ? "Actualizando cita..." : "Creando cita...");
    let nuevaCita;
    if (itemEditar) {
      nuevaCita = await actualizarCita({ ...cita, _id: itemEditar._id });
    } else {
      nuevaCita = await crearCita(cita);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    cerrarCargando();
    if (nuevaCita) {
      exitoAlert("Operación realizada con éxito");
      await obtenerFilasFiltradas();
      cerrarModal();
    } else {
      errorAlert("Error al guardar la cita");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <BarraBusqueda
          onSearch={setNombre}
          placeholder="Buscar por cliente..."
        />
        <BarraBusquedaFecha onDateChange={setFecha} />
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
      <FormAgregarCita
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarCita}
        itemEditar={itemEditar}
        abogados={abogados}
      />
    </>
  );
};

export default AgendaAbog;
