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
      <!-- Encabezado del Chat -->
      <!-- ===================================== -->
      <header class="chat-header">
          <h2>💬 Chat</h2>
          <p>Comienza una conversación con tu personaje favorito.</p>
      </header>>

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
      <section
          id="messages"
          class="messages">
      </section>


      <!-- ===================================== -->
      <!-- Área de escritura -->
      <!-- ===================================== -->
               <form
                id="chat-form"
                class="chat-form">

                <textarea
                    id="chat-input"
                    placeholder="Escribe un mensaje..."
                    rows="3">
                </textarea>

                <button
                    type="submit"
                    class="btn btn-primary">
                    Enviar
                </button>

            </form>

        </section>
  `;
}
