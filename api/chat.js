/**
 * ==========================================================
 * HeroVerse AI
 * Gemini Serverless Function
 * ==========================================================
 *
 * Endpoint: POST /api/chat
 * Responsabilidades:
 * - Validar la petición HTTP y el personaje seleccionado.
 * - Validar y limitar el historial de conversación.
 * - Obtener la API Key desde variables de entorno.
 * - Comunicarse de forma segura con Google Gemini.
 * - Limitar el consumo de recursos y proteger la privacidad.
 * - Gestionar errores y rate limits de forma segura.
 * - Devolver una respuesta JSON limpia al frontend.
 * ==========================================================
 */

import { GoogleGenAI } from "@google/genai";
import { characterPrompts } from "../src/characters/characterPrompts.js";

/**
 * Configuración de producción
 */
const MODEL = "gemini-3.6-flash";
const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_TOTAL_CONTENT_LENGTH = 30000;
const MAX_OUTPUT_TOKENS = 800;
const RETRY_AFTER_SECONDS = 30;

/**
 * Headers de seguridad y privacidad
 */
function applySecurityHeaders(response) {
  if (!response || typeof response.setHeader !== "function") {
    return;
  }

  response.setHeader("Cache-Control", "no-store, max-age=0");
  response.setHeader("Pragma", "no-cache");
  response.setHeader("X-Content-Type-Options", "nosniff");
}

/**
 * Cabecera Retry-After para manejo de rate limit
 */
function applyRetryAfterHeader(response) {
  if (!response || typeof response.setHeader !== "function") {
    return;
  }

  response.setHeader("Retry-After", String(RETRY_AFTER_SECONDS));
}

/**
 * Handler principal del Serverless Function
 */
export default async function handler(request, response) {
  // 1. Headers de seguridad y privacidad
  applySecurityHeaders(response);

  // 2. Validar método HTTP
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Método no permitido.",
    });
  }

  try {
    // 3. Validar API Key de Gemini
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return response.status(500).json({
        error: "El servicio de IA no está configurado correctamente.",
      });
    }

    // 4. Validar cuerpo de la petición
    if (!request.body || typeof request.body !== "object" || Array.isArray(request.body)) {
      return response.status(400).json({
        error: "El cuerpo de la solicitud es obligatorio.",
      });
    }

    const { messages, characterId } = request.body;

    // 5. Validar characterId
    if (characterId === undefined || characterId === null) {
      return response.status(400).json({
        error: "El characterId es obligatorio.",
      });
    }

    if (typeof characterId !== "string" || characterId.trim().length === 0) {
      return response.status(400).json({
        error: "El characterId debe ser un texto válido.",
      });
    }

    if (!Object.hasOwn(characterPrompts, characterId)) {
      return response.status(400).json({
        error: "El personaje seleccionado no es válido.",
      });
    }

    // 6. Validar mensajes
    if (messages === undefined || messages === null) {
      return response.status(400).json({
        error: "El historial de mensajes es obligatorio.",
      });
    }

    if (!Array.isArray(messages)) {
      return response.status(400).json({
        error: "El historial de mensajes debe ser un array.",
      });
    }

    if (messages.length === 0) {
      return response.status(400).json({
        error: "El historial de mensajes no puede estar vacío.",
      });
    }

    // 7. Limitar cantidad de mensajes
    if (messages.length > MAX_MESSAGES) {
      return response.status(413).json({
        error: "El historial de conversación excede el límite permitido.",
      });
    }

    // 8. Validar estructura de cada mensaje
    const hasInvalidMessage = messages.some(
      (message) =>
        message === null || typeof message !== "object" || Array.isArray(message)
    );

    if (hasInvalidMessage) {
      return response.status(400).json({
        error: "Cada mensaje debe ser un objeto válido.",
      });
    }

    // 9. Validar roles permitidos
    const hasInvalidRole = messages.some(
      (message) => message.role !== "user" && message.role !== "assistant"
    );

    if (hasInvalidRole) {
      return response.status(400).json({
        error: 'El role de cada mensaje debe ser "user" o "assistant".',
      });
    }

    // 10. Validar contenido
    const hasInvalidContent = messages.some(
      (message) => typeof message.content !== "string" || message.content.trim().length === 0
    );

    if (hasInvalidContent) {
      return response.status(400).json({
        error: "El contenido de cada mensaje debe ser un texto válido.",
      });
    }

    // 11. Limitar tamaño individual
    const hasOversizedMessage = messages.some(
      (message) => message.content.length > MAX_MESSAGE_LENGTH
    );

    if (hasOversizedMessage) {
      return response.status(413).json({
        error: "Uno o más mensajes exceden el tamaño permitido.",
      });
    }

    // 12. Limitar contexto total
    const totalContentLength = messages.reduce(
      (total, message) => total + message.content.length,
      0
    );

    if (totalContentLength > MAX_TOTAL_CONTENT_LENGTH) {
      return response.status(413).json({
        error: "El contenido total de la conversación excede el límite permitido.",
      });
    }

    // 13. Obtener system prompt del personaje
    const systemInstruction = characterPrompts[characterId];

    // 14. Crear cliente de Google Gemini
    const ai = new GoogleGenAI({ apiKey });

    // 15. Adaptar historial al formato esperado por Gemini SDK
    const contents = messages.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: message.content.trim(),
        },
      ],
    }));

    // 16. Solicitud a Google Gemini
    const result = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
      },
    });

    // 17. Extraer respuesta
    const text = result.text;

    // 18. Respuesta limpia al frontend
    return response.status(200).json({
      role: "model",
      content: text,
    });
  } catch (error) {
    // 19. Logging seguro (sin filtrar datos privados ni API Keys)
    const status = Number(error?.status) || 500;

    console.error("Error en /api/chat", {
      status,
      name: error?.name ?? "UnknownError",
    });

    // 20. Gemini Rate Limit (HTTP 429)
    if (status === 429) {
      applyRetryAfterHeader(response);

      return response.status(429).json({
        error: "El servicio de IA está temporalmente saturado. Intenta nuevamente en unos segundos.",
      });
    }

    // 21. Gemini no disponible (HTTP 503)
    if (status === 503) {
      applyRetryAfterHeader(response);

      return response.status(503).json({
        error: "El servicio de IA está temporalmente no disponible. Intenta nuevamente en unos segundos.",
      });
    }

    // 22. Solicitud rechazada por Gemini (HTTP 400)
    if (status === 400) {
      return response.status(400).json({
        error: "Gemini rechazó la solicitud enviada.",
      });
    }

    // 23. Error interno genérico (HTTP 500)
    return response.status(500).json({
      error: "No fue posible obtener una respuesta de la IA.",
    });
  }
}