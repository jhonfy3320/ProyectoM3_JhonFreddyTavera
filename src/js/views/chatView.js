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

export function chatView() {
  return `
    <section class="chat-view">

      <!-- ===================================== -->
      <!-- Encabezado del Chat -->
      <!-- ===================================== -->
      <header class="chat-header">
        <div class="chat-character">
          <div class="avatar-container">
            🕵️
          </div>
          <div>
            <h2>Sherlock Holmes</h2>
            <span class="badge">En línea</span>
          </div>
        </div>
      </header>

      <!-- ===================================== -->
      <!-- Conversación -->
      <!-- ===================================== -->
      <main id="chatMessages" class="chat-messages">
        <div class="message assistant">
          Bienvenido a HeroVerse AI.
          Estoy listo para comenzar nuestra conversación.
        </div>
      </main>

      <!-- ===================================== -->
      <!-- Estado del Chat -->
      <!-- ===================================== -->
      <section class="chat-status">
        <span id="typingIndicator">Esperando mensaje...</span>
      </section>

      <!-- ===================================== -->
      <!-- Área de escritura -->
      <!-- ===================================== -->
      <footer class="chat-input-area">
        <textarea
          id="messageInput"
          class="input"
          placeholder="Escribe tu mensaje..."
          rows="3"
        ></textarea>
        <button id="sendButton" class="btn btn-primary">
          Enviar
        </button>
      </footer>

    </section>
  `;
}