/**
 * ==========================================================
 * HeroVerse AI
 * MessageBubble Component
 * ==========================================================
 *
 * Componente encargado de generar el HTML de un mensaje.
 *
 * No conoce el estado del chat.
 * No conoce Gemini.
 * No conoce el Store.
 *
 * Solamente recibe un objeto mensaje
 * y devuelve el HTML correspondiente.
 * ==========================================================
 */
export function MessageBubble(message) {
  const isUser = message.role === "user";
  const safeContent = escapeHTML(message.content);

  return `
    <article class="message ${isUser ? "message-user" : "message-ai"}">
      <div class="message-avatar">
        ${isUser ? "🧑" : "🤖"}
      </div>
      <div class="message-content">
        <header class="message-header">
          <strong>${isUser ? "Tú" : "AI"}</strong>
        </header>
        <p class="message-text">
          ${safeContent}
        </p>
      </div>
    </article>
  `;
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}