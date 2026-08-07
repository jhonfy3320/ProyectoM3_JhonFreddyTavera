/**
 * ==========================================================
 * HeroVerse AI
 * Chat Engine
 * ==========================================================
 *
 * Este módulo representa el "cerebro" del chat.
 *
 * Actualmente simula una IA.
 *
 * Más adelante será el único archivo que se comunicará
 * con nuestra Serverless Function y posteriormente
 * con Google Gemini.
 *
 * El Controller nunca sabrá cómo se genera una respuesta.
 * Solamente pedirá una respuesta al Engine.
 * ==========================================================
 */
import { getMessages } from "./chatStore.js";
import { sendMessage } from "../services/geminiService.js";

/**
 * Genera una respuesta del asistente.
 *
 * @param {string} userMessage
 * @returns {Promise<string>}
 */
/**
 * Obtiene la respuesta del asistente.
 */
export async function generateResponse() {
    const messages = getMessages();
    const response = await sendMessage(messages);
    return response;

}

/**
 *   return new Promise((resolve) => {
    setTimeout(() => {
      resolve(buildFakeResponse(userMessage));
    }, 1500);
  });
}

/**
 * Respuestas temporales.
 *
 * Esta función desaparecerá cuando conectemos Gemini.
 
function buildFakeResponse(message) {
  return `Interesante... Has dicho: "${message}". Muy pronto responderé utilizando Google Gemini AI.`;
 */