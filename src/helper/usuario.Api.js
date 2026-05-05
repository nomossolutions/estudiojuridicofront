const urlUsuarios = import.meta.env.VITE_API_USUARIOS;

// Función helper para manejar errores de autenticación
const handleAuthError = (status) => {
  if (status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
    throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
  }
};

export const listarAbogados = async () => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlUsuarios}?role=abog`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    
    handleAuthError(respuesta.status);
    
    if (!respuesta.ok) throw new Error("Error al obtener abogados");
    return await respuesta.json();
  } catch (error) {
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
    
    handleAuthError(respuesta.status);
    
    if (!respuesta.ok) {
      throw new Error("Error al obtener usuarios");
    }
    return await respuesta.json();
  } catch (error) {
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
    
    handleAuthError(respuesta.status);
    
    if (!respuesta.ok) {
      throw new Error("Error al crear el usuario");
    }
    return await respuesta.json();
  } catch (error) {
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
    
    handleAuthError(respuesta.status);
    
    if (!respuesta.ok) {
      throw new Error("Error al actualizar el usuario");
    }
    return await respuesta.json();
  } catch (error) {
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
    
    handleAuthError(respuesta.status);
    
    if (!respuesta.ok) {
      throw new Error("Error al eliminar el usuario");
    }
    return await respuesta.json();
  } catch (error) {
    return null;
  }
};
