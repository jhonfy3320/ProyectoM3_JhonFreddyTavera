/**
 * =====================================================
 * HeroVerse AI
 * Serverless Function
 * =====================================================
 *
 * Esta función actuará como intermediaria entre
 * el Frontend y Google Gemini.
 *
 * En esta primera versión solamente comprobaremos
 * que el endpoint funciona correctamente.
 *
 * =====================================================

export default async function handler(req, res) {
  // Solo aceptamos POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Método no permitido."
    });
  }

  // Respuesta temporal
  return res.status(200).json({
    success: true,
    message: "Servidor funcionando correctamente.",
    timestamp: new Date().toISOString()
  });
} */
import { GoogleGenAI } from "@google/genai";

/**
 * ==========================================================
 * HeroVerse AI
 * Gemini Serverless Function
 * ==========================================================
 *
 * Endpoint:
 * POST /api/chat
 *
 * Responsabilidades:
 * - Validar la petición HTTP.
 * - Recibir el historial de conversación.
 * - Obtener la API Key desde variables de entorno.
 * - Comunicarse con Google Gemini.
 * - Devolver una respuesta JSON limpia.
 * - Evitar exponer información sensible.
 * ==========================================================
 */

const MODEL = "gemini-2.5-flash";

const SYSTEM_INSTRUCTION = `
Eres un asistente de conversación para HeroVerse AI.

Tu función es responder como el personaje seleccionado
por el usuario manteniendo su personalidad, tono y estilo.

Las respuestas deben:
- Ser naturales y apropiadas para una conversación.
- Mantener el contexto proporcionado en el historial.
- Ser relativamente breves.
- Evitar respuestas innecesariamente extensas.
`;

/**
 * Maneja las peticiones al endpoint /api/chat.
 */
export default async function handler(request, response) {
  /**
   * ========================================================
   * 1. Validar método HTTP
   * ========================================================
   */
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Método no permitido.",
    });
  }

  try {
    /**
     * ======================================================
     * 2. Validar API Key
     * ======================================================
     */
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return response.status(500).json({
        error: "El servicio de IA no está configurado correctamente.",
      });
    }

    /**
     * ======================================================
     * 3. Obtener datos enviados por el frontend
     * ======================================================
     */
    const { messages } = request.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return response.status(400).json({
        error: "El historial de mensajes es obligatorio.",
      });
    }

    /**
     * ======================================================
     * 4. Crear cliente de Gemini
     * ======================================================
     */
    const ai = new GoogleGenAI({
      apiKey,
    });

    /**
     * ======================================================
     * 5. Enviar historial a Gemini
     * ======================================================
     */
    const result = await ai.models.generateContent({
      model: MODEL,
      contents: messages,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    /**
     * ======================================================
     * 6. Obtener texto generado
     * ======================================================
     */
    const text = result.text;

    if (!text) {
      return response.status(502).json({
        error: "Gemini no devolvió una respuesta válida.",
      });
    }

    /**
     * ======================================================
     * 7. Respuesta limpia al frontend
     * ======================================================
     */
    return response.status(200).json({
      role: "model",
      content: text,
    });
  } catch (error) {
    /**
     * ======================================================
     * 8. Manejo seguro de errores
     * ======================================================
     */
    console.error("Error en /api/chat:", error);

    return response.status(500).json({
      error: "No fue posible obtener una respuesta de la IA.",
    });
  }
}