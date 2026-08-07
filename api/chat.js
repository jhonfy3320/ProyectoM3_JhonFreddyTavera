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
 */

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
}