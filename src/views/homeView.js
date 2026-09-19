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
          <span class="hero-kicker__icon" aria-hidden="true">✦</span>
          Powered by Google Gemini AI
        </span>

        <div class="hero-copy__content">
          <span class="hero-eyebrow">HEROES · LEGENDS · AI</span>

          <h2 class="hero-title">
            Conversa con los héroes más legendarios
          </h2>

          <p class="hero-description">
            HeroVerse AI es una experiencia conversacional que combina personajes icónicos con Inteligencia Artificial generativa. Elige entre Sherlock Holmes, Capitán América o Jack Sparrow y conversa con una identidad construida para conservar su personalidad, estilo de comunicación y rasgos característicos durante la interacción.
          </p>

          <p class="hero-description">
            Cada personaje mantiene una conversación independiente durante la sesión, por lo que puedes cambiar entre ellos sin mezclar sus historiales. Las respuestas son generadas mediante Google Gemini a través de una función segura del servidor, evitando exponer la clave de la API en el navegador.
          </p>
        </div>

        <div class="hero-actions">
          <a href="/chat" class="btn btn-primary hero-cta" data-link>
            <span>Comenzar conversación</span>
            <span class="hero-cta__arrow" aria-hidden="true">→</span>
          </a>

          <span class="hero-actions__note">
            Selecciona tu personaje y descubre una forma diferente de conversar con IA.
          </span>
        </div>
      </div>

      <aside class="hero-experience" aria-label="Experiencia HeroVerse">
        <div class="hero-experience__header">
          <span class="hero-experience__eyebrow">HERO EXPERIENCE</span>
          <h3>
            Tres personajes.
            <br>
            Tres formas de conversar.
          </h3>
        </div>

        <div class="hero-experience__items">
          <div class="experience-item">
            <span class="experience-item__icon" aria-hidden="true">◈</span>
            <div>
              <strong>Personalidades diferentes</strong>
              <span>
                Sherlock analiza, Capitán América inspira y Jack Sparrow improvisa con su particular sentido del humor.
              </span>
            </div>
          </div>

          <div class="experience-item">
            <span class="experience-item__icon" aria-hidden="true">◎</span>
            <div>
              <strong>Contexto independiente</strong>
              <span>
                Cada personaje conserva su propio historial de conversación durante la sesión.
              </span>
            </div>
          </div>

          <div class="experience-item">
            <span class="experience-item__icon" aria-hidden="true">✦</span>
            <div>
              <strong>Google Gemini AI</strong>
              <span>
                Las respuestas se generan mediante Gemini y una Serverless Function desplegada en Vercel.
              </span>
            </div>
          </div>
        </div>
      </aside>
    </section>

    ${CharacterSelector()}
  </section>
`;
}