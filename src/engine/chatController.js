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
import {
  renderChat,
  showTypingIndicator,
  hideTypingIndicator
} from "../ui/chatRenderer.js";

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
 * Envía un mensaje.
 */
function handleSubmit(event) {
  event.preventDefault();

  const input = document.getElementById("chat-input");
  const text = input.value.trim();

  if (!text) return;

  addMessage({
    role: "user",
    content: text
  });

  renderChat();
  input.value = "";

  simulateAIResponse(text);
}

/**
 * Simula una respuesta de la IA.
 */
function simulateAIResponse(userMessage) {
  showTypingIndicator();

  setTimeout(() => {
    hideTypingIndicator();

    addMessage({
      role: "assistant",
      content: generateFakeResponse(userMessage)
    });

    renderChat();
  }, 1500);
}

/**
 * Respuestas temporales.
 */
function generateFakeResponse(message) {
  return `Interesante... Has dicho: "${message}". Muy pronto responderé utilizando Gemini AI.`;
}