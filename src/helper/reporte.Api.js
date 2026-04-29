import { listarUsuarios } from "./usuario.Api";


export const obtenerMovimientosAgenda = async () => {
  try {
  
    const movimientosRaw = JSON.parse(localStorage.getItem("movimientosAgenda") || "[]");

   
    const usuarios = await listarUsuarios();
    const usuarioMap = {};
    usuarios.forEach(user => {
      usuarioMap[user.nombre + " " + user.apellido] = user;
    });

   
    const movimientos = movimientosRaw.map(mov => ({
      nombre: mov.cliente,
      tipoEvento: mov.tipoEvento,
      fecha: new Date(mov.fecha).toLocaleDateString('es-ES'),
      usuario: mov.usuario
    }));

    
    return movimientos;
  } catch (error) {
    console.error(error);
    return [];
  }
};
