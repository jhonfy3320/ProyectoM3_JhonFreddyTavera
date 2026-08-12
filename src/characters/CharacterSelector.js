/**
 * ==========================================================
 * HeroVerse AI
 * Character Selector
 * ==========================================================
 *
 * Responsabilidad:
 * - Renderizar los personajes disponibles.
 * - Identificar visualmente el personaje seleccionado.
 * - Emitir el evento de selección.
 *
 * Este componente NO:
 * - Modifica el Store.
 * - Realiza peticiones HTTP.
 * - Se comunica con Gemini.
 * - Contiene lógica del backend.
 * ==========================================================
 */
import { characters } from "./characters.js";

/**
 * Renderiza el selector de personajes.
 *
 * @param {string|null} selectedCharacterId
 * @returns {string}
 */
export function CharacterSelector(selectedCharacterId = null) {
  return `
    <section class="character-selector">
      <div class="character-selector__header">
        <h2>Elige tu personaje</h2>
        <p>Selecciona un personaje para comenzar tu conversación.</p>
      </div>

      <div class="character-selector__grid">
        ${characters.map((character) => {
          const isSelected = character.id === selectedCharacterId;

          return `
            <button
              type="button"
              class="character-card ${isSelected ? "character-card--selected" : ""}"
              data-character-id="${character.id}"
              aria-pressed="${isSelected}"
            >
              <div class="character-card__image">
                <img src="${character.image}" alt="${character.name}" />
              </div>
              <div class="character-card__content">
                <h3>${character.name}</h3>
                <p>${character.description}</p>
              </div>
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;
}