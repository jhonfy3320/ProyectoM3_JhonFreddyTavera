/**
 * ==========================================================
 * HeroVerse AI
 * Chat Renderer
 * ==========================================================
 *
 * Responsabilidad:
 * Renderizar la conversación dentro del contenedor del chat.
 *
 * Este módulo:
 * ✔ Obtiene los mensajes desde el Store.
 * ✔ Genera el HTML utilizando MessageBubble.
 * ✔ Actualiza el DOM.
 * ✔ Mantiene el scroll al último mensaje.
 *
 * No conoce Gemini.
 * No conoce el Router.
 * No conoce la lógica del chat.
 * ==========================================================
 */

import { getMessages } from "../engine/chatStore.js";
import { MessageBubble } from "../components/MessageBubble.js";
import { beforeAll } from "vitest";

/**
 * Renderiza toda la conversación.
 */
export function renderChat() {

    const container = document.getElementById("messages");

    if (!container) return;

    const messages = getMessages();

    container.innerHTML = messages
        .map(message => MessageBubble(message))
        .join("");

    scrollToBottom(container);

}

/**
 * Mantiene el scroll siempre en el último mensaje.
 */
/**
 * Muestra el indicador "Escribiendo..."
 */
export function showTypingIndicator() {
  const container = document.getElementById("messages");

  if (!container) return;

  container.insertAdjacentElement("beforeend",
  `
    <article id="typing-indicator" class="message message-ai">
      <div class="message-avatar">
        🤖
      </div>
      <div class="message-content">
        <header class="message-header">
          <strong>Sherlock Holmes</strong>
        </header>
        <p class="typing">
          Escribiendo...
        </p>
      </div>
    </article>
  `);

  scrollToBottom(container);
}

/**
 * Oculta el indicador.
 */
export function hideTypingIndicator() {
  document.getElementById("typing-indicator")?.remove();
}

function scrollToBottom(container) {
  container.scrollTop = container.scrollHeight;
}