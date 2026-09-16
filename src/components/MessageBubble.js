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
export function MessageBubble(message, character = null) {
  const isUser = message.role === "user";

  const senderName = isUser
    ? "Tú"
    : character?.name ?? "Asistente";

  const avatar = isUser
    ? "🧑"
    : character
      ? `
        <img
          class="message-avatar__image"
          src="${escapeHTML(character.image)}"
          alt="${escapeHTML(character.name)}"
        >
      `
      : "🤖";

  return `
    <article class="message ${
      isUser ? "message-user" : "message-ai"
    }">
      <div class="message-avatar">
        ${avatar}
      </div>

      <div class="message-content">
        <header class="message-header">
          <strong>
            ${escapeHTML(senderName)}
          </strong>
        </header>

        <p class="message-text">
          ${escapeHTML(message.content)}
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