import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import FormAltaUsuario from "../Administrador/FormAltaUsuario";
import { useState, useEffect } from "react";
import BarraBusqueda from "../../components/BarraBusqueda";
import {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../../helper/usuario.Api";
import {
  exitoAlert,
  errorAlert,
  mostrarConfirmacion,
  cargando,
  cerrarCargando,
} from "../../helper/alert.Api";

const UsuariosAdmi = () => {
  const columnas = ["Nº", "Nombre", "Apellido", "Email", "Telefono", "Rol"];
  const claves = ["nombre", "apellido", "email", "telefono", "role"];
  const [filasFiltradas, setFilasFiltradas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaNombreApellido, setNombreApellido] = useState("");

  const obtenerFilasFiltradas = async () => {
    try {
      const data = await listarUsuarios(busquedaNombreApellido);
      const usuariosTransformados = data.map((usuario) => ({
        ...usuario,
      }));
      setFilasFiltradas(usuariosTransformados);
    } catch (error) {
       errorAlert("Error al obtener citas");
    }
  };

  useEffect(() => {
    obtenerFilasFiltradas();
  }, [busquedaNombreApellido]);

  const abrirModal = () => {
    setItemEditar(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setItemEditar(null);
    setMostrarModal(false);
  };

  const editar = (id) => {
    const usuarios = filasFiltradas.find((item) => item._id === id);
    setItemEditar(usuarios);
    setMostrarModal(true);
  };

  const eliminar = async (id) => {
    const usuarios = filasFiltradas.find((item) => item._id === id);
    const confirmado = await mostrarConfirmacion(
 `¿Eliminar a el usuario ${usuarios.nombre} ${usuarios.apellido}?`,
   );
    if (confirmado) {
        cargando("Eliminando usuario...");
      const ok = await eliminarUsuario(usuarios._id);
       cerrarCargando();
      if (ok) {
        exitoAlert("El usuario fue eliminado correctamente");
        obtenerFilasFiltradas();
      }else{
        errorAlert("No se pudo eliminar la cita");
      }
    }
  };

  const agegarUsuario = async (user) => {
    let nuevoUsuario;
    if (itemEditar) {
      nuevoUsuario = await actualizarUsuario({ ...user, _id: itemEditar._id });
    } else {
      nuevoUsuario = await crearUsuario(user);
    }

    if (nuevoUsuario) {
      obtenerFilasFiltradas();
      cerrarModal();
    }
  };

  return (
    <>
      <BarraBusqueda
        onSearch={setNombreApellido}
        placeholder="Buscar por nombre o apellido..."
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
      <FormAltaUsuario
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agegarUsuario}
        itemEditar={itemEditar}
      />
    </>
  );
};

export default UsuariosAdmi;
