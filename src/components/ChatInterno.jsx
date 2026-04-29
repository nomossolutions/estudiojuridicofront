import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatInterno = () => {
  const [mensajes, setMensajes] = useState([
    { usuario: "Usuario1", texto: "Hola, ¿todo listo?", propio: false },
    { usuario: "Yo", texto: "Sí, ya está cargado ✅", propio: true },
  ]);

  const [mensajeNuevo, setMensajeNuevo] = useState("");

  const enviarMensaje = () => {
    if (mensajeNuevo.trim() === "") return;

    const nuevo = { usuario: "Yo", texto: mensajeNuevo, propio: true };
    setMensajes([...mensajes, nuevo]);
    setMensajeNuevo("");
  };

  return (
    <aside
      className="bg-light d-flex flex-column p-3 border-start"
      style={{ overflowY: "auto" }}
    >
      <h5 className="mb-3">💬 Chat interno</h5>

      {/* Área de mensajes */}
      <div className="flex-grow-1 overflow-auto mb-3 px-2">
        {mensajes.map((msg, i) => (
          <div
            key={i}
            className={`d-flex mb-2 ${
              msg.propio ? "justify-content-end" : "justify-content-start"
            }`}
          >
            <div
              className={`p-2 rounded shadow-sm ${
                msg.propio
                  ? "bg-primary text-white text-end"
                  : "bg-white text-start"
              }`}
              style={{ maxWidth: "75%" }}
            >
              <small
                className={`d-block ${
                  msg.propio ? "text-white-50" : "text-muted"
                }`}
              >
                {msg.usuario}
              </small>
              {msg.texto}
            </div>
          </div>
        ))}
      </div>

      {/* Entrada de mensaje */}
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Escribe un mensaje..."
          value={mensajeNuevo}
          onChange={(e) => setMensajeNuevo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
        />
        <button className="btn btn-primary" onClick={enviarMensaje}>
          Enviar
        </button>
      </div>
    </aside>
  );
};

export default ChatInterno;
