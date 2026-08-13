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
      <!-- Cabecera del Chat -->
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
      <main id="messages" class="chat-messages"></main>

      <!-- ===================================== -->
      <!-- Composer -->
      <!-- ===================================== -->
      <form id="chat-form" class="chat-form">
        <div class="chat-form__input-wrapper">
          <textarea
            id="chat-input"
            class="chat-form__input"
            placeholder="Escribe un mensaje..."
            rows="1"
            aria-label="Escribe un mensaje"
          ></textarea>
          <button
            type="submit"
            class="chat-form__send"
            aria-label="Enviar mensaje"
          >
            <span>➤</span>
          </button>
        </div>
      </form>
    </section>
  `;
}