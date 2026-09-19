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
        <span class="character-selector__eyebrow">
          HEROES & LEGENDS
        </span>
        <h2 class="character-selector__title">
          Elige tu personaje favorito
        </h2>
        <p class="character-selector__description">
          Cada personaje posee una personalidad, estilo y contexto
          propios. Elige con quién quieres comenzar y cambia de
          personaje cuando quieras sin mezclar las conversaciones.
        </p>
      </div>

      <div class="character-selector__grid">
        ${characters.map((character) => {
          const isSelected = character.id === selectedCharacterId;

          return `
            <button
              type="button"
              class="character-card character-card--${character.id} ${isSelected ? "character-card--selected" : ""}"
              data-character-id="${character.id}"
              aria-pressed="${isSelected}"
            >
              <div class="character-card__image-wrapper">
                <img
                  class="character-card__image"
                  src="${character.image}"
                  alt="${character.name}"
                  loading="lazy"
                />
              </div>

              <div class="character-card__content">
                <span class="character-card__role">
                  PERSONAJE
                </span>
                <h3 class="character-card__name">
                  ${character.name}
                </h3>
                <p class="character-card__description">
                  ${character.description}
                </p>
              </div>

              <span class="character-card__indicator"></span>
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;
}