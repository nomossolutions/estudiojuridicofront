const urlEstudio = import.meta.env.VITE_API_DESARROLLO;


const registrarMovimientoAgenda = (movimiento) => {
  const movimientos = JSON.parse(localStorage.getItem("movimientosAgenda") || "[]");
  movimientos.push(movimiento);
  localStorage.setItem("movimientosAgenda", JSON.stringify(movimientos));
};

export const listarCitas = async (cliente = "", fecha = "") => {
  try {
    const queryParams = new URLSearchParams();
    if (cliente) queryParams.append("cliente", cliente);
    if (fecha) queryParams.append("fecha", fecha);
    const token = localStorage.getItem("token");
    const respuesta = await fetch(
      `${urlEstudio}/citas?${queryParams.toString()}`,
      {
        headers: { "Authorization": `Bearer ${token}` },
      }
    );
    if (!respuesta.ok) {
      throw new Error("Error al listar las citas");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const crearCita = async (citaNueva) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/citas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(citaNueva),
    });
    if (!respuesta.ok) {
      throw new Error("Error al crear la cita");
    }
    const resultado = await respuesta.json();

    
    if (resultado) {
      const movimiento = {
        id: Date.now(),
        tipo: "crear",
        tipoEvento: "Agregar Cita",
        cliente: citaNueva.cliente,
        fecha: new Date().toISOString(),
        fechaCita: citaNueva.fecha,
        usuario: localStorage.getItem("userName") || "Usuario"
      };
      registrarMovimientoAgenda(movimiento);
    }

    return resultado;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const actualizarCita = async (cita) => {
  try {
    const token = localStorage.getItem("token");
    const { _id, ...body } = cita;
    const respuesta = await fetch(`${urlEstudio}/citas/${cita._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!respuesta.ok) {
      throw new Error("Error al actualizar la cita");
    }
    const resultado = await respuesta.json();

  
    if (resultado) {
      const movimiento = {
        id: Date.now(),
        tipo: "actualizar",
        tipoEvento: "Editar Cita",
        cliente: cita.cliente || body.cliente,
        fecha: new Date().toISOString(),
        fechaCita: cita.fecha || body.fecha,
        usuario: localStorage.getItem("userName") || "Usuario"
      };
      registrarMovimientoAgenda(movimiento);
    }

    return resultado;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const eliminarCita = async (_id) => {
  try {
  
    const token = localStorage.getItem("token");
    const respuestaGet = await fetch(`${urlEstudio}/citas/${_id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    let citaData = null;
    if (respuestaGet.ok) {
      citaData = await respuestaGet.json();
    }

   
    const respuesta = await fetch(`${urlEstudio}/citas/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!respuesta.ok) {
      throw new Error("Error al eliminar la cita");
    }

   
    if (citaData) {
      const movimiento = {
        id: Date.now(),
        tipo: "eliminar",
        tipoEvento: "Eliminar Cita",
        cliente: citaData.cliente,
        fecha: new Date().toISOString(),
        fechaCita: citaData.fecha,
        usuario: localStorage.getItem("userName") || "Usuario"
      };
      registrarMovimientoAgenda(movimiento);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
