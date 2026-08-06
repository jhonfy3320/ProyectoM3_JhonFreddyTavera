/**
 * ==========================================================
 * HeroVerse AI
 * Chat Controller
 * ==========================================================
 *
 * Responsabilidades:
 * ✔ Capturar eventos de la interfaz.
 * ✔ Validar el mensaje.
 * ✔ Guardar mensajes en el Store.
 * ✔ Solicitar el renderizado del chat.
 * ✔ Preparar el flujo para integrar Gemini.
 * ==========================================================
 */
import { addMessage } from "./chatStore.js";
import { renderChat } from "../ui/chatRenderer.js";

/**
 * Inicializa el controlador del chat.
 */
export function initChatController() {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");

  if (!form || !input) return;

  form.addEventListener("submit", handleSubmit);
}

/**
 * Maneja el envío del formulario.
 */
function handleSubmit(event) {
  event.preventDefault();

  const input = document.getElementById("chat-input");
  const text = input.value.trim();

  if (!text) return;

  addUserMessage(text);
  input.value = "";
}

/**
 * Agrega el mensaje del usuario.
 */
function addUserMessage(content) {
  addMessage({
    role: "user",
    content
  });

  renderChat();

  /*
   * Próximamente:
   *
   * await generateAIResponse(content);
   *
   * Aquí conectaremos Gemini sin modificar
   * el resto de la arquitectura.
   */
}