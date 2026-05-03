import { toast } from "react-toastify";

export const exitoAlert = (mensaje) => {
  toast.success(mensaje, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const errorAlert = (mensaje) => {
  toast.error(mensaje, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const mostrarConfirmacion = async (mensaje) => {
  return new Promise((resolve) => {
    const confirmToast = toast.warning(
      ({ closeToast }) => (
        <div>
          <p>{mensaje}</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => {
                closeToast();
                resolve(true);
              }}
              style={{
                padding: "5px 15px",
                backgroundColor: "#3085d6",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Sí, confirmar
            </button>
            <button
              onClick={() => {
                closeToast();
                resolve(false);
              }}
              style={{
                padding: "5px 15px",
                backgroundColor: "#d33",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  });
};

let loadingToastId = null;

export const cargando = (mensaje = "Procesando...") => {
  loadingToastId = toast.info(mensaje, {
    position: "top-center",
    autoClose: false,
    hideProgressBar: false,
    closeButton: false,
    draggable: false,
    isLoading: true,
  });
};

export const cerrarCargando = () => {
  if (loadingToastId !== null) {
    toast.dismiss(loadingToastId);
    loadingToastId = null;
  }
};
