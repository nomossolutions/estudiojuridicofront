const urlUsuarios = import.meta.env.VITE_API_USUARIOS;

export const listarAbogados = async () => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlUsuarios}?role=abog`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    if (!respuesta.ok) throw new Error("Error al obtener abogados");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const listarUsuarios = async ( search = "") => {
  try {
    const token = localStorage.getItem("token");
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search);

    const url = queryParams.toString()
      ? `${urlUsuarios}?${queryParams.toString()}`
      : urlUsuarios;
    const respuesta = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
       } });
    if (!respuesta.ok) {
      throw new Error("Error al obtener usuarios");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const crearUsuario = async (usuarioNuevo) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlUsuarios}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(usuarioNuevo),
    });
    if (!respuesta.ok) {
      throw new Error("Error al crear el usuario");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const actualizarUsuario = async (usuario) => {
  try {
    const token = localStorage.getItem("token");
    const { _id, ...body } = usuario;
    const respuesta = await fetch(`${urlUsuarios}/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!respuesta.ok) {
      throw new Error("Error al actualizar el usuario");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const eliminarUsuario = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlUsuarios}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!respuesta.ok) {
      throw new Error("Error al eliminar el usuario");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
