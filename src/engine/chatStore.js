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
import { characters } from "../characters/characters.js";


const messages = [];

/**
 * ==========================================================
 * Estado del personaje
 * ==========================================================
 *
 * Sherlock Holmes será el personaje inicial.
 */

let activeCharacterId = "sherlock";

/**
 * ==========================================================
 * Mensajes
 * ==========================================================
 */

/**
 * Agrega un mensaje al historial.
 *
 * @param {Object} message
 * @param {"user"|"assistant"} message.role
 * @param {string} message.content
 */
export function addMessage(message) {
  messages.push(message);
}

/**
 * Devuelve una copia del historial.
 */
export function getMessages() {
  return [...messages];
}

/**
 * Elimina todos los mensajes.
 */
export function clearMessages() {
  messages.length = 0;
}

/**
 * Indica si existen mensajes almacenados.
 */
export function hasMessages() {
  return messages.length > 0;
}

/**
 * ==========================================================
 * Personaje activo
 * ==========================================================
 */

/**
 * Establece el personaje activo.
 *
 * @param {string} characterId
 */
export function setActiveCharacter(characterId) {
  const characterExists = characters.some(
    (character) => character.id === characterId
  );

  if (!characterExists) {
    throw new Error(
      `El personaje "${characterId}" no existe.`
    );
  }

  activeCharacterId = characterId;
}

/**
 * Devuelve el ID del personaje activo.
 *
 * @returns {string}
 */
export function getActiveCharacterId() {
  return activeCharacterId;
}

/**
 * Devuelve el objeto completo del personaje activo.
 *
 * @returns {Object}
 */
export function getActiveCharacter() {
  return characters.find(
    (character) => character.id === activeCharacterId
  );
}