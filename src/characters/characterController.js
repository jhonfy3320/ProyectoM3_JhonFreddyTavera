/**
 * ==========================================================
 * HeroVerse AI
 * Character Controller
 * ==========================================================
 *
 * Responsabilidad:
 * - Detectar la selección de personajes.
 * - Actualizar el personaje activo en el Store.
 * - Navegar hacia el Chat.
 *
 * Este módulo NO:
 * - Renderiza HTML.
 * - Se comunica con Gemini.
 * - Realiza peticiones HTTP.
 * - Contiene lógica del backend.
 * ==========================================================
 */

import { setActiveCharacter } from "../engine/chatStore.js";
import { navigate } from "../router/router.js";

/**
 * Inicializa la selección de personajes.
 */
export function initCharacterSelector() {
    const characterCards = document.querySelectorAll(
        "[data-character-id]"
    );

    if (!characterCards.length) return;

    characterCards.forEach(card => {
        card.addEventListener("click", () => {
            const characterId = card.dataset.characterId;

            if (!characterId) return;

            try {
                setActiveCharacter(characterId);

                navigate("/chat");
            } catch (error) {
                console.error(
                    "Error al seleccionar personaje:",
                    error
                );
            }
        });
    });
}