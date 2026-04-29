const urlEstudio = import.meta.env.VITE_API_DESARROLLO;

export const listarArchivos = async (nombreCliente = "", fecha = "") => {
  try {
    const queryParams = new URLSearchParams();
    if (nombreCliente) queryParams.append("nombreCliente", nombreCliente);
    if (fecha) queryParams.append("fecha", fecha);

    const token = localStorage.getItem("token");
    const respuesta = await fetch(
      `${urlEstudio}/subirArchivos?${queryParams.toString()}`,
      {
        headers: { "Authorization": `Bearer ${token}` },
      }
    );
    if (!respuesta.ok) {
      throw new Error("Error al listar los documemntos");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const crearArchivos = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/subirArchivos`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });
    if (!respuesta.ok) throw new Error("Error al crear el documento");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const actualizarDocumentos = async (formData, id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/subirArchivos/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });
    if (!respuesta.ok) {
      throw new Error("Error al actualizar el documento");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const eliminarDocumento = async (_id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/subirArchivos/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!respuesta.ok) {
      throw new Error("Error al eliminar el archivo");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const descargarDocumento = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/subirArchivos/${id}`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    if (!respuesta.ok)
      throw new Error("Error al obtener datos del archivo");
    const archivo = await respuesta.json();
    const respuestaRecibida = await fetch(
      `${urlEstudio}/subirArchivos/descargar/${id}`,
      {
        headers: { "Authorization": `Bearer ${token}` },
      }
    );
    if (!respuestaRecibida.ok) throw new Error("Error al descargar documento");
    const blob = await respuestaRecibida.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = archivo.seleccionarArchivo.nombre;
    link.click();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
