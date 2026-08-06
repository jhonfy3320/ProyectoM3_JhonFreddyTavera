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
import { generateResponse } from "./chatEngine.js";
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

  generateAssistantMessage(text);
}

/**
 * Solicita una respuesta al Chat Engine.
 */
async function generateAssistantMessage(userMessage) {

    showTypingIndicator();

    const response = await generateResponse(userMessage);

    hideTypingIndicator();

    addMessage({

        role: "assistant",

        content: response

    });

    renderChat();
}