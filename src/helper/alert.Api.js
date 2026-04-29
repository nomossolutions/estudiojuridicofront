import Swal from "sweetalert2";

export const exitoAlert = (mensaje) => {
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: mensaje,
    confirmButtonColor: "#3085d6",
  });
};

export const errorAlert = (mensaje) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
    confirmButtonColor: "#d33",
  });
};

export const mostrarConfirmacion = async (mensaje) => {
  const resultado = await Swal.fire({
    title: "¿Estás seguro?",
    text: mensaje,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "Cancelar",
  });
  return resultado.isConfirmed;
};

export const cargando = (mensaje = "Procesando...") => {
  Swal.fire({
    title: mensaje,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const cerrarCargando = () => {
  Swal.close();
};
