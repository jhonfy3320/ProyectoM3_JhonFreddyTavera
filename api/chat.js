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
import { characterPrompts } from "../src/characters/characterPrompts.js";
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

const MODEL = "gemini-3.6-flash";

/**
 * const SYSTEM_INSTRUCTION = `
Eres un asistente de conversación para HeroVerse AI.

Tu función es responder como el personaje seleccionado
por el usuario manteniendo su personalidad, tono y estilo.

Las respuestas deben:
- Ser naturales y apropiadas para una conversación.
- Mantener el contexto proporcionado en el historial.
- Ser relativamente breves.
- Evitar respuestas innecesariamente extensas.
`;
 */

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
    const { messages, characterId } = request.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return response.status(400).json({
        error: "El historial de mensajes es obligatorio.",
      });
    }
    const systemInstruction = characterPrompts[characterId];

    if (!systemInstruction) {
      return response.status(400).json({
        error: "El personaje seleccionado no es válido.",
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
 * 5. Adaptar historial al formato de Gemini
 * ======================================================
 *
 * Nuestro frontend utiliza:
 * {
 *   role: "user" | "assistant",
 *   content: "texto"
 * }
 *
 * Gemini utiliza:
 * {
 *   role: "user" | "model",
 *   parts: [
 *     { text: "texto" }
 *   ]
 * }
 */
console.log("📨 Historial recibido:", JSON.stringify(messages, null, 2));

const contents = messages
  .filter((message) => {
    return (
      message &&
      typeof message.content === "string" &&
      message.content.trim().length > 0
    );
  })
  .map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [
      {
        text: message.content.trim(),
      },
    ],
  }));

  console.log(
  "🧠 Historial transformado para Gemini:",
  JSON.stringify(contents, null, 2)
);

/**
 * Validamos que después de la transformación
 * todavía exista contenido válido.
 */
if (contents.length === 0) {
  return response.status(400).json({
    error: "No existen mensajes válidos para enviar a Gemini.",
  });
}

/**
 * ======================================================
 * 6. Enviar historial transformado a Gemini
 * ======================================================
 */
const result = await ai.models.generateContent({
  model: MODEL,
  contents,
  config: {
    systemInstruction,
  },
});

const text = result.text;
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
  console.error("Error en /api/chat:", error);

  const status = error?.status || 500;

  if (status === 429) {
    return response.status(429).json({
      error: "El servicio de IA está temporalmente saturado. Intenta nuevamente en unos segundos.",
    });
  }

  if (status === 503) {
    return response.status(503).json({
      error: "El servicio de IA está temporalmente no disponible. Intenta nuevamente en unos segundos.",
    });
  }

  if (status === 400) {
    return response.status(400).json({
      error: "Gemini rechazó la solicitud enviada.",
    });
  }

  return response.status(500).json({
    error: "No fue posible obtener una respuesta de la IA.",
  });
}
}