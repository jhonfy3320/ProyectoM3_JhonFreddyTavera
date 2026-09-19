/**
 * ==========================================================
 * HeroVerse AI
 * Vista Home
 * ==========================================================
 */

import { CharacterSelector } from "../characters/CharacterSelector.js";
import { initCharacterSelector } from "../characters/characterController.js";

export function homeView() {
  setTimeout(() => {
    initCharacterSelector();
  });

  return `
    <section class="home-view">
      <section class="hero-section">
        <div class="hero-copy">
          <div class="hero-copy__glow"></div>

          <span class="hero-kicker">
            <span class="hero-kicker__icon" aria-hidden="true">
              ✦
            </span>
            Powered by Google Gemini AI
          </span>

          <div class="hero-copy__content">
            <span class="hero-eyebrow">
              HEROES · LEGENDS · AI
            </span>

            <h2 class="hero-title">
              Conversa con los héroes más legendarios
            </h2>

            <p class="hero-description">
              HeroVerse AI te permite mantener conversaciones naturales con personajes
              icónicos utilizando Inteligencia Artificial. Cada personaje posee una
              personalidad única y responde manteniendo su esencia durante toda la
              conversación.
            </p>
          </div>

          <div class="hero-actions">
            <a href="/chat" class="btn btn-primary hero-cta" data-link>
              <span>Comenzar conversación</span>
              <span class="hero-cta__arrow" aria-hidden="true">
                →
              </span>
            </a>

            <span class="hero-actions__note">
              Elige un personaje y comienza una conversación única.
            </span>
          </div>
        </div>

        <aside class="hero-experience" aria-label="Experiencia HeroVerse">
          <div class="hero-experience__header">
            <span class="hero-experience__eyebrow">
              HERO EXPERIENCE
            </span>

            <h3>
              Un universo.<br>
              Tres personalidades.
            </h3>
          </div>

          <div class="hero-experience__items">
            <div class="experience-item">
              <span class="experience-item__icon" aria-hidden="true">
                ◈
              </span>
              <div>
                <strong>3 personajes</strong>
                <span>Historias y estilos únicos</span>
              </div>
            </div>

            <div class="experience-item">
              <span class="experience-item__icon" aria-hidden="true">
                ◎
              </span>
              <div>
                <strong>Contexto independiente</strong>
                <span>Cada conversación mantiene su propio historial</span>
              </div>
            </div>

            <div class="experience-item">
              <span class="experience-item__icon" aria-hidden="true">
                ✦
              </span>
              <div>
                <strong>Google Gemini AI</strong>
                <span>Inteligencia artificial generativa</span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      ${CharacterSelector()}
    </section>
  `;
}