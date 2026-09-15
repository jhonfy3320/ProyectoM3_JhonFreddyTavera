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
import {
  addMessage,
  getActiveCharacterId,
} from "./chatStore.js";
import {
  renderChat,
  showTypingIndicator,
  hideTypingIndicator
} from "../ui/chatRenderer.js";

let chatState = "idle";

/**
 * Inicializa el controlador del chat.
 */
export function initChatController() {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");

  if (!form || !input) return;

  renderChat();

  form.addEventListener("submit", handleSubmit);
}
/**
 * Envía un mensaje.
 */
function handleSubmit(event) {
  event.preventDefault();

  if ( chatState === "loading") {
    return
  }

  const input = document.getElementById("chat-input");
  const text = input.value.trim();

  if (!text) return;

  const characterId = getActiveCharacterId();

  addMessage(
    {
      role: "user",
      content: text,
    },
    characterId
  );

  renderChat();
  input.value = "";

  generateAssistantMessage(characterId); 
  }

/**
 * Solicita una respuesta al Chat Engine.
 */
async function generateAssistantMessage(characterId) {
  chatState = "loading";

  showTypingIndicator();

  try {
    const response = await generateResponse();

    if (!response || typeof response.content !== "string") {
      throw new Error(
        "La respuesta del asistente no tiene un formato válido."
      );
    }

    addMessage(
    {
      role: "assistant",
      content: response.content,
    },
    characterId
  );

    chatState = "success";

    renderChat();

  } catch (error) {
  console.error("Error al generar respuesta:", error);

  chatState = "error";

  renderChat();

} finally {
  hideTypingIndicator();

  if (chatState === "success" || chatState === "error") {
    chatState = "idle";
  }
}
}