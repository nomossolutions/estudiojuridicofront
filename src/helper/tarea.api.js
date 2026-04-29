const urlEstudio = import.meta.env.VITE_API_DESARROLLO;

export const listarTareas = async (estado = "", fecha = "") => {
  try {
    const queryParams = new URLSearchParams();
    if (estado) queryParams.append("estado", estado);
    if (fecha) queryParams.append("fecha", fecha);

    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/tarea?${queryParams.toString()}`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    if (!respuesta.ok) {
      throw new Error("Error al listar las tareas");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const crearTarea = async (tareaNueva) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/tarea`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(tareaNueva),
    });
    if (!respuesta.ok) {
      throw new Error("Error al crear la tarea");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const actualizarTarea = async (tarea) => {
  try {
    const token = localStorage.getItem("token");
    const { _id, ...body } = tarea; 
    const respuesta = await fetch(`${urlEstudio}/tarea/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!respuesta.ok) {
      throw new Error("Error al actualizar la tarea");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const eliminarTarea = async (_id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/tarea/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!respuesta.ok) {
      throw new Error("Error al eliminar la tarea");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
