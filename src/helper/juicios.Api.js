const urlEstudio = import.meta.env.VITE_API_DESARROLLO;

export const listarJuicios = async (numeroExpediente = "") => {
  try {
    const queryParams = new URLSearchParams();
    if (numeroExpediente)
      queryParams.append("numeroExpediente", numeroExpediente);
    const token = localStorage.getItem("token");
    const respuesta = await fetch(
      `${urlEstudio}/juicios?${queryParams.toString()}`,
      {
        headers: { "Authorization": `Bearer ${token}` },
      }
    );
    if (!respuesta.ok) {
      throw new Error("Error al listar los juicios");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const crearJuicios = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/juicios`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });
    if (!respuesta.ok) {
      throw new Error("Error al crear el juicio");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const actualizarJuicios = async (formData, id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/juicios/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });
    if (!respuesta.ok) {
      throw new Error("Error al actualizar el juicio");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const eliminarJuicios = async (_id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/juicios/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!respuesta.ok) {
      throw new Error("Error al eliminar el juicio");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const descargarJuicio = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/juicios/${id}`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    if (!respuesta.ok) {
      throw new Error("Error al obtener datos del juicio");
    }
    const juicio = await respuesta.json();
    const respuestaRecibida = await fetch(
      `${urlEstudio}/juicios/descargar/${id}`,
      {
        headers: { "Authorization": `Bearer ${token}` },
      }
    );
    if(!respuestaRecibida.ok){
      throw new Error("Error al descargar el juicio");
    }
    const blob = await respuestaRecibida.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = juicio.seleccionarArchivo.nombre;;
    link.click();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
