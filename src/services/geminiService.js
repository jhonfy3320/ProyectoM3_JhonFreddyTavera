/**
 * ==========================================================
 * HeroVerse AI
 * Gemini Service
 * ==========================================================
 *
 * Responsabilidad:
 * Comunicarse con la IA.
 *
 * Actualmente utiliza una implementación simulada.
 *
 * Más adelante será el único archivo que realizará
 * peticiones HTTP hacia la Serverless Function.
 * ==========================================================
 */

/**
 * Obtiene una respuesta del asistente.
 *
 * @param {string} userMessage
 * @returns {Promise<string>}
 */
export async function sendMessage(userMessage) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(buildMockResponse(userMessage));
    }, 1500);
  });
}

/**
 * Respuesta simulada.
 */
function buildMockResponse(message) {
  return `Sherlock Holmes:

"He analizado cuidadosamente tu consulta:

"${message}"

Cuando integremos Google Gemini responderé utilizando
inteligencia artificial real manteniendo la personalidad
de Sherlock Holmes."`;
}