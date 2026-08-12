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
/**
 * ==========================================================
 * HeroVerse AI
 * Gemini Service
 * ==========================================================
 *
 * Responsabilidad:
 * Comunicarse con la Serverless Function /api/chat.
 *
 * Este módulo NO conoce:
 * - El DOM.
 * - El Router.
 * - El Renderer.
 * - El Controller.
 *
 * Su única responsabilidad es comunicarse con el backend.
 * ==========================================================
 */

const API_URL = "/api/chat";

/**
 * Envía el historial de conversación al backend.
 *
 * @param {Array} messages - Historial completo de conversación.
 * @returns {Promise<Object>} Respuesta normalizada del backend.
 */
export async function sendMessage(messages) {
  try {
    /**
     * 1. Validación básica
     */
    if (!Array.isArray(messages)) {
      throw new Error("El historial debe ser un array.");
    }

    /**
     * 2. Petición al backend
     */
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
      }),
    });

    /**
     * 3. Intentamos obtener el JSON
     */
    const data = await response.json();

    /**
     * 4. Manejo de errores HTTP
     */
    if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error(
          data?.error || "La solicitud enviada no es válida."
        );

    case 401:
    case 403:
      throw new Error(
        "El servicio de IA no está autorizado correctamente."
      );

    case 429:
      throw new Error(
        "El servicio de IA está temporalmente saturado. Intenta nuevamente en unos segundos."
      );

    case 500:
    case 502:
    case 503:
      throw new Error(
        data?.error || "El servicio de IA no está disponible en este momento."
      );

    default:
      throw new Error(
        data?.error || "No fue posible obtener una respuesta del servidor."
      );
  }
}

    /**
     * 5. Validación de la respuesta
     */
    if (!data?.content) {
      throw new Error(
        "El servidor respondió correctamente, pero no devolvió una respuesta válida."
      );
    }

    /**
     * 6. Devolvemos solamente lo que necesita el Engine
     */
    return {
      role: "assistant",
      content: data.content,
      usage: data.usage ?? null,
    };
  } catch (error) {
  console.error("Error en geminiService:", error);

    if (error instanceof TypeError) {
      throw new Error(
        "No fue posible conectar con el servidor. Verifica tu conexión."
      );
    }

    throw new Error(
      error.message || "No se pudo comunicar con el servicio de IA."
    );
  }
}