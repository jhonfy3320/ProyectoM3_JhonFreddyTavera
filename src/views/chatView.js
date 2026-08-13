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

/**
 * ==========================================================
 * HeroVerse AI
 * Vista Chat
 * ==========================================================
 *
 * Responsabilidad:
 * - Renderizar la interfaz principal del chat.
 * - Mostrar dinámicamente el personaje activo.
 * - Inicializar el controlador del chat.
 *
 * La vista NO:
 * - Realiza peticiones HTTP.
 * - Se comunica directamente con Gemini.
 * - Administra el historial.
 * - Modifica directamente el Store.
 *
 * El personaje mostrado se obtiene desde chatStore.
 * ==========================================================
 */

import { initChatController } from "../engine/chatController.js";
import { getActiveCharacter } from "../engine/chatStore.js";

export function chatView() {

    /**
     * Obtiene el personaje seleccionado desde el Store.
     */
    const character = getActiveCharacter();

    /**
     * Protección ante un personaje inexistente.
     *
     * En condiciones normales nunca debería ocurrir,
     * porque la selección ya fue validada por el Store.
     */
    if (!character) {
        return `
            <section class="chat-view">
                <div class="chat-error">
                    <h2>No se pudo cargar el personaje</h2>
                    <p>
                        Regresa a Home y selecciona un personaje
                        para comenzar la conversación.
                    </p>

                    <a
                        href="/home"
                        class="btn btn-primary"
                        data-link
                    >
                        Volver a personajes
                    </a>
                </div>
            </section>
        `;
    }

    /**
     * Inicializamos el controlador después de que
     * la vista haya sido renderizada.
     */
    setTimeout(() => {
        initChatController();
    });

    return `
        <section class="chat-view">

            <!-- ==========================================
                 CABECERA DINÁMICA
                 ========================================== -->

            <header class="chat-header">

                <div class="chat-header__character">

                    <div class="chat-header__avatar">
                        <img
                            src="${character.image}"
                            alt="${character.name}"
                        />
                    </div>

                    <div class="chat-header__info">

                        <div class="chat-header__name-row">

                            <h2 class="chat-header__name">
                                ${character.name}
                            </h2>

                            <span class="chat-header__status">
                                <span
                                    class="chat-header__status-dot"
                                    aria-hidden="true"
                                ></span>

                                En línea
                            </span>

                        </div>

                        <p class="chat-header__description">
                            ${character.description}
                        </p>

                    </div>

                </div>

            </header>


            <!-- ==========================================
                 CONVERSACIÓN
                 ========================================== -->

            <main
                id="chatMessages"
                class="chat-messages"
            >
            </main>


            <!-- ==========================================
                 MENSAJES
                 ========================================== -->

            <section
                id="messages"
                class="messages"
                aria-live="polite"
            >
            </section>


            <!-- ==========================================
                 COMPOSER
                 ========================================== -->

            <form
                id="chat-form"
                class="chat-form"
            >

                <textarea
                    id="chat-input"
                    placeholder="Escribe un mensaje..."
                    rows="3"
                    aria-label="Escribe un mensaje"
                ></textarea>

                <button
                    type="submit"
                    class="btn btn-primary"
                >
                    <span aria-hidden="true">➤</span>
                    Enviar
                </button>

            </form>

        </section>
    `;
}