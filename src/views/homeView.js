/**
 * ==========================================================
 * HeroVerse AI
 * Vista Home
 * ==========================================================
 *
 * Esta vista representa la pantalla principal de bienvenida.
 *
 * En esta primera versión solamente devuelve un HTML básico.
 *
 * Más adelante aquí mostraremos:
 * - Descripción de la aplicación.
 * - Personajes disponibles.
 * - Botón para comenzar el chat.
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

      <div class="hero-section">

        <span class="badge">
          🤖 Powered by Google Gemini AI
        </span>

        <h2 class="hero-title">
          Conversa con los héroes más legendarios
        </h2>

        <p class="hero-description">
          HeroVerse AI te permite mantener conversaciones naturales
          con personajes icónicos utilizando Inteligencia Artificial.
          Cada personaje posee una personalidad única y responde
          manteniendo su esencia durante toda la conversación.
        </p>

        <a href="/chat" class="btn btn-primary" data-link>
          Comenzar conversación
        </a>

      </div>

      ${CharacterSelector()}

    </section>
  `;
}