/**
 * ==========================================================
 * HeroVerse AI
 * Chat Store
 * ==========================================================
 *
 * Este módulo es el encargado de administrar el estado
 * de la conversación.
 *
 * Responsabilidades:
 * - Guardar los mensajes.
 * - Agregar nuevos mensajes.
 * - Obtener el historial.
 * - Limpiar la conversación.
 *
 * No conoce absolutamente nada sobre:
 * - HTML
 * - CSS
 * - Router
 * - Gemini
 * - Fetch
 *
 * Solamente administra datos.
 * ==========================================================
 */

/**
 * Historial privado de la conversación.
 *
 * Cada elemento tiene la estructura:
 * {
 *   role: "user" | "assistant",
 *   content: "texto"
 * }
 */
const messages = [];

/**
 * ==========================================================
 * Agrega un mensaje al historial.
 * ==========================================================
 *
 * @param {Object} message
 * @param {"user"|"assistant"} message.role
 * @param {string} message.content
 */
export function addMessage(message) {

    messages.push(message);

}

/**
 * ==========================================================
 * Devuelve una copia del historial.
 * ==========================================================
 */
export function getMessages() {
  return [...messages];
}

/**
 * ==========================================================
 * Elimina todos los mensajes.
 * ==========================================================
 */
export function clearMessages() {
  messages.length = 0;
}

/**
 * ==========================================================
 * Indica si existen mensajes almacenados.
 * ==========================================================
 */
export function hasMessages() {
  return messages.length > 0;
}