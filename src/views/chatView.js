/**
 * ==========================================================
 * HeroVerse AI
 * Vista Chat
 * ==========================================================
 *
 * Esta vista contendrá posteriormente toda la interfaz
 * del chat con Inteligencia Artificial.
 *
 ** Vista principal donde se desarrollará la conversación
 * entre el usuario y el personaje seleccionado.
 *
 * En esta fase únicamente se construye la interfaz.
 * La lógica será implementada en la Fase 3.
 * ==========================================================
 */

 import { initChatController } from "../engine/chatController.js";

export function chatView() {
    setTimeout(() => {
        initChatController();
    });

    return `
    <section class="chat-view">
      <!-- ===================================== -->
      <!-- Cabecera moderna del Chat -->
      <!-- ===================================== -->
      <header class="chat-header">
        <div class="chat-header__character">
          <div class="chat-header__avatar">
            🕵️
          </div>
          <div class="chat-header__info">
            <div class="chat-header__name-row">
              <h2 class="chat-header__name">
                Sherlock Holmes
              </h2>
              <span class="chat-header__status">
                <span class="chat-header__status-dot"></span>
                En línea
              </span>
            </div>
            <p class="chat-header__description">
              Detective consultor · Observador · Analítico
            </p>
          </div>
        </div>
      </header>

      <!-- ===================================== -->
      <!-- Conversación -->
      <!-- ===================================== -->
      <main id="messages" class="chat-messages">
        <div class="message assistant">
          Bienvenido a HeroVerse AI. Estoy listo para comenzar nuestra conversación.
        </div>
      </main>

      <!-- ===================================== -->
      <!-- Composer -->
      <!-- ===================================== -->
      <form id="chat-form" class="chat-form">
        <textarea
          id="chat-input"
          placeholder="Escribe un mensaje..."
          rows="3"
          aria-label="Escribe tu mensaje"
        ></textarea>
        <button type="submit" class="btn btn-primary">
          ✈️ Enviar
        </button>
      </form>
    </section>
  `;
}
