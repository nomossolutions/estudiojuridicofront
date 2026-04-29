const urlEstudio = import.meta.env.VITE_API_DESARROLLO;

export const listarClientes = async (identificador = "") => {
  try {
    const queryParams = new URLSearchParams();
    if (identificador) queryParams.append("identificador", identificador);
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/clientes?${queryParams.toString()}`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    if (!respuesta.ok) {
      throw new Error("Error al listar los clientes");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const crearCliente = async (clienteNuevo) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(clienteNuevo),
    });
    if (!respuesta.ok) {
      throw new Error("Error al crear el cliente");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const actualizarCliente = async (cliente) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/clientes/${cliente._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(cliente),
    });
    if (!respuesta.ok) {
      throw new Error("Error al actualizar el cliente");
    }
    return await respuesta.json();
  } catch (error) {
     console.error(error);
    return null;
  }
};

export const eliminarCliente = async (_id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/clientes/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!respuesta.ok) {
      throw new Error("Error al eliminar el cliente");
    }
    return true;
  } catch (error) {
     console.error(error);
    return false;
  }
};
