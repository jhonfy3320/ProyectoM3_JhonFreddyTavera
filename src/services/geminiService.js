/**
 * ==========================================================
 * HeroVerse AI
 * Gemini Service
 * ==========================================================
 *
 * Responsabilidad:
 * Comunicarse con la IA.
 *
 * Actualmente trabaja en modo Mock
 *
 * Más adelante será el único archivo que realizará
 * peticiones HTTP hacia la Serverless Function.
 * ==========================================================
 */

const USE_MOCK = true;
/**
 * Obtiene una respuesta del asistente.
 *
 * @param {string} userMessage
 * @returns {Promise<string>}
 */
export async function sendMessage(messages) {
  if (USE_MOCK) {
    return mockRequest(messages);
  }

  return apiRequest(messages);
}

/**
 * ==========================================================
 * Simulación temporal.
 * ==========================================================
 */
async function mockRequest(messages) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lastMessage = messages.at(-1);

      resolve(`Sherlock Holmes:

He analizado cuidadosamente tu consulta:

"${lastMessage.content}"

Muy pronto responderé utilizando Google Gemini AI.`);
    }, 1500);
  });
}

/**
 * ==========================================================
 * Comunicación con el Backend.
 *
 * (Se implementará en la Fase 4)
 * ==========================================================
 */
async function apiRequest(messages) {
  throw new Error("La Serverless Function aún no está implementada.");
}