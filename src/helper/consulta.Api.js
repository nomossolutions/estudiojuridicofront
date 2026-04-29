const urlEstudio = import.meta.env.VITE_API_DESARROLLO;

export const crearConsulta = async (consultaNueva) => {
  try {
    const respuesta = await fetch(`${urlEstudio}/consultas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consultaNueva),
    });
    if (!respuesta.ok) {
      throw new Error("Error al crear la consulta");
    }
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const listarConsultas = async (fecha = "") => {
  try {
    const queryParams = new URLSearchParams();
    if (fecha) queryParams.append("fecha", fecha);

    const respuesta = await fetch(
      `${urlEstudio}/consultas?${queryParams.toString()}`,
    );
    if (!respuesta.ok) {
      throw new Error("Error al listar las consultas");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const contarConsultasNoLeidas = async () => {
  try {
    const respuesta = await fetch(`${urlEstudio}/consultas/no-leidas`);
    if (!respuesta.ok) throw new Error("Error al contar consultas");
    const data = await respuesta.json();
    return data.length;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
export const marcarConsultasLeidas = async () => {
  try {
    const respuesta = await fetch(`${urlEstudio}/consultas/marcar-leidas`, {
      method: "PUT",
    });
    if (!respuesta.ok) throw new Error("Error al marcar consultas como leídas");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
