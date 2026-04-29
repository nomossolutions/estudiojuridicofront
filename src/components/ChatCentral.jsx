import { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import "../styles/chatCentral.css"; 


const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey: API_KEY });


export default function ChatCentral() {
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const [chatSession, setChatSession] = useState(null);

  
  useEffect(() => {
    const instruction =
      "Eres MARIO, abogado especializado en Derecho Argentino y respondes formalmente.";

    try {
      if (!chatSession) {
        const chat = genAI.chats.create({
          model: "gemini-2.5-flash",
          config: { systemInstruction: instruction },
        });
        setChatSession(chat);
      }
    } catch (error) {
      console.error("Error al iniciar chat:", error);
    }
  }, []);

  
  const enviar = async () => {
    if (!texto.trim() || cargando || !chatSession) return;

    const mensajeUsuario = { role: "user", content: texto };
    const historialActualizado = [...mensajes, mensajeUsuario];

    setMensajes(historialActualizado);
    setTexto("");
    setCargando(true);

    try {
      const res = await chatSession.sendMessage({
        message: mensajeUsuario.content,
      });
      const respuesta = res.text || "Error: Sin respuesta.";

      setMensajes([
        ...historialActualizado,
        { role: "model", content: respuesta },
      ]);
    } catch (error) {
      console.error("Error de la API:", error);
      setMensajes([
        ...historialActualizado,
        { role: "model", content: "Lo siento, hubo un error de conexión." },
      ]);
    } finally {
      setCargando(false);
    }
  };

  
  const manejarPulsacion = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviar();
    }
  };

  return (
    <div className="chat-container">
     
      <div className="chat-area">
        {mensajes.length === 0 && (
          <div className="chat-placeholder">Inicia una conversación.</div>
        )}

        {mensajes.map((m, i) => (
          <div
            key={i}
            className={`mensaje ${m.role === "user" ? "usuario" : "mario"}`}
          >
            {m.content}
          </div>
        ))}

        {cargando && <div className="escribiendo">Escribiendo...</div>}
      </div>

      
      <div className="input-area">
        <textarea
          placeholder="Escribe tu mensaje..."
          value={texto}
          disabled={cargando || !chatSession}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={manejarPulsacion} 
        />
        <button
          onClick={enviar}
          disabled={cargando || !chatSession}
          className="btn-enviar"
        >
          {cargando ? "Cargando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
  
}