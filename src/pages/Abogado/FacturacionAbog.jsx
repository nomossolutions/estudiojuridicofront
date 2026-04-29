import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import { useState, useEffect } from "react";
import FormNuevaFactura from "../../components/FormNuevaFactura";
import BarraBusqueda from "../../components/BarraBusqueda";
import BarraBusquedaFecha from "../../components/BarraBusquedaFecha";
import BarraBusquedaEstado from "../../components/BarraBusquedaEstado";
import "../../styles/estados.css";
import {
  listarFacturas,
  crearFacturas,
  actualizarFacturas,
  eliminarFacturas,
  descargarFactura,
} from "../../helper/factura.Api";
import {
  exitoAlert,
  errorAlert,
  mostrarConfirmacion,
  cargando,
  cerrarCargando,
} from "../../helper/alert.Api";

const FacturacionAbog = () => {
  const columnas = [
    "Nº",
    "Fecha",
    "Cliente",
    "Concepto",
    "Archivo",
    "Monto",
    "Estado",
  ];
  const claves = [
    "fecha",
    "nombreCliente",
    "concepto",
    "archivoNombre",
    "monto",
    "estado",
  ];

  const [filasFiltradas, setFilasFiltradas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [busquedaEstado, setEstado] = useState("");
  const [busquedaFecha, setFecha] = useState("");

  const obtenerFilasFiltradas = async () => {
    const data = await listarFacturas(
      busquedaCliente,
      busquedaEstado,
      busquedaFecha
    );
    if (data) {
      const facturaTransformada = data.map((factura) => ({
        ...factura,
        archivoNombre: (
          <a
            href={factura.seleccionarArchivo?.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {factura.seleccionarArchivo?.nombre || "archivo"}
          </a>
        ),
      }));
      setFilasFiltradas(facturaTransformada);
    } else {
      errorAlert("Error al obtener las facturas");
    }
  };

  useEffect(() => {
    obtenerFilasFiltradas();
  }, [busquedaCliente, busquedaEstado, busquedaFecha]);

  const abrirModal = () => {
    setItemEditar(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setItemEditar(null);
    setMostrarModal(false);
  };

  const editar = (id) => {
    const facturas = filasFiltradas.find((item) => item._id === id);
    setItemEditar(facturas);
    setMostrarModal(true);
  };

  const eliminar = async (id) => {
    const factura = filasFiltradas.find((item) => item._id === id);
    const confirmado = await mostrarConfirmacion(
      `¿Eliminar la factura del cliente ${factura.nombreCliente}?`
    );
    if (confirmado) {
      cargando("Eliminando factura...");
      const respuesta = await eliminarFacturas(factura._id);
      cerrarCargando();
      if (respuesta) {
        exitoAlert(respuesta.mensaje);
        await obtenerFilasFiltradas();
      } else {
        errorAlert("No se pudo eliminar la factura");
      }
    }
  };

  const agregarFactura = async (formData, id) => {
    cargando(itemEditar ? "Actualizando factura..." : "Creando factura...");
    let nuevaFactura;
    if (itemEditar) {
      nuevaFactura = await actualizarFacturas(formData, id);
    } else {
      nuevaFactura = await crearFacturas(formData);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    cerrarCargando();
    if (nuevaFactura) {
      exitoAlert(nuevaFactura.mensaje || "Operación realizada con éxito");
      await obtenerFilasFiltradas();
      cerrarModal();
    } else {
      errorAlert("Error al guardar la factura");
    }
  };
  
  const descargar = async (id) => {
    cargando("Descargando factura...");
    const respuesta = await descargarFactura(id);
    cerrarCargando();
    if (respuesta) {
      exitoAlert("¡Factura descargada!");
    } else {
      errorAlert("Error al descargar la factura");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <BarraBusqueda
          onSearch={setBusquedaCliente}
          placeholder="Buscar por cliente..."
        />
        <BarraBusquedaEstado onEstadoChange={setEstado} />
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
            <Boton action="descargar" onClick={() => descargar(fila._id)} />
          </div>
        )}
      />
      <div className="d-flex justify-content-end mt-3">
        <Boton action="agregar" onClick={abrirModal} />
      </div>
      <FormNuevaFactura
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarFactura}
        itemEditar={itemEditar}
      />
    </>
  );
};

export default FacturacionAbog;
