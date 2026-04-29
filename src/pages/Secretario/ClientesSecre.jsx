import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import FormNuevoCliente from "../../components/FormNuevoCliente";
import BarraBusqueda from "../../components/BarraBusqueda";
import { useState, useEffect } from "react";
import {
  listarClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} from "../../helper/cliente.Api";
import {
  exitoAlert,
  errorAlert,
  mostrarConfirmacion,
  cargando,
  cerrarCargando,
} from "../../helper/alert.Api";

const ClientesSecre = () => {
  const columnas = [
    "Nº",
    "Nombre",
    "DNI / CUIT",
    "Email",
    "Teléfono",
    "Estado",
  ];
  const claves = [
    "nombre",
    "identificador",
    "email",
    "telefono",
    "estadoCliente",
  ];
  const [filasFiltradas, setFilasFiltradas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaIdentificador, setBusquedaIdentificador] = useState("");

  const obtenerFilasFiltradas = async () => {
    const data = await listarClientes(busquedaIdentificador);
    if (data) {
      const clientesTransformados = data.map((cliente) => ({
        ...cliente,
      }));
      setFilasFiltradas(clientesTransformados);
    } else {
      errorAlert("Error al obtener clientes");
    }
  };

  useEffect(() => {
    obtenerFilasFiltradas();
  }, [busquedaIdentificador]);

  const abrirModal = () => {
    setItemEditar(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setItemEditar(null);
    setMostrarModal(false);
  };

  const editar = (id) => {
    const cliente = filasFiltradas.find((item) => item._id === id);
    setItemEditar(cliente);
    setMostrarModal(true);
  };

  const eliminar = async (id) => {
    const cliente = filasFiltradas.find((item) => item._id === id);
    const confirmado = await mostrarConfirmacion(
      `¿Eliminar al cliente ${cliente.nombre}?`
    );
    if (confirmado) {
      cargando("Eliminando cliente...");
      const ok = await eliminarCliente(cliente._id);
      cerrarCargando();
      if (ok) {
        exitoAlert("El cliente fue eliminado correctamente");
        obtenerFilasFiltradas();
      } else {
        errorAlert("No se pudo eliminar el cliente");
      }
    }
  };

  const agregarCliente = async (cliente) => {
    cargando(itemEditar ? "Actualizando cliente..." : "Creando cliente...");
    let nuevoCliente;
    if (itemEditar) {
      nuevoCliente = await actualizarCliente({
        ...cliente,
        _id: itemEditar._id,
      });
    } else {
      nuevoCliente = await crearCliente(cliente);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    cerrarCargando();
    if (nuevoCliente) {
      exitoAlert("Operación realizada con éxito");
      obtenerFilasFiltradas();
      cerrarModal();
    } else {
      errorAlert("Error al guardar el cliente");
    }
  };

  return (
    <>
      <BarraBusqueda
        onSearch={setBusquedaIdentificador}
        placeholder="Buscar por DNI..."
      />

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

      <FormNuevoCliente
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarCliente}
        itemEditar={itemEditar}
      />
    </>
  );
};

export default ClientesSecre;
